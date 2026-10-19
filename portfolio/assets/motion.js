/* Slow, once-only motion. Progressive enhancement: hidden start states apply only
   after this script adds .js-motion to <html>; without it everything is visible. */
(function () {
  var d = document.documentElement, mq = window.matchMedia;
  if (!('IntersectionObserver' in window) || !mq) return;
  if (mq('(prefers-reduced-motion: reduce)').matches || mq('print').matches) return;
  if (/[?&]motion=off\b/.test(location.search)) return;
  d.classList.add('js-motion');

  function off() { d.classList.remove('js-motion'); }
  window.addEventListener('beforeprint', off);
  mq('(prefers-reduced-motion: reduce)').addEventListener &&
    mq('(prefers-reduced-motion: reduce)').addEventListener('change', function (e) { if (e.matches) off(); });

  document.addEventListener('DOMContentLoaded', function () {
    try {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) {
          // reveal on entry, and also anything already scrolled past (e.g. reload mid-page)
          if (e.isIntersecting || e.boundingClientRect.top < 0) {
            e.target.classList.add('in');
            io.unobserve(e.target);
          }
        });
      }, { rootMargin: '0px 0px -8% 0px', threshold: 0 });
      document.querySelectorAll('main section, footer').forEach(function (el) { io.observe(el); });
    } catch (err) { off(); }
  });
})();
