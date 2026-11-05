/**
 * LOQUIVERSO — main.js
 * Navegación, resaltado de ruta activa y el efecto glitch de firma
 * del sitio: los títulos marcados con [data-glitch] cambian
 * brevemente a una versión "corrupta" (data-text) al pasar el
 * mouse o, en móvil, al entrar en pantalla.
 */

document.addEventListener("DOMContentLoaded", () => {
  initNav();
  initGlitchText();
  markActiveNav();
});

function initNav() {
  const toggle = document.querySelector(".nav-toggle");
  const nav = document.querySelector(".site-nav");
  if (!toggle || !nav) return;

  toggle.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", String(isOpen));
  });

  nav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      nav.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
    });
  });
}

function markActiveNav() {
  const current = location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".site-nav a[href]").forEach((link) => {
    const href = link.getAttribute("href").split("/").pop();
    if (href === current) link.classList.add("is-active");
  });
}

function initGlitchText() {
  const nodes = document.querySelectorAll("[data-glitch]");
  if (!nodes.length) return;

  nodes.forEach((node) => {
    node.classList.add("glitch-text");
    if (!node.getAttribute("data-text")) {
      node.setAttribute("data-text", node.getAttribute("data-glitch"));
    }

    let timer = null;
    const trigger = () => {
      node.classList.add("is-glitching");
      clearTimeout(timer);
      timer = setTimeout(() => node.classList.remove("is-glitching"), 650);
    };

    node.addEventListener("mouseenter", trigger);
    node.addEventListener("focus", trigger);
  });

  // En pantallas táctiles, dispara el glitch una vez al entrar en vista.
  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-glitching");
            setTimeout(() => entry.target.classList.remove("is-glitching"), 650);
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.6 }
    );
    nodes.forEach((n) => io.observe(n));
  }
}
