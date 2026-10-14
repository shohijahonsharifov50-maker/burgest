import { useMemo, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { PerformanceMonitor } from '@react-three/drei';
import { DepthOfField, EffectComposer, Vignette } from '@react-three/postprocessing';
import { BurgerSwarm } from './BurgerSwarm';
import { pickQuality } from './quality';
import { usePointerTracker } from './usePointerTracker';

const BACKGROUND = '#070504';

/**
 * Interactive 3D burgers behind the footer content. The cursor (or a finger) pushes them away
 * and they spring back. Rendering pauses whenever the footer is off screen.
 */
export default function BurgerField({ areaRef, visible, reducedMotion }) {
  const initialQuality = useMemo(pickQuality, []);
  const [degraded, setDegraded] = useState(false);
  const quality = degraded
    ? { ...initialQuality, dpr: [1, 1], shadows: false, depthOfField: false }
    : initialQuality;
  const pointer = usePointerTracker(areaRef, { enabled: !reducedMotion });

  let frameloop = 'always';
  if (reducedMotion) frameloop = 'demand';
  else if (!visible) frameloop = 'never';

  return (
    <Canvas
      className="foot-canvas"
      frameloop={frameloop}
      dpr={quality.dpr}
      shadows={quality.shadows}
      camera={{ position: [0, 0, 14], fov: 35, near: 0.1, far: 40 }}
      gl={{ antialias: !quality.depthOfField, powerPreference: 'high-performance' }}
      aria-hidden="true"
    >
      <color attach="background" args={[BACKGROUND]} />
      <fog attach="fog" args={[BACKGROUND, 12, 19]} />

      <ambientLight intensity={0.35} color="#ffdcb0" />
      <hemisphereLight args={['#ffd29a', '#1a0c05', 0.8]} />
      <directionalLight
        position={[4, 6, 9]}
        intensity={2.6}
        color="#ffc27a"
        castShadow={quality.shadows}
        shadow-mapSize={[1024, 1024]}
        shadow-camera-left={-10}
        shadow-camera-right={10}
        shadow-camera-top={8}
        shadow-camera-bottom={-8}
        shadow-bias={-0.0004}
      />
      <pointLight position={[-7, -3, 3]} intensity={45} distance={22} color="#e3261c" />
      <pointLight position={[7, 4, 4]} intensity={30} distance={20} color="#ffb05a" />

      <BurgerSwarm
        count={quality.count}
        pointer={pointer}
        animate={!reducedMotion}
        castShadow={quality.shadows}
      />

      {!reducedMotion && <PerformanceMonitor onDecline={() => setDegraded(true)} />}
      {quality.depthOfField && (
        <EffectComposer multisampling={0}>
          <DepthOfField target={[0, 0, 0]} focalLength={0.035} bokehScale={2.2} height={480} />
          <Vignette offset={0.3} darkness={0.65} />
        </EffectComposer>
      )}
    </Canvas>
  );
}
