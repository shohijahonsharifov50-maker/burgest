import { useEffect, useRef } from 'react';

/**
 * Follows the mouse or finger relative to `areaRef` in normalised device coordinates (-1…1).
 * Listens on window, so the canvas can stay `pointer-events: none` and never blocks footer links.
 */
export function usePointerTracker(areaRef, { enabled = true } = {}) {
  const pointer = useRef({ x: 0, y: 0, inside: false, lastMoveAt: 0 });

  useEffect(() => {
    if (!enabled) return undefined;

    const update = (clientX, clientY) => {
      const area = areaRef.current;
      if (!area) return;
      const rect = area.getBoundingClientRect();
      const state = pointer.current;
      state.x = ((clientX - rect.left) / rect.width) * 2 - 1;
      state.y = -(((clientY - rect.top) / rect.height) * 2 - 1);
      state.inside = clientX >= rect.left && clientX <= rect.right && clientY >= rect.top && clientY <= rect.bottom;
      state.lastMoveAt = performance.now();
    };

    const onPointer = (event) => update(event.clientX, event.clientY);
    const onTouch = (event) => {
      const touch = event.touches[0];
      if (touch) update(touch.clientX, touch.clientY);
    };
    const onLeave = () => { pointer.current.inside = false; };

    window.addEventListener('pointermove', onPointer, { passive: true });
    window.addEventListener('pointerdown', onPointer, { passive: true });
    window.addEventListener('touchstart', onTouch, { passive: true });
    window.addEventListener('touchmove', onTouch, { passive: true });
    window.addEventListener('touchend', onLeave, { passive: true });
    document.documentElement.addEventListener('pointerleave', onLeave);

    return () => {
      window.removeEventListener('pointermove', onPointer);
      window.removeEventListener('pointerdown', onPointer);
      window.removeEventListener('touchstart', onTouch);
      window.removeEventListener('touchmove', onTouch);
      window.removeEventListener('touchend', onLeave);
      document.documentElement.removeEventListener('pointerleave', onLeave);
    };
  }, [areaRef, enabled]);

  return pointer;
}
