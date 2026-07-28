document.addEventListener("DOMContentLoaded", () => {
  const hero = document.querySelector(".hero-top");
  const headerEl = document.querySelector("header");

  if (hero) {
    let ticking = false;

    // The post list is normal-flow content that sits right after a 100vh
    // spacer, so it scrolls into view on its own as the user scrolls -- no
    // fixed/static toggling needed. hero-top just needs to translate away in
    // sync with that same scroll distance so the two stay lined up. The
    // headerHeight offset accounts for the header sitting above hero-top in
    // the document (hero-top is covering it visually until this catches up).
    const updateHero = () => {
      const headerHeight = headerEl ? headerEl.offsetHeight : 0;
      const vh = window.innerHeight;
      const progress = Math.min(Math.max((window.scrollY - headerHeight) / vh, 0), 1);

      hero.style.transform = `translateY(${progress * -100}vh)`;

      ticking = false;
    };

    window.addEventListener("resize", updateHero);

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
