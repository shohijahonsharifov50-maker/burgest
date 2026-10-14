/**
 * Draws one frame of a pre-rendered image sequence onto a canvas ("cover" fit).
 * Frames load coarse-to-fine (every 8th, then every 4th…) so scrubbing works before everything arrives.
 */
export function createFrameSequence(canvas, { totalFrames, segments, frameUrl }) {
  const ctx = canvas.getContext('2d');
  const images = new Array(totalFrames);
  let loaded = 0;
  let drawnIndex = -1;
  let targetIndex = 0;
  let disposed = false;

  const isReady = (img) => img && img.complete && img.naturalWidth > 0;

  function nearestLoaded(index) {
    if (isReady(images[index])) return images[index];
    for (let distance = 1; distance < totalFrames; distance += 1) {
      if (isReady(images[index - distance])) return images[index - distance];
      if (isReady(images[index + distance])) return images[index + distance];
    }
    return null;
  }

  function draw(index) {
    targetIndex = index;
    if (index === drawnIndex) return;
    const img = nearestLoaded(index);
    if (!img) return;

    const { width: cw, height: ch } = canvas;
    const portrait = ch > cw * 1.05;
    // On tall screens the burger is enlarged and the frame edges fade into black.
    const scale = portrait
      ? Math.max((cw / img.naturalWidth) * 1.55, (ch / img.naturalHeight) * 0.6)
      : Math.max(cw / img.naturalWidth, ch / img.naturalHeight);
    const w = img.naturalWidth * scale;
    const h = img.naturalHeight * scale;
    const x = (cw - w) / 2;
    const y = (ch - h) / 2 + (portrait ? ch * 0.04 : 0);

    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, cw, ch);
    ctx.drawImage(img, x, y, w, h);
    if (portrait) fadeEdges(ctx, cw, y, h);
    if (img === images[index]) drawnIndex = index;
  }

  function resize() {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.round(canvas.clientWidth * dpr);
    canvas.height = Math.round(canvas.clientHeight * dpr);
    drawnIndex = -1;
    draw(targetIndex);
  }

  function loadOrder() {
    const order = [];
    const seen = new Set();
    for (const [start, end] of segments) {
      for (const step of [8, 4, 2, 1]) {
        for (let k = start; k < end; k += step) {
          if (!seen.has(k)) { seen.add(k); order.push(k); }
        }
      }
    }
    return order;
  }

  function load(onProgress) {
    const order = loadOrder();
    let next = 0;
    return new Promise((resolve) => {
      const loadNext = () => {
        if (disposed || next >= order.length) return;
        const index = order[next++];
        const img = new Image();
        img.decoding = 'async';
        img.onload = img.onerror = () => {
          if (disposed) return;
          loaded += 1;
          onProgress?.(loaded / totalFrames);
          if (drawnIndex === -1 || Math.abs(index - targetIndex) < 3) { drawnIndex = -1; draw(targetIndex); }
          if (loaded === totalFrames) resolve(); else loadNext();
        };
        img.src = frameUrl(index);
        images[index] = img;
      };
      for (let lane = 0; lane < 6; lane += 1) loadNext();
    });
  }

  window.addEventListener('resize', resize);
  resize();

  return {
    draw,
    load,
    dispose() {
      disposed = true;
      window.removeEventListener('resize', resize);
    },
  };
}

function fadeEdges(ctx, width, top, height) {
  const fade = height * 0.2;
  let gradient = ctx.createLinearGradient(0, top, 0, top + fade);
  gradient.addColorStop(0, '#000');
  gradient.addColorStop(1, 'rgba(0,0,0,0)');
  ctx.fillStyle = gradient;
  ctx.fillRect(0, top - 1, width, fade + 1);
  gradient = ctx.createLinearGradient(0, top + height - fade, 0, top + height);
  gradient.addColorStop(0, 'rgba(0,0,0,0)');
  gradient.addColorStop(1, '#000');
  ctx.fillStyle = gradient;
  ctx.fillRect(0, top + height - fade, width, fade + 1);
}
