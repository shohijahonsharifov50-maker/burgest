import { useEffect, useLayoutEffect, useMemo, useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { buildBurgerGeometry } from './burgerGeometry';
import { createBurgerLayout } from './layout';

/** Force-field and spring tuning, in world units per second. */
const PHYSICS = {
  radius: 1.35,      // reach of the cursor's force field
  push: 70,          // strength of the push away from the cursor
  drag: 2.4,         // how much burgers are carried along with a fast-moving cursor
  spin: 26,          // how hard a push makes a burger tumble
  spring: 9,         // pull back towards the rest position
  damping: 4.2,      // velocity loss per second (a little overshoot reads as momentum)
  turnSpring: 6,
  turnDamping: 3.4,
  idleLift: 0.09,    // gentle floating while nothing touches them
  idleDrift: 0.05,
  pointerTimeoutMs: 2500,
};

const scratch = new THREE.Object3D();
const ray = new THREE.Vector3();
const color = new THREE.Color();

/**
 * Hundreds of burgers in one InstancedMesh. Each frame they are pushed away from the cursor,
 * pulled back to their rest positions by a damped spring, and float slightly when idle.
 */
export function BurgerSwarm({ count, pointer, animate, castShadow }) {
  const meshRef = useRef(null);
  const camera = useThree((three) => three.camera);
  const size = useThree((three) => three.size);
  const invalidate = useThree((three) => three.invalidate);
  const { width, height } = useMemo(() => visibleAreaAtOrigin(camera, size), [camera, size]);

  const geometry = useMemo(() => buildBurgerGeometry(), []);
  const material = useMemo(() => new THREE.MeshStandardMaterial({
    vertexColors: true,
    roughness: 0.58,
    metalness: 0,
    side: THREE.DoubleSide,
  }), []);
  useEffect(() => () => { geometry.dispose(); material.dispose(); }, [geometry, material]);

  const layout = useMemo(() => createBurgerLayout(count, width, height), [count, width, height]);
  const state = useMemo(() => ({
    position: Float32Array.from(layout.home),
    velocity: new Float32Array(count * 3),
    rotation: Float32Array.from(layout.rotation),
    spin: new Float32Array(count * 3),
    cursor: new THREE.Vector3(0, 0, 0),
    cursorVelocity: new THREE.Vector3(),
    strength: 0,
  }), [layout, count]);

  // Static pose: used for the first frame and for visitors who prefer reduced motion.
  useLayoutEffect(() => {
    const mesh = meshRef.current;
    for (let i = 0; i < count; i += 1) {
      writeMatrix(mesh, i, layout.home, layout.rotation, layout.scale[i]);
      mesh.setColorAt(i, color.setScalar(layout.tint[i]));
    }
    mesh.instanceMatrix.needsUpdate = true;
    if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true;
    invalidate();
  }, [layout, count, invalidate]);

  useFrame(({ clock }, delta) => {
    if (!animate) return;
    const mesh = meshRef.current;
    const dt = Math.min(delta, 1 / 30);
    const time = clock.elapsedTime;
    updateCursor(state, pointer.current, camera, dt);

    const { position: p, velocity: v, rotation: r, spin: w, cursor, cursorVelocity, strength } = state;
    const { home, rotation: rest, phase, scale } = layout;
    const radiusSq = PHYSICS.radius * PHYSICS.radius;
    const damp = Math.exp(-PHYSICS.damping * dt);
    const turnDamp = Math.exp(-PHYSICS.turnDamping * dt);

    for (let i = 0; i < count; i += 1) {
      const ix = i * 3, iy = ix + 1, iz = ix + 2;

      if (strength > 0.001) {
        const dx = p[ix] - cursor.x;
        const dy = p[iy] - cursor.y;
        const dz = p[iz] * 0.35;
        const distSq = dx * dx + dy * dy + dz * dz;
        if (distSq < radiusSq) {
          const dist = Math.sqrt(distSq) + 1e-4;
          const falloff = 1 - dist / PHYSICS.radius;
          const force = falloff * falloff * PHYSICS.push * strength * dt;
          v[ix] += (dx / dist) * force + cursorVelocity.x * falloff * PHYSICS.drag * strength * dt;
          v[iy] += (dy / dist) * force + cursorVelocity.y * falloff * PHYSICS.drag * strength * dt;
          v[iz] -= force * 0.35;
          const torque = force * PHYSICS.spin;
          w[ix] += (-dy / dist) * torque;
          w[iy] += (dx / dist) * torque;
          w[iz] += (dx / dist) * torque * 0.5;
        }
      }

      const ph = phase[i];
      const targetX = home[ix] + Math.sin(time * 0.5 + ph) * PHYSICS.idleDrift;
      const targetY = home[iy] + Math.sin(time * 0.7 + ph * 1.7) * PHYSICS.idleLift;
      v[ix] = (v[ix] + (targetX - p[ix]) * PHYSICS.spring * dt) * damp;
      v[iy] = (v[iy] + (targetY - p[iy]) * PHYSICS.spring * dt) * damp;
      v[iz] = (v[iz] + (home[iz] - p[iz]) * PHYSICS.spring * dt) * damp;
      p[ix] += v[ix] * dt;
      p[iy] += v[iy] * dt;
      p[iz] += v[iz] * dt;

      const sway = Math.sin(time * 0.4 + ph) * 0.15;
      for (let a = 0; a < 3; a += 1) {
        const k = ix + a;
        w[k] = (w[k] + (rest[k] + sway - r[k]) * PHYSICS.turnSpring * dt) * turnDamp;
        r[k] += w[k] * dt;
      }

      writeMatrix(mesh, i, p, r, scale[i]);
    }
    mesh.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh
      ref={meshRef}
      args={[geometry, material, count]}
      frustumCulled={false}
      castShadow={castShadow}
      receiveShadow={castShadow}
    />
  );
}

/** Width and height of the z = 0 plane that the camera sees, in world units. */
function visibleAreaAtOrigin(camera, size) {
  const height = 2 * Math.tan(THREE.MathUtils.degToRad(camera.fov / 2)) * camera.position.z;
  return { width: height * (size.width / size.height), height };
}

function writeMatrix(mesh, i, position, rotation, scale) {
  const k = i * 3;
  scratch.position.set(position[k], position[k + 1], position[k + 2]);
  scratch.rotation.set(rotation[k], rotation[k + 1], rotation[k + 2]);
  scratch.scale.setScalar(scale);
  scratch.updateMatrix();
  mesh.setMatrixAt(i, scratch.matrix);
}

/** Projects the pointer onto the z = 0 plane and eases the force field in and out. */
function updateCursor(state, pointer, camera, dt) {
  const active = pointer.inside && performance.now() - pointer.lastMoveAt < PHYSICS.pointerTimeoutMs;
  state.strength += ((active ? 1 : 0) - state.strength) * (1 - Math.exp(-dt * 6));
  if (!pointer.inside) return;

  ray.set(pointer.x, pointer.y, 0.5).unproject(camera).sub(camera.position).normalize();
  const distance = -camera.position.z / ray.z;
  const targetX = camera.position.x + ray.x * distance;
  const targetY = camera.position.y + ray.y * distance;

  const ease = 1 - Math.exp(-dt * 18);
  const nextX = state.cursor.x + (targetX - state.cursor.x) * ease;
  const nextY = state.cursor.y + (targetY - state.cursor.y) * ease;
  state.cursorVelocity.set((nextX - state.cursor.x) / dt, (nextY - state.cursor.y) / dt, 0);
  state.cursor.set(nextX, nextY, 0);
}
