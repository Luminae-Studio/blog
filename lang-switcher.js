/* ── Mapeamento PT ↔ ES (escopo global) ─────────────────────────────── */
const PAIRS = [
  ["alma.html",                      "alma-es.html"                     ],
  ["manchita.html",                  "manchita-es.html"                 ],
  ["fragmentos/2025/julio.html",     "fragmentos/2025/julio-es.html"    ],
  ["fragmentos/2025/agosto.html",    "fragmentos/2025/agosto-es.html"   ],
  ["fragmentos/2025/setembro.html",  "fragmentos/2025/septiembre-es.html"],
  ["fragmentos/2025/outubro.html",   "fragmentos/2025/octubre-es.html"  ],
  ["fragmentos/2025/novembro.html",  "fragmentos/2025/noviembre-es.html"],
  ["fragmentos/2025/dezembro.html",  "fragmentos/2025/diciembre-es.html"],
  ["fragmentos/2026/janeiro.html",   "fragmentos/2026/enero-es.html"    ],
  ["fragmentos/2026/fevereiro.html", "fragmentos/2026/febrero-es.html"  ],
  ["fragmentos/2026/marco.html",     "fragmentos/2026/marzo-es.html"    ],
  ["fragmentos/2026/abril.html",                        "fragmentos/2026/abril-es.html"                       ],
  ["em-disputa.html",                                   "em-disputa-es.html"                                  ],
  ["disputa/mundial-de-escritura/index.html",           "disputa/mundial-de-escritura/index-es.html"          ],
];

/* Retorna a URL de destino para o idioma pedido, ou null se a página
   não tiver par registrado. Usa path.endsWith para ser independente
   do prefixo de deploy (/blog/, /, etc.). */
function getTarget(lang) {
  const path = window.location.pathname;
  for (const [pt, es] of PAIRS) {
    if (lang === "es" && path.endsWith(pt))
      return path.slice(0, -pt.length) + es;
    if (lang === "pt" && path.endsWith(es))
      return path.slice(0, -es.length) + pt;
  }
  return null;
}

/* ── Redirecionamento automático (executa imediatamente) ─────────────── */
(function () {
  const lang = localStorage.getItem("luminae-lang");
  if (lang !== "pt" && lang !== "es") return;
  const target = getTarget(lang);
  if (target) window.location.replace(target);
})();

/* ── Seletor visual (aguarda DOM) ────────────────────────────────────── */
document.addEventListener("DOMContentLoaded", function () {

  /* Troca o idioma:
     - Se há par registrado → salva no localStorage e navega para o par.
     - Se não há par → chama setLang() que salva + recarrega a mesma página.
     - Se já está no idioma pedido → não faz nada. */
  function switchLang(lang) {
    const current = (typeof getLang === "function") ? getLang() : null;
    if (current === lang) return;

    const target = getTarget(lang);
    if (target) {
      localStorage.setItem("luminae-lang", lang);
      window.location.href = target;
    } else {
      if (typeof setLang === "function") setLang(lang);
    }
  }

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
      /* Geometria */
      width: 40px;
      height: 40px;
      border-radius: 50%;
      padding: 0;
      border: none;
      cursor: pointer;
      outline: none;
      -webkit-tap-highlight-color: rgba(0,0,0,0);

      /* Layout */
      position: relative;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      font-size: 20px;
      line-height: 1;

      /* Gradiente lilás — idêntico ao btn-inner */
      background-image: linear-gradient(
        135deg,
        rgba(210, 185, 230, 1),
        rgba(175, 140, 200, 1)
      );

      /* Clip circular — contém o efeito de relevo */
      clip-path: inset(0 0 0 0 round 50%);

      /* Sombras externas (btn-outer) + inset glassy (btn-inner) */
      box-shadow:
        0 0.05em 0.05em -0.01em rgba(5, 5, 5, 1),
        0 0.01em 0.01em -0.01em rgba(5, 5, 5, 0.5),
        0.15em 0.3em 0.1em -0.01em rgba(5, 5, 5, 0.25),
        inset 0 0 0 0 rgba(5, 5, 5, 0.1),
        inset -0.05em -0.05em 0.05em 0 rgba(5, 5, 5, 0.25),
        inset 0 0 0.05em 0.2em rgba(255, 255, 255, 0.25),
        inset 0.025em 0.05em 0.1em 0 rgba(255, 255, 255, 1),
        inset 0.12em 0.12em 0.12em rgba(255, 255, 255, 0.25),
        inset -0.075em -0.25em 0.25em 0.1em rgba(5, 5, 5, 0.25);

      /* Transições */
      transition:
        opacity 200ms ease,
        box-shadow 300ms ease,
        clip-path 250ms ease,
        transform 250ms ease;
      will-change: opacity, box-shadow, clip-path, transform;
    }

    /* Ativo: efeito pressionado fixo */
    .lang-btn.active {
      opacity: 1;
      clip-path: inset(
        clamp(1px, 0.0625em, 2px)
        clamp(1px, 0.0625em, 2px)
        clamp(1px, 0.0625em, 2px)
        clamp(1px, 0.0625em, 2px)
        round 50%
      );
      box-shadow:
        0 0 0 0 rgba(5, 5, 5, 1),
        0 0 0 0 rgba(5, 5, 5, 0.5),
        0 0 0 0 rgba(5, 5, 5, 0.25),
        inset 0.1em 0.15em 0.05em 0 rgba(5, 5, 5, 0.75),
        inset -0.025em -0.03em 0.05em 0.025em rgba(5, 5, 5, 0.5),
        inset 0.25em 0.25em 0.2em 0 rgba(5, 5, 5, 0.5),
        inset 0 0 0.05em 0.5em rgba(255, 255, 255, 0.15),
        inset 0 0 0 0 rgba(255, 255, 255, 1),
        inset 0.12em 0.12em 0.12em rgba(255, 255, 255, 0.25),
        inset -0.075em -0.12em 0.2em 0.1em rgba(5, 5, 5, 0.25);
    }

    /* Hover não-ativo: efeito pressionado igual ao social-btn:hover .btn-inner */
    .lang-btn:hover:not(.active) {
      clip-path: inset(
        clamp(1px, 0.0625em, 2px)
        clamp(1px, 0.0625em, 2px)
        clamp(1px, 0.0625em, 2px)
        clamp(1px, 0.0625em, 2px)
        round 50%
      );
      box-shadow:
        0 0 0 0 rgba(5, 5, 5, 1),
        0 0 0 0 rgba(5, 5, 5, 0.5),
        0 0 0 0 rgba(5, 5, 5, 0.25),
        inset 0.1em 0.15em 0.05em 0 rgba(5, 5, 5, 0.75),
        inset -0.025em -0.03em 0.05em 0.025em rgba(5, 5, 5, 0.5),
        inset 0.25em 0.25em 0.2em 0 rgba(5, 5, 5, 0.5),
        inset 0 0 0.05em 0.5em rgba(255, 255, 255, 0.15),
        inset 0 0 0 0 rgba(255, 255, 255, 1),
        inset 0.12em 0.12em 0.12em rgba(255, 255, 255, 0.25),
        inset -0.075em -0.12em 0.2em 0.1em rgba(5, 5, 5, 0.25);
    }

    /* Clique: escala reduzida igual ao social-btn:active .btn-inner */
    .lang-btn:active {
      transform: scale(0.975);
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
    switchLang("pt");
  });

  document.getElementById("lang-btn-es").addEventListener("click", function () {
    switchLang("es");
  });

});
