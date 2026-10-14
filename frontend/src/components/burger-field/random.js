/** Small seeded PRNG so the layout and burger details are identical on every visit. */
export function createRandom(seed = 1) {
  let state = seed >>> 0;
  return function random() {
    state = (state + 0x6d2b79f5) >>> 0;
    let t = state;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** Roughly normal-distributed value in about [-1, 1]. */
export function gaussian(random) {
  return (random() + random() + random() - 1.5) / 1.5;
}
