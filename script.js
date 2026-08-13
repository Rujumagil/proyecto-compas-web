const OFFICIAL_COMPAS_LOGOS = {
  'compas-evolution-oficial.avif': 'https://static.wixstatic.com/media/11f124_7d522fe953aa494590cdd467d5233c39~mv2.png',
  'compas-one-oficial.avif': 'https://static.wixstatic.com/media/11f124_48fca4d474df41618043a61de8f7015c~mv2.png',
  'compas-academia-oficial.avif': 'https://static.wixstatic.com/media/11f124_41c69c5dc66d4ca1933873d64dd4bcfd~mv2.png',
  'compas-creators-oficial.avif': 'https://static.wixstatic.com/media/11f124_b9cbe5ebf44c4b6f93dbf60cd0149796~mv2.png',
  'compas-ia-oficial.avif': 'https://static.wixstatic.com/media/11f124_c1cdfda872934a0cb7ee6ac4507e1803~mv2.png'
};

document.querySelectorAll('img').forEach(img => {
  const current = img.getAttribute('src');
  const official = OFFICIAL_COMPAS_LOGOS[current];
  if (official) img.setAttribute('src', official);
});

const COMPAS_CHAT_SCRIPT = 'https://app.proyectocompas.com/compas-chat.js';
const COMPAS_CHAT_PUBLIC_KEY = 'wc_775408ca243abfea3d5ec95025e3c2d9bdbb';
const COMPAS_INTENT_STORAGE_KEY = 'compas-pending-interest';
let pendingCompasInterest = '';
let compasIntentObserver = null;

if (!document.querySelector('compas-one-web-chat')) {
  document.write(
    `<script src="${COMPAS_CHAT_SCRIPT}" data-key="${COMPAS_CHAT_PUBLIC_KEY}"><\/script>`
  );
}

const header = document.querySelector('.site-header');
const toggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.main-nav');

const updateHeader = () => header?.classList.toggle('scrolled', window.scrollY > 35);
updateHeader();
window.addEventListener('scroll', updateHeader, { passive: true });

toggle?.addEventListener('click', () => {
  const isOpen = nav.classList.toggle('open');
  toggle.setAttribute('aria-expanded', String(isOpen));
});

document.querySelectorAll('.main-nav a').forEach(link => {
  link.addEventListener('click', () => {
    nav?.classList.remove('open');
    toggle?.setAttribute('aria-expanded', 'false');
  });
});

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
const year = document.getElementById('year');
if (year) year.textContent = new Date().getFullYear();

const projectFooterColumn = Array.from(document.querySelectorAll('.footer-grid > div')).find(column =>
  column.querySelector('h3')?.textContent?.trim() === 'Proyecto Compás'
);

const legalFooterLinks = [
  ['casos-de-exito.html', 'Casos de éxito'],
  ['terminos-y-condiciones.html', 'Términos y condiciones'],
  ['politica-de-cookies.html', 'Política de cookies'],
  ['politica-de-uso-de-ia.html', 'Uso responsable de IA'],
  ['derechos-arco.html', 'Derechos ARCO']
];

if (projectFooterColumn) {
  legalFooterLinks.forEach(([href, label]) => {
    if (projectFooterColumn.querySelector(`a[href="${href}"]`)) return;
    const link = document.createElement('a');
    link.href = href;
    link.textContent = label;
    projectFooterColumn.appendChild(link);
  });
}

const commercialRoutes = [
  ['#academia', 'Ver ruta de Academia'],
  ['#curso', 'Ver ruta de Curso'],
  ['#autor', 'Ver ruta para Autores'],
  ['#plataforma', 'Ver ruta Web / Plataforma'],
  ['#one', 'Ver ruta Compás One'],
  ['#ia', 'Ver ruta IA / Automatización']
];

const homeSolutionCards = document.querySelectorAll('#soluciones .solution-card');
homeSolutionCards.forEach((card, index) => {
  if (!commercialRoutes[index] || card.querySelector('.solution-route-link')) return;
  const [anchor, label] = commercialRoutes[index];
  const link = document.createElement('a');
  link.className = 'solution-route-link';
  link.href = `soluciones.html${anchor}`;
  link.textContent = `${label} →`;
  link.style.cssText = 'display:inline-flex;margin-top:18px;font-weight:700;color:#2A4B68;text-decoration:none;';
  card.appendChild(link);
});

const homeSolutionsNavLink = Array.from(document.querySelectorAll('.main-nav a')).find(link =>
  link.textContent?.trim() === 'Soluciones' && link.getAttribute('href') === '#soluciones'
);
if (homeSolutionsNavLink) homeSolutionsNavLink.href = 'soluciones.html';

if (nav && !Array.from(nav.querySelectorAll('a')).some(link => link.textContent?.trim() === 'Casos')) {
  const casesLink = document.createElement('a');
  casesLink.href = 'casos-de-exito.html';
  casesLink.textContent = 'Casos';
  const audienceLink = Array.from(nav.querySelectorAll('a')).find(link => link.textContent?.trim() === 'Para quién');
  if (audienceLink) nav.insertBefore(casesLink, audienceLink);
  else nav.appendChild(casesLink);
}

