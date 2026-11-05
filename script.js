/* ========= Textos ES / EN ========= */
const T = {
  es: {
    nav_studio:'Estudio', nav_services:'Servicios', nav_works:'Trabajos', nav_links:'Enlaces',
    h1:'Revelar los pigmentos neón ocultos dentro de la oscuridad.',
    lead:'Estudio creativo digital y audiovisual. Diseño gráfico, motion graphics, wallpapers animados y desarrollo web con personalidad propia.',
    cta1:'Ver trabajos', cta2:'Contacto y redes',
    hint:'Mueve el cursor para encender la luz.',
    studio_t:'Arte, diseño, tecnología y movimiento',
    studio_p:'LQISTUDIO transforma ideas en experiencias visuales. La oscuridad es el lienzo; el neón es el pigmento.',
    mission_t:'Misión', mission_p:'Crear experiencias visuales y digitales que conviertan ideas en algo memorable.',
    vision_t:'Visión', vision_p:'Ser un estudio reconocido por universos visuales donde el arte y la tecnología se encuentran.',
    pal_hint:'Toca un color para copiar su código.',
    svc_t:'Servicios',
    s1:'Motion graphics', s1d:'Animación y videos con ritmo, luz y color.',
    s2:'Wallpapers animados', s2d:'Fondos audio-reactivos y animados para Wallpaper Engine.',
    s3:'Overlays y branding', s3d:'Identidad visual y overlays para streamers y creadores.',
    s4:'Arte digital', s4d:'Ilustración y experimentación visual.',
    s5:'Desarrollo web', s5d:'Webs interactivas hechas a mano.',
    works_t:'Trabajos', works_p:'Contenido real, cargado en vivo desde su plataforma de origen.',
    links_t:'Hablemos', links_p:'Disponible para colaboraciones y comisiones.',
    commissions:'Comisiones abiertas',
    quote:'La oscuridad está llena de colores esperando ser encontrados.',
    copied:'Copiado', nav_arcade:'Arcade', arc_t:'Arcade', arc_p:'Juega un rato: cada color que atrapas deja su huella.', g1_t:'Atrapa los pigmentos', g2_t:'Eco de color', score:'Puntos', best:'Récord', round:'Ronda', play:'Jugar', again:'Otra vez', hintg1:'Toca los orbes de colores. Evita los apagados.', watch:'Mira la secuencia…', yourturn:'Tu turno.', lose:'Fallaste. Última ronda superada:'
  },
  en: {
    nav_studio:'Studio', nav_services:'Services', nav_works:'Work', nav_links:'Links',
    h1:'Revealing the neon pigments hidden inside the dark.',
    lead:'A digital and audiovisual creative studio. Graphic design, motion graphics, animated wallpapers and web development with a personality of their own.',
    cta1:'See the work', cta2:'Contact and socials',
    hint:'Move your cursor to turn the light on.',
    studio_t:'Art, design, technology and motion',
    studio_p:'LQISTUDIO turns ideas into visual experiences. The dark is the canvas; neon is the pigment.',
    mission_t:'Mission', mission_p:'To create visual and digital experiences that turn ideas into something memorable.',
    vision_t:'Vision', vision_p:'To be a studio known for visual universes where art and technology meet.',
    pal_hint:'Tap a color to copy its code.',
    svc_t:'Services',
    s1:'Motion graphics', s1d:'Animation and video with rhythm, light and color.',
    s2:'Animated wallpapers', s2d:'Audio-reactive, animated backgrounds for Wallpaper Engine.',
    s3:'Overlays and branding', s3d:'Visual identity and overlays for streamers and creators.',
    s4:'Digital art', s4d:'Illustration and visual experiments.',
    s5:'Web development', s5d:'Hand-built interactive websites.',
    works_t:'Work', works_p:'Real content, loaded live from its original platform.',
    links_t:"Let's talk", links_p:'Open for collaborations and commissions.',
    commissions:'Commissions open',
    quote:'The darkness is full of colors waiting to be found.',
    copied:'Copied', nav_arcade:'Arcade', arc_t:'Arcade', arc_p:'Play for a bit: every color you catch leaves its mark.', g1_t:'Catch the pigments', g2_t:'Color echo', score:'Score', best:'Best', round:'Round', play:'Play', again:'Again', hintg1:'Tap the colored orbs. Avoid the dull ones.', watch:'Watch the sequence…', yourturn:'Your turn.', lose:'Missed. Last round cleared:'
  }
};

