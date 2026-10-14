# Burger field (footer)

Hundreds of mini cheeseburgers in a diagonal wave behind the footer. The cursor (or a finger on
touch screens) pushes them away like an invisible force field; they tumble, keep some momentum and
spring back to their rest positions. Real-time WebGL — not a video.

## Install

Already in `package.json`:

```bash
npm install three@0.169.0 @react-three/fiber@8.17.10 @react-three/drei@9.115.0 \
  @react-three/postprocessing@2.16.3 postprocessing@6.36.4
```

## Files

| File | Role |
|---|---|
| `BurgerField.jsx` | `<Canvas>`, warm lighting, fog, depth of field, quality tier, pause when off screen |
| `BurgerSwarm.jsx` | One `InstancedMesh` + per-frame physics (force field, spring, momentum, idle float) |
| `burgerGeometry.js` | Procedural burger merged into one geometry with vertex colours: bottom bun, patty, cheese, lettuce, sesame bun |
| `layout.js` | Seeded rest positions along the diagonal wave, random size/rotation/tint |
| `usePointerTracker.js` | Mouse + touch tracking on `window`, so the canvas never blocks clicks |
| `quality.js` | 420 burgers on desktop, 240 on tablets, 140 on phones; shadows + depth of field on desktop only |

## Use it in a footer

```jsx
const BurgerField = lazy(() => import('./burger-field/BurgerField'));

<footer ref={footerRef} style={{ position: 'relative' }}>
  <div className="foot-scene">                      {/* position:absolute; inset:0; pointer-events:none */}
    <Suspense fallback={null}>
      <BurgerField areaRef={footerRef} visible={footerInView} reducedMotion={prefersReducedMotion} />
    </Suspense>
  </div>
  <div className="wrap" style={{ position: 'relative', zIndex: 1 }}>{/* existing footer content */}</div>
</footer>
```

See `components/footer/Footer.jsx` for the complete version (lazy-loaded when the footer is
800px away, wrapped in an error boundary in case WebGL is unavailable).

## Behaviour notes

- Performance: one draw call for all burgers; frame loop stops (`frameloop="never"`) while the
  footer is off screen; `PerformanceMonitor` drops shadows/depth of field if the frame rate falls.
- `prefers-reduced-motion`: the burgers render once, standing still, with no interaction.
- Tuning: change the `PHYSICS` constants at the top of `BurgerSwarm.jsx` (radius, push, spring…).
- A GLB model can replace the procedural burger: load it with `useGLTF`, merge its meshes into one
  geometry and pass it to `<instancedMesh args={[geometry, material, count]}>` instead of
  `buildBurgerGeometry()`.
