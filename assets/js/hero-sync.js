// Applies hero-top's scroll-driven transform/opacity synchronously, right as
// this script is parsed (immediately after .hero-top and .post-curtain in
// the markup), so a page load that lands mid-scroll (browser back/forward
// restoring scroll position, for example) doesn't flash the untransformed
// hero for a frame before main.js catches up on DOMContentLoaded.
(function () {
  var hero = document.getElementById("hero-top");
  var curtain = document.querySelector(".post-curtain");
  if (!hero || !curtain) return;
  var vh = window.innerHeight;
  var zoneStart = curtain.getBoundingClientRect().top + window.scrollY;
  var progress = Math.min(Math.max((window.scrollY - zoneStart) / vh, 0), 1);
  hero.style.transform = "translateY(" + progress * -100 + "vh)";
  hero.style.opacity = String(1 - progress);
})();