Object.assign(T.es, { nav_lab:'3D', nav_universes:'Universos', lab_t:'Laboratorio 3D', lab_p:'Arrastra para girar los objetos, o ponlos a prueba en un minijuego.', o1:'Pigmento', o2:'Nudo AET', o3:'Esférion', g3_t:'Caza el glitch', hintg3:'Toca los cubos glitch antes de que se disuelvan.', uni_t:'Universos', uni_p:'Más proyectos hechos bajo LQISTUDIO.', u1d:'App de escritorio para Windows con mods .elq.', u2d:'Juego web isométrico: del patio al poder.', u3d:'La wiki del cómic: personajes, lore y el glitch de Esférion.', u4d:'El idioma-cifrado que se rompió dentro del Loquiverso.' });
Object.assign(T.en, { nav_lab:'3D', nav_universes:'Universes', lab_t:'3D Lab', lab_p:'Drag to spin the objects, or put them to the test in a mini game.', o1:'Pigment', o2:'AET Knot', o3:'Esférion', g3_t:'Hunt the glitch', hintg3:'Tap the glitch cubes before they dissolve.', uni_t:'Universes', uni_p:'More projects made under LQISTUDIO.', u1d:'Windows desktop app with .elq mods.', u2d:'Isometric web game: from the courtyard to power.', u3d:'The comic wiki: characters, lore and the glitch of Esférion.', u4d:'The cipher-language that broke inside the Loquiverso.' });

Object.assign(T.es, { vid_tag:'● DESTACADO', vid_t:'Prueba de wallpaper audio-reactivo', nav_art:'Arte', art_t:'Galería', art_p:'Mueve el cursor: cada dibujo deja su eco de color.' });
Object.assign(T.en, { vid_tag:'● FEATURED', vid_t:'Audio-reactive wallpaper test', nav_art:'Art', art_t:'Gallery', art_p:'Move your cursor: every drawing leaves its color echo.' });

/* ========= Idioma: guardado > IP > idioma del navegador ========= */
const ES_COUNTRIES = new Set(['AR','BO','CL','CO','CR','CU','DO','EC','SV','GQ','GT','HN','MX','NI','PA','PY','PE','PR','ES','UY','VE']);
let lang = 'es';

function setLang(l, save) {
  lang = l;
  document.documentElement.lang = l;
  document.querySelectorAll('[data-i18n]').forEach(el => el.textContent = T[l][el.dataset.i18n]);
  document.querySelectorAll('[data-lang]').forEach(b => b.setAttribute('aria-pressed', b.dataset.lang === l));
  if (save) localStorage.setItem('lang', l);
}

async function detectLang() {
  const saved = localStorage.getItem('lang');
  if (saved) return setLang(saved);
  // 1) Rápido: idioma del navegador, para no mostrar un flash en el idioma incorrecto
  setLang(navigator.language.toLowerCase().startsWith('es') ? 'es' : 'en');
  // 2) Preciso: país según la IP (si falla, nos quedamos con el paso 1)
  try {
    const r = await fetch('https://get.geojs.io/v1/ip/country.json', { signal: AbortSignal.timeout(3000) });
    const { country } = await r.json();
    setLang(ES_COUNTRIES.has(country) ? 'es' : 'en');
  } catch (e) { /* sin red o bloqueado: se mantiene el idioma del navegador */ }
}

document.querySelectorAll('[data-lang]').forEach(b => b.addEventListener('click', () => setLang(b.dataset.lang, true)));

/* ========= Hero: la linterna revela el neón ========= */
const hero = document.getElementById('hero');
let pointerActive = false;
function light(x, y) { hero.style.setProperty('--x', x + 'px'); hero.style.setProperty('--y', y + 'px'); }
hero.addEventListener('pointermove', e => {
  pointerActive = true;
  const r = hero.getBoundingClientRect();
  light(e.clientX - r.left, e.clientY - r.top);
});
hero.addEventListener('pointerleave', () => pointerActive = false);
// Si nadie mueve el cursor (móvil), la luz pasea sola
(function idle(t) {
  if (!pointerActive) {
    const r = hero.getBoundingClientRect();
    light(r.width * (.5 + .38 * Math.sin(t / 1900)), r.height * (.5 + .3 * Math.cos(t / 1300)));
  }
  requestAnimationFrame(idle);
})(0);

