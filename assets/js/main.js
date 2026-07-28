document.addEventListener("DOMContentLoaded", () => {
  const hero = document.querySelector(".hero-top");
  const spacer = document.querySelector(".hero-spacer");
  const postSection = document.querySelector(".post-section");
  const postReserve = document.querySelector(".post-reserve");

  if (hero && spacer && postSection && postReserve) {
    let ticking = false;
    let zoneStart = 0;
    let pinned = null; // tri-state so the first run always applies something

    const measureZoneStart = () => {
      zoneStart = spacer.getBoundingClientRect().top + window.scrollY;
    };

    const update = () => {
      const vh = window.innerHeight;
      const progress = Math.min(Math.max((window.scrollY - zoneStart) / vh, 0), 1);

      hero.style.transform = `translateY(${progress * -100}vh)`;
      hero.style.opacity = String(1 - progress);

      const shouldPin = progress < 1;
      if (shouldPin !== pinned) {
        pinned = shouldPin;
        postSection.classList.toggle("is-pinned", pinned);
      }
      // Recomputed every run (not just on state change) so a resize while
      // still pinned doesn't leave a stale reserve height from the old vh.
      postReserve.style.height = pinned ? `${vh * 2}px` : "0px";

      ticking = false;
    };

    window.addEventListener("resize", () => {
      measureZoneStart();
      update();
    });

    window.addEventListener(
      "scroll",
      () => {
        if (!ticking) {
          window.requestAnimationFrame(update);
          ticking = true;
        }
      },
      { passive: true }
    );

    measureZoneStart();
    update();
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
