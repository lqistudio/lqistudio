/**
 * LOQUIVERSO — search.js
 * Buscador global. Indexa personajes, entradas de lore, easter eggs
 * y elementos del idioma glitch. Se conecta a cualquier input con
 * el atributo [data-search-input] presente en la barra de navegación.
 */

function buildSearchIndex() {
  const index = [];

  if (typeof LOQUIVERSO_CHARACTERS !== "undefined") {
    LOQUIVERSO_CHARACTERS.forEach((c) => {
      index.push({
        type: "Personaje",
        title: c.name,
        text: [c.alias, c.shortDescription, c.description, (c.powers || []).join(" ")].join(" "),
        href: `personaje.html?id=${c.id}`
      });
    });
  }

  if (typeof LOQUIVERSO_LORE !== "undefined") {
    LOQUIVERSO_LORE.forEach((l) => {
      index.push({
        type: "Lore",
        title: l.title,
        text: `${l.summary} ${l.body}`,
        href: `lore.html#${l.id}`
      });
    });
  }

  if (typeof LOQUIVERSO_EASTER_EGGS !== "undefined") {
    LOQUIVERSO_EASTER_EGGS.forEach((e) => {
      index.push({
        type: "Easter egg",
        title: e.name,
        text: e.description,
        href: "easter-eggs.html"
      });
    });
  }

  if (typeof LOQUIVERSO_TIMELINE !== "undefined") {
    LOQUIVERSO_TIMELINE.forEach((t) => {
      index.push({
        type: "Cronología",
        title: t.title,
        text: t.body,
        href: "cronologia.html"
      });
    });
  }

  if (typeof LOQUIVERSO_AET_HARMONY !== "undefined") {
    index.push({
      type: "Idioma",
      title: "AET_HARMONY",
      text: `${LOQUIVERSO_AET_HARMONY.intro} LQI lambda theta iota`,
      href: "idioma.html"
    });
  }

  return index;
}

document.addEventListener("DOMContentLoaded", () => {
  const input = document.querySelector("[data-search-input]");
  const results = document.querySelector("[data-search-results]");
  if (!input || !results) return;

  const index = buildSearchIndex();

  input.addEventListener("input", () => {
    const q = input.value.trim().toLowerCase();
    if (q.length < 2) {
      results.innerHTML = "";
      results.hidden = true;
      return;
    }

    const matches = index
      .filter((item) => (item.title + " " + item.text).toLowerCase().includes(q))
      .slice(0, 8);

    results.hidden = matches.length === 0;
    results.innerHTML = matches
      .map(
        (m) => `
        <a href="${m.href}" class="search-result">
          <span class="search-type">${m.type}</span>
          <span>${m.title}</span>
        </a>`
      )
      .join("");
  });

  document.addEventListener("click", (e) => {
    if (!e.target.closest(".nav-search-wrap")) {
      results.hidden = true;
    }
  });
});