/* ========= Servicios: el acento cambia de color ========= */
document.querySelectorAll('.services li').forEach(li => {
  li.addEventListener('mouseenter', () => document.documentElement.style.setProperty('--accent', li.dataset.c));
  li.addEventListener('mouseleave', () => document.documentElement.style.setProperty('--accent', '#00E6A0'));
});

/* ========= Trabajos (edita esta lista para añadir proyectos) ========= */
const WORKS = [];
const IG = ['DYBmwKsOFI7', 'DWkfS8Ijnz4', 'DUUMtpcDpOl', 'DPx9TCmDjDL', 'DIEPORquAQf', 'DXDcjVXjppU', 'DXDZ0ArDoz5', 'DXDXWK0jugK'];
const grid = document.getElementById('grid');
const player = document.getElementById('player');
const frame = player.querySelector('iframe');

WORKS.forEach(w => {
  const b = document.createElement('button');
  b.className = 'card';
  b.setAttribute('aria-label', w.t);
  b.innerHTML = `<img loading="lazy" alt="${w.t}" src="https://i.ytimg.com/vi/${w.id}/hqdefault.jpg">`;
  b.addEventListener('click', () => {
    frame.src = `https://www.youtube-nocookie.com/embed/${w.id}?autoplay=1&rel=0`;
    player.showModal();
  });
  // inclinación 3D
  b.addEventListener('pointermove', e => {
    const r = b.getBoundingClientRect();
    b.style.setProperty('--ry', ((e.clientX - r.left) / r.width - .5) * 12 + 'deg');
    b.style.setProperty('--rx', (.5 - (e.clientY - r.top) / r.height) * 12 + 'deg');
  });
  b.addEventListener('pointerleave', () => { b.style.setProperty('--rx', '0deg'); b.style.setProperty('--ry', '0deg'); });
  grid.appendChild(b);
});
IG.forEach(id => {
  const d = document.createElement('div'); d.className = 'ig';
  d.innerHTML = `<iframe loading="lazy" title="Instagram" scrolling="no" allowtransparency="true" src="https://www.instagram.com/p/${id}/embed"></iframe><a href="https://www.instagram.com/p/${id}/" target="_blank" rel="noopener">Instagram ↗</a>`;
  document.getElementById('igrid').appendChild(d);
});
const closePlayer = () => { player.close(); frame.src = ''; };
document.getElementById('close').addEventListener('click', closePlayer);
player.addEventListener('click', e => { if (e.target === player) closePlayer(); });
player.addEventListener('cancel', () => frame.src = '');

/* ========= Paleta: copiar al portapapeles ========= */
document.getElementById('yt').href = 'https://www.youtube.com/results?search_query=LQIStudio'; // ← pon aquí la URL del canal de LQI Studio
const toast = document.getElementById('toast');
document.querySelectorAll('.palette button').forEach(b => b.addEventListener('click', async () => {
  try { await navigator.clipboard.writeText(b.dataset.hex); } catch (e) {}
  toast.textContent = `${T[lang].copied} ${b.dataset.hex}`;
  toast.classList.add('on');
  setTimeout(() => toast.classList.remove('on'), 1400);
}));

/* ========= Barra de scroll ========= */
const bar = document.getElementById('bar');
addEventListener('scroll', () => bar.style.width = scrollY / (document.documentElement.scrollHeight - innerHeight) * 100 + '%', { passive: true });

/* ========= Estela de neón del cursor ========= */
(() => {
  if (matchMedia('(prefers-reduced-motion:reduce)').matches) return;
  const c = document.createElement('canvas'); c.id = 'trail'; document.body.appendChild(c);
  const x = c.getContext('2d'), cols = ['#00E6A0', '#8A2BE2', '#FF2BD6']; let P = [], h = 0;
  const fit = () => { c.width = innerWidth; c.height = innerHeight; }; fit(); addEventListener('resize', fit);
  addEventListener('pointermove', e => { if (e.pointerType !== 'touch') P.push({ x: e.clientX, y: e.clientY, l: 1, c: cols[(h++ / 5 | 0) % 3] }); });
  (function f() {
    x.clearRect(0, 0, c.width, c.height); P = P.filter(p => p.l > 0);
    for (const p of P) { p.l -= .035; x.globalAlpha = p.l; x.fillStyle = p.c; x.beginPath(); x.arc(p.x, p.y, 7 * p.l, 0, 7); x.fill(); }
    requestAnimationFrame(f);
  })();
})();

/* ========= Juego 1: Atrapa los pigmentos ========= */
(() => {
  const $ = id => document.getElementById(id), cv = $('pig'), cx = cv.getContext('2d'), W = cv.width, H = cv.height;
  const COL = ['#00E6A0', '#8A2BE2', '#FF2BD6', '#E8FFF7'];
  let orbs = [], splats = [], score = 0, time = 30, run = false, last = 0, spawn = 0, tick, shake = 0;
  let best = +localStorage.getItem('pigBest') || 0; $('best').textContent = best;
  const end = () => {
    run = false; clearInterval(tick); $('pigStart').hidden = false; $('pigStart').textContent = T[lang].again;
    if (score > best) { best = score; try { localStorage.setItem('pigBest', best); } catch (e) {} $('best').textContent = best; }
  };
  $('pigStart').addEventListener('click', () => {
    orbs = []; splats = []; score = 0; time = 30; run = true; spawn = 0;
    $('score').textContent = 0; $('time').textContent = 30; $('pigStart').hidden = true;
    clearInterval(tick); tick = setInterval(() => { $('time').textContent = --time; if (time <= 0) end(); }, 1000);
  });
  cv.addEventListener('pointerdown', e => {
    if (!run) return;
    const r = cv.getBoundingClientRect(), px = (e.clientX - r.left) * W / r.width, py = (e.clientY - r.top) * H / r.height;
    const o = orbs.find(o => Math.hypot(o.x - px, o.y - py) < o.r + 10);
    if (!o) return;
    orbs.splice(orbs.indexOf(o), 1);
    if (o.dead) { score = Math.max(0, score - 15); shake = 12; }
    else {
      score += 10;
      splats.push({ x: o.x, y: o.y, r: o.r * 2.2, c: o.c, d: Array.from({ length: 6 }, () => ({ a: Math.random() * 6.3, k: 1.6 + Math.random() * 1.6, s: 3 + Math.random() * 6 })) });
      if (splats.length > 40) splats.shift();
    }
    $('score').textContent = score;
  });
  (function loop(t) {
    const dt = Math.min((t - last) / 1000, .05) || 0; last = t;
    if (run) {
      spawn -= dt;
      if (spawn <= 0) {
        spawn = Math.max(.25, .6 - (30 - time) * .012);
        orbs.push({ x: 30 + Math.random() * (W - 60), y: -20, r: 16 + Math.random() * 14, vy: 90 + Math.random() * 90 + (30 - time) * 4, c: COL[Math.random() * 4 | 0], dead: Math.random() < .15 });
      }
      orbs.forEach(o => o.y += o.vy * dt); orbs = orbs.filter(o => o.y < H + 40);
    }
    cx.setTransform(1, 0, 0, 1, shake ? (Math.random() - .5) * shake : 0, 0); shake = Math.max(0, shake - 1);
    cx.fillStyle = '#050508'; cx.fillRect(-20, 0, W + 40, H);
    cx.globalAlpha = .4;
    for (const s of splats) { cx.fillStyle = s.c; cx.beginPath(); cx.arc(s.x, s.y, s.r, 0, 7); cx.fill(); for (const d of s.d) { cx.beginPath(); cx.arc(s.x + Math.cos(d.a) * s.r * d.k, s.y + Math.sin(d.a) * s.r * d.k, d.s, 0, 7); cx.fill(); } }
    cx.globalAlpha = 1;
    for (const o of orbs) {
      cx.shadowBlur = o.dead ? 0 : 24; cx.shadowColor = o.c;
      cx.fillStyle = o.dead ? '#2a2a34' : o.c; cx.beginPath(); cx.arc(o.x, o.y, o.r, 0, 7); cx.fill();
      if (o.dead) { cx.strokeStyle = '#555'; cx.lineWidth = 2; cx.stroke(); }
    }
    cx.shadowBlur = 0;
    requestAnimationFrame(loop);
  })(0);
})();

