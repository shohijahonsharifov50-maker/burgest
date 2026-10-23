/** Base address of the API. Empty means "same origin" (the Vite dev proxy handles /api). */
export const API_BASE_URL = (import.meta.env.VITE_API_URL ?? '').replace(/\/$/, '');

export const CONTACTS = {
  telegramBot: 'https://t.me/Burgestauz_bot',
  telegramHandle: '@Burgestauz_bot',
  instagram: 'https://instagram.com/burgesta',
  instagramHandle: '@burgesta',
  phoneHref: 'tel:+998555081818',
  phoneLabel: '+998 55 508 18 18',
  directions: 'https://maps.app.goo.gl/c62HkPpGzkd4RgHV9',
  /** Pin at the restaurant entrance, matching Google's verified location for this listing. */
  mapLat: 41.3315383,
  mapLng: 69.2845747,
};

/** Frames of the burger film: a 360° orbit followed by the exploded view. */
export const BURGER_FILM = {
  orbitFrames: 97,
  explodeFrames: 97,
  desktopPath: '/seq',
  mobilePath: '/seq-m',
};

export const BRAND_WORD = 'BURGESTA';
