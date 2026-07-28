document.addEventListener("DOMContentLoaded", () => {
  const hero = document.querySelector(".hero-top");
  const spacer = document.querySelector(".hero-spacer");

  if (hero && spacer) {
    let ticking = false;
    let zoneStart = 0;

    // .post-list is sticky (see .post-curtain's ::after spacer trick in
    // style.scss, same technique as css-tricks.com/css-raise-the-curtains-effect),
    // so it stays pinned natively while hero-top lifts. hero-top's transform
    // is driven by the same scroll range, measured from the spacer's actual
    // document position, so the two stay lined up.
    const measureZoneStart = () => {
      zoneStart = spacer.getBoundingClientRect().top + window.scrollY;
    };

    const updateHero = () => {
      const vh = window.innerHeight;
      const progress = Math.min(Math.max((window.scrollY - zoneStart) / vh, 0), 1);

      hero.style.transform = `translateY(${progress * -100}vh)`;
      hero.style.opacity = String(1 - progress);

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
