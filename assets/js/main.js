(() => {
  'use strict';
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const MAX_AUTO = 12;
  const DATA = window.PROJECT_IMAGES || {};

  /* ---------- nav ---------- */
  const nav = $('.nav'), btn = $('.menu-btn'), menu = $('#menu');
  const onScroll = () => nav.classList.toggle('scrolled', scrollY > 8);
  addEventListener('scroll', onScroll, { passive: true }); onScroll();
  btn.addEventListener('click', () => {
    const open = btn.getAttribute('aria-expanded') !== 'true';
    btn.setAttribute('aria-expanded', open); menu.classList.toggle('open', open);
  });
  $$('#menu a').forEach(a => a.addEventListener('click', () => { btn.setAttribute('aria-expanded', 'false'); menu.classList.remove('open'); }));
  $('#yr').textContent = new Date().getFullYear();

  /* ---------- reveal on scroll ---------- */
  const io = 'IntersectionObserver' in window ? new IntersectionObserver(es => es.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
  }), { rootMargin: '0px 0px -8% 0px', threshold: .08 }) : null;
  $$('.reveal').forEach((el, i) => { el.style.transitionDelay = (i % 3) * 70 + 'ms'; io ? io.observe(el) : el.classList.add('in'); });

  /* ---------- filters ---------- */
  $$('.filters button').forEach(b => b.addEventListener('click', () => {
    $$('.filters button').forEach(x => x.classList.toggle('on', x === b));
    const f = b.dataset.f;
    $$('.card').forEach(c => c.classList.toggle('hide', f !== 'all' && c.dataset.cat !== f));
  }));

  /* ---------- designed covers (shown when a project has no screenshots yet) ---------- */
  const ICONS = {
    ar: '<svg viewBox="0 0 64 64" fill="none" stroke="#93c5fd" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M32 6 54 18v28L32 58 10 46V18z"/><path d="M32 30 54 18M32 30v28M32 30 10 18"/><circle cx="32" cy="30" r="3" fill="#5eead4" stroke="none"/></svg>',
    mini: '<svg viewBox="0 0 64 64" fill="none" stroke="#fdba74" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><rect x="6" y="18" width="52" height="30" rx="15"/><path d="M20 27v12M14 33h12"/><circle cx="42" cy="30" r="2.5" fill="#fdba74"/><circle cx="48" cy="36" r="2.5" fill="#fdba74"/></svg>',
    pac: '<svg viewBox="0 0 64 64"><path d="M32 32 56 18A28 28 0 1 0 56 46z" fill="#facc15"/><circle cx="30" cy="18" r="3.5" fill="#0b1020"/><circle cx="52" cy="32" r="3" fill="#f0abfc"/></svg>',
    story: '<svg viewBox="0 0 64 64" fill="none" stroke="#5eead4" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M32 14C24 9 14 9 6 12v38c8-3 18-3 26 2 8-5 18-5 26-2V12c-8-3-18-3-26 2z"/><path d="M32 14v38"/></svg>'
  };
  const cover = card => {
    const k = card.dataset.cover;
    return `<div class="cover cover-${k}"><div class="cover-in">${ICONS[k] || ''}<div class="cover-t">${card.dataset.coverTitle}</div><div class="cover-s">Screenshots coming soon</div></div></div>`;
  };

  /* probe <slug>/1.webp, 2.webp ... until one is missing */
  const exists = src => new Promise(res => { const i = new Image(); i.onload = () => res(true); i.onerror = () => res(false); i.src = src; });
  async function probe(slug, caps) {
    const out = [];
    for (let n = 1; n <= MAX_AUTO; n++) {
      const src = `assets/projects/${slug}/${n}.webp`;
      if (!(await exists(src))) break;
      out.push({ full: src, thumb: src, caption: caps[n - 1] || '' });
    }
    return out;
  }

  /* ---------- galleries ---------- */
  function build(card, imgs) {
    const g = $('.gallery', card);
    const title = $('h3', card).textContent;
    if (!imgs.length) { g.innerHTML = cover(card); return; }
    g.innerHTML = `<div class="g-main" role="button" tabindex="0" aria-label="Open ${title} gallery">
        <img src="${imgs[0].thumb}" alt="${imgs[0].caption || title}" loading="lazy" decoding="async">
        <span class="g-play" ${imgs[0].video ? '' : 'hidden'} aria-hidden="true">▶</span>
        ${imgs.length > 1 ? `<span class="g-count">1 / ${imgs.length}</span>` : ''}</div>` +
      (imgs.length > 1 ? `<div class="g-strip">${imgs.map((im, i) =>
        `<button class="${i ? '' : 'on'}" aria-label="Show image ${i + 1}: ${im.caption || title}"><img src="${im.thumb}" alt="" loading="lazy" decoding="async">${im.video ? '<i class="s-play">▶</i>' : ''}</button>`).join('')}</div>` : '');
    const main = $('.g-main img', g), count = $('.g-count', g);
    let cur = 0;
    const show = i => {
      cur = i; main.style.opacity = .3;
      main.src = imgs[i].thumb; main.alt = imgs[i].caption || title;
      const pb = $('.g-play', g); if (pb) pb.hidden = !imgs[i].video;
      if (count) count.textContent = `${i + 1} / ${imgs.length}`;
      $$('.g-strip button', g).forEach((b, j) => b.classList.toggle('on', j === i));
    };
    $$('.g-strip button', g).forEach((b, i) => b.addEventListener('click', () => show(i)));
    const open = () => { lbImg.classList.toggle('pixel', !!card.dataset.pixel); lightbox(imgs, cur, title); };
    $('.g-main', g).addEventListener('click', open);
    $('.g-main', g).addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); open(); } });
    // portrait images are letterboxed instead of cropped
    const fit = () => { main.classList.toggle('contain', main.naturalHeight > main.naturalWidth * 1.1); main.style.opacity = 1; };
    main.addEventListener('load', fit); if (main.complete && main.naturalWidth) fit();
  }

  $$('.card[data-slug]').forEach(async card => {
    const slug = card.dataset.slug, cfg = DATA[slug] || { auto: true };
    let imgs;
    if (cfg.images && cfg.images.length) {
      const base = `assets/projects/${slug}/`;
      imgs = cfg.images.map(im => im.video
        ? { video: base + im.video, full: base + im.poster, thumb: base + im.poster, caption: im.caption || '' }
        : { full: base + im.src, thumb: base + (cfg.thumbs ? 'thumb/' : '') + im.src, caption: im.caption || '' });
    } else {
      imgs = await probe(slug, cfg.autoCaptions || []);
    }
    build(card, imgs);
  });

  /* ---------- lightbox ---------- */
  const lb = $('#lb'), lbImg = $('#lb img'), lbVid = $('#lb video'), lbCap = $('#lb figcaption');
  let L = [], li = 0, lastFocus = null;
  const render = () => {
    const it = L[li];
    lbVid.pause();
    if (it.video) {
      lbImg.hidden = true; lbVid.hidden = false;
      lbVid.poster = it.full; lbVid.src = it.video; lbVid.muted = true; lbVid.play().catch(() => {});
    } else {
      lbVid.hidden = true; lbVid.removeAttribute('src'); lbVid.load(); lbImg.hidden = false;
      lbImg.style.opacity = 0;
      lbImg.onload = () => (lbImg.style.opacity = 1);
      lbImg.src = it.full; lbImg.alt = it.caption || '';
    }
    lbCap.textContent = `${L[li].caption ? L[li].caption + ' · ' : ''}${li + 1} / ${L.length}`;
    $$('.lb-nav', lb).forEach(b => (b.hidden = L.length < 2));
  };
  function lightbox(list, i) {
    L = list; li = i; lastFocus = document.activeElement;
    lb.hidden = false; requestAnimationFrame(() => lb.classList.add('open'));
    document.body.style.overflow = 'hidden'; render(); $('.lb-x', lb).focus();
  }
  const close = () => { lbVid.pause(); lb.classList.remove('open'); setTimeout(() => (lb.hidden = true), 200); document.body.style.overflow = ''; lastFocus && lastFocus.focus(); };
  const step = d => { li = (li + d + L.length) % L.length; render(); };
  $('.lb-x', lb).addEventListener('click', close);
  $('.lb-prev', lb).addEventListener('click', () => step(-1));
  $('.lb-next', lb).addEventListener('click', () => step(1));
  lb.addEventListener('click', e => { if (e.target === lb || e.target.classList.contains('lb-fig')) close(); });
  addEventListener('keydown', e => {
    if (lb.hidden) return;
    if (e.key === 'Escape') close(); else if (e.key === 'ArrowRight') step(1); else if (e.key === 'ArrowLeft') step(-1);
  });
  const ME = [1, 2, 3].map(n => ({ full: `assets/img/me/${n}.webp`, caption: 'Cyrus de Sosa' }));
  $$('.me-strip button').forEach(b => b.addEventListener('click', () => { lbImg.classList.remove('pixel'); lightbox(ME, +b.dataset.i); }));
  let sx = null;
  lb.addEventListener('touchstart', e => (sx = e.touches[0].clientX), { passive: true });
  lb.addEventListener('touchend', e => { if (sx == null) return; const dx = e.changedTouches[0].clientX - sx; if (Math.abs(dx) > 45) step(dx < 0 ? 1 : -1); sx = null; });
})();
