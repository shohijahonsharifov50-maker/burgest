/** localStorage that never throws (private mode, blocked storage). */
export const storage = {
  get(key) {
    try { return window.localStorage.getItem(key); } catch { return null; }
  },
  set(key, value) {
    try { window.localStorage.setItem(key, value); } catch { /* ignore */ }
  },
};

/** sessionStorage variant, used for the admin login that should end with the tab. */
export const sessionStore = {
  get(key) {
    try { return window.sessionStorage.getItem(key); } catch { return null; }
  },
  set(key, value) {
    try { window.sessionStorage.setItem(key, value); } catch { /* ignore */ }
  },
  remove(key) {
    try { window.sessionStorage.removeItem(key); } catch { /* ignore */ }
  },
};
