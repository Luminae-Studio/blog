// FOLHA A FOLHA - script.js

function calcularPorFileira() { return window.innerWidth < 600 ? 4 : 20; }

var livros = [];
var livroAtual = null;

document.addEventListener('DOMContentLoaded', function() {
  var estanteGrid       = document.getElementById('estante-grid');
  var overlay           = document.getElementById('overlay');
  var livroAbertoEl     = document.getElementById('livro-aberto');
  var capafrenteEl      = document.getElementById('livro-capa-frente');
  var paginasAbertasEl  = document.getElementById('paginas-abertas');
  var btnFechar         = document.getElementById('btn-fechar');
  var filtros           = document.querySelectorAll('.filtro-btn');
  var fichaCapaMini     = document.getElementById('ficha-capa-mini');
  var fichaTitulo       = document.getElementById('ficha-titulo');
  var fichaAutor        = document.getElementById('ficha-autor');
  var fichaPaginas      = document.getElementById('ficha-paginas');
  var fichaIdioma       = document.getElementById('ficha-idioma');
  var fichaEstrelas     = document.getElementById('ficha-estrelas');
  var fichaAnotacao     = document.getElementById('ficha-anotacao');
  var fichaFrase        = document.getElementById('ficha-frase');
  var reviewIframe      = document.getElementById('review-iframe');
  var reviewLoading     = document.getElementById('review-loading');
  var capaTituloAnim    = document.getElementById('capa-titulo-anim');
  var capaAutorAnim     = document.getElementById('capa-autor-anim');
  var btnSobre          = document.getElementById('btn-sobre');
  var modalOverlay      = document.getElementById('modal-sobre-overlay');
  var btnFecharSobre    = document.getElementById('modal-fechar-sobre');

  // ---------- helpers ----------
  function capitalizar(str) {
    if (!str) return '';
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  function esc(hex, f) {
    var h = (hex || '#333').replace('#','');
    if (h.length !== 6) return '#333';
    var r = parseInt(h.slice(0,2),16);
    var g = parseInt(h.slice(2,4),16);
    var b = parseInt(h.slice(4,6),16);
    return 'rgb('+Math.floor(r*f)+','+Math.floor(g*f)+','+Math.floor(b*f)+')';
  }
  function glombada(c) { return 'linear-gradient(to right,'+esc(c,.62)+' 0%,'+c+' 25%,'+c+' 75%,'+esc(c,.78)+' 100%)'; }
  function gcapa(c)    { return 'linear-gradient(145deg,'+esc(c,.55)+' 0%,'+c+' 50%,'+esc(c,.75)+' 100%)'; }
  function ht(s) { return (s||'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/\n/g,'<br>'); }

  // ---------- renderizar ----------
  function renderizar(lista) {
    estanteGrid.innerHTML = '';
    if (!lista.length) return;
    var pf = calcularPorFileira();
    for (var i = 0; i < lista.length; i += pf) {
      estanteGrid.appendChild(criarFileira(lista.slice(i, i+pf), i));
    }
  }

  function criarFileira(grupo, off) {
    var fil = document.createElement('div');
    fil.className = 'estante-fileira';
    var ld = document.createElement('div');
    ld.className = 'fileira-livros';
    for (var i = 0; i < grupo.length; i++) ld.appendChild(criarLivro(grupo[i], off+i));
    var base = document.createElement('div');
    base.className = 'prateleira-base';
    fil.appendChild(ld);
    fil.appendChild(base);
    return fil;
  }

  function criarLivro(livro, idx) {
    var s   = idx * 137.508;
    var alt = 200 + ((s*7.3)%80);
    var lar = 48  + ((s*3.1)%16);
    var inc = ((s*2.9)%7) - 3.5;
    var mk  = ((s*4.7)%4) > 2.8;

    var w = document.createElement('div');
    w.className = 'livro';
    w.style.minWidth = lar+'px'; w.style.width = lar+'px';
    w.style.height = alt+'px';
    w.style.transform = 'rotate('+inc+'deg)';
    w.style.animationDelay = ((idx%12)*0.045)+'s';

    (function(i){ 
      w.addEventListener('mouseenter', function(){ this.style.transform='rotate('+i+'deg) translateY(-14px)'; this.style.zIndex='10'; });
      w.addEventListener('mouseleave', function(){ this.style.transform='rotate('+i+'deg) translateY(0)'; this.style.zIndex=''; });
    })(inc);

    var lom = document.createElement('div');
    lom.className = 'livro-lombada';
    lom.style.background = glombada(livro.cor);

    var tit = document.createElement('span'); tit.className='lombada-titulo'; tit.textContent=livro.titulo;
    var aut = document.createElement('span'); aut.className='lombada-autor';  aut.textContent=(livro.autor||'').split('/')[0].trim();
    lom.appendChild(tit); lom.appendChild(aut); w.appendChild(lom);

    if (mk) {
      var m = document.createElement('div'); m.className='livro-marca';
      m.style.background=['#7a4a3a','#3a5a4a','#4a3a6a','#6a5a2a','#5a2a4a'][idx%5];
      w.appendChild(m);
    }

    var fr = document.createElement('div'); fr.className='livro-frase-hover'; fr.textContent=livro.frase||'';
    w.appendChild(fr);

    (function(l){ w.addEventListener('click', function(){ abrirLivro(l); }); })(livro);
    return w;
  }

  // ---------- filtros ----------
  filtros.forEach(function(btn) {
    btn.addEventListener('click', function() {
      filtros.forEach(function(b){ b.classList.remove('ativo'); });
      btn.classList.add('ativo');
      var f = btn.dataset.filtro;
      renderizar(f==='todos' ? livros : livros.filter(function(l){ return l.idioma===f; }));
    });
  });

  // ---------- abrir livro ----------
  function abrirLivro(livro) {
    livroAtual = livro;

    // capa na ficha do livro
    fichaCapaMini.style.background = gcapa(livro.cor);
    var fichaImg = new Image();
    fichaImg.onload = function() {
      fichaCapaMini.style.cssText = 'width:72px;height:104px;border-radius:2px;box-shadow:3px 4px 12px rgba(0,0,0,0.35);margin-bottom:1rem;float:left;margin-right:1rem;background-image:url(' + fichaImg.src + ');background-size:cover;background-position:center;';
    };
    fichaImg.src = 'https://o-som-dos-livros.neocities.org/Folha%20a%20folha/capas/' + livro.id + '.webp';
    fichaTitulo.textContent  = livro.titulo||'';
    fichaAutor.textContent   = livro.autor||'';
    fichaPaginas.textContent = livro.paginas ? livro.paginas+' paginas' : '';
    fichaIdioma.textContent  = livro.idioma==='pt' ? 'lido em portugues' : 'leido en espanol';
    var e = livro.estrelas||0;
    fichaEstrelas.textContent = '\u2605'.repeat(e)+'\u2606'.repeat(5-e);
    fichaAnotacao.textContent = livro.anotacao||'';
    fichaFrase.textContent    = livro.frase||'';

    // genero
    var fichaGeneroEl = document.getElementById('ficha-genero');
    if (fichaGeneroEl) fichaGeneroEl.textContent = livro.genero || '';

    // frase destacada (do review)
    var fichaFraseDestEl = document.getElementById('ficha-frase-destacada');
    var sepFraseDestEl   = document.getElementById('sep-frase-destacada');
    var labelFraseDestEl = fichaFraseDestEl ? fichaFraseDestEl.previousElementSibling : null;
    var fraseDest = (livro.review && livro.review.frase_destacada) ? livro.review.frase_destacada : '';
    if (fichaFraseDestEl) {
      fichaFraseDestEl.textContent = fraseDest;
      // mostra/esconde a seção dependendo se tem conteúdo
      var mostrar = fraseDest ? 'block' : 'none';
      if (sepFraseDestEl) sepFraseDestEl.style.display = mostrar;
      if (labelFraseDestEl) labelFraseDestEl.style.display = mostrar;
      fichaFraseDestEl.style.display = mostrar;
    }

    // reset
    capafrenteEl.classList.remove('fase-subindo','fase-saindo');
    paginasAbertasEl.classList.remove('visivel');
    reviewIframe.src = 'about:blank';
    reviewLoading.classList.remove('oculto');
    capaTituloAnim.textContent = livro.titulo;
    capaAutorAnim.textContent  = livro.autor;

    overlay.classList.add('ativo');
    livroAbertoEl.classList.add('ativo');
    btnFechar.style.display = 'block';
    livroAbertoEl.setAttribute('aria-hidden','false');
    document.body.style.overflow = 'hidden';

    // pré-carrega a imagem ANTES de iniciar a animação
    var capaAnimImg = new Image();

    function iniciarAnimacao() {
      setTimeout(function(){ capafrenteEl.classList.add('fase-subindo'); }, 50);
      setTimeout(function(){ capafrenteEl.classList.add('fase-saindo'); }, 820);
      setTimeout(function(){
        // garante que a capa está completamente invisível antes de mostrar páginas
        capafrenteEl.style.display = 'none';
        paginasAbertasEl.classList.add('visivel');
        carregarReview(livro);
      }, 1150);
    }

    capaAnimImg.onload = function() {
      capafrenteEl.style.background = 'url("' + capaAnimImg.src + '") center/cover no-repeat';
      capaTituloAnim.style.display = 'none';
      capaAutorAnim.style.display  = 'none';
      iniciarAnimacao();
    };
    capaAnimImg.onerror = function() {
      capafrenteEl.style.background = gcapa(livro.cor);
      capaTituloAnim.style.display = 'block';
      capaAutorAnim.style.display  = 'block';
      iniciarAnimacao();
    };
    capaAnimImg.src = 'https://o-som-dos-livros.neocities.org/Folha%20a%20folha/capas/' + livro.id + '.webp';

    overlay.onclick = fecharLivro;
  }

  // ---------- sistema de abertura dupla (como livro real) ----------
  // abertura 0: [ficha | pág 1]
  // abertura 1: [pág 2 | pág 3]
  // abertura 2: [pág 4 | pág 5] etc.
  var paginasReview = [];
  var aberturaAtual = 0;  // 0 = ficha+pag1, 1 = pag2+pag3, etc.
  var totalAberturas = 0;
  var emAnimacao = false;

  var paginaEsquerdaEl = document.querySelector('.pagina-esquerda');
  var paginaDireitaEl  = document.querySelector('.pagina-direita');
  var fichaEl = document.querySelector('.pagina-scroll');

  function carregarReview(livro) {
    reviewIframe.onload = function() {
      setTimeout(function() {
        reviewLoading.classList.add('oculto');
        inicializarPaginas();
      }, 200);
    };
    reviewIframe.src = 'reviews/' + livro.id + '.html';
    setTimeout(function() {
      if (!reviewLoading.classList.contains('oculto')) fallbackReview(livro);
    }, 3000);
  }

  function inicializarPaginas() {
    var doc = reviewIframe.contentDocument || (reviewIframe.contentWindow && reviewIframe.contentWindow.document);
    if (!doc) return;

    paginasReview = Array.prototype.slice.call(doc.querySelectorAll('.pagina'));
    totalAberturas = Math.ceil(paginasReview.length / 2) + 1; // +1 for ficha opening
    aberturaAtual = 0;

    // esconde todas as paginas
    paginasReview.forEach(function(p) { p.style.display = 'none'; });

    // abertura 0: mostra ficha na esquerda, pag[0] na direita (via iframe normal)
    mostrarAbertura(0);
    atualizarSetinhas();
  }

  function mostrarAbertura(idx) {
    var doc = reviewIframe.contentDocument || (reviewIframe.contentWindow && reviewIframe.contentWindow.document);
    // sempre esconde o overlay da esquerda primeiro
    var overlayEsq = document.getElementById('review-overlay-esquerda');

    if (idx === 0) {
      // restaura ficha na esquerda
      if (overlayEsq) overlayEsq.style.display = 'none';
      if (fichaEl) fichaEl.style.display = '';
      // mostra pag[0] na direita
      paginasReview.forEach(function(p) { p.style.display = 'none'; });
      if (paginasReview[0]) paginasReview[0].style.display = 'block';
      reviewIframe.style.display = 'block';

    } else {
      var idxEsq = (idx - 1) * 2 + 1;
      var idxDir = (idx - 1) * 2 + 2;

      // esconde ficha, mostra overlay na esquerda
      if (fichaEl) fichaEl.style.display = 'none';
      paginasReview.forEach(function(p) { p.style.display = 'none'; });

      mostrarPaginaNoLado('esquerda', idxEsq);

      if (paginasReview[idxDir]) {
        paginasReview[idxDir].style.display = 'block';
        reviewIframe.style.display = 'block';
      } else {
        reviewIframe.style.display = 'none';
      }
    }
  }

  // injeta uma pagina do review no lado esquerdo
  function mostrarPaginaNoLado(lado, idx) {
    var overlayId = 'review-overlay-esquerda';
    var overlay = document.getElementById(overlayId);

    if (!overlay) {
      overlay = document.createElement('div');
      overlay.id = overlayId;
      overlay.style.cssText = 'position:absolute;inset:0;background:#f0e8d5;overflow:hidden;z-index:3;padding:1.8rem 1.6rem 2.5rem;font-family:"EB Garamond",Georgia,serif;font-size:0.9rem;line-height:1.82;color:#2a1f0f;box-sizing:border-box;';
      paginaEsquerdaEl.style.position = 'relative';
      paginaEsquerdaEl.appendChild(overlay);
    }

    if (idx < paginasReview.length) {
      overlay.innerHTML = paginasReview[idx].innerHTML;
      overlay.style.display = 'block';
    } else {
      overlay.style.display = 'none';
    }
  }

  function virarPagina(direcao) {
    if (emAnimacao) return;
    var novaAbertura = aberturaAtual + direcao;
    if (novaAbertura < 0 || novaAbertura >= totalAberturas) return;

    emAnimacao = true;

    // animação: slide
    var paginasAbertas = document.getElementById('paginas-abertas');
    paginasAbertas.style.transition = 'opacity 0.3s ease';
    paginasAbertas.style.opacity = '0';

    setTimeout(function() {
      aberturaAtual = novaAbertura;
      mostrarAbertura(aberturaAtual);
      atualizarSetinhas();

      setTimeout(function() {
        paginasAbertas.style.opacity = '1';
        setTimeout(function() {
          paginasAbertas.style.transition = '';
          emAnimacao = false;
        }, 320);
      }, 30);
    }, 320);
  }

  function atualizarSetinhas() {
    var btnPrev = document.getElementById('btn-prev-pagina');
    var btnNext = document.getElementById('btn-next-pagina');
    if (btnPrev) {
      btnPrev.style.opacity = aberturaAtual === 0 ? '0.15' : '0.6';
      btnPrev.style.pointerEvents = aberturaAtual === 0 ? 'none' : 'all';
    }
    if (btnNext) {
      btnNext.style.opacity = aberturaAtual >= totalAberturas - 1 ? '0.15' : '0.6';
      btnNext.style.pointerEvents = aberturaAtual >= totalAberturas - 1 ? 'none' : 'all';
    }
  }

  function fallbackReview(livro) {
    reviewLoading.classList.add('oculto');
    var doc = reviewIframe.contentDocument || (reviewIframe.contentWindow && reviewIframe.contentWindow.document);
    if (!doc) return;
    var r = livro.review || {};
    var p = [];
    p.push('<!DOCTYPE html><html lang="pt-BR"><head><meta charset="UTF-8">');
    p.push('<link href="https://fonts.googleapis.com/css2?family=EB+Garamond:ital,wght@0,400;1,400&family=Special+Elite&display=swap" rel="stylesheet">');
    p.push('<style>*{box-sizing:border-box;margin:0;padding:0}body{background:#f0e8d5;font-family:"EB Garamond",Georgia,serif;color:#2a1f0f;padding:1.8rem 1.6rem 3rem;line-height:1.82;font-size:0.9rem}.secao{margin-bottom:1.4rem}.label{font-family:"Special Elite","Courier New",monospace;font-size:0.58rem;letter-spacing:0.22em;text-transform:uppercase;color:#c8b99a;margin-bottom:0.45rem;border-bottom:1px solid rgba(200,185,154,0.4);padding-bottom:0.3rem;display:block}.frase{font-style:italic;font-size:1rem;color:#3a2a1a;text-align:center;padding:1rem 1.2rem;border-top:1px solid #c8b99a;border-bottom:1px solid #c8b99a;margin:1.4rem 0}.vazio{text-align:center;padding:4rem 2rem;color:#a8834a;font-style:italic;font-size:0.85rem}</style></head><body>');
    if (r.impressao) {
      p.push('<div class="secao"><span class="label">impressao inicial</span><p>'+ht(r.impressao)+'</p></div>');
      if (r.experiencia) p.push('<div class="secao"><span class="label">lendo</span><p>'+ht(r.experiencia)+'</p></div>');
      if (r.pensamentos) p.push('<div class="secao"><span class="label">pensamentos</span><p>'+ht(r.pensamentos)+'</p></div>');
      if (r.frase_destacada) p.push('<p class="frase">'+ht(r.frase_destacada)+'</p>');
    } else {
      p.push('<p class="vazio">este review ainda esta sendo escrito.</p>');
    }
    p.push('</body></html>');
    doc.open(); doc.write(p.join('')); doc.close();
  }

  // ---------- fechar ----------
  function fecharLivro() {
    livroAbertoEl.classList.remove('ativo');
    livroAbertoEl.setAttribute('aria-hidden','true');
    btnFechar.style.display = 'none';
    overlay.classList.remove('ativo');
    overlay.onclick = null;
    document.body.style.overflow = '';
    setTimeout(function(){
      capafrenteEl.classList.remove('fase-subindo','fase-saindo');
    capafrenteEl.style.display = '';
    capafrenteEl.style.backgroundImage = '';
    capafrenteEl.style.background = '';
    // reset livro
    aberturaAtual = 0;
    paginasReview = [];
    var overlay = document.getElementById('review-overlay-esquerda');
    if (overlay) overlay.style.display = 'none';
    if (fichaEl) fichaEl.style.display = '';
      paginasAbertasEl.classList.remove('visivel');
      reviewIframe.src = 'about:blank';
      reviewLoading.classList.remove('oculto');
      livroAtual = null;
    }, 400);
  }

  btnFechar.addEventListener('click', fecharLivro);

  // botoes de virar pagina
  var btnPrev = document.getElementById('btn-prev-pagina');
  var btnNext = document.getElementById('btn-next-pagina');
  if (btnPrev) btnPrev.addEventListener('click', function() { virarPagina(-1); });
  if (btnNext) btnNext.addEventListener('click', function() { virarPagina(1); });

  // clicar na borda da pagina direita (canto direito = avança, canto esquerdo = volta)
  document.addEventListener('click', function(e) {
    if (!livroAbertoEl.classList.contains('ativo')) return;
    var paginaDir = document.querySelector('.pagina-direita');
    if (!paginaDir) return;
    var rect = paginaDir.getBoundingClientRect();
    // zona clicavel: 60px nas bordas
    if (e.clientX >= rect.left && e.clientX <= rect.left + 60 &&
        e.clientY >= rect.top && e.clientY <= rect.bottom) {
      virarPagina(-1);
    } else if (e.clientX >= rect.right - 60 && e.clientX <= rect.right &&
               e.clientY >= rect.top && e.clientY <= rect.bottom) {
      virarPagina(1);
    }
  });

  // ---------- modal sobre ----------
  btnSobre.addEventListener('click', function(){ modalOverlay.classList.add('ativo'); });
  btnFecharSobre.addEventListener('click', function(){ modalOverlay.classList.remove('ativo'); });
  modalOverlay.addEventListener('click', function(e){ if(e.target===modalOverlay) modalOverlay.classList.remove('ativo'); });

  // ---------- teclado ----------
  document.addEventListener('keydown', function(e) {
    if (e.key==='Escape') {
      if (modalOverlay.classList.contains('ativo')) modalOverlay.classList.remove('ativo');
      else if (livroAbertoEl.classList.contains('ativo')) fecharLivro();
    }
  });

  // ---------- resize ----------
  var rt;
  window.addEventListener('resize', function(){
    clearTimeout(rt);
    rt = setTimeout(function(){
      var btn = document.querySelector('.filtro-btn.ativo');
      var f = btn ? btn.dataset.filtro : 'todos';
      renderizar(f==='todos' ? livros : livros.filter(function(l){ return l.idioma===f; }));
    }, 300);
  });

  // ---------- carregar ----------
  fetch('livros.json').then(function(r){ return r.json(); }).then(function(data){
    livros = data;
    renderizar(livros);
  }).catch(function(e){ console.error('Erro livros.json:', e); });

});
