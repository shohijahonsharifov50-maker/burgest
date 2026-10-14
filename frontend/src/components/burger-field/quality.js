/** Picks how many burgers and which effects the device can comfortably run. */
export function pickQuality() {
  const width = window.innerWidth;
  const coarsePointer = window.matchMedia('(pointer: coarse)').matches;
  const cores = navigator.hardwareConcurrency ?? 4;

  if (width < 640) return { count: 140, dpr: [1, 1.5], shadows: false, depthOfField: false };
  if (width < 1024 || coarsePointer || cores <= 4) return { count: 240, dpr: [1, 1.5], shadows: false, depthOfField: false };
  return { count: 420, dpr: [1, 2], shadows: true, depthOfField: true };
}
