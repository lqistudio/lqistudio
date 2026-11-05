/**
 * LOQUIVERSO — lore.js
 * Renderiza las entradas de lore, la cronología, los easter eggs
 * y el bloque de AET_HARMONY a partir de data/lore.js.
 */

document.addEventListener("DOMContentLoaded", () => {
  renderLoreList();
  renderTimeline();
  renderEasterEggs();
  renderAetHarmony();
});

function renderLoreList() {
  const root = document.querySelector("[data-lore-list]");
  if (!root || typeof LOQUIVERSO_LORE === "undefined") return;

  root.innerHTML = LOQUIVERSO_LORE.map(
    (entry) => `
      <article class="lore-item" id="${entry.id}">
        <h3>${entry.title}</h3>
        <p style="max-width:70ch;">${entry.body}</p>
      </article>`
  ).join("");
}

function renderTimeline() {
  const root = document.querySelector("[data-timeline]");
  if (!root || typeof LOQUIVERSO_TIMELINE === "undefined") return;

  const sorted = [...LOQUIVERSO_TIMELINE].sort((a, b) => a.order - b.order);
  root.innerHTML = sorted
    .map(
      (item) => `
      <div class="timeline-item">
        <div class="order">Etapa ${String(item.order).padStart(2, "0")}</div>
        <h3>${item.title}</h3>
        <p style="max-width:60ch;">${item.body}</p>
      </div>`
    )
    .join("");
}

function renderEasterEggs() {
  const root = document.querySelector("[data-egg-grid]");
  if (!root || typeof LOQUIVERSO_EASTER_EGGS === "undefined") return;

  root.innerHTML = LOQUIVERSO_EASTER_EGGS.map(
    (egg) => `
      <article class="egg-card">
        <span class="eyebrow">Easter egg</span>
        <h3>${egg.name}</h3>
        <p>${egg.description}</p>
      </article>`
  ).join("");
}

function renderAetHarmony() {
  const table = document.querySelector("[data-aet-table]");
  if (table && typeof LOQUIVERSO_AET_HARMONY !== "undefined") {
    table.innerHTML = `
      <tr><th>Elemento</th><th>Notación</th></tr>
      ${LOQUIVERSO_AET_HARMONY.elements
        .map((e) => `<tr><td>${e.label}</td><td>${e.value}</td></tr>`)
        .join("")}
    `;
  }

  const intro = document.querySelector("[data-aet-intro]");
  if (intro && typeof LOQUIVERSO_AET_HARMONY !== "undefined") {
    intro.textContent = LOQUIVERSO_AET_HARMONY.intro;
  }

  const source = document.querySelector("[data-aet-source]");
  if (source && typeof LOQUIVERSO_AET_HARMONY !== "undefined") {
    source.textContent = LOQUIVERSO_AET_HARMONY.source;
  }
}
