import { gsap, ScrollTrigger, useGSAP } from './gsap';

/** Page colours per section. The whole page morphs between them as sections reach mid-screen. */
const THEMES = {
  dark: { '--bg': '#000000', '--fg': '#FFFFFF', '--fg-dim': 'rgba(255,255,255,.62)', '--line': 'rgba(255,255,255,.16)' },
  red: { '--bg': '#E3261C', '--fg': '#FFFFFF', '--fg-dim': 'rgba(255,255,255,.78)', '--line': 'rgba(255,255,255,.3)' },
  teal: { '--bg': '#24434A', '--fg': '#FFFFFF', '--fg-dim': 'rgba(255,255,255,.7)', '--line': 'rgba(255,255,255,.18)' },
  paper: { '--bg': '#FBFAF8', '--fg': '#141414', '--fg-dim': 'rgba(20,20,20,.62)', '--line': 'rgba(20,20,20,.14)' },
};

/** Sections declare their colours with data-theme-section="dark|red|teal|paper". */
export function useSectionThemes(scopeRef, { enabled }) {
  useGSAP(() => {
    if (!enabled) return;
    const root = document.documentElement;
    let current = root.dataset.theme || 'dark';

    const apply = (name) => {
      if (name === current || !THEMES[name]) return;
      current = name;
      root.dataset.theme = name;
      gsap.to(root, { ...THEMES[name], duration: 0.6, ease: 'power2.out', overwrite: 'auto' });
    };

    scopeRef.current.querySelectorAll('[data-theme-section]').forEach((section) => {
      ScrollTrigger.create({
        trigger: section,
        start: 'top 55%',
        end: 'bottom 55%',
        onToggle: (self) => self.isActive && apply(section.dataset.themeSection),
      });
    });
  }, { scope: scopeRef, dependencies: [enabled] });
}
