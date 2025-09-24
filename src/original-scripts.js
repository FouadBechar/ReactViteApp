// original-scripts.js — minimal shim (clean overwrite)
// This file is intentionally minimal and syntactically valid.

(function () {
  'use strict';

  // Register service worker if available (best-effort)
  try {
    if (typeof navigator !== 'undefined' && 'serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js').catch(() => {});
    }
  } catch (e) {
    // ignore
  }

  // Small helper that replaces document.write overlay usage
  function injectLegacyOverlay(cssText, html) {
    try {
      const style = document.createElement('style');
      style.type = 'text/css';
      if (style.styleSheet) style.styleSheet.cssText = cssText;
      else style.appendChild(document.createTextNode(cssText));
      (document.head || document.documentElement).appendChild(style);

      const box = document.createElement('div');
      box.className = 'full-warning';
      box.innerHTML = html;
      const append = () => (document.body || document.documentElement).appendChild(box);
      if (document.readyState === 'loading') append();
      else if (document.readyState === 'interactive' || document.readyState === 'complete') append();
      else document.addEventListener('DOMContentLoaded', append, { once: true });
    } catch (err) {
      // ignore
    }
  }

  // Expose a tiny API for later incremental reintroduction of legacy behaviors
  try {
    window.__legacy = window.__legacy || {};
    window.__legacy.injectLegacyOverlay = injectLegacyOverlay;
  } catch (e) {
    // ignore
  }
})();
