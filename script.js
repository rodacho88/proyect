  // Scroll suave a secciones internas sin usar navegación por ancla
  // (evita el aviso de "enlace externo" del visor de artefactos)
  document.querySelectorAll('[data-scroll]').forEach((link) => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const target = document.getElementById(link.getAttribute('data-scroll'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // Fondo del menú al hacer scroll, para que el texto siga siendo legible
  const siteHeader = document.querySelector('header');
  const onScroll = () => {
    if (window.scrollY > 60) {
      siteHeader.classList.add('scrolled');
    } else {
      siteHeader.classList.remove('scrolled');
    }
  };
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  // Activa las animaciones de animations.css cuando cada
  // elemento .reveal* entra en la pantalla al hacer scroll.
  const revealEls = document.querySelectorAll(
    '.reveal, .reveal-soft, .reveal-left, .reveal-right, .reveal-scale'
  );

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

    revealEls.forEach((el) => observer.observe(el));
  } else {
    // Sin soporte: mostrar todo directamente
    revealEls.forEach((el) => el.classList.add('in-view'));
  }
