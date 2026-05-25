document.addEventListener("DOMContentLoaded", function () {

  /* ── Estilos ─────────────────────────────────────────────────────── */
  const style = document.createElement("style");
  style.textContent = `
    #lang-switcher {
      position: fixed;
      top: 16px;
      right: 16px;
      z-index: 9999;
      display: flex;
      gap: 8px;
      align-items: center;
    }

    .lang-btn {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      border: 2px solid #b99fbb;
      background: transparent;
      cursor: pointer;
      font-size: 20px;
      line-height: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      opacity: 0.5;
      transition: opacity 200ms ease, background-color 200ms ease;
      padding: 0;
      outline: none;
      -webkit-tap-highlight-color: rgba(0,0,0,0);
    }

    .lang-btn.active {
      background-color: #2e1040;
      opacity: 1;
    }

    .lang-btn:hover:not(.active) {
      opacity: 0.75;
    }

    @media (max-width: 600px) {
      .lang-btn {
        width: 32px;
        height: 32px;
        font-size: 16px;
      }
    }
  `;
  document.head.appendChild(style);

  /* ── HTML ────────────────────────────────────────────────────────── */
  const switcher = document.createElement("div");
  switcher.id = "lang-switcher";
  switcher.innerHTML = `
    <button class="lang-btn" id="lang-btn-pt" title="Português" aria-label="Mudar para Português">🇧🇷</button>
    <button class="lang-btn" id="lang-btn-es" title="Español"   aria-label="Cambiar a Español">🇦🇷</button>
  `;
  document.body.appendChild(switcher);

  /* ── Estado inicial ──────────────────────────────────────────────── */
  function applyActive() {
    const lang = (typeof getLang === "function") ? getLang() : "pt";
    document.getElementById("lang-btn-pt").classList.toggle("active", lang === "pt");
    document.getElementById("lang-btn-es").classList.toggle("active", lang === "es");
  }

  applyActive();

  /* ── Eventos ─────────────────────────────────────────────────────── */
  document.getElementById("lang-btn-pt").addEventListener("click", function () {
    if (typeof setLang === "function") setLang("pt");
  });

  document.getElementById("lang-btn-es").addEventListener("click", function () {
    if (typeof setLang === "function") setLang("es");
  });

});
