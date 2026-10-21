/* V6 locator. Two pieces of chrome are generated from the one in-flow index:
   a desktop rail (>=1400px) and a compact bar that appears once that index has
   scrolled away. Without this script the page keeps the in-flow index and loses
   only the chrome — nothing is hidden behind JS. */
(function () {
  var d = document.documentElement;
  var toc = document.querySelector('nav.toc');
  if (!toc || !document.querySelectorAll) return;

  var links = [].slice.call(toc.querySelectorAll('ol a'));
  var entries = links.map(function (a) {
    var href = a.getAttribute('href') || '';
    if (href.charAt(0) !== '#') return null;
    var sec = document.getElementById(href.slice(1));
    if (!sec) return null;
    var num = a.querySelector('i');
    var label = a.cloneNode(true);
    var cloneNum = label.querySelector('i');
    if (cloneNum) cloneNum.parentNode.removeChild(cloneNum);
    var tag = sec.querySelector('.tagline span');
    return {
      id: href.slice(1),
      sec: sec,
      href: href,
      num: num ? num.textContent.trim() : '',
      label: (label.textContent || '').trim(),
      tag: tag ? tag.textContent.trim() : ''
    };
  }).filter(Boolean);
  if (!entries.length) return;

  d.classList.add('js');

  /* make section headings programmatic focus targets so in-page navigation
     lands in the content instead of dropping focus on <body> */
  [].slice.call(document.querySelectorAll('main section h2, footer .me')).forEach(function (h) {
    h.setAttribute('tabindex', '-1');
  });

  function focusTarget(id) {
    var target = document.getElementById(id);
    if (!target) return;
    var h = target.querySelector('h2') || target.querySelector('.me');
    if (!h) return;
    try { h.focus({ preventScroll: true }); } catch (err) { h.focus(); }
  }

  /* ---- desktop rail ---- */
  var rail = document.querySelector('[data-rail]');
  var railLinks = {};
  if (rail) {
    var railK = document.createElement('p');
    railK.className = 'rail-k';
    railK.textContent = 'INDEX';
    var railOl = document.createElement('ol');
    entries.forEach(function (e) {
      var li = document.createElement('li');
      var a = document.createElement('a');
      a.href = e.href;
      /* the in-flow index is the canonical keyboard path; the rail is a
         pointer-only shortcut, so it does not add 11 more tab stops */
      a.tabIndex = -1;
      a.appendChild(span('tick', ''));
      a.appendChild(span('idx', e.num));
      a.appendChild(span('lbl', e.label));
      li.appendChild(a);
      railOl.appendChild(li);
      railLinks[e.id] = a;
    });
    rail.appendChild(railK);
    rail.appendChild(railOl);
  }

  /* ---- compact bar + panel ---- */
  var bar = document.querySelector('[data-bar]');
  var btn = bar ? bar.querySelector('.bar-btn') : null;
  var panel = bar ? bar.querySelector('.bar-panel') : null;
  var secEl = bar ? bar.querySelector('.bar-sec') : null;
  var titleEl = bar ? bar.querySelector('.bar-title') : null;
  var countEl = bar ? bar.querySelector('.bar-count') : null;
  var track = bar ? bar.querySelector('.bar-track i') : null;
  var panelLinks = {};

  if (bar && btn && panel) {
    var copy = document.createElement('div');
    copy.className = 'toc';
    copy.setAttribute('role', 'navigation');
    copy.setAttribute('aria-label', '章节索引面板');
    [].slice.call(toc.childNodes).forEach(function (n) {
      copy.appendChild(n.cloneNode(true));
    });
    panel.appendChild(copy);
    [].slice.call(panel.querySelectorAll('a')).forEach(function (a) {
      var href = a.getAttribute('href') || '';
      if (href.charAt(0) === '#') panelLinks[href.slice(1)] = a;
    });

    var setOpen = function (open) {
      panel.hidden = !open;
      btn.setAttribute('aria-expanded', open ? 'true' : 'false');
    };
    btn.addEventListener('click', function () {
      setOpen(panel.hidden);
    });
    panel.addEventListener('click', function (e) {
      if (e.target.closest && e.target.closest('a')) setOpen(false);
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && !panel.hidden) {
        setOpen(false);
        btn.focus();
      }
    });
    document.addEventListener('click', function (e) {
      if (!panel.hidden && !bar.contains(e.target)) setOpen(false);
    });
    window.addEventListener('hashchange', function () {
      setOpen(false);
    });
    window.addEventListener('beforeprint', function () {
      setOpen(false);
    });
    setOpen(false);
  }

  /* ---- scroll state: current section, progress, bar visibility ---- */
  var current = null;
  var pad = function (n) {
    return (n < 10 ? '0' : '') + n;
  };

  function mark(map, id) {
    for (var k in map) {
      if (!map.hasOwnProperty(k)) continue;
      if (k === id) map[k].setAttribute('aria-current', 'location');
      else map[k].removeAttribute('aria-current');
    }
  }

  function sectionAt(y) {
    var found = null;
    for (var i = 0; i < entries.length; i++) {
      if (entries[i].sec.getBoundingClientRect().top <= y) found = entries[i];
      else break;
    }
    return found;
  }

  function render(entry, index) {
    if (entry) {
      if (entry.id !== current) {
        current = entry.id;
        if (secEl) secEl.textContent = entry.tag;
        if (titleEl) titleEl.textContent = entry.label;
        if (countEl) countEl.textContent = pad(index + 1) + ' / ' + pad(entries.length);
      }
      mark(railLinks, entry.id);
      mark(panelLinks, entry.id);
    } else {
      current = null;
      mark(railLinks, '');
      mark(panelLinks, '');
    }
  }

  var ticking = false;
  function onScroll() {
    if (ticking) return;
    ticking = true;
    window.requestAnimationFrame(function () {
      ticking = false;
      var past = toc.getBoundingClientRect().bottom <= 0;
      if (bar) bar.classList.toggle('is-on', past);
      if (!past && panel && !panel.hidden) {
        panel.hidden = true;
        if (btn) btn.setAttribute('aria-expanded', 'false');
      }
      var doc = document.scrollingElement || d;
      var max = doc.scrollHeight - window.innerHeight;
      var pos = window.pageYOffset || doc.scrollTop;
      var p = max > 0 ? Math.min(1, Math.max(0, pos / max)) : 0;
      if (track) track.style.transform = 'scaleX(' + p.toFixed(4) + ')';

      var y = window.innerHeight * 0.35;
      var entry = null;
      var index = -1;
      for (var i = 0; i < entries.length; i++) {
        if (entries[i].sec.getBoundingClientRect().top <= y) {
          entry = entries[i];
          index = i;
        } else break;
      }
      /* the footer is short: at the very bottom it may never cross the 35%
         line, so the last section is chosen explicitly */
      if (max > 0 && pos >= max - 4) {
        entry = entries[entries.length - 1];
        index = entries.length - 1;
      }
      render(entry, index);
    });
  }

  function span(cls, text) {
    var el = document.createElement('span');
    el.className = cls;
    if (text) el.textContent = text;
    return el;
  }

  document.addEventListener('click', function (e) {
    var a = e.target.closest ? e.target.closest('a[href^="#"]') : null;
    if (!a || a.classList.contains('skip')) return;
    var id = (a.getAttribute('href') || '').slice(1);
    if (!id || id === 'main' || id === 'top') return;
    window.setTimeout(function () { focusTarget(id); }, 0);
  });

  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll);
  window.addEventListener('load', onScroll);
  onScroll();
})();
