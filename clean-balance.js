(() => {
  const logoByAlt = [
    [/compás one/i, 'compas-one-oficial.avif?clean=1'],
    [/academia compás/i, 'compas-academia-oficial.avif?clean=1'],
    [/compás creators/i, 'compas-creators-oficial.avif?clean=1'],
    [/compás ia/i, 'compas-ia-oficial.avif?clean=1'],
    [/proyecto compás/i, 'compas-evolution-oficial.avif?clean=1']
  ];

  document.querySelectorAll('img[alt]').forEach(img => {
    const alt = img.getAttribute('alt') || '';
    const match = logoByAlt.find(([pattern]) => pattern.test(alt));
    if (match) img.setAttribute('src', match[1]);
  });

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