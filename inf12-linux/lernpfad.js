/**
 * Informatik 12 · Betriebssysteme · Lernpfad
 * lernpfad.js – gemeinsame JavaScript-Funktionen
 */

'use strict';

/* ── Fortschritts-Tracking ─────────────────────────────────────────────────
 * Speichert, welche Lernpakete der Nutzer bereits besucht hat,
 * und markiert besuchte LP-Buttons in der Navbar optisch.
 */
(function trackProgress() {
  const LP_KEY = 'lernpfad_visited';

  function getVisited() {
    try { return JSON.parse(localStorage.getItem(LP_KEY) || '[]'); }
    catch { return []; }
  }

  function markCurrentVisited() {
    const page  = location.pathname.split('/').pop();
    const match = page.match(/Lernpaket_(\d)/);
    if (!match) return;
    const visited = getVisited();
    const n = match[1];
    if (!visited.includes(n)) {
      visited.push(n);
      localStorage.setItem(LP_KEY, JSON.stringify(visited));
    }
  }

  function applyVisitedStyles() {
    const visited = getVisited();
    document.querySelectorAll('.nav-btn').forEach(btn => {
      const href = btn.getAttribute('href') || '';
      const m    = href.match(/Lernpaket_(\d)/);
      if (m && visited.includes(m[1]) && !btn.classList.contains('active')) {
        btn.style.opacity = '0.6';
        btn.title = 'bereits besucht';
      }
    });
  }

  document.addEventListener('DOMContentLoaded', () => {
    markCurrentVisited();
    applyVisitedStyles();
  });
})();


/* ── Keyboard-Navigation ───────────────────────────────────────────────────
 * Pfeiltasten links/rechts navigieren zwischen Lernpaketen.
 */
(function keyboardNav() {
  document.addEventListener('keydown', e => {
    if (e.altKey || e.ctrlKey || e.metaKey) return;
    const arrows = document.querySelectorAll('.nav-arrow');
    if (e.key === 'ArrowLeft'  && arrows[0]) location.href = arrows[0].href;
    if (e.key === 'ArrowRight' && arrows[1]) location.href = arrows[1].href;
  });
})();


/* ── Smooth-scroll to top on logo click ────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.nav-home').forEach(el => {
    el.addEventListener('click', e => {
      if (el.href && el.href.includes('index.html')) return; // normal link
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  });
});
