(function () {
  const STORAGE_KEY = "luminae-lang";
  const SUPPORTED   = ["pt", "es"];
  const FALLBACK    = "pt";

  /* ── 1. Detecta idioma do navegador ─────────────────────────────── */
  function detectBrowserLang() {
    const raw = (navigator.language || navigator.userLanguage || "").toLowerCase();
    // Aceita "es", "es-ar", "es-mx", etc.
    if (raw.startsWith("es")) return "es";
    return FALLBACK;
  }

  /* ── 2. Lê preferência salva ou detecta pelo navegador ──────────── */
  function resolveLang() {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved && SUPPORTED.includes(saved)) return saved;
    return detectBrowserLang();
  }

  /* ── 3. Inicializa: garante que sempre haja um valor no storage ──── */
  const currentLang = resolveLang();
  localStorage.setItem(STORAGE_KEY, currentLang);

  /* ── 4. getLang() ────────────────────────────────────────────────── */
  window.getLang = function () {
    return localStorage.getItem(STORAGE_KEY) || FALLBACK;
  };

  /* ── 5. setLang(lang) ────────────────────────────────────────────── */
  window.setLang = function (lang) {
    if (!SUPPORTED.includes(lang)) {
      console.warn("[i18n] Idioma não suportado:", lang, "— use: pt, es");
      return;
    }
    localStorage.setItem(STORAGE_KEY, lang);
    location.reload();
  };

})();
