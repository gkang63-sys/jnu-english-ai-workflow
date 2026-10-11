// 역할 필터(AI · 코드 · 교수)와 화면 테마. 저장은 이 브라우저에만(실패해도 페이지는 그대로 동작).
(function () {
  var chips = document.querySelectorAll('.legend .chip');
  var steps = document.querySelectorAll('.step');
  function apply(role) {
    chips.forEach(function (c) { c.setAttribute('aria-pressed', String(c.dataset.role === role)); });
    steps.forEach(function (s) {
      var roles = (s.dataset.who || '').split(' ');
      s.classList.toggle('dim', role !== 'all' && roles.indexOf(role) < 0);
    });
  }
  chips.forEach(function (c) { c.addEventListener('click', function () { apply(c.dataset.role); }); });
  if (chips.length) apply('all');

  var root = document.documentElement, btn = document.querySelector('.theme');
  function get() { try { return localStorage.getItem('wf-theme'); } catch (e) { return null; } }
  function set(v) { try { localStorage.setItem('wf-theme', v); } catch (e) {} }
  var saved = get(); if (saved) root.setAttribute('data-theme', saved);
  if (btn) btn.addEventListener('click', function () {
    var dark = root.getAttribute('data-theme') === 'dark' ||
      (!root.getAttribute('data-theme') && window.matchMedia('(prefers-color-scheme: dark)').matches);
    var next = dark ? 'light' : 'dark'; root.setAttribute('data-theme', next); set(next);
  });
})();
