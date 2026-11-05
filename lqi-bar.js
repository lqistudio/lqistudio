/* Barra "volver a LQISTUDIO" para las páginas hijas. Uso: <script src="../lqi-bar.js" data-home="../index.html"></script> */
(() => {
  const s = document.currentScript, home = s.dataset.home || '../index.html', base = home.replace(/index\.html$/, '').replace(/\/?$/, '/');
  const p = location.pathname, cur = /\/juego\//.test(p) ? 'Juego' : /\/loquiverso\//.test(p) ? 'Loquiverso' : location.hostname.startsWith('aet.') ? 'AET_HARMONY' : '';
  const L = [['Inicio', home], ['Juego', base + 'juego/index.html'], ['Loquiverso', base + 'loquiverso/index.html'], ['AET_HARMONY', 'https://aet.lqistudio.com'], ['ElQbot ↗', 'https://elqbot.lqistudio.com']];
  const css = document.createElement('style');
  css.textContent = '.lqi-bar{display:flex;align-items:center;gap:.4rem;overflow-x:auto;white-space:nowrap;padding:.5rem 1rem;background:#050508;border-bottom:1px solid #00e6a066;font:600 12px/1 system-ui,sans-serif;position:relative;z-index:9999}.lqi-bar a{flex:none;color:#E8FFF7;text-decoration:none;padding:.45rem .8rem;border-radius:99px;border:1px solid #ffffff2a}.lqi-bar a:hover{background:#00E6A0;color:#050508;border-color:#00E6A0}.lqi-bar a[aria-current]{border-color:#FF2BD6;color:#FF2BD6}.lqi-bar .b{background:linear-gradient(100deg,#00E6A0,#8A2BE2,#FF2BD6);color:#050508;border:0;font-weight:800;margin-right:auto}';
  const bar = document.createElement('nav'); bar.className = 'lqi-bar'; bar.setAttribute('aria-label', 'LQISTUDIO');
  bar.innerHTML = '<a class="b" href="' + home + '">← LQISTUDIO</a>' + L.slice(1).map(([t, u]) => '<a href="' + u + '"' + (t === cur ? ' aria-current="page"' : '') + '>' + t + '</a>').join('');
  document.head.appendChild(css); document.body.prepend(bar);
})();
