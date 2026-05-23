document.addEventListener("DOMContentLoaded", function () {

  /* ===== ESTILOS DO FOOTER ===== */
  const style = document.createElement("style");
  style.textContent = `
    footer {
      width: 100%;
      margin-top: auto;
    }

    .footer-divider-img img {
      width: 100%;
      display: block;
    }

    .footer-cloud {
      min-height: 64px;
      background-color: #b99fbb;
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 12px 20px;
    }

    .footer-socials {
      display: flex;
      gap: 12px;
      flex-wrap: wrap;
      justify-content: center;
      align-items: center;
    }

    .social-btn {
      all: unset;
      cursor: pointer;
      position: relative;
      border-radius: 100em;
      background-color: rgba(60, 20, 80, 0.75);
      box-shadow:
        -0.15em -0.15em 0.15em -0.075em rgba(5, 5, 5, 0.25),
        0.0375em 0.0375em 0.0675em 0 rgba(5, 5, 5, 0.1);
      text-decoration: none;
      display: inline-block;
      -webkit-tap-highlight-color: rgba(0,0,0,0);
    }

    .social-btn::after {
      content: "";
      position: absolute;
      z-index: 0;
      width: calc(100% + 0.3em);
      height: calc(100% + 0.3em);
      top: -0.15em;
      left: -0.15em;
      border-radius: inherit;
      background: linear-gradient(
        -135deg,
        rgba(5, 5, 5, 0.5),
        transparent 20%,
        transparent 100%
      );
      filter: blur(0.0125em);
      opacity: 0.25;
      mix-blend-mode: multiply;
    }

    .btn-outer {
      position: relative;
      z-index: 1;
      border-radius: inherit;
      transition: box-shadow 300ms ease;
      will-change: box-shadow;
      box-shadow:
        0 0.05em 0.05em -0.01em rgba(5, 5, 5, 1),
        0 0.01em 0.01em -0.01em rgba(5, 5, 5, 0.5),
        0.15em 0.3em 0.1em -0.01em rgba(5, 5, 5, 0.25);
    }

    .social-btn:hover .btn-outer {
      box-shadow:
        0 0 0 0 rgba(5, 5, 5, 1),
        0 0 0 0 rgba(5, 5, 5, 0.5),
        0 0 0 0 rgba(5, 5, 5, 0.25);
    }

    .btn-inner {
      position: relative;
      z-index: 1;
      border-radius: inherit;
      padding: 0.45em 1em;
      display: flex;
      align-items: center;
      gap: 6px;
      background-image: linear-gradient(
        135deg,
        rgba(210, 185, 230, 1),
        rgba(175, 140, 200, 1)
      );
      transition:
        box-shadow 300ms ease,
        clip-path 250ms ease,
        transform 250ms ease;
      will-change: box-shadow, clip-path, transform;
      overflow: clip;
      clip-path: inset(0 0 0 0 round 100em);
      box-shadow:
        0 0 0 0 inset rgba(5, 5, 5, 0.1),
        -0.05em -0.05em 0.05em 0 inset rgba(5, 5, 5, 0.25),
        0 0 0.05em 0.2em inset rgba(255, 255, 255, 0.25),
        0.025em 0.05em 0.1em 0 inset rgba(255, 255, 255, 1),
        0.12em 0.12em 0.12em inset rgba(255, 255, 255, 0.25),
        -0.075em -0.25em 0.25em 0.1em inset rgba(5, 5, 5, 0.25);
    }

    .social-btn:hover .btn-inner {
      clip-path: inset(
        clamp(1px, 0.0625em, 2px) clamp(1px, 0.0625em, 2px)
        clamp(1px, 0.0625em, 2px) clamp(1px, 0.0625em, 2px) round 100em
      );
      box-shadow:
        0.1em 0.15em 0.05em 0 inset rgba(5, 5, 5, 0.75),
        -0.025em -0.03em 0.05em 0.025em inset rgba(5, 5, 5, 0.5),
        0.25em 0.25em 0.2em 0 inset rgba(5, 5, 5, 0.5),
        0 0 0.05em 0.5em inset rgba(255, 255, 255, 0.15),
        0 0 0 0 inset rgba(255, 255, 255, 1),
        0.12em 0.12em 0.12em inset rgba(255, 255, 255, 0.25),
        -0.075em -0.12em 0.2em 0.1em inset rgba(5, 5, 5, 0.25);
    }

    .social-btn:active .btn-inner {
      transform: scale(0.975);
    }

    .btn-inner svg {
      width: 14px;
      height: 14px;
      flex-shrink: 0;
      color: #2e1040;
      position: relative;
      z-index: 4;
    }

    .btn-inner span {
      position: relative;
      z-index: 4;
      font-family: 'Georgia', serif;
      font-size: 0.72rem;
      font-weight: 600;
      letter-spacing: 0.02em;
      color: rgba(0, 0, 0, 0);
      background-image: linear-gradient(
        135deg,
        rgba(46, 16, 64, 1),
        rgba(90, 40, 110, 1)
      );
      -webkit-background-clip: text;
      background-clip: text;
      transition: transform 250ms ease;
      display: block;
      will-change: transform;
      user-select: none;
    }

    .social-btn:hover .btn-inner span {
      transform: scale(0.975);
    }

    @media (max-width: 600px) {
      .footer-socials {
        gap: 8px;
      }
    }
  `;
  document.head.appendChild(style);

  /* ===== HTML DO FOOTER ===== */
  const footer = document.createElement("footer");
  footer.innerHTML = `
    <div class="footer-divider-img">
      <img src="https://64.media.tumblr.com/3f968d458084d2b7077c7934760124b2/f50c2545301372c0-a8/s540x810/3f709c4853b9fb3d04617c83eba46e45b2ff8019.gif">
    </div>
    <div class="footer-cloud">
      <div class="footer-socials">
        <a href="https://www.tumblr.com/blog/i-am--fat-blog" class="social-btn" target="_blank">
          <div class="btn-outer"><div class="btn-inner">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M14.563 24c-5.093 0-7.031-3.756-7.031-6.411V9.747H5.116V6.648c3.63-1.313 4.512-4.596 4.71-6.469C9.84.051 9.941 0 9.999 0h3.517v6.114h4.801v3.633h-4.82v7.47c.016 1.001.375 2.371 2.207 2.371h.09c.631-.02 1.486-.205 1.936-.419l1.156 3.425c-.436.636-2.4 1.374-4.304 1.406z"/></svg>
            <span>Tumblr</span>
          </div></div>
        </a>
        <a href="https://www.wattpad.com/user/Im_Aye55" class="social-btn" target="_blank">
          <div class="btn-outer"><div class="btn-inner">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M4 4l2.6 9.6L8.9 7h2.2l2.3 6.6L15.6 4H20l-5 16-2.7-7.8L9.9 20 5 4z"/></svg>
            <span>Wattpad</span>
          </div></div>
        </a>
        <a href="https://www.instagram.com/ayelen.borges/" class="social-btn" target="_blank">
          <div class="btn-outer"><div class="btn-inner">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
            <span>Instagram</span>
          </div></div>
        </a>
      </div>
    </div>
  `;
  document.body.appendChild(footer);

});
