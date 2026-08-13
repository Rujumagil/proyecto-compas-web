(() => {
  if (window.__COMPAS_BRAND_FIX_V2__) return;
  window.__COMPAS_BRAND_FIX_V2__ = true;

  const LOGOS = {
    evolution: 'proyecto-compas-evolution_transparente.png?v=4',
    one: 'compas-one_transparente.png?v=4',
    academia: 'compas-academia_transparente.png?v=4',
    creators: 'compas-creators_transparente.png?v=4',
    ia: 'compas-ai_transparente.png?v=4'
  };

  const visibilityCss = document.createElement('link');
  visibilityCss.rel = 'stylesheet';
  visibilityCss.href = 'brand-visibility-v2.css?v=2';
  visibilityCss.dataset.compasBrandVisibility = 'true';
  if (!document.querySelector('link[data-compas-brand-visibility]')) document.head.appendChild(visibilityCss);

  function resolveLogo(img) {
    const alt = (img.getAttribute('alt') || '').toLowerCase();
    const src = (img.getAttribute('src') || '').toLowerCase();

    if (/compas-one|compás one/.test(`${src} ${alt}`)) return LOGOS.one;
    if (/compas-academia|academia compás/.test(`${src} ${alt}`)) return LOGOS.academia;
    if (/compas-creators|compás creators/.test(`${src} ${alt}`)) return LOGOS.creators;
    if (/compas-ia|compas-ai|compás ia/.test(`${src} ${alt}`)) return LOGOS.ia;
    if (/compas-evolution|proyecto compás/.test(`${src} ${alt}`)) return LOGOS.evolution;
    return '';
  }

  function normalizeLogo(img) {
    const target = resolveLogo(img);
    if (!target) return;
    if (img.getAttribute('src') !== target) img.setAttribute('src', target);
    img.classList.add('compas-logo-visible');
    img.addEventListener('error', () => {
      const fallback = resolveLogo(img);
      if (fallback && img.getAttribute('src') !== fallback) img.setAttribute('src', fallback);
    }, { once: true });
  }

  document.querySelectorAll('img').forEach(normalizeLogo);

  document.querySelectorAll('.brand').forEach(brand => {
    if (brand.querySelector('img')) return;
    const img = document.createElement('img');
    img.src = LOGOS.evolution;
    img.alt = 'Proyecto Compás Evolution';
    img.className = 'compas-logo-visible';
    brand.prepend(img);
  });

  const isIaPage = /compas-ia\.html$/i.test(location.pathname) || document.title.toLowerCase().includes('compás ia');
  if (isIaPage) {
    const hero = document.querySelector('.page-hero .container');
    if (hero && !hero.querySelector('.page-icon')) {
      const img = document.createElement('img');
      img.src = LOGOS.ia;
      img.alt = 'Compás IA';
      img.className = 'page-icon compas-logo-visible';
      const kicker = hero.querySelector('.kicker');
      if (kicker) hero.insertBefore(img, kicker);
      else hero.prepend(img);
    }
  }

  const selectors = [
    '.manifesto-number',
    '.case-number',
    '.index',
    '.orbit-node small',
    '.feature-panel > span:first-child'
  ];

  document.querySelectorAll(selectors.join(',')).forEach(el => {
    const text = (el.textContent || '').trim();
    if (/^0?\d{1,2}$/.test(text)) {
      el.remove();
      return;
    }
    const clean = text.replace(/^0?\d{1,2}\s*[·•—–-]\s*/u, '').trim();
    if (clean !== text) {
      if (clean) el.textContent = clean;
      else el.remove();
    }
  });
})();