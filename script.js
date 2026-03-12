const yearEl = document.getElementById("year");
const btn = document.getElementById("themeToggle");
const topbar = document.querySelector(".topbar");
const hero = document.querySelector(".hero");
const root = document.documentElement;
const body = document.body;

if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}

function updateThemeButton(theme) {
  if (!btn) return;

  const toggleText = btn.querySelector(".nav_toggleText");
  const toggleIcon = btn.querySelector(".nav_toggleIcon");
  const isDark = theme === "dark";

  if (toggleText) {
    toggleText.textContent = isDark ? "Light" : "Dark";
  }

  if (toggleIcon) {
    toggleIcon.textContent = isDark ? "☼" : "☾";
  }

  btn.setAttribute("aria-pressed", String(isDark));
}

function applyTheme(theme) {
  const nextTheme = theme === "dark" ? "dark" : "light";

  root.setAttribute("data-theme", nextTheme);
  body.classList.toggle("theme_dark", nextTheme === "dark");
  body.classList.toggle("theme_snow", nextTheme === "light");

  try {
    localStorage.setItem("theme", nextTheme);
  } catch (err) {}

  updateThemeButton(nextTheme);
  window.dispatchEvent(new CustomEvent("themechange", { detail: { theme: nextTheme } }));
}

function getInitialTheme() {
  try {
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme === "dark" || storedTheme === "light") {
      return storedTheme;
    }
  } catch (err) {}

  if (root.getAttribute("data-theme") === "dark" || body.classList.contains("theme_dark")) {
    return "dark";
  }

  return "light";
}

applyTheme(getInitialTheme());

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

if (btn) {
  btn.addEventListener("click", () => {
    const nextTheme = body.classList.contains("theme_dark") ? "light" : "dark";
    applyTheme(nextTheme);
  });
}

if (topbar && hero) {
  const toggleTopbar = () => {
    const heroBottom = hero.getBoundingClientRect().bottom;
    const offset = 90;

    if (heroBottom <= offset) {
      topbar.classList.add("is_visible");
    } else {
      topbar.classList.remove("is_visible");
    }
  };

  toggleTopbar();
  window.addEventListener("scroll", toggleTopbar, { passive: true });
  window.addEventListener("resize", toggleTopbar);
}
