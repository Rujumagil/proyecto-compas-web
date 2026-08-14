(() => {
  const header=document.querySelector('.header');
  const menu=document.querySelector('.menu');
  const nav=document.querySelector('.nav-links');
  const year=document.getElementById('year');
  if(year) year.textContent=new Date().getFullYear();

  const syncHeader=()=>header?.classList.toggle('scrolled',scrollY>24);
  syncHeader();
  addEventListener('scroll',syncHeader,{passive:true});

  menu?.addEventListener('click',()=>{
    const open=nav?.classList.toggle('open');
    menu.setAttribute('aria-expanded',String(Boolean(open)));
  });
  nav?.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{
    nav.classList.remove('open');
    menu?.setAttribute('aria-expanded','false');
  }));

  const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{
    if(entry.isIntersecting){entry.target.classList.add('visible');observer.unobserve(entry.target)}
  }),{threshold:.12,rootMargin:'0px 0px -35px'});
  document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));

  const CHAT_SRC='https://app.proyectocompas.com/compas-chat.js';
  const CHAT_KEY='wc_775408ca243abfea3d5ec95025e3c2d9bdbb';
  if(!document.querySelector('compas-one-web-chat')&&!document.querySelector('script[data-compas-chat-v3]')){
    const s=document.createElement('script');
    s.src=CHAT_SRC;
    s.dataset.key=CHAT_KEY;
    s.dataset.compasChatV3='true';
    document.body.appendChild(s);
  }

  function openChat(attempt=0){
    const host=document.querySelector('compas-one-web-chat');
    const launcher=host?.shadowRoot?.querySelector('.launcher');
    const panel=host?.shadowRoot?.querySelector('.panel');
    if(launcher){if(!panel?.classList.contains('open')) launcher.click();return}
    if(attempt<50) setTimeout(()=>openChat(attempt+1),180);
  }

  document.querySelectorAll('[data-open-compas-chat]').forEach(el=>el.addEventListener('click',e=>{
    e.preventDefault();
    nav?.classList.remove('open');
    menu?.setAttribute('aria-expanded','false');
    openChat();
  }));
})();
