(() => {
  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

  // Mobile navbar toggle (preserve same behavior)
  const navToggle = $('.nav-toggle');
  const mobileMenu = $('.mobile-menu');
  if (navToggle && mobileMenu) {
    const icons = {
      open: navToggle.querySelector('.icon-x'),
      close: navToggle.querySelector('.icon-menu'),
    };

    let isOpen = false;
    const setOpen = (value) => {
      isOpen = value;
      mobileMenu.hidden = !value;
      if (icons.open && icons.close) {
        icons.open.style.display = value ? 'inline-flex' : 'none';
        icons.close.style.display = value ? 'none' : 'inline-flex';
      }
    };

    navToggle.addEventListener('click', (e) => {
      e.preventDefault();
      setOpen(!isOpen);
    });

    // close on link click
    $$('.mobile-link').forEach((a) => {
      a.addEventListener('click', () => setOpen(false));
    });
  }

  // Smooth reveal animations for elements with anim-in
  const animEls = $$('.anim-in');
  const applyInView = (el) => el.classList.add('in-view');

  // Fallback if IntersectionObserver missing
  if (!('IntersectionObserver' in window)) {
    animEls.forEach(applyInView);
  } else {
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            applyInView(entry.target);
            io.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.25 }
    );
    animEls.forEach((el) => io.observe(el));
  }

  // Hero title fade/zoom elements
  const heroAnim = $$('.hero-left.anim-fade-up, .hero-right.anim-zoom');
  heroAnim.forEach((el) => {
    // make visible immediately to mimic initial/animate in React
    if (el.classList.contains('anim-fade-up')) {
      el.style.opacity = '1';
      el.style.transform = 'translateY(0)';
    }
    if (el.classList.contains('anim-zoom')) {
      el.style.opacity = '1';
      el.style.transform = 'scale(1)';
    }
  });
})();

