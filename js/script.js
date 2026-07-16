document.addEventListener("DOMContentLoaded", function () {});

function smoothScrollTo(targetY, duration = 600) {
  const startY = window.scrollY || window.pageYOffset;
  const distance = targetY - startY;
  if (distance === 0) return;

  const startTime = performance.now();

  function easeInOutQuad(t) {
    return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
  }

  function step(now) {
    let t = (now - startTime) / duration;
    if (t > 1) t = 1;

    const eased = easeInOutQuad(t);
    window.scrollTo(0, startY + distance * eased);

    if (t < 1) requestAnimationFrame(step);
  }

  requestAnimationFrame(step);
}

// Attach to the main image/video on the page
document.querySelector("#main-img").addEventListener("click", function () {
  // If autoplay was blocked (e.g. Low Power Mode), the video is still
  // paused when tapped. Let that first tap start it instead of scrolling.
  if (this.tagName === "VIDEO" && this.paused) {
    this.play().catch(() => {});
    return;
  }

  const doc = document.documentElement;
  const body = document.body;
  const maxScroll =
    Math.max(doc.scrollHeight, body.scrollHeight) - window.innerHeight;
  const current = window.scrollY || window.pageYOffset;

  const atBottom = current >= maxScroll - 5; // small tolerance

  if (atBottom) {
    smoothScrollTo(0, 600); // back to top
  } else {
    smoothScrollTo(maxScroll, 600); // down to bottom
  }
});

const copyOnClick = document.querySelector(".copyOnClick");

copyOnClick.addEventListener("click", () => {
  navigator.clipboard.writeText(copyOnClick.textContent).then(() => {
    alert("Copied to clipboard :) ");
  });
});
