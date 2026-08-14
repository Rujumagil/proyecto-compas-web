(() => {
  if (window.__COMPAS_BRAND_FIX_V5__) return;
  window.__COMPAS_BRAND_FIX_V5__ = true;
  window.__COMPAS_BRAND_FIX_V4__ = true;
  window.__COMPAS_BRAND_FIX_V3__ = true;
  window.__COMPAS_BRAND_FIX_V2__ = true;

  const SPRITE = 'compas-logos-oficiales.png?v=21';
  const TRANSPARENT = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==';
  const POSITIONS = {
    evolution: '0% 0%',
    one: '0% 25%',
    academia: '0% 50%',
    creators: '0% 75%',
    ia: '0% 100%'
  };

  const css = document.createElement('link');
  css.rel = 'stylesheet';
  css.href = 'brand-visibility-v2.css?v=21';
  css.dataset.compasBrandVisibility = 'true';
  document.querySelectorAll('link[data-compas-brand-visibility]').forEach(link => link.remove());
  document.head.appendChild(css);

  function typeFor(img) {
    if (img.closest('.brand') || img.closest('.core-glass') || img.closest('.footer-logo')) return 'evolution';
    const text = `${img.getAttribute('src') || ''} ${img.alt || ''}`.toLowerCase();
    if (text.includes('one')) return 'one';
    if (text.includes('academia') || text.includes('academy')) return 'academia';
    if (text.includes('creator') || text.includes('project') || text.includes('pluma')) return 'creators';
    if (text.includes('compas-ia') || text.includes('compas-ai') || text.includes('compás ia') || text.includes('compás ai')) return 'ia';
    if (text.includes('evolution') || text.includes('proyecto compás') || text.includes('proyecto compas')) return 'evolution';
    return '';
  }

  function applyLogo(img, type) {
    if (!img || !POSITIONS[type]) return;
    img.removeAttribute('srcset');
    img.src = TRANSPARENT;
    img.classList.add('compas-logo-visible', `compas-logo-${type}`);
    img.dataset.compasLogo = type;
    img.style.setProperty('background-image', `url("${SPRITE}")`, 'important');
    img.style.setProperty('background-repeat', 'no-repeat', 'important');
    img.style.setProperty('background-size', '100% 500%', 'important');
    img.style.setProperty('background-position', POSITIONS[type], 'important');
    img.style.setProperty('background-color', '#fff', 'important');
  }

  document.querySelectorAll('img').forEach(img => {
    const type = typeFor(img);
    if (type) applyLogo(img, type);
  });

  document.querySelectorAll('.brand').forEach(brand => {
    let img = brand.querySelector('img');
    if (!img) {
      img = document.createElement('img');
      brand.prepend(img);
    }
    img.alt = '';
    img.setAttribute('aria-hidden', 'true');
    applyLogo(img, 'evolution');
  });

  const isIaPage = /compas-ia\.html$/i.test(location.pathname) || document.title.toLowerCase().includes('compás ia');
  if (isIaPage) {
    const hero = document.querySelector('.page-hero .container');
    if (hero && !hero.querySelector('.page-icon')) {
      const img = document.createElement('img');
      img.alt = 'Compás IA';
      img.className = 'page-icon';
      const kicker = hero.querySelector('.kicker');
      kicker ? hero.insertBefore(img, kicker) : hero.prepend(img);
      applyLogo(img, 'ia');
    }
  }

  const numbered = ['.manifesto-number','.case-number','.index','.orbit-node small','.feature-panel > span:first-child'];
  document.querySelectorAll(numbered.join(',')).forEach(el => {
    const text = (el.textContent || '').trim();
    if (/^0?\d{1,2}$/.test(text)) return el.remove();
    const clean = text.replace(/^0?\d{1,2}\s*[·•—–-]\s*/u, '').trim();
    if (clean !== text) clean ? el.textContent = clean : el.remove();
  });
})();