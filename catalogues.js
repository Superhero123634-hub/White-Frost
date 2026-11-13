(function () {
  var box = document.getElementById('cat-list');
  if (!box) return;

  function el(tag, cls, text) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (text) n.textContent = text;
    return n;
  }
  function size(b) {
    return b >= 1048576 ? (b / 1048576).toFixed(1) + ' MB' : Math.max(1, Math.round(b / 1024)) + ' KB';
  }
  function date(iso) {
    var d = new Date(iso);
    return isNaN(d) ? '' : d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
  }
  function url(it) {
    var path = it.file.split('/').map(encodeURIComponent).join('/');
    return path + '?v=' + (Date.parse(it.updated) || 0);
  }
  function note(msg) {
    box.textContent = '';
    box.appendChild(el('p', 'cat-note', msg));
  }

  function render(data) {
    var items = (data && data.items) || [];
    if (!items.length) return note('New catalogues will be listed here soon. Ask us on WhatsApp and we will send the latest.');
    var groups = {}, order = [];
    items.forEach(function (it) {
      var k = it.category || '';
      if (!groups[k]) { groups[k] = []; order.push(k); }
      groups[k].push(it);
    });
    box.textContent = '';
    order.forEach(function (k) {
      if (k) box.appendChild(el('p', 'cat', k));
      var ul = el('ul', 'rows');
      groups[k].forEach(function (it) {
        var li = el('li', 'in');
        li.appendChild(el('h3', '', it.title));
        li.appendChild(el('p', '', [it.type, size(it.size), date(it.updated) && 'Updated ' + date(it.updated)].filter(Boolean).join(' · ')));
        var a = el('a', 'enq', 'Open ' + it.type);
        a.href = url(it);
        a.target = '_blank';
        a.rel = 'noopener';
        li.appendChild(a);
        ul.appendChild(li);
      });
      box.appendChild(ul);
    });
  }

  fetch('data/catalogues.json', { cache: 'no-cache' })
    .then(function (r) { if (!r.ok) throw new Error(r.status); return r.json(); })
    .then(render)
    .catch(function () { note('Catalogues could not be loaded. Please message us on WhatsApp and we will send them.'); });
})();