const compasInterestPatterns = [
  [/crear mi academia/i, 'crear una academia digital'],
  [/desarrollar mi curso/i, 'desarrollar un curso'],
  [/trabajar mi libro/i, 'escribir, preparar o publicar un libro'],
  [/página o plataforma/i, 'crear una página, landing o plataforma'],
  [/implementar compás one/i, 'implementar Compás One'],
  [/implementar ia/i, 'implementar agentes o automatización con IA'],
  [/academia así/i, 'crear una academia digital'],
  [/digitalizar mi contenido/i, 'crear una experiencia digital para un libro o contenido']
];

function resolveCompasInterest(trigger) {
  const explicit = trigger?.dataset?.compasInterest?.trim();
  if (explicit) return explicit;
  const label = trigger?.textContent?.trim() || '';
  return compasInterestPatterns.find(([pattern]) => pattern.test(label))?.[1] || '';
}

function rememberCompasInterest(interest) {
  if (!interest) return;
  pendingCompasInterest = interest;
  try {
    window.sessionStorage.setItem(COMPAS_INTENT_STORAGE_KEY, interest);
  } catch (_) {}
}

function getPendingCompasInterest() {
  if (pendingCompasInterest) return pendingCompasInterest;
  try {
    return window.sessionStorage.getItem(COMPAS_INTENT_STORAGE_KEY) || '';
  } catch (_) {
    return '';
  }
}

function clearPendingCompasInterest() {
  pendingCompasInterest = '';
  try {
    window.sessionStorage.removeItem(COMPAS_INTENT_STORAGE_KEY);
  } catch (_) {}
}

function deliverPendingCompasInterest(shadowRoot) {
  const interest = getPendingCompasInterest();
  if (!interest || !shadowRoot) return !interest;
  const form = shadowRoot.querySelector('form.composer');
  const textarea = form?.querySelector('textarea');
  if (!form || !textarea || textarea.value.trim()) return false;
  textarea.value = `Me interesa ${interest}. Quiero iniciar el diagnóstico para esta solución.`;
  textarea.dispatchEvent(new Event('input', { bubbles: true }));
  clearPendingCompasInterest();
  if (typeof form.requestSubmit === 'function') form.requestSubmit();
  else form.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));
  return true;
}

function armCompasIntentDelivery(attempt = 0) {
  const host = document.querySelector('compas-one-web-chat');
  const shadowRoot = host?.shadowRoot;
  if (!shadowRoot) {
    if (attempt < 60) window.setTimeout(() => armCompasIntentDelivery(attempt + 1), 200);
    return;
  }
  if (deliverPendingCompasInterest(shadowRoot)) return;
  compasIntentObserver?.disconnect();
  compasIntentObserver = new MutationObserver(() => {
    if (deliverPendingCompasInterest(shadowRoot)) {
      compasIntentObserver?.disconnect();
      compasIntentObserver = null;
    }
  });
  compasIntentObserver.observe(shadowRoot, { childList: true, subtree: true });
}

function openCompasChat(attempt = 0) {
  const host = document.querySelector('compas-one-web-chat');
  const shadowRoot = host?.shadowRoot;
  const launcher = shadowRoot?.querySelector('.launcher');
  const panel = shadowRoot?.querySelector('.panel');
  if (launcher) {
    if (!panel?.classList.contains('open')) launcher.click();
    armCompasIntentDelivery();
    return;
  }
  if (attempt < 60) {
    window.setTimeout(() => openCompasChat(attempt + 1), 200);
    return;
  }
  console.error('Agente Compás: el widget no terminó de inicializarse.');
}

function convertToAgentTrigger(element, label) {
  if (!element) return;
  element.removeAttribute('target');
  element.removeAttribute('rel');
  element.setAttribute('href', '#contacto');
  element.setAttribute('data-open-compas-chat', '');
  element.innerHTML = label;
}

const contactWhatsApp = document.querySelector('.contact-actions a[href*="wa.me"]');
convertToAgentTrigger(contactWhatsApp, 'Hablar con el Agente Compás <span>→</span>');
const footerWhatsApp = document.querySelector('.footer-grid a[href*="wa.me"]');
convertToAgentTrigger(footerWhatsApp, 'Agente Compás');

const navCta = document.querySelector('.nav-cta');
if (navCta) {
  navCta.textContent = 'Hablar con el Agente Compás';
  navCta.setAttribute('data-open-compas-chat', '');
}

const contactTitle = document.getElementById('contact-title');
if (contactTitle) contactTitle.textContent = 'Habla con el Agente Compás.';
const contactText = contactTitle?.nextElementSibling;
if (contactText && !contactText.textContent.includes('Cuéntanos qué quieres construir')) {
  contactText.textContent = 'Nuestro agente especializado en Proyecto Compás Evolution te ayudará a identificar qué necesitas, recomendar la ruta adecuada y registrar tu proyecto directamente en Compás One.';
}

document.querySelectorAll('[data-open-compas-chat]').forEach(trigger => {
  trigger.addEventListener('click', event => {
    event.preventDefault();
    const interest = resolveCompasInterest(trigger);
    if (interest) rememberCompasInterest(interest);
    nav?.classList.remove('open');
    toggle?.setAttribute('aria-expanded', 'false');
    openCompasChat();
  });
});