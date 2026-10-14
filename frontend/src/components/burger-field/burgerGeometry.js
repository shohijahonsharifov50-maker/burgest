import * as THREE from 'three';
import { mergeGeometries } from 'three/examples/jsm/utils/BufferGeometryUtils.js';
import { createRandom } from './random';

/**
 * One stylised cheeseburger as a single geometry with vertex colours, so hundreds of them
 * can be drawn with one InstancedMesh (one draw call). Layers, bottom to top:
 * bottom bun, beef patty, cheese slice, lettuce, sesame-topped bun. About 1 unit in radius.
 */

const COLORS = {
  bunBottom: '#c7772f',
  bunTop: '#d2832f',
  patty: '#4b2615',
  cheese: '#f7b51b',
  lettuce: '#68b23a',
  seed: '#f3e4bd',
};

const TOP_BUN_BASE = 0.66;
const TOP_BUN_HEIGHT = 0.89;
const TOP_BUN_RADIUS = 1.05;

export function buildBurgerGeometry() {
  const random = createRandom(7);
  const parts = [
    bottomBun(random),
    patty(random),
    cheese(random),
    lettuce(random),
    topBun(random),
    ...sesameSeeds(random, 16),
  ];
  parts.forEach((part) => part.deleteAttribute('uv'));

  const burger = mergeGeometries(parts, false);
  parts.forEach((part) => part.dispose());
  burger.translate(0, -0.78, 0);
  burger.computeBoundingSphere();
  return burger;
}

function lathe(profile, segments = 32) {
  return new THREE.LatheGeometry(profile.map(([x, y]) => new THREE.Vector2(x, y)), segments);
}

/** Gives every vertex the part colour with a little random variation (toasting, char marks). */
function paint(geometry, hex, random, variation = 0.06) {
  const base = new THREE.Color(hex);
  const colors = new Float32Array(geometry.attributes.position.count * 3);
  for (let i = 0; i < colors.length; i += 3) {
    const shade = 1 + (random() - 0.5) * 2 * variation;
    colors[i] = base.r * shade;
    colors[i + 1] = base.g * shade;
    colors[i + 2] = base.b * shade;
  }
  geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
  return geometry;
}

function bottomBun(random) {
  const profile = [[0, 0], [0.88, 0], [0.98, 0.05], [1.0, 0.16], [0.97, 0.27], [0.9, 0.3], [0, 0.3]];
  return paint(lathe(profile), COLORS.bunBottom, random, 0.05);
}

function patty(random) {
  const profile = [[0, 0.3], [1.0, 0.3], [1.06, 0.34], [1.08, 0.42], [1.06, 0.5], [1.0, 0.54], [0, 0.54]];
  return paint(lathe(profile, 40), COLORS.patty, random, 0.22);
}

/** A square slice turned 45° so its corners hang over the patty and droop. */
function cheese(random) {
  const slice = new THREE.BoxGeometry(1.95, 0.045, 1.95, 10, 1, 10);
  slice.rotateY(Math.PI / 4);
  const position = slice.attributes.position;
  for (let i = 0; i < position.count; i += 1) {
    const x = position.getX(i);
    const z = position.getZ(i);
    const overhang = Math.max(0, Math.hypot(x, z) - 1.0);
    position.setY(i, position.getY(i) - overhang * overhang * 1.4);
  }
  slice.translate(0, 0.565, 0);
  slice.computeVertexNormals();
  return paint(slice, COLORS.cheese, random, 0.04);
}

/** A thin disc whose rim is pushed in and out, so it reads as ruffled lettuce. */
function lettuce(random) {
  const leaf = new THREE.CylinderGeometry(1.12, 1.12, 0.07, 64, 1);
  const position = leaf.attributes.position;
  for (let i = 0; i < position.count; i += 1) {
    const x = position.getX(i);
    const z = position.getZ(i);
    const radius = Math.hypot(x, z);
    if (radius < 0.5) continue;
    const angle = Math.atan2(z, x);
    const ruffle = 1 + 0.06 * Math.sin(angle * 9) + 0.03 * Math.sin(angle * 23);
    position.setX(i, x * ruffle);
    position.setZ(i, z * ruffle);
    position.setY(i, position.getY(i) + 0.035 * Math.sin(angle * 7 + 1));
  }
  leaf.translate(0, 0.62, 0);
  leaf.computeVertexNormals();
  return paint(leaf, COLORS.lettuce, random, 0.12);
}

function topBun(random) {
  const b = TOP_BUN_BASE;
  const profile = [
    [0, b], [0.96, b], [1.03, b + 0.05], [1.05, b + 0.2], [0.99, b + 0.4],
    [0.86, b + 0.6], [0.64, b + 0.76], [0.34, b + 0.86], [0, b + TOP_BUN_HEIGHT],
  ];
  return paint(lathe(profile, 40), COLORS.bunTop, random, 0.05);
}

/** Height of the bun dome at a given distance from the centre (ellipse approximation). */
function domeHeight(radius) {
  const t = Math.min(1, radius / TOP_BUN_RADIUS);
  return TOP_BUN_BASE + TOP_BUN_HEIGHT * Math.sqrt(1 - t * t);
}

function sesameSeeds(random, count) {
  const up = new THREE.Vector3(0, 1, 0);
  const seeds = [];
  for (let i = 0; i < count; i += 1) {
    const angle = random() * Math.PI * 2;
    const radius = 0.15 + random() * 0.68;
    const x = Math.cos(angle) * radius;
    const z = Math.sin(angle) * radius;
    const y = domeHeight(radius);

    const normal = new THREE.Vector3(
      x / (TOP_BUN_RADIUS * TOP_BUN_RADIUS),
      (y - TOP_BUN_BASE) / (TOP_BUN_HEIGHT * TOP_BUN_HEIGHT),
      z / (TOP_BUN_RADIUS * TOP_BUN_RADIUS),
    ).normalize();

    const seed = new THREE.SphereGeometry(0.055, 6, 4);
    seed.scale(1, 0.4, 0.62);
    seed.rotateY(random() * Math.PI);
    seed.applyQuaternion(new THREE.Quaternion().setFromUnitVectors(up, normal));
    seed.translate(x + normal.x * 0.012, y + normal.y * 0.012, z + normal.z * 0.012);
    seeds.push(paint(seed, COLORS.seed, random, 0.04));
  }
  return seeds;
}
