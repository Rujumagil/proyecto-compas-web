const OFFICIAL_COMPAS_LOGOS = {
  'compas-evolution-oficial.avif': 'https://static.wixstatic.com/media/11f124_7d522fe953aa494590cdd467d5233c39~mv2.png',
  'compas-one-oficial.avif': 'https://static.wixstatic.com/media/11f124_48fca4d474df41618043a61de8f7015c~mv2.png',
  'compas-academia-oficial.avif': 'https://static.wixstatic.com/media/11f124_41c69c5dc66d4ca1933873d64dd4bcfd~mv2.png',
  'compas-creators-oficial.avif': 'https://static.wixstatic.com/media/11f124_b9cbe5ebf44c4b6f93dbf60cd0149796~mv2.png',
  'compas-ia-oficial.avif': 'https://static.wixstatic.com/media/11f124_c1cdfda872934a0cb7ee6ac4507e1803~mv2.png'
};

// Sustituye únicamente la fuente técnica de carga. El diseño de los logotipos oficiales no se altera.
document.querySelectorAll('img').forEach(img => {
  const current = img.getAttribute('src');
  const official = OFFICIAL_COMPAS_LOGOS[current];
  if (official) img.setAttribute('src', official);
});

// Agente Compás Evolution: usar siempre el widget estable de producción y la clave activa real.
// Se inyecta de forma síncrona antes del embed antiguo del HTML para evitar carreras con previews obsoletos.
const COMPAS_CHAT_SCRIPT = 'https://app.proyectocompas.com/compas-chat.js';
const COMPAS_CHAT_PUBLIC_KEY = 'wc_775408ca243abfea3d5ec95025e3c2d9bdbb';

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
    nav.classList.remove('open');
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

// P0 legal: mantener visibles desde el sitio principal todos los documentos de transparencia.
const projectFooterColumn = Array.from(document.querySelectorAll('.footer-grid > div')).find(column =>
  column.querySelector('h3')?.textContent?.trim() === 'Proyecto Compás'
);

const legalFooterLinks = [
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

function openCompasChat(attempt = 0) {
  const host = document.querySelector('compas-one-web-chat');
  const launcher = host?.shadowRoot?.querySelector('.launcher');

  if (launcher) {
    launcher.click();
    return;
  }

  // Da hasta 12 segundos para completar carga/configuración en conexiones lentas.
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

// El Agente Compás Evolution sustituye a WhatsApp como canal principal de la web.
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
if (contactText) {
  contactText.textContent = 'Nuestro agente especializado en Proyecto Compás Evolution te ayudará a identificar qué necesitas, recomendar la ruta adecuada y registrar tu proyecto directamente en Compás One.';
}

document.querySelectorAll('[data-open-compas-chat]').forEach(trigger => {
  trigger.addEventListener('click', event => {
    event.preventDefault();
    nav?.classList.remove('open');
    toggle?.setAttribute('aria-expanded', 'false');
    openCompasChat();
  });
});
