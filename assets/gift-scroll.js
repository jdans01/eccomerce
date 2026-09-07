/* =========================================================
   Gift box + horizontal gallery — scroll-driven behavior
   ========================================================= */
(function () {
  'use strict';

  function qs(sel, ctx) { return (ctx || document).querySelector(sel); }
  function qsa(sel, ctx) { return Array.prototype.slice.call((ctx || document).querySelectorAll(sel)); }
  function clamp01(n) { return Math.max(0, Math.min(1, n)); }
  function mapRange(v, a, b) { return clamp01((v - a) / (b - a)); }

  /* ---------------- Gift box scroll scene ---------------- */
  qsa('[data-gift-box]').forEach(function (section) {
    var items = qsa('[data-gift-item]', section);
    var lid = qs('[data-gift-lid]', section);
    var giftReducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    function finalOffset(index, total) {
      var narrow = window.innerWidth < 640;
      if (narrow) {
        var spacingY = 130;
        return { x: 0, y: (index - (total - 1) / 2) * spacingY, r: index % 2 === 0 ? -4 : 4 };
      }
      var spacingX = Math.min(300, window.innerWidth * 0.24);
      var mid = (total - 1) / 2;
      var offsetFromMid = index - mid;
      return { x: offsetFromMid * spacingX, y: Math.abs(offsetFromMid) * 40, r: offsetFromMid * 6 };
    }

    function update() {
      var rect = section.getBoundingClientRect();
      var total = rect.height - window.innerHeight;
      var progress = total > 0 ? clamp01(-rect.top / total) : 0;

      if (lid) {
        if (giftReducedMotion) {
          lid.style.opacity = progress > 0.15 ? '0' : '1';
        } else {
          var lidProgress = mapRange(progress, 0.04, 0.32);
          lid.style.transform = 'translateY(' + (-70 * lidProgress) + 'px) rotate(' + (-14 * lidProgress) + 'deg) scale(' + (1 + 0.08 * lidProgress) + ')';
          lid.style.opacity = String(1 - lidProgress);
        }
      }

      var itemsProgress = mapRange(progress, 0.28, 0.78);
      items.forEach(function (item, i) {
        var target = finalOffset(i, items.length);
        var scale = giftReducedMotion ? 1 : (0.4 + 0.6 * itemsProgress);
        var x = target.x * itemsProgress;
        var y = 40 - (40 - target.y) * itemsProgress;
        var r = giftReducedMotion ? 0 : target.r * itemsProgress;
        item.style.transform = 'translate3d(calc(-50% + ' + x + 'px), calc(-50% + ' + y + 'px), 0) rotate(' + r + 'deg) scale(' + scale + ')';
        item.style.zIndex = String(10 + i);
        var caption = qs('[data-gift-caption]', item);
        if (caption) caption.style.opacity = itemsProgress > 0.82 ? '1' : '0';
      });
    }

    var giftTicking = false;
    function onGiftScroll() {
      if (giftTicking) return;
      giftTicking = true;
      requestAnimationFrame(function () { update(); giftTicking = false; });
    }
    window.addEventListener('scroll', onGiftScroll, { passive: true });
    window.addEventListener('resize', onGiftScroll);
    update();
  });

  /* ---------------- Horizontal pinned gallery ---------------- */
  qsa('[data-gift-gallery]').forEach(function (section) {
    var track = qs('[data-gift-gallery-track]', section);
    var stage = qs('[data-gift-gallery-stage]', section);
    if (!track || !stage) return;

    var galleryMq = window.matchMedia('(min-width: 769px)');

    function update() {
      if (!galleryMq.matches) { track.style.transform = ''; return; }
      var rect = section.getBoundingClientRect();
      var total = rect.height - window.innerHeight;
      var progress = total > 0 ? clamp01(-rect.top / total) : 0;
      var maxScroll = Math.max(0, track.scrollWidth - stage.clientWidth);
      track.style.transform = 'translate3d(' + (-maxScroll * progress) + 'px,0,0)';
    }

    var galleryTicking = false;
    function onGalleryScroll() {
      if (galleryTicking) return;
      galleryTicking = true;
      requestAnimationFrame(function () { update(); galleryTicking = false; });
    }
    window.addEventListener('scroll', onGalleryScroll, { passive: true });
    window.addEventListener('resize', onGalleryScroll);
    update();
  });
})();
