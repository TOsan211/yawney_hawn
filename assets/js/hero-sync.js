// Two scroll-driven effects tied to the hero section:
// 1. Parallax -- the background image, tagline, and subtext each translate
//    at a different rate (image slowest, subtext fastest), which is what
//    reads as depth. Skipped for prefers-reduced-motion.
// 2. Site title in the fixed header fades out once the hero has scrolled
//    out of view -- it's only meant to float over the hero photo, not sit
//    awkwardly over the post list below. This isn't decorative motion, so
//    it still runs for prefers-reduced-motion users (without the parallax).
document.addEventListener("DOMContentLoaded", () => {
  const hero = document.getElementById("hero-top");
  if (!hero) return;

  const bg = hero.querySelector(".hero-top__bg");
  const tagline = hero.querySelector(".hero-top__tagline");
  const subtext = hero.querySelector(".hero-top__subtext");
  const siteTitle = document.querySelector(".site-title");
  if (!bg && !tagline && !subtext && !siteTitle) return;

  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const BG_RATE = 0.35;
  const TAGLINE_RATE = 0.18;
  const SUBTEXT_RATE = 0.1;
  // Title hides well before the hero itself has scrolled away -- at 35% of
  // the hero's height, it's still comfortably inside the hero photo, not
  // waiting until the section is fully gone.
  const TITLE_HIDE_FRACTION = 0.35;

  let ticking = false;

  const update = () => {
    ticking = false;
    const heroBottom = hero.offsetTop + hero.offsetHeight;
    const offset = window.scrollY;
    const pastHero = offset > heroBottom;

    if (siteTitle) siteTitle.classList.toggle("is-hidden", offset > hero.offsetHeight * TITLE_HIDE_FRACTION);

    // Parallax only matters while the hero is at/near the top of the
    // viewport -- skip the work once it's scrolled fully out of view.
    if (prefersReducedMotion || pastHero) return;

    if (bg) bg.style.transform = `translate3d(0, ${offset * BG_RATE}px, 0)`;
    if (tagline) tagline.style.transform = `translate3d(0, ${offset * TAGLINE_RATE}px, 0)`;
    if (subtext) subtext.style.transform = `translate3d(0, ${offset * SUBTEXT_RATE}px, 0)`;
  };

  const onScroll = () => {
    if (!ticking) {
      window.requestAnimationFrame(update);
      ticking = true;
    }
  };

  window.addEventListener("scroll", onScroll, { passive: true });
  update();
});
