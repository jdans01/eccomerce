/* =========================================================
   Aurora — Theme JS
   ========================================================= */
(function () {
  'use strict';

  var routes = (window.Shopify && window.Shopify.routes && window.Shopify.routes.root) || '/';

  /* ---------------- Utilities ---------------- */
  function qs(sel, ctx) { return (ctx || document).querySelector(sel); }
  function qsa(sel, ctx) { return Array.prototype.slice.call((ctx || document).querySelectorAll(sel)); }

  function formatMoney(cents, format) {
    if (typeof cents === 'string') cents = cents.replace('.', '');
    var value = (cents / 100).toFixed(2);
    var parts = value.split('.');
    var formatted = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',') + '.' + parts[1];
    return (format || '${{amount}}').replace('{{amount}}', formatted);
  }

  var overlay = qs('[data-drawer-overlay]');
  function openOverlay() { if (overlay) { overlay.hidden = false; requestAnimationFrame(function () { overlay.classList.add('is-visible'); }); } }
  function closeOverlay() {
    if (overlay) {
      overlay.classList.remove('is-visible');
      setTimeout(function () { overlay.hidden = true; }, 250);
    }
  }

  /* ---------------- Announcement bar rotation ---------------- */
  qsa('[data-announcement-bar]').forEach(function (bar) {
    var items = qsa('.announcement-bar__item', bar);
    if (items.length < 2 || bar.getAttribute('data-autorotate') !== 'true') return;
    var speed = parseInt(bar.getAttribute('data-speed'), 10) || 5000;
    var index = 0;
    setInterval(function () {
      items[index].classList.remove('is-active');
      index = (index + 1) % items.length;
      items[index].classList.add('is-active');
    }, speed);
  });

  /* ---------------- Sticky header shadow ---------------- */
  var header = qs('[data-site-header]');
  if (header) {
    var lastY = 0;
    window.addEventListener('scroll', function () {
      var y = window.scrollY;
      header.classList.toggle('has-scrolled', y > 8);
      lastY = y;
    }, { passive: true });
  }

  /* ---------------- Header search toggle ---------------- */
  var searchToggle = qs('[data-search-toggle]');
  var searchPanel = qs('[data-header-search]');
  if (searchToggle && searchPanel) {
    searchToggle.addEventListener('click', function () {
      var isOpen = searchPanel.classList.toggle('is-open');
      searchToggle.setAttribute('aria-expanded', isOpen);
      if (isOpen) {
        var input = qs('input', searchPanel);
        if (input) setTimeout(function () { input.focus(); }, 50);
      }
    });
    qsa('[data-search-close]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        searchPanel.classList.remove('is-open');
        searchToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* ---------------- Mobile nav drawer ---------------- */
  var mobileNav = qs('[data-mobile-nav]');
  var mobileNavToggle = qs('[data-mobile-nav-toggle]');
  function openMobileNav() {
    if (!mobileNav) return;
    mobileNav.classList.add('is-open');
    openOverlay();
    document.body.style.overflow = 'hidden';
  }
  function closeMobileNav() {
    if (!mobileNav) return;
    mobileNav.classList.remove('is-open');
    closeOverlay();
    document.body.style.overflow = '';
  }
  if (mobileNavToggle) mobileNavToggle.addEventListener('click', openMobileNav);
  qsa('[data-mobile-nav-close]').forEach(function (btn) { btn.addEventListener('click', closeMobileNav); });

  /* ---------------- Cart drawer ---------------- */
  var cartDrawer = qs('[data-cart-drawer]');

  function openCartDrawer() {
    if (!cartDrawer) return;
    cartDrawer.classList.add('is-open');
    cartDrawer.setAttribute('aria-hidden', 'false');
    openOverlay();
    document.body.style.overflow = 'hidden';
  }
  function closeCartDrawer() {
    if (!cartDrawer) return;
    cartDrawer.classList.remove('is-open');
    cartDrawer.setAttribute('aria-hidden', 'true');
    closeOverlay();
    document.body.style.overflow = mobileNav && mobileNav.classList.contains('is-open') ? 'hidden' : '';
  }

  if (overlay) overlay.addEventListener('click', function () { closeCartDrawer(); closeMobileNav(); });

  qsa('[data-cart-toggle]').forEach(function (btn) {
    btn.addEventListener('click', function (e) {
      e.preventDefault();
      openCartDrawer();
      refreshCartDrawer();
    });
  });
  qsa('[data-cart-close]').forEach(function (btn) { btn.addEventListener('click', closeCartDrawer); });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') { closeCartDrawer(); closeMobileNav(); }
  });

  function updateCartCount(count) {
    qsa('[data-cart-count]').forEach(function (el) {
      el.textContent = count;
      el.hidden = count === 0;
    });
  }

  function renderCartDrawer(cart) {
    var body = qs('[data-cart-drawer-body]');
    var footer = qs('[data-cart-drawer-footer]');
    if (!body) return;

    updateCartCount(cart.item_count);

    if (cart.item_count === 0) {
      body.innerHTML = '<div class="cart-empty"><p>' + (window.themeStrings.cartEmpty || 'Tu carrito está vacío') + '</p><button class="btn btn--secondary" data-cart-close>' + (window.themeStrings.continueShopping || 'Seguir comprando') + '</button></div>';
      if (footer) footer.hidden = true;
      qsa('[data-cart-close]', body)[0] && qsa('[data-cart-close]', body)[0].addEventListener('click', closeCartDrawer);
      return;
    }

    if (footer) footer.hidden = false;

    var threshold = parseFloat(window.themeStrings.freeShippingThreshold || '0') * 100;
    var html = '';

    if (threshold > 0) {
      var remaining = threshold - cart.total_price;
      var pct = Math.min(100, (cart.total_price / threshold) * 100);
      html += '<div class="free-shipping-bar">';
      if (remaining > 0) {
        html += '<p class="free-shipping-bar__text">' + (window.themeStrings.freeShippingRemaining || 'Te faltan {{amount}} para envío gratis').replace('{{amount}}', formatMoney(remaining)) + '</p>';
      } else {
        html += '<p class="free-shipping-bar__text">' + (window.themeStrings.freeShippingUnlocked || '¡Envío gratis desbloqueado!') + '</p>';
      }
      html += '<div class="free-shipping-bar__track"><div class="free-shipping-bar__fill" style="width:' + pct + '%"></div></div>';
      html += '</div>';
    }

    cart.items.forEach(function (item) {
      html += '' +
        '<div class="cart-line" data-line-key="' + item.key + '">' +
          '<img class="cart-line__image" src="' + (item.image || '') + '" alt="' + item.product_title + '" width="84" height="84" loading="lazy">' +
          '<div class="cart-line__details">' +
            '<div class="cart-line__title">' + item.product_title + '</div>' +
            (item.variant_title ? '<div class="cart-line__variant">' + item.variant_title + '</div>' : '') +
            '<div class="quantity-selector quantity-selector--sm">' +
              '<button type="button" data-qty-decrease>−</button>' +
              '<input type="number" min="0" value="' + item.quantity + '" data-qty-input>' +
              '<button type="button" data-qty-increase>+</button>' +
            '</div>' +
            '<div class="cart-line__remove" data-line-remove role="button" tabindex="0">' + (window.themeStrings.remove || 'Eliminar') + '</div>' +
          '</div>' +
          '<div class="cart-line__price">' + formatMoney(item.final_line_price) + '</div>' +
        '</div>';
    });

    body.innerHTML = html;

    var subtotalEl = qs('[data-cart-subtotal]');
    if (subtotalEl) subtotalEl.textContent = formatMoney(cart.total_price);

    qsa('[data-line-key]', body).forEach(function (line) {
      var key = line.getAttribute('data-line-key');
      var input = qs('[data-qty-input]', line);

      qs('[data-qty-decrease]', line).addEventListener('click', function () {
        changeLineQuantity(key, Math.max(0, parseInt(input.value, 10) - 1));
      });
      qs('[data-qty-increase]', line).addEventListener('click', function () {
        changeLineQuantity(key, parseInt(input.value, 10) + 1);
      });
      input.addEventListener('change', function () {
        changeLineQuantity(key, Math.max(0, parseInt(input.value, 10) || 0));
      });
      qs('[data-line-remove]', line).addEventListener('click', function () {
        changeLineQuantity(key, 0);
      });
    });
  }

  function refreshCartDrawer() {
    fetch(routes + 'cart.js')
      .then(function (r) { return r.json(); })
      .then(function (cart) {
        renderCartDrawer(cart);
        updateCartCount(cart.item_count);
      })
      .catch(function () {});
  }

  function changeLineQuantity(key, quantity) {
    fetch(routes + 'cart/change.js', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: key, quantity: quantity })
    })
      .then(function (r) { return r.json(); })
      .then(function (cart) { renderCartDrawer(cart); updateCartCount(cart.item_count); })
      .catch(function () {});
  }

  /* ---------------- Add to cart (forms + quick add) ---------------- */
  function bindAddToCartForm(form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var submitBtn = qs('[type="submit"]', form);
      var originalText = submitBtn ? submitBtn.textContent : '';
      if (submitBtn) { submitBtn.disabled = true; submitBtn.textContent = window.themeStrings.adding || 'Añadiendo…'; }

      var formData = new FormData(form);

      fetch(routes + 'cart/add.js', {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: formData
      })
        .then(function (r) { return r.json(); })
        .then(function (data) {
          if (data.status) {
            var errBox = qs('[data-form-error]', form);
            if (errBox) { errBox.textContent = data.description || data.message; errBox.hidden = false; }
            return;
          }
          refreshCartDrawer();
          openCartDrawer();
        })
        .catch(function () {})
        .finally(function () {
          if (submitBtn) { submitBtn.disabled = false; submitBtn.textContent = originalText; }
        });
    });
  }
  qsa('[data-add-to-cart-form]').forEach(bindAddToCartForm);

  /* ---------------- Quantity selector (product page) ---------------- */
  qsa('[data-quantity-selector]').forEach(function (wrap) {
    var input = qs('input', wrap);
    qs('[data-qty-decrease]', wrap) && qs('[data-qty-decrease]', wrap).addEventListener('click', function () {
      input.value = Math.max(parseInt(input.min || 1, 10), parseInt(input.value, 10) - 1);
    });
    qs('[data-qty-increase]', wrap) && qs('[data-qty-increase]', wrap).addEventListener('click', function () {
      input.value = parseInt(input.value, 10) + 1;
    });
  });

  /* ---------------- Variant selection ---------------- */
  qsa('[data-product-form]').forEach(function (formWrap) {
    var variantData = JSON.parse(qs('[data-variant-json]', formWrap).textContent);
    var optionInputs = qsa('[data-option-input]', formWrap);
    var idInput = qs('[data-variant-id]', formWrap);
    var priceEl = qs('[data-product-price]', formWrap);
    var submitBtn = qs('[data-submit-button]', formWrap);

    function getSelectedOptions() {
      var selected = [];
      var groups = {};
      optionInputs.forEach(function (input) {
        if (input.type === 'radio' && !input.checked) return;
        groups[input.getAttribute('data-option-position')] = input.value;
      });
      Object.keys(groups).sort().forEach(function (k) { selected.push(groups[k]); });
      return selected;
    }

    function findVariant() {
      var selected = getSelectedOptions();
      return variantData.find(function (v) {
        return v.options.every(function (opt, i) { return opt === selected[i]; });
      });
    }

    function updateUI() {
      var variant = findVariant();
      qsa('[data-option-input]', formWrap).forEach(function (input) {
        var pill = input.closest('.option-pill, .option-swatch');
        if (pill) pill.classList.toggle('is-selected', input.checked);
      });

      if (!variant) {
        if (submitBtn) { submitBtn.disabled = true; submitBtn.textContent = window.themeStrings.unavailable || 'No disponible'; }
        return;
      }

      if (idInput) idInput.value = variant.id;
      if (priceEl) {
        var html = '<span class="price__' + (variant.compare_at_price > variant.price ? 'sale' : 'regular') + '">' + formatMoney(variant.price) + '</span>';
        if (variant.compare_at_price > variant.price) {
          html += '<span class="price__regular">' + formatMoney(variant.compare_at_price) + '</span>';
          priceEl.classList.add('price--on-sale');
        } else {
          priceEl.classList.remove('price--on-sale');
        }
        priceEl.innerHTML = html;
      }

      if (submitBtn) {
        if (variant.available) {
          submitBtn.disabled = false;
          submitBtn.textContent = window.themeStrings.addToCart || 'Añadir al carrito';
        } else {
          submitBtn.disabled = true;
          submitBtn.textContent = window.themeStrings.soldOut || 'Agotado';
        }
      }

      var mediaId = variant.featured_media ? variant.featured_media.id : null;
      if (mediaId) {
        var target = qs('[data-gallery-thumb][data-media-id="' + mediaId + '"]', formWrap.closest('.product-main'));
        if (target) target.click();
      }

      qsa('[data-current-value]', formWrap).forEach(function (el) {
        var pos = el.getAttribute('data-current-value');
        el.textContent = getSelectedOptions()[pos - 1] || '';
      });
    }

    optionInputs.forEach(function (input) {
      input.addEventListener('change', updateUI);
    });

    updateUI();
  });

  /* ---------------- Product gallery ---------------- */
  qsa('[data-product-gallery]').forEach(function (gallery) {
    var mainWrap = qs('[data-gallery-main]', gallery);
    qsa('[data-gallery-thumb]', gallery).forEach(function (thumb) {
      thumb.addEventListener('click', function () {
        qsa('[data-gallery-thumb]', gallery).forEach(function (t) { t.classList.remove('is-active'); });
        thumb.classList.add('is-active');
        if (!mainWrap) return;
        if (thumb.getAttribute('data-media-type') === 'video') {
          var videoSrc = thumb.getAttribute('data-video-src');
          var poster = thumb.getAttribute('data-poster');
          mainWrap.innerHTML = '<video controls playsinline preload="metadata" poster="' + poster + '"><source src="' + videoSrc + '" type="video/mp4"></video>';
        } else {
          mainWrap.innerHTML = '<img src="' + thumb.getAttribute('data-full-src') + '" alt="">';
        }
      });
    });
  });

  /* ---------------- Accordions & FAQ ---------------- */
  function bindAccordion(selector, itemSelector, panelSelector) {
    qsa(selector + ' ' + itemSelector).forEach(function (item) {
      var trigger = qs('button', item);
      var panel = qs(panelSelector, item);
      if (!trigger || !panel) return;
      trigger.addEventListener('click', function () {
        var isOpen = item.classList.contains('is-open');
        item.classList.toggle('is-open', !isOpen);
        panel.style.maxHeight = !isOpen ? panel.scrollHeight + 'px' : null;
      });
    });
  }
  bindAccordion('[data-accordion]', '.accordion-item', '.accordion-item__panel');
  bindAccordion('[data-faq]', '.faq-item', '.faq-item__answer');

  /* ---------------- Quick add (product cards) ---------------- */
  qsa('[data-quick-add-form]').forEach(bindAddToCartForm);

  /* ---------------- Carousels (e.g. testimonials) ---------------- */
  qsa('[data-carousel]').forEach(function (carousel) {
    var section = carousel.closest('.shopify-section') || carousel.parentElement;
    var track = qs('[data-carousel-track]', carousel);
    var prevBtn = section ? qs('[data-carousel-prev]', section) : null;
    var nextBtn = section ? qs('[data-carousel-next]', section) : null;
    if (!track) return;

    var carouselReducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    var autoplay = carousel.getAttribute('data-carousel-autoplay') === 'true' && !carouselReducedMotion;
    var speed = parseInt(carousel.getAttribute('data-carousel-speed'), 10) || 5000;
    var autoplayTimer = null;

    function cardWidth() {
      var card = track.firstElementChild;
      return card ? card.getBoundingClientRect().width + 24 : carousel.clientWidth * 0.8;
    }

    function scrollByCard(direction) {
      carousel.scrollBy({ left: cardWidth() * direction, behavior: 'smooth' });
    }

    function isAtEnd() {
      return carousel.scrollLeft + carousel.clientWidth >= carousel.scrollWidth - 4;
    }

    function advance() {
      if (isAtEnd()) {
        carousel.scrollTo({ left: 0, behavior: 'smooth' });
      } else {
        scrollByCard(1);
      }
    }

    function stopAutoplay() {
      if (autoplayTimer) { clearInterval(autoplayTimer); autoplayTimer = null; }
    }

    function startAutoplay() {
      if (!autoplay || track.children.length < 2) return;
      stopAutoplay();
      autoplayTimer = setInterval(advance, speed);
    }

    if (prevBtn) prevBtn.addEventListener('click', function () { stopAutoplay(); scrollByCard(-1); startAutoplay(); });
    if (nextBtn) nextBtn.addEventListener('click', function () { stopAutoplay(); scrollByCard(1); startAutoplay(); });

    carousel.addEventListener('mouseenter', stopAutoplay);
    carousel.addEventListener('mouseleave', startAutoplay);
    carousel.addEventListener('touchstart', stopAutoplay, { passive: true });
    carousel.addEventListener('focusin', stopAutoplay);
    carousel.addEventListener('focusout', startAutoplay);

    startAutoplay();
  });

  /* ---------------- Scroll reveal animations ---------------- */
  var revealSelectors = '.feature-grid__item, .step-card, .testimonial-card, .specs-table__row, .collection-card, .product-card, .faq-item, .image-with-text__media, .image-with-text__content';
  var revealEls = qsa(revealSelectors);
  var prefersReducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (revealEls.length && 'IntersectionObserver' in window && !prefersReducedMotion) {
    var groups = {};
    revealEls.forEach(function (el) {
      var parent = el.parentElement;
      if (!parent._revealIndex) parent._revealIndex = 0;
      var i = parent._revealIndex++;
      el.classList.add('reveal');
      el.style.transitionDelay = Math.min(i, 5) * 80 + 'ms';
    });

    var revealObserver = new IntersectionObserver(function (entries, observer) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

    revealEls.forEach(function (el) { revealObserver.observe(el); });
  }

  /* Initial cart count sync */
  document.addEventListener('DOMContentLoaded', function () {
    fetch(routes + 'cart.js').then(function (r) { return r.json(); }).then(function (cart) {
      updateCartCount(cart.item_count);
    }).catch(function () {});
  });
})();