/* ========= Juego 2: Eco de color (estilo Simon) ========= */
(() => {
  const $ = id => document.getElementById(id), pads = [...document.querySelectorAll('.simon button')], F = [330, 440, 554, 660];
  let seq = [], pos = 0, busy = true, ac;
  const wait = ms => new Promise(r => setTimeout(r, ms)), msg = s => $('simMsg').textContent = s;
  function beep(i) {
    ac = ac || new (window.AudioContext || window.webkitAudioContext)();
    const o = ac.createOscillator(), g = ac.createGain(); o.frequency.value = F[i];
    g.gain.setValueAtTime(.15, ac.currentTime); g.gain.exponentialRampToValueAtTime(.001, ac.currentTime + .35);
    o.connect(g).connect(ac.destination); o.start(); o.stop(ac.currentTime + .35);
  }
  async function flash(i, ms = 380) { pads[i].classList.add('on'); beep(i); await wait(ms); pads[i].classList.remove('on'); }
  async function show() {
    busy = true; msg(T[lang].watch); await wait(600);
    for (const i of seq) { await flash(i); await wait(140); }
    pos = 0; busy = false; msg(T[lang].yourturn);
  }
  const grow = () => { seq.push(Math.random() * 4 | 0); show(); };
  $('simStart').addEventListener('click', () => { seq = []; $('round').textContent = 0; $('simStart').hidden = true; grow(); });
  pads.forEach((p, i) => p.addEventListener('click', async () => {
    if (busy) return;
    if (i !== seq[pos]) { busy = true; msg(`${T[lang].lose} ${seq.length - 1}`); $('simStart').hidden = false; $('simStart').textContent = T[lang].again; return; }
    flash(i, 200);
    if (++pos === seq.length) { busy = true; $('round').textContent = seq.length; await wait(700); grow(); }
  }));
})();

/* ========= Fondo 3D: iconos flotantes con parallax ========= */
(() => {
  if (!window.THREE || matchMedia('(prefers-reduced-motion:reduce)').matches) return;
  const cv = document.createElement('canvas'); cv.id = 'bg3d'; document.body.prepend(cv);
  let R; try { R = new THREE.WebGLRenderer({ canvas: cv, antialias: true, alpha: true }); } catch (e) { cv.remove(); return; }
  R.setPixelRatio(Math.min(devicePixelRatio, 1.5));
  const S = new THREE.Scene(), C = new THREE.PerspectiveCamera(50, 1, .1, 100);
  S.fog = new THREE.Fog(0x050508, 14, 34); S.add(new THREE.AmbientLight(0x505070, 1.3));
  [[0x00E6A0, 6, 5, 6], [0x8A2BE2, -6, -4, 5], [0xFF2BD6, 0, 6, -2]].forEach(([c, x, y, z]) => { const l = new THREE.PointLight(c, 2, 60); l.position.set(x, y, z); S.add(l); });
  const ex = (pts, d) => { const sh = new THREE.Shape(); pts.forEach(([a, b], i) => i ? sh.lineTo(a, b) : sh.moveTo(a, b)); return new THREE.ExtrudeGeometry(sh, { depth: d, bevelEnabled: true, bevelSize: .06, bevelThickness: .06, bevelSegments: 2 }); };
  const GEOS = [
    ex([[.2, 1], [-.6, -.1], [-.1, -.1], [-.3, -1], [.6, .2], [.1, .2]], .3),
    ex([[-.5, -.7], [.7, 0], [-.5, .7]], .3),
    ex(Array.from({ length: 10 }, (_, i) => { const r = i % 2 ? .45 : 1, a = i / 10 * 6.283 + 1.571; return [Math.cos(a) * r, Math.sin(a) * r]; }), .3),
    new THREE.IcosahedronGeometry(.7, 0), new THREE.OctahedronGeometry(.8), new THREE.TorusGeometry(.6, .18, 12, 32), new THREE.TorusKnotGeometry(.5, .17, 80, 12), new THREE.BoxGeometry(.9, .9, .9)
  ];
  const COLS = [0x00E6A0, 0x8A2BE2, 0xFF2BD6, 0xE8FFF7], N = innerWidth < 700 ? 9 : 18, items = [];
  for (let i = 0; i < N; i++) {
    const c = COLS[i % 4], m = new THREE.Mesh(GEOS[i % GEOS.length], new THREE.MeshStandardMaterial({ color: c, metalness: .6, roughness: .28, emissive: c, emissiveIntensity: .18 }));
    m.scale.setScalar(.8 + Math.random() * .9); S.add(m);
    items.push({ m, u: i / N + Math.random() * .04, x: (Math.random() - .5) * 24, z: -1 - Math.random() * 11, f: .4 + Math.random(), p: Math.random() * 6.3, rx: (Math.random() - .5) * .02, ry: .006 + Math.random() * .014 });
  }
  let sp = 20, cy = 0, mx = 0, my = 0;
  const fit = () => { R.setSize(innerWidth, innerHeight, false); C.aspect = innerWidth / innerHeight; C.updateProjectionMatrix(); sp = (document.documentElement.scrollHeight - innerHeight) * .012 + 14; };
  fit(); addEventListener('resize', fit); addEventListener('load', fit);
  addEventListener('pointermove', e => { mx = e.clientX / innerWidth - .5; my = e.clientY / innerHeight - .5; });
  (function loop(t) {
    requestAnimationFrame(loop); const k = t / 1000;
    cy += (-scrollY * .012 - cy) * .08; C.position.set(mx * 2.4, cy - my * 1.4, 14); C.lookAt(mx * .5, cy, 0);
    items.forEach(o => { o.m.rotation.x += o.rx; o.m.rotation.y += o.ry; o.m.position.set(o.x, 6 - o.u * sp + Math.sin(k * o.f + o.p) * .5, o.z); });
    R.render(S, C);
  })(0);
})();

