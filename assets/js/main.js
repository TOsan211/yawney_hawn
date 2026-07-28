document.addEventListener("DOMContentLoaded", () => {
  const hero = document.querySelector(".hero-top");
  const postPinWrapper = document.querySelector(".post-pin-wrapper");

  if (hero && postPinWrapper) {
    let ticking = false;
    let zoneStart = 0;

    // .post-list inside .post-pin-wrapper is position:sticky, so it stays
    // pinned to the top of the viewport for exactly 100vh of scroll starting
    // at the wrapper's natural document position (see the padding-bottom
    // trick in style.scss), then releases and scrolls normally. hero-top's
    // lift animation is driven by the same scroll range so the two stay in
    // sync: the curtain finishes lifting exactly as the post list unsticks.
    const measureZoneStart = () => {
      zoneStart = postPinWrapper.getBoundingClientRect().top + window.scrollY;
    };

    const updateHero = () => {
      const vh = window.innerHeight;
      const progress = Math.min(Math.max((window.scrollY - zoneStart) / vh, 0), 1);

      hero.style.transform = `translateY(${progress * -100}vh)`;

      ticking = false;
    };

    window.addEventListener("resize", () => {
      measureZoneStart();
      updateHero();
    });

    window.addEventListener(
      "scroll",
      () => {
        if (!ticking) {
          window.requestAnimationFrame(updateHero);
          ticking = true;
        }
      },
      { passive: true }
    );

    measureZoneStart();
    updateHero();
  }

  const toggle = document.querySelector(".menu-toggle");
  const menu = document.querySelector(".site-menu");
  if (!toggle || !menu) return;

  const openMenu = () => {
    menu.classList.add("is-open");
    menu.setAttribute("aria-hidden", "false");
    toggle.setAttribute("aria-expanded", "true");
  };

  const closeMenu = () => {
    menu.classList.remove("is-open");
    menu.setAttribute("aria-hidden", "true");
    toggle.setAttribute("aria-expanded", "false");
  };

  toggle.addEventListener("click", (event) => {
    event.preventDefault();
    if (menu.classList.contains("is-open")) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  document.addEventListener("click", (event) => {
    if (menu.classList.contains("is-open") && !menu.contains(event.target) && !toggle.contains(event.target)) {
      closeMenu();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeMenu();
  });
});
