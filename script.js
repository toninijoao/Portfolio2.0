const yearEl = document.getElementById("year");

if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}

document.querySelectorAll(".liquid_glass").forEach((el) => {
  const padding = el.getAttribute("data_padding");
  const radius = el.getAttribute("data_corner_radius");

  if (padding) el.style.setProperty("--lg_padding", padding);
  if (radius) el.style.setProperty("--lg_radius", radius + "px");

  el.addEventListener("mouseenter", () => el.classList.add("is_hover"));

  el.addEventListener("mouseleave", () => {
    el.classList.remove("is_hover");
    el.classList.remove("is_active");

    const ripple = el.querySelector(".liquid_glass_ripple");
    if (ripple) {
      ripple.style.transform = "translate(-50%, -50%) scale(0)";
    }
  });

  el.addEventListener("mousedown", () => el.classList.add("is_active"));

  el.addEventListener("mouseup", () => {
    el.classList.remove("is_active");

    const ripple = el.querySelector(".liquid_glass_ripple");
    if (ripple) {
      setTimeout(() => {
        ripple.style.transform = "translate(-50%, -50%) scale(0)";
      }, 150);
    }
  });
});

const btn = document.getElementById("themeToggle");

if (btn) {
  btn.addEventListener("click", () => {
    document.body.classList.toggle("theme_snow");
    document.body.classList.toggle("theme_dark");

    const isDark = document.body.classList.contains("theme_dark");
    const toggleText = btn.querySelector(".nav_toggleText");

    if (toggleText) {
      toggleText.textContent = isDark ? "Light" : "Dark";
    }
  });
}

const topbar = document.querySelector(".topbar");
const sentinel = document.getElementById("nav_sentinel");

if (topbar && sentinel) {
  const io = new IntersectionObserver(
    (entries) => {
      const entry = entries[0];

      if (!entry.isIntersecting) {
        topbar.classList.add("is_visible");
      } else {
        topbar.classList.remove("is_visible");
      }
    },
    { root: null, threshold: 0 }
  );

  io.observe(sentinel);
}
