// lib/theme.ts

import type { Theme } from './store/slices/themeSlice';

/** localStorage key — must match themeSlice.ts. */
export const THEME_STORAGE_KEY = 'safari-spares-theme';

/**
 * Inline script injected into <head>. Runs before React hydrates and
 * sets `.dark` on <html>.
 *
 * Safari Spares is dark-first: the app is dark regardless of the user's
 * OS preference. We keep the `.dark` class on <html> so shadcn/ui tokens
 * resolve correctly, and to allow a future light mode override.
 *
 * Wrapped in try/catch because localStorage can throw in private mode.
 */
export const THEME_INIT_SCRIPT = `
(function(){
  try {
    var root = document.documentElement;
    root.classList.add('dark');
    // Persist the theme so a future light-mode toggle can read it.
    try { localStorage.setItem('${THEME_STORAGE_KEY}', 'dark'); } catch (e) {}
  } catch (e) {}
})();
`.trim();

/** Convenience type for anywhere else that needs the union. */
export type { Theme };