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
document.getElementById('year').textContent = new Date().getFullYear();

function openCompasChat(attempt = 0) {
  const host = document.querySelector('compas-one-web-chat');
  const launcher = host?.shadowRoot?.querySelector('.launcher');

  if (launcher) {
    launcher.click();
    return;
  }

  if (attempt < 20) {
    window.setTimeout(() => openCompasChat(attempt + 1), 150);
  }
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
