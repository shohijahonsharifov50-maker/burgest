import { createRandom, gaussian } from './random';

/** Share of burgers placed loosely across the whole footer instead of along the wave. */
const SCATTER_SHARE = 0.12;

/**
 * Rest positions for every burger: a diagonal wave from bottom-left to top-right of the visible
 * area (in world units at z = 0), plus a light scatter. Typed arrays keep the per-frame loop fast.
 */
export function createBurgerLayout(count, width, height) {
  const random = createRandom(2026);
  const home = new Float32Array(count * 3);
  const rotation = new Float32Array(count * 3);
  const scale = new Float32Array(count);
  const phase = new Float32Array(count);
  const tint = new Float32Array(count);

  for (let i = 0; i < count; i += 1) {
    const u = random();
    const x = (u - 0.5) * width * 1.1;
    let y;
    if (random() < SCATTER_SHARE) {
      y = (random() - 0.5) * height;
    } else {
      const wave = (u - 0.5) * height * 0.62 + Math.sin(u * Math.PI * 2.4 + 0.6) * height * 0.13;
      const thickness = height * 0.11 * (0.65 + 0.35 * Math.sin(u * 9));
      y = wave + gaussian(random) * thickness;
    }

    home[i * 3] = x;
    home[i * 3 + 1] = y;
    home[i * 3 + 2] = -2.8 + random() * 3.6;

    rotation[i * 3] = (random() - 0.5) * 1.6;
    rotation[i * 3 + 1] = random() * Math.PI * 2;
    rotation[i * 3 + 2] = (random() - 0.5) * 1.2;

    scale[i] = 0.11 + random() ** 2 * 0.16;
    phase[i] = random() * Math.PI * 2;
    tint[i] = 0.82 + random() * 0.26;
  }

  return { count, home, rotation, scale, phase, tint };
}
