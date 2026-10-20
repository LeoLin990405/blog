/* Slow, once-only motion. Progressive enhancement: the page is readable with or
   without this script. .js-motion only starts the hero motion; it never hides
   sections, so link previews, print, and full-page captures still show the content. */
(function () {
  var d = document.documentElement, mq = window.matchMedia;
  if (!mq) return;
  if (mq('(prefers-reduced-motion: reduce)').matches || mq('print').matches) return;
  if (/[?&]motion=off\b/.test(location.search)) return;
  d.classList.add('js-motion');

  function off() { d.classList.remove('js-motion'); }
  window.addEventListener('beforeprint', off);
  mq('(prefers-reduced-motion: reduce)').addEventListener &&
    mq('(prefers-reduced-motion: reduce)').addEventListener('change', function (e) { if (e.matches) off(); });
})();
