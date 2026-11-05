/**
 * LOQUIVERSO — characters.js
 * Genera automáticamente tarjetas, filtros y la página individual
 * de personaje a partir de data/characters.js. No edites este
 * archivo para agregar un personaje: edita el archivo de datos.
 */

function charInitial(name) {
  return name ? name.trim().charAt(0).toUpperCase() : "?";
}

function findCharacter(id) {
  return LOQUIVERSO_CHARACTERS.find((c) => c.id === id) || null;
}

/** Devuelve un <img> si hay imagen real, o una inicial de respaldo. */
function thumbHTML(character, sizeClass) {
  const initial = charInitial(character.name);
  if (!character.image) return initial;
  return `<img src="${character.image}" alt="${character.name}"
            loading="lazy"
            onerror="this.closest('.${sizeClass}').innerHTML = '${initial}';">`;
}

/* ------------------------------------------------ Tarjetas + filtros */
function renderCharacterGrid() {
  const grid = document.querySelector("[data-character-grid]");
  if (!grid) return;

  const filterBar = document.querySelector("[data-filter-bar]");
  let activeCategory = "Todos";

  function draw() {
    const list = LOQUIVERSO_CHARACTERS.filter(
      (c) => activeCategory === "Todos" || c.category === activeCategory
    );

    grid.innerHTML = list.length
      ? list.map(cardHTML).join("")
      : `<div class="empty-state">Ningún personaje en esta categoría todavía. El Loquiverso sigue creciendo.</div>`;
  }

  function cardHTML(c) {
    return `
      <article class="character-card">
        <div class="thumb">${thumbHTML(c, "thumb")}</div>
        <div class="body">
          <span class="cat">${c.category}</span>
          <h3>${c.name}</h3>
          <p>${c.shortDescription || ""}</p>
          <a class="btn btn-ghost" href="personaje.html?id=${c.id}">Ver personaje</a>
        </div>
      </article>`;
  }

  if (filterBar) {
    const categories = ["Todos", ...LOQUIVERSO_CATEGORIES];
    filterBar.innerHTML = categories
      .map(
        (cat, i) =>
          `<button class="chip${i === 0 ? " is-active" : ""}" data-cat="${cat}">${cat}</button>`
      )
      .join("");

    filterBar.querySelectorAll(".chip").forEach((chip) => {
      chip.addEventListener("click", () => {
        filterBar.querySelectorAll(".chip").forEach((c) => c.classList.remove("is-active"));
        chip.classList.add("is-active");
        activeCategory = chip.dataset.cat;
        draw();
      });
    });
  }

  draw();
}

/* ------------------------------------------------ Página individual */
function renderCharacterPage() {
  const root = document.querySelector("[data-character-page]");
  if (!root) return;

  const params = new URLSearchParams(location.search);
  const id = params.get("id");
  const character = findCharacter(id);

  if (!character) {
    root.innerHTML = `
      <div class="empty-state">
        No encontramos ese personaje. Puede que todavía no exista en este universo.
        <br><br><a class="btn btn-primary" href="personajes.html">Volver a Personajes</a>
      </div>`;
    document.title = "Personaje no encontrado — Loquiverso";
    return;
  }

  document.title = `${character.name} — Loquiverso`;

  const gallery = character.gallery && character.gallery.length
    ? `<div class="char-section">
         <h2>Galería</h2>
         <div class="gallery-grid">
           ${character.gallery
             .map(
               (g) =>
                 `<img src="${g.src}" alt="${g.alt || character.name}" loading="lazy" onerror="this.remove()">`
             )
             .join("")}
         </div>
       </div>`
    : "";

  const relationships = character.relationships && character.relationships.length
    ? `<div class="char-section">
         <h2>Relaciones</h2>
         <div class="rel-grid">
           ${character.relationships
             .map((r) => {
               const other = findCharacter(r.character);
               const label = other ? other.name : r.character;
               const href = other ? `personaje.html?id=${other.id}` : "#";
               return `<a class="rel-card" href="${href}">
                         <span>${label}</span>
                         <span class="type">${r.type}</span>
                       </a>`;
             })
             .join("")}
         </div>
       </div>`
    : "";

  const easterEggs = character.easterEggs && character.easterEggs.length
    ? `<div class="char-section">
         <h2>Easter eggs</h2>
         <ul class="tag-list" style="flex-direction:column; align-items:flex-start; gap:10px;">
           ${character.easterEggs.map((e) => `<li>${e}</li>`).join("")}
         </ul>
       </div>`
    : "";

  const appearances = character.appearances && character.appearances.length
    ? `<div class="char-section">
         <h2>Apariciones</h2>
         <ul class="tag-list">
           ${character.appearances.map((a) => `<li>${a}</li>`).join("")}
         </ul>
       </div>`
    : "";

  root.innerHTML = `
    <div class="char-hero">
      <div class="thumb-lg">${thumbHTML(character, "thumb-lg")}</div>
      <div>
        <span class="eyebrow">${character.category}</span>
        <h1 data-glitch="${character.name}" data-text="${scrambled(character.name)}">${character.name}</h1>
        ${character.alias ? `<p style="color:var(--ink-faint); font-family:var(--font-mono); font-size:0.9rem;">${character.alias}</p>` : ""}
        <div class="char-meta">
          <span class="char-tag">Estado: ${character.status || "Por definir"}</span>
        </div>
        <p style="max-width:60ch;">${character.description || "Por definir"}</p>
      </div>
    </div>

    <div class="char-section">
      <h2>Personalidad</h2>
      <ul class="tag-list">
        ${(character.personality && character.personality.length
          ? character.personality
          : ["Por definir"]
        )
          .map((p) => `<li>${p}</li>`)
          .join("")}
      </ul>
    </div>

    <div class="char-section">
      <h2>Poderes</h2>
      <ul class="tag-list" style="flex-direction:column; align-items:flex-start; gap:10px;">
        ${(character.powers && character.powers.length ? character.powers : ["Por definir"])
          .map((p) => `<li>${p}</li>`)
          .join("")}
      </ul>
    </div>

    <div class="char-section">
      <h2>Historia</h2>
      <p style="max-width:65ch;">${character.lore || "Por definir"}</p>
    </div>

    ${relationships}
    ${easterEggs}
    ${appearances}
    ${gallery}
  `;

  renderCharNav(character);
  if (window.initGlitchText) initGlitchText();
}

function renderCharNav(current) {
  const nav = document.querySelector("[data-character-nav]");
  if (!nav) return;

  const i = LOQUIVERSO_CHARACTERS.findIndex((c) => c.id === current.id);
  const prev = LOQUIVERSO_CHARACTERS[(i - 1 + LOQUIVERSO_CHARACTERS.length) % LOQUIVERSO_CHARACTERS.length];
  const next = LOQUIVERSO_CHARACTERS[(i + 1) % LOQUIVERSO_CHARACTERS.length];

  nav.innerHTML = `
    <a href="personaje.html?id=${prev.id}">← ${prev.name}</a>
    <a href="personajes.html">Todos los personajes</a>
    <a href="personaje.html?id=${next.id}">${next.name} →</a>
  `;
}

/** Genera una versión "corrupta" simple de un texto para el hover glitch. */
function scrambled(text) {
  const map = { a: "λ", e: "3", i: "ι", o: "0", u: "υ", n: "ñ" };
  return text
    .split("")
    .map((ch) => map[ch.toLowerCase()] || ch)
    .join("");
}

document.addEventListener("DOMContentLoaded", () => {
  renderCharacterGrid();
  renderCharacterPage();
});
