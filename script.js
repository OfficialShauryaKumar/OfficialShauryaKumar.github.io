// Hero waveform: bars shaped like the syllables of "Hi, I'm Shaurya Kumar",
// printed in pink over the name. It sweeps in once on load; with reduced
// motion it is simply there.

(() => {
  const svg = document.getElementById('wave');
  if (!svg) return;

  const BARS = 120;
  const W = 960, H = 200, GAP = 2;
  const barW = W / BARS - GAP;

  // One bump per syllable: hi · i'm · shau · rya · ku · mar (centre, width, height).
  const syllables = [[0.07, 0.04, 0.55], [0.17, 0.04, 0.5], [0.33, 0.07, 1], [0.47, 0.05, 0.72], [0.66, 0.06, 0.85], [0.82, 0.08, 0.95]];
  // Small deterministic noise so the shape is the same on every visit.
  let seed = 7;
  const rand = () => ((seed = (seed * 16807) % 2147483647) / 2147483647);

  const bars = [];
  for (let i = 0; i < BARS; i++) {
    const t = i / (BARS - 1);
    const env = Math.max(0.04, ...syllables.map(([c, w, h]) => h * Math.exp(-((t - c) ** 2) / (2 * w * w))));
    const amp = Math.min(1, env * (0.7 + 0.3 * rand()));
    const bh = Math.max(4, amp * H * 0.96);
    const x = i * (barW + GAP) + GAP / 2;
    bars.push(`<rect x="${x.toFixed(1)}" y="${((H - bh) / 2).toFixed(1)}" width="${barW.toFixed(1)}" height="${bh.toFixed(1)}" rx="${(barW / 2).toFixed(1)}"/>`);
  }
  svg.innerHTML = bars.join('');
  // Set through the CSSOM: the page's Content-Security-Policy blocks inline style attributes.
  svg.querySelectorAll('rect').forEach((rect, i) => rect.style.setProperty('--i', i));

  if (!matchMedia('(prefers-reduced-motion: reduce)').matches) svg.classList.add('is-live');
})();
