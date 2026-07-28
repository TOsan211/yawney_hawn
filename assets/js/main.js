document.addEventListener("DOMContentLoaded", () => {
  const hero = document.querySelector(".hero-top");
  const postPanel = document.querySelector(".post-list-panel");
  const spacer = document.querySelector(".hero-reveal__spacer");

  if (hero && postPanel && spacer) {
    let ticking = false;

    // hero-top / post-list-panel are both position:fixed, so they contribute
    // zero height to the document flow while pinned. The spacer has to make
    // up for that by reserving enough room for scrollY to actually reach one
    // full viewport height, on top of whatever the header/footer occupy.
    const sizeSpacer = () => {
      const headerEl = document.querySelector("header");
      const footerEl = document.querySelector("footer");
      const headerHeight = headerEl ? headerEl.offsetHeight : 0;
      const footerHeight = footerEl ? footerEl.offsetHeight : 0;
      const vh = window.innerHeight;
      const needed = vh * 2 - headerHeight - footerHeight;
      spacer.style.height = `${Math.max(needed, vh)}px`;
    };

    const updateHero = () => {
      const vh = window.innerHeight;
      const progress = Math.min(Math.max(window.scrollY / vh, 0), 1);

      hero.style.transform = `translateY(${progress * -100}vh)`;

      if (progress >= 1) {
        postPanel.classList.add("is-released");
      } else {
        postPanel.classList.remove("is-released");
      }

      ticking = false;
    };

    window.addEventListener("resize", sizeSpacer);

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

    sizeSpacer();
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
