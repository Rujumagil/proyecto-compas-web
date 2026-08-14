(() => {
  if (window.__COMPAS_BRAND_FIX_V3__) return;
  window.__COMPAS_BRAND_FIX_V3__ = true;
  window.__COMPAS_BRAND_FIX_V2__ = true;

  const LOGOS = {
    evolution: 'proyecto-compas-isotipo-dark.svg',
    one: 'compas-one-oficial.avif',
    academia: 'compas-academia-oficial.avif',
    creators: 'compas-creators-oficial.avif',
    ia: 'compas-ia-oficial.avif'
  };

  const css = document.createElement('link');
  css.rel = 'stylesheet';
  css.href = 'brand-visibility-v2.css?v=10';
  css.dataset.compasBrandVisibility = 'true';
  if (!document.querySelector('link[data-compas-brand-visibility]')) document.head.appendChild(css);

  function typeFor(img) {
    if (img.closest('.brand') || img.closest('.core-glass') || img.closest('.footer-logo')) return 'evolution';
    const text = `${img.src || ''} ${img.alt || ''}`.toLowerCase();
    if (text.includes('one')) return 'one';
    if (text.includes('academia')) return 'academia';
    if (text.includes('creator')) return 'creators';
    if (text.includes('compas-ia') || text.includes('compas-ai') || text.includes('compás ia')) return 'ia';
    if (text.includes('evolution') || text.includes('proyecto compás')) return 'evolution';
    return '';
  }

  document.querySelectorAll('img').forEach(img => {
    const type = typeFor(img);
    if (!type) return;
    img.src = LOGOS[type];
    img.classList.add('compas-logo-visible', `compas-logo-${type}`);
    img.onerror = () => {
      img.onerror = null;
      img.style.display = 'none';
    };
  });

  document.querySelectorAll('.brand').forEach(brand => {
    let img = brand.querySelector('img');
    if (!img) {
      img = document.createElement('img');
      brand.prepend(img);
    }
    img.src = LOGOS.evolution;
    img.alt = '';
    img.setAttribute('aria-hidden','true');
    img.classList.add('compas-logo-visible','compas-logo-evolution');
  });

  const isIaPage = /compas-ia\.html$/i.test(location.pathname) || document.title.toLowerCase().includes('compás ia');
  if (isIaPage) {
    const hero = document.querySelector('.page-hero .container');
    if (hero && !hero.querySelector('.page-icon')) {
      const img = document.createElement('img');
      img.src = LOGOS.ia;
      img.alt = 'Compás IA';
      img.className = 'page-icon compas-logo-visible compas-logo-ia';
      const kicker = hero.querySelector('.kicker');
      kicker ? hero.insertBefore(img, kicker) : hero.prepend(img);
    }
  }

  const numbered = ['.manifesto-number','.case-number','.index','.orbit-node small','.feature-panel > span:first-child'];
  document.querySelectorAll(numbered.join(',')).forEach(el => {
    const text = (el.textContent || '').trim();
    if (/^0?\d{1,2}$/.test(text)) return el.remove();
    const clean = text.replace(/^0?\d{1,2}\s*[·•—–-]\s*/u,'').trim();
    if (clean !== text) clean ? el.textContent = clean : el.remove();
  });
})();