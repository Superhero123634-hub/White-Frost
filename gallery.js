(function () {
  var grid = document.getElementById('gal-grid');
  var bar = document.getElementById('gal-filter');
  if (!grid) return;

  var all = [], shown = [], cur = 0, lb, lbImg, lbCap, opener, startX = null;

  function el(tag, cls, text) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (text) n.textContent = text;
    return n;
  }
  function src(path, it) {
    return path.split('/').map(encodeURIComponent).join('/') + '?v=' + (Date.parse(it.updated) || 0);
  }
  function note(msg) {
    grid.textContent = '';
    bar.textContent = '';
    grid.appendChild(el('p', 'gal-note', msg));
  }

  /* lightbox */
  function build() {
    lb = el('div', 'lb');
    lb.hidden = true;
    lb.setAttribute('role', 'dialog');
    lb.setAttribute('aria-modal', 'true');
    lb.setAttribute('aria-label', 'Photo viewer');
    var x = el('button', 'lb-btn lb-x', '\u00d7');
    var p = el('button', 'lb-btn lb-p', '\u2039');
    var n = el('button', 'lb-btn lb-n', '\u203a');
    [x, p, n].forEach(function (b) { b.type = 'button'; });
    x.setAttribute('aria-label', 'Close');
    p.setAttribute('aria-label', 'Previous photo');
    n.setAttribute('aria-label', 'Next photo');
    var fig = el('figure', 'lb-fig');
    lbImg = el('img');
    lbImg.alt = '';
    lbCap = el('figcaption');
    fig.appendChild(lbImg);
    fig.appendChild(lbCap);
    lb.appendChild(x); lb.appendChild(p); lb.appendChild(fig); lb.appendChild(n);
    document.body.appendChild(lb);

    x.addEventListener('click', close);
    p.addEventListener('click', function () { step(-1); });
    n.addEventListener('click', function () { step(1); });
    lb.addEventListener('click', function (e) { if (e.target === lb || e.target === fig) close(); });
    lb.addEventListener('touchstart', function (e) { startX = e.touches[0].clientX; }, { passive: true });
    lb.addEventListener('touchend', function (e) {
      if (startX === null) return;
      var dx = e.changedTouches[0].clientX - startX;
      startX = null;
      if (Math.abs(dx) > 50) step(dx < 0 ? 1 : -1);
    });
    document.addEventListener('keydown', function (e) {
      if (lb.hidden) return;
      if (e.key === 'Escape') close();
      else if (e.key === 'ArrowLeft') step(-1);
      else if (e.key === 'ArrowRight') step(1);
    });
  }
  function show(i) {
    var it = shown[i];
    cur = i;
    lbImg.src = src(it.full, it);
    lbImg.alt = it.title;
    lbCap.textContent = it.title + '  \u00b7  ' + (i + 1) + ' / ' + shown.length;
    [shown[i + 1], shown[i - 1]].forEach(function (nb) { if (nb) new Image().src = src(nb.full, nb); });
  }
  function open(i, from) {
    if (!lb) build();
    opener = from;
    lb.classList.toggle('single', shown.length < 2);
    show(i);
    lb.hidden = false;
    document.documentElement.classList.add('lb-open');
    lb.querySelector('.lb-x').focus();
  }
  function close() {
    lb.hidden = true;
    lbImg.removeAttribute('src');
    document.documentElement.classList.remove('lb-open');
    if (opener) opener.focus();
  }
  function step(d) {
    if (shown.length < 2) return;
    show((cur + d + shown.length) % shown.length);
  }

  /* grid and filter */
  function render() {
    grid.textContent = '';
    shown.forEach(function (it, i) {
      var b = el('button', 'gi');
      b.type = 'button';
      b.setAttribute('aria-label', 'View photo: ' + it.title);
      var img = el('img');
      img.loading = 'lazy';
      img.decoding = 'async';
      img.alt = it.title;
      img.src = src(it.thumb, it);
      b.appendChild(img);
      b.addEventListener('click', function () { open(i, b); });
      grid.appendChild(b);
    });
  }
  function filter(cat, btn) {
    shown = cat ? all.filter(function (it) { return it.category === cat; }) : all;
    Array.prototype.forEach.call(bar.children, function (c) { c.setAttribute('aria-pressed', c === btn ? 'true' : 'false'); });
    render();
  }
  function init(data) {
    all = (data && data.items) || [];
    if (!all.length) return note('Photos will appear here soon.');
    var cats = [];
    all.forEach(function (it) { if (it.category && cats.indexOf(it.category) < 0) cats.push(it.category); });
    bar.textContent = '';
    if (cats.length > 1) {
      ['All'].concat(cats).forEach(function (c, i) {
        var b = el('button', 'chip', c);
        b.type = 'button';
        b.setAttribute('aria-pressed', i === 0 ? 'true' : 'false');
        b.addEventListener('click', function () { filter(i === 0 ? '' : c, b); });
        bar.appendChild(b);
      });
    }
    shown = all;
    render();
  }

  fetch('data/gallery.json', { cache: 'no-cache' })
    .then(function (r) { if (!r.ok) throw new Error(r.status); return r.json(); })
    .then(init)
    .catch(function () { note('Photos could not be loaded. Please message us on WhatsApp and we will send them.'); });
})();