/* ========= Galería: eco de color + marca de agua dibujada en canvas ========= */
(() => {
  const P = { x: 0, y: 0, on: false };
  addEventListener('pointermove', e => { P.x = e.clientX; P.y = e.clientY; P.on = true; });
  document.querySelectorAll('canvas.art').forEach(cv => {
    ['contextmenu', 'dragstart'].forEach(ev => cv.addEventListener(ev, e => e.preventDefault()));
    const img = new Image(); img.src = cv.dataset.src;
    img.onload = () => {
      const W = Math.min(1100, img.width), H = Math.round(W * img.height / img.width), x = cv.getContext('2d');
      cv.width = W; cv.height = H;
      const E = [0, 1, 2].map(() => ({ x: 0, y: 0 })), tint = ['hue-rotate(150deg)', 'hue-rotate(280deg)', 'hue-rotate(60deg)'], cl = v => Math.max(-1, Math.min(1, v));
      let vis = false; new IntersectionObserver(en => vis = en[0].isIntersecting).observe(cv);
      (function draw(t) {
        requestAnimationFrame(draw); if (!vis) return;
        const r = cv.getBoundingClientRect();
        const tx = P.on ? cl((P.x - r.left - r.width / 2) / r.width) : Math.sin(t / 1400), ty = P.on ? cl((P.y - r.top - r.height / 2) / r.height) : Math.cos(t / 1700);
        x.clearRect(0, 0, W, H); x.imageSmoothingEnabled = !cv.dataset.pixel;
        E.forEach((e, i) => { e.x += (tx * (i + 1) * W * .05 - e.x) * .16 / (i + 1); e.y += (ty * (i + 1) * W * .05 - e.y) * .16 / (i + 1); x.globalAlpha = .38 - i * .1; x.filter = tint[i]; x.drawImage(img, -e.x, -e.y, W, H); });
        x.filter = 'none'; x.globalAlpha = 1; x.drawImage(img, tx * W * .01, ty * W * .01, W, H);
      })(0);
    };
  });
})();

/* ========= Hitmarker al hacer clic + aparición al hacer scroll ========= */
addEventListener('pointerdown', e => { const h = document.createElement('i'); h.className = 'hit'; h.style.left = e.clientX + 'px'; h.style.top = e.clientY + 'px'; document.body.appendChild(h); setTimeout(() => h.remove(), 350); });
(() => {
  const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }), { threshold: .12 });
  document.querySelectorAll('section h2, section > p:not(.hint), .game, .uni, .ig, figure').forEach(el => { el.classList.add('rv'); io.observe(el); });
})();

/* Aviso solo en vista local: YouTube rechaza reproducir embeds en páginas abiertas como archivo (error 153) */
if (location.protocol === 'file:') {
  const hv = document.querySelector('.hero-video');
  if (hv) hv.insertAdjacentHTML('beforeend', '<p class="hint" style="max-width:none">Vista local: YouTube no deja reproducir videos en páginas abiertas desde un archivo. Abre <b>herramientas/abrir_local.bat</b> o publica la web: en lqistudio.com sí se reproduce aquí mismo.</p>');
}
detectLang();
