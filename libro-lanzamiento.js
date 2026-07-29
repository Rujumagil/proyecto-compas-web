(() => {
  "use strict";

  const body = document.body;
  const header = document.querySelector(".launch-site-header");
  const menuButton = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".launch-main-nav");

  // Respaldo para el menú móvil. Es compatible con el script general del sitio.
  if (menuButton && nav && !menuButton.dataset.launchBound) {
    menuButton.dataset.launchBound = "true";
    menuButton.addEventListener("click", () => {
      const isOpen = nav.classList.toggle("open");
      menuButton.setAttribute("aria-expanded", String(isOpen));
      body.classList.toggle("menu-open", isOpen);
    });

    nav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        nav.classList.remove("open");
        menuButton.setAttribute("aria-expanded", "false");
        body.classList.remove("menu-open");
      });
    });
  }

  // Encabezado compacto al desplazarse.
  const updateHeader = () => header?.classList.toggle("scrolled", window.scrollY > 18);
  updateHeader();
  window.addEventListener("scroll", updateHeader, { passive: true });

  // Aparición progresiva. No interfiere si script.js ya la ejecutó.
  const revealItems = document.querySelectorAll(".reveal:not(.visible)");
  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver((entries, currentObserver) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("visible");
        currentObserver.unobserve(entry.target);
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -45px" });

    revealItems.forEach((item) => observer.observe(item));
  } else {
    revealItems.forEach((item) => item.classList.add("visible"));
  }

  // Cuenta regresiva al lanzamiento del 3 de agosto de 2026 a las 7:00 p. m.,
  // hora de Guadalajara, México.
  const countdown = document.querySelector("[data-countdown]");
  if (countdown) {
    const target = new Date(countdown.dataset.countdown).getTime();
    const daysNode = countdown.querySelector("[data-days]");
    const hoursNode = countdown.querySelector("[data-hours]");
    const minutesNode = countdown.querySelector("[data-minutes]");
    const secondsNode = countdown.querySelector("[data-seconds]");
    const statusNode = countdown.querySelector("[data-countdown-status]");
    let timerId;

    const pad = (value) => String(Math.max(0, value)).padStart(2, "0");

    const renderCountdown = () => {
      const distance = target - Date.now();

      if (!Number.isFinite(target) || distance <= 0) {
        daysNode.textContent = "00";
        hoursNode.textContent = "00";
        minutesNode.textContent = "00";
        secondsNode.textContent = "00";
        statusNode.textContent = "El lanzamiento ya está disponible";
        if (timerId) window.clearInterval(timerId);
        return;
      }

      const days = Math.floor(distance / 86_400_000);
      const hours = Math.floor((distance % 86_400_000) / 3_600_000);
      const minutes = Math.floor((distance % 3_600_000) / 60_000);
      const seconds = Math.floor((distance % 60_000) / 1_000);

      daysNode.textContent = pad(days);
      hoursNode.textContent = pad(hours);
      minutesNode.textContent = pad(minutes);
      secondsNode.textContent = pad(seconds);
    };

    renderCountdown();
    timerId = window.setInterval(renderCountdown, 1_000);
  }

  // Año automático del pie de página.
  const year = document.getElementById("year");
  if (year) year.textContent = String(new Date().getFullYear());
})();
