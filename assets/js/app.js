// «Дом и порядок» — слайдер до/после, навигация, форма
(function () {
  'use strict';

  // Шапка
  var nav = document.getElementById('nav');
  var onScroll = function () { nav.classList.toggle('nav--solid', window.scrollY > 40); };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // Мобильное меню
  var burger = document.getElementById('burger');
  var links = document.getElementById('navLinks');
  if (burger && links) {
    burger.addEventListener('click', function () {
      nav.classList.toggle('nav--open');
      links.classList.toggle('nav__links--open');
    });
    links.addEventListener('click', function (e) {
      if (e.target.tagName === 'A') {
        nav.classList.remove('nav--open');
        links.classList.remove('nav__links--open');
      }
    });
  }

  // Появление блоков
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (en) {
      if (en.isIntersecting) { en.target.classList.add('reveal--in'); io.unobserve(en.target); }
    });
  }, { threshold: 0.14 });
  document.querySelectorAll('.reveal').forEach(function (el) { io.observe(el); });

  // Слайдер «до/после»
  var ba = document.getElementById('ba');
  if (ba) {
    var before = document.getElementById('baBefore');
    var handle = document.getElementById('baHandle');
    var dragging = false;

    function setPos(clientX) {
      var rect = ba.getBoundingClientRect();
      var x = Math.min(Math.max(clientX - rect.left, 0), rect.width);
      var pct = (x / rect.width) * 100;
      before.style.width = pct + '%';
      handle.style.left = pct + '%';
    }
    ba.addEventListener('pointerdown', function (e) {
      dragging = true;
      ba.setPointerCapture(e.pointerId);
      setPos(e.clientX);
    });
    ba.addEventListener('pointermove', function (e) { if (dragging) setPos(e.clientX); });
    ba.addEventListener('pointerup', function () { dragging = false; });
    ba.addEventListener('pointercancel', function () { dragging = false; });
    // Клавиатура — доступность
    ba.setAttribute('tabindex', '0');
    ba.addEventListener('keydown', function (e) {
      var cur = parseFloat(before.style.width) || 50;
      if (e.key === 'ArrowLeft') { before.style.width = Math.max(cur - 4, 0) + '%'; handle.style.left = Math.max(cur - 4, 0) + '%'; }
      if (e.key === 'ArrowRight') { before.style.width = Math.min(cur + 4, 100) + '%'; handle.style.left = Math.min(cur + 4, 100) + '%'; }
    });
  }

  // Демо-форма
  var form = document.getElementById('bookForm');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (!form.checkValidity()) { form.reportValidity(); return; }
      form.classList.add('form--done');
      form.querySelectorAll('input, select, textarea, button').forEach(function (el) { el.disabled = true; });
    });
  }
})();
