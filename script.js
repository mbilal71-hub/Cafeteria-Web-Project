/* ================================================================
   CRUNCHY BITES — Complete JavaScript (High Performance)
   ================================================================ */

document.addEventListener('DOMContentLoaded', () => {

  // ================================================================
  // STATE
  // ================================================================
  let cart = loadCartFromStorage() || [];
  let wishlist = [];
  let selectedPaymentMethod = 'cod';
  let appliedCoupon = null;
  const DELIVERY_FEE = 99;
  const TAX_RATE = 0.05;

  const COUPONS = {
    'WELCOME10': { type: 'percent', value: 10, label: '10% discount applied!' },
    'SAVE50':    { type: 'flat',    value: 50, label: 'Rs. 50 discount applied!' },
    'FREESHIP':  { type: 'shipping', value: 0, label: 'Free delivery applied!' },
    'BITES20':   { type: 'percent', value: 20, label: '20% discount applied!' },
  };

  // ================================================================
  // ELEMENTS
  // ================================================================
  const navbar            = document.getElementById('navbar');
  const hamburgerBtn      = document.getElementById('hamburgerBtn');
  const navLinks          = document.getElementById('navLinks');
  const cartToggleBtn     = document.getElementById('cartToggleBtn');
  const floatingCartBtn   = document.getElementById('floatingCartBtn');
  const cartDrawer        = document.getElementById('cartDrawer');
  const cartOverlay       = document.getElementById('cartOverlay');
  const cartCloseBtn      = document.getElementById('cartCloseBtn');
  const cartItemsWrap     = document.getElementById('cartItemsWrap');
  const cartEmptyMsg      = document.getElementById('cartEmptyMsg');
  const cartCount         = document.getElementById('cartCount');
  const floatingCartCount  = document.getElementById('floatingCartCount');
  const cartSubtotal      = document.getElementById('cartSubtotal');
  const cartDelivery      = document.getElementById('cartDelivery');
  const cartTax           = document.getElementById('cartTax');
  const cartTotal         = document.getElementById('cartTotal');
  const discountRow       = document.getElementById('discountRow');
  const cartDiscount      = document.getElementById('cartDiscount');
  const placeOrderBtn     = document.getElementById('placeOrderBtn');
  const couponInput       = document.getElementById('couponInput');
  const applyCouponBtn    = document.getElementById('applyCouponBtn');
  const searchToggleBtn   = document.getElementById('searchToggleBtn');
  const navSearchBox      = document.getElementById('navSearchBox');
  const searchInput       = document.getElementById('searchInput');
  const searchSuggestions = document.getElementById('searchSuggestions');
  const testiTrack        = document.getElementById('testimonialsTrack');
  const testiPrev         = document.getElementById('testiPrev');
  const testiNext         = document.getElementById('testiNext');
  const testiDotsWrap     = document.getElementById('testiDots');
  const toastContainer    = document.getElementById('toastContainer');
  const newsletterEmail   = document.getElementById('newsletterEmail');

  // ================================================================
  // MENU DATA — scraped from DOM
  // ================================================================
  const menuItems = [];

  document.querySelectorAll('[data-name][data-price]').forEach(el => {
    const name  = el.dataset.name;
    const price = parseInt(el.dataset.price, 10);
    if (name && price) {
      menuItems.push({ name, price, el });
    }
  });

  // ================================================================
  // 1. OPTIMIZED NAVBAR SCROLL & ACTIVE LINK (Zero Layout Thrashing)
  // ================================================================
  let isTicking = false;
  let sectionOffsets = [];
  const allNavLinks = document.querySelectorAll('.nav-link');

  function cacheSectionOffsets() {
    const sectionIds = ['home','deals','categories','menu','about','contact'];
    sectionOffsets = sectionIds.map(id => {
      const sec = document.getElementById(id);
      return sec ? { id, top: sec.offsetTop } : null;
    }).filter(Boolean);
  }

  cacheSectionOffsets();
  window.addEventListener('resize', cacheSectionOffsets, { passive: true });

  window.addEventListener('scroll', () => {
    if (!isTicking) {
      requestAnimationFrame(() => {
        const y = window.scrollY;

        // Shrink class toggle
        navbar.classList.toggle('scrolled', y > 60);

        // Active link tracking
        let current = '';
        for (let i = sectionOffsets.length - 1; i >= 0; i--) {
          if (y >= sectionOffsets[i].top - 140) {
            current = sectionOffsets[i].id;
            break;
          }
        }

        allNavLinks.forEach(link => {
          const href = link.getAttribute('href');
          link.classList.toggle('active', href === `#${current}`);
        });

        // Mobile floating cart visibility
        if (window.innerWidth <= 1024 && cart.length > 0) {
          floatingCartBtn.style.display = y > 300 ? 'flex' : 'none';
        }

        isTicking = false;
      });
      isTicking = true;
    }
  }, { passive: true });

  // ================================================================
  // 2. HAMBURGER MOBILE NAV
  // ================================================================
  hamburgerBtn.addEventListener('click', () => {
    hamburgerBtn.classList.toggle('open');
    navLinks.classList.toggle('mobile-open');
  });

  // Close on link click (mobile)
  navLinks.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      hamburgerBtn.classList.remove('open');
      navLinks.classList.remove('mobile-open');
    });
  });

  // Smooth scroll for nav links
  document.querySelectorAll('.nav-link, a[href^="#"]').forEach(a => {
    a.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href && href.startsWith('#') && href.length > 1) {
        const target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    });
  });

  // ================================================================
  // 3. SEARCH
  // ================================================================
  searchToggleBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    navSearchBox.classList.toggle('open');
    if (navSearchBox.classList.contains('open')) searchInput.focus();
  });

  document.addEventListener('click', (e) => {
    if (!e.target.closest('.nav-search-wrap')) {
      navSearchBox.classList.remove('open');
      searchSuggestions.style.display = 'none';
    }
  });

  const debounce = (fn, ms) => {
    let t;
    return (...args) => { clearTimeout(t); t = setTimeout(() => fn(...args), ms); };
  };

  const handleSearch = debounce(e => {
    const q = e.target.value.toLowerCase().trim();
    if (!q) { searchSuggestions.style.display = 'none'; return; }

    const matches = [...new Map(menuItems.map(i => [i.name, i])).values()]
      .filter(i => i.name.toLowerCase().includes(q))
      .slice(0, 6);

    if (!matches.length) { searchSuggestions.style.display = 'none'; return; }

    searchSuggestions.innerHTML = '';
    matches.forEach(m => {
      const div = document.createElement('div');
      div.className = 'suggestion-item';
      div.innerHTML = `<i class="fas fa-search"></i><span>${m.name}</span><small style="margin-left:auto;color:var(--primary);font-weight:700">Rs. ${m.price}</small>`;
      div.addEventListener('click', () => {
        searchInput.value = m.name;
        searchSuggestions.style.display = 'none';
        navSearchBox.classList.remove('open');
        m.el.scrollIntoView({ behavior: 'smooth', block: 'center' });
        m.el.style.outline = '3px solid var(--primary)';
        m.el.style.borderRadius = '16px';
        setTimeout(() => { m.el.style.outline = ''; m.el.style.borderRadius = ''; }, 1800);
      });
      searchSuggestions.appendChild(div);
    });

    searchSuggestions.style.display = 'flex';
    searchSuggestions.style.flexDirection = 'column';
  }, 250);

  searchInput.addEventListener('input', handleSearch);

  // ================================================================
  // 4. CART DRAWER
  // ================================================================
  const openCart = () => {
    cartDrawer.classList.add('open');
    cartOverlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  };

  const closeCart = () => {
    cartDrawer.classList.remove('open');
    cartOverlay.classList.remove('open');
    document.body.style.overflow = '';
  };

  cartToggleBtn.addEventListener('click', openCart);
  floatingCartBtn.addEventListener('click', openCart);
  cartCloseBtn.addEventListener('click', closeCart);
  cartOverlay.addEventListener('click', closeCart);

  // Keyboard close
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeCart();
  });

  // ================================================================
  // 5. ADD TO CART
  // ================================================================
  window.addToCart = (name, price) => {
    const existing = cart.find(i => i.name === name);
    if (existing) {
      existing.quantity += 1;
    } else {
      cart.push({ name, price, quantity: 1 });
    }
    updateCartUI();
    saveCartToStorage();
    showToast(`${name} added to cart`, 'success');
    triggerCartBounce();
  };

  window.removeFromCart = (name) => {
    cart = cart.filter(i => i.name !== name);
    updateCartUI();
    saveCartToStorage();
    showToast(`${name} removed from cart`, 'info');
  };

  window.incrementQty = (name) => {
    const item = cart.find(i => i.name === name);
    if (item) { item.quantity++; updateCartUI(); saveCartToStorage(); }
  };

  window.decrementQty = (name) => {
    const item = cart.find(i => i.name === name);
    if (item) {
      if (item.quantity > 1) { item.quantity--; }
      else { cart = cart.filter(i => i.name !== name); showToast(`${name} removed from cart`, 'info'); }
      updateCartUI();
      saveCartToStorage();
    }
  };

  // Wire up add-to-cart buttons from menu cards
  document.querySelectorAll('.btn-menu-add, .btn-add-cart').forEach(btn => {
    btn.addEventListener('click', function(e) {
      const name  = this.dataset.name;
      const price = parseInt(this.dataset.price, 10);
      if (name && price) {
        addToCart(name, price);
        this.classList.add('adding');
        setTimeout(() => this.classList.remove('adding'), 600);
      }
      createRipple(e, this);
    });
  });

  // Featured section
  document.querySelectorAll('.btn-add-cart').forEach(btn => {
    if (!btn.dataset.name) return;
    btn.addEventListener('click', function(e) {
      addToCart(this.dataset.name, parseInt(this.dataset.price));
      createRipple(e, this);
    });
  });

  // ================================================================
  // 6. UPDATE CART UI
  // ================================================================
  function updateCartUI() {
    const totalItems = cart.reduce((s, i) => s + i.quantity, 0);

    cartCount.textContent = totalItems;
    floatingCartCount.textContent = totalItems;

    if (totalItems > 0 && window.innerWidth <= 1024) {
      floatingCartBtn.style.display = 'flex';
    } else if (totalItems === 0) {
      floatingCartBtn.style.display = 'none';
    }

    renderCartItems();
    renderCartSummary();
  }

  function renderCartItems() {
    if (cart.length === 0) {
      cartEmptyMsg.style.display = 'flex';
      cartItemsWrap.querySelectorAll('.cart-item-row').forEach(el => el.remove());
      return;
    }

    cartEmptyMsg.style.display = 'none';
    cartItemsWrap.querySelectorAll('.cart-item-row').forEach(el => el.remove());

    cart.forEach(item => {
      const row = document.createElement('div');
      row.className = 'cart-item-row';
      row.innerHTML = `
        <div class="cart-item-img">
          <div style="width:100%;height:100%;background:var(--bg-dark);display:flex;align-items:center;justify-content:center;font-size:1.3rem;color:var(--primary)">
            ${getItemIcon(item.name)}
          </div>
        </div>
        <div class="cart-item-info">
          <div class="cart-item-name" title="${item.name}">${item.name}</div>
          <div class="cart-item-price-row">Rs. ${(item.price * item.quantity).toLocaleString()}</div>
        </div>
        <div class="cart-qty-control">
          <button class="qty-btn" onclick="decrementQty('${item.name}')" aria-label="Decrease quantity"><i class="fas fa-minus"></i></button>
          <span class="qty-num">${item.quantity}</span>
          <button class="qty-btn" onclick="incrementQty('${item.name}')" aria-label="Increase quantity"><i class="fas fa-plus"></i></button>
        </div>
        <button class="cart-item-del" onclick="removeFromCart('${item.name}')" aria-label="Remove item">
          <i class="fas fa-trash-alt"></i>
        </button>
      `;
      cartItemsWrap.appendChild(row);
    });
  }

  function renderCartSummary() {
    const subtotal = cart.reduce((s, i) => s + i.price * i.quantity, 0);
    let discount  = 0;
    let delivery  = DELIVERY_FEE;

    if (appliedCoupon) {
      if (appliedCoupon.type === 'percent') discount = Math.round(subtotal * appliedCoupon.value / 100);
      if (appliedCoupon.type === 'flat')    discount = appliedCoupon.value;
      if (appliedCoupon.type === 'shipping') delivery = 0;
    }

    if (subtotal >= 800) delivery = 0;

    const tax   = Math.round((subtotal - discount) * TAX_RATE);
    const total = subtotal - discount + delivery + tax;

    cartSubtotal.textContent = `Rs. ${subtotal.toLocaleString()}`;
    cartDelivery.textContent = delivery === 0 ? 'FREE' : `Rs. ${delivery}`;
    cartTax.textContent      = `Rs. ${tax.toLocaleString()}`;
    cartTotal.textContent    = `Rs. ${total.toLocaleString()}`;

    if (discount > 0) {
      discountRow.style.display = 'flex';
      cartDiscount.textContent  = `-Rs. ${discount.toLocaleString()}`;
    } else {
      discountRow.style.display = 'none';
    }
  }

  function getItemIcon(name) {
    const n = name.toLowerCase();
    if (n.includes('burger') || n.includes('sandwich') || n.includes('zinger')) return '<i class="fas fa-hamburger"></i>';
    if (n.includes('pizza')) return '<i class="fas fa-pizza-slice"></i>';
    if (n.includes('chicken') || n.includes('wings') || n.includes('strips')) return '<i class="fas fa-drumstick-bite"></i>';
    if (n.includes('fries') || n.includes('onion')) return '<i class="fas fa-utensils"></i>';
    if (n.includes('shake') || n.includes('juice') || n.includes('cola') || n.includes('pepsi') || n.includes('sprite')) return '<i class="fas fa-glass-whiskey"></i>';
    if (n.includes('ice cream') || n.includes('sundae')) return '<i class="fas fa-ice-cream"></i>';
    if (n.includes('brownie') || n.includes('cookie') || n.includes('pie')) return '<i class="fas fa-cookie"></i>';
    if (n.includes('mozzarella')) return '<i class="fas fa-cheese"></i>';
    return '<i class="fas fa-utensils"></i>';
  }

  // ================================================================
  // 7. COUPON CODE
  // ================================================================
  applyCouponBtn.addEventListener('click', () => {
    const code = couponInput.value.trim().toUpperCase();
    if (!code) { showToast('Please enter a promo code', 'warning'); return; }

    if (COUPONS[code]) {
      appliedCoupon = COUPONS[code];
      showToast(COUPONS[code].label, 'success');
      couponInput.value = '';
      couponInput.placeholder = `${code} applied`;
      couponInput.style.borderColor = 'var(--success)';
      renderCartSummary();
    } else {
      showToast('Invalid promo code', 'error');
      couponInput.style.borderColor = 'var(--primary)';
      setTimeout(() => couponInput.style.borderColor = '', 1500);
    }
  });

  couponInput.addEventListener('keydown', e => { if (e.key === 'Enter') applyCouponBtn.click(); });

  // ================================================================
  // 8. PAYMENT METHODS
  // ================================================================
  document.querySelectorAll('.payment-method-btn').forEach(btn => {
    btn.addEventListener('click', function() {
      document.querySelectorAll('.payment-method-btn').forEach(b => b.classList.remove('active'));
      this.classList.add('active');
      selectedPaymentMethod = this.dataset.method;
    });
  });

  // ================================================================
  // 9. PLACE ORDER
  // ================================================================
  placeOrderBtn.addEventListener('click', () => {
    if (cart.length === 0) { showToast('Your cart is empty', 'warning'); return; }

    const subtotal = cart.reduce((s, i) => s + i.price * i.quantity, 0);
    let discount = 0, delivery = DELIVERY_FEE;
    if (appliedCoupon) {
      if (appliedCoupon.type === 'percent') discount = Math.round(subtotal * appliedCoupon.value / 100);
      if (appliedCoupon.type === 'flat') discount = appliedCoupon.value;
      if (appliedCoupon.type === 'shipping') delivery = 0;
    }
    if (subtotal >= 800) delivery = 0;
    const tax = Math.round((subtotal - discount) * TAX_RATE);
    const total = subtotal - discount + delivery + tax;

    closeCart();

    const methodLabels = {
      cod: 'Cash on Delivery', visa: 'Visa Card',
      mastercard: 'Mastercard', applepay: 'Apple Pay',
      googlepay: 'Google Pay', jazz: 'JazzCash'
    };

    const modal = document.createElement('div');
    modal.className = 'order-modal';
    modal.innerHTML = `
      <div class="order-modal-box">
        <div class="modal-icon"><i class="fas fa-check-circle" style="color:var(--success); font-size: 3.5rem;"></i></div>
        <h2>Order Confirmed</h2>
        <p>Thank you for dining with <strong>Crunchy Bites</strong>.<br>Your order is being prepared by our kitchen team.</p>
        <div class="modal-total">Rs. ${total.toLocaleString()}</div>
        <p style="font-size:0.85rem;color:var(--text-muted)">
          Payment Method: ${methodLabels[selectedPaymentMethod] || 'Cash on Delivery'}<br>
          Estimated Express Delivery: <strong>25–35 minutes</strong>
        </p>
        <button class="modal-close-btn ripple" id="modalCloseBtn">
          <i class="fas fa-check"></i> Close
        </button>
      </div>
    `;
    document.body.appendChild(modal);
    document.getElementById('modalCloseBtn').addEventListener('click', () => modal.remove());
    modal.addEventListener('click', e => { if (e.target === modal) modal.remove(); });

    cart = [];
    appliedCoupon = null;
    couponInput.placeholder = 'Promo code (e.g. WELCOME10)';
    couponInput.style.borderColor = '';
    updateCartUI();
    saveCartToStorage();
  });

  // ================================================================
  // 10. WISHLIST
  // ================================================================
  document.querySelectorAll('.product-wish, .menu-wish').forEach(btn => {
    btn.addEventListener('click', function(e) {
      e.stopPropagation();
      this.classList.toggle('active');
      const card = this.closest('[data-name]');
      const name = card ? card.dataset.name : 'Item';
      if (this.classList.contains('active')) {
        this.innerHTML = '<i class="fas fa-heart"></i>';
        showToast(`${name} added to wishlist`, 'info');
        wishlist.push(name);
      } else {
        this.innerHTML = '<i class="far fa-heart"></i>';
        wishlist = wishlist.filter(n => n !== name);
      }
      const count = document.getElementById('wishlistCount');
      if (count) {
        count.textContent = wishlist.length;
        count.style.display = wishlist.length > 0 ? 'flex' : 'none';
      }
    });
  });

  // ================================================================
  // 11. DEAL BUTTONS
  // ================================================================
  document.querySelectorAll('.btn-deal').forEach((btn, i) => {
    const deals = [
      { name: 'Family Bucket Deal', price: 1599 },
      { name: 'Double Burger Feast', price: 899 },
      { name: 'Pizza Weekend Deal', price: 1200 },
    ];
    btn.addEventListener('click', function(e) {
      const deal = deals[i];
      if (deal) { addToCart(deal.name, deal.price); openCart(); }
      createRipple(e, this);
    });
  });

  // ================================================================
  // 12. COUNTDOWN TIMERS
  // ================================================================
  const countdownConfigs = [
    { h: 'c1-h', m: 'c1-m', s: 'c1-s', totalSeconds: 4 * 3600 },
    { h: 'c2-h', m: 'c2-m', s: 'c2-s', totalSeconds: 2 * 3600 },
    { h: 'c3-h', m: 'c3-m', s: 'c3-s', totalSeconds: 6 * 3600 },
  ];

  countdownConfigs.forEach(cfg => {
    let remaining = cfg.totalSeconds;
    const tick = () => {
      if (remaining <= 0) return;
      remaining--;
      const h = Math.floor(remaining / 3600);
      const m = Math.floor((remaining % 3600) / 60);
      const s = remaining % 60;
      const hEl = document.getElementById(cfg.h);
      const mEl = document.getElementById(cfg.m);
      const sEl = document.getElementById(cfg.s);
      if (hEl) hEl.textContent = String(h).padStart(2, '0');
      if (mEl) mEl.textContent = String(m).padStart(2, '0');
      if (sEl) sEl.textContent = String(s).padStart(2, '0');
    };
    tick();
    setInterval(tick, 1000);
  });

  // ================================================================
  // 13. TESTIMONIAL CAROUSEL
  // ================================================================
  if (testiTrack) {
    const cards = testiTrack.querySelectorAll('.testimonial-card');
    const totalCards = cards.length;
    let currentIndex = 0;
    let autoplayInterval;
    let perView = window.innerWidth < 768 ? 1 : window.innerWidth < 1024 ? 2 : 3;

    const dotCount = Math.ceil(totalCards / perView);
    for (let i = 0; i < dotCount; i++) {
      const dot = document.createElement('div');
      dot.className = 'testi-dot' + (i === 0 ? ' active' : '');
      dot.addEventListener('click', () => { goTo(i); resetAutoplay(); });
      testiDotsWrap.appendChild(dot);
    }

    function goTo(index) {
      const maxIndex = Math.ceil(totalCards / perView) - 1;
      currentIndex = Math.max(0, Math.min(index, maxIndex));
      const cardWidth = cards[0].offsetWidth + 24;
      testiTrack.style.transform = `translate3d(-${currentIndex * cardWidth * perView}px, 0, 0)`;
      testiDotsWrap.querySelectorAll('.testi-dot').forEach((d, i) => d.classList.toggle('active', i === currentIndex));
    }

    function next() { goTo(currentIndex + 1 >= Math.ceil(totalCards / perView) ? 0 : currentIndex + 1); }
    function prev() { goTo(currentIndex <= 0 ? Math.ceil(totalCards / perView) - 1 : currentIndex - 1); }

    testiNext.addEventListener('click', () => { next(); resetAutoplay(); });
    testiPrev.addEventListener('click', () => { prev(); resetAutoplay(); });

    function startAutoplay() { autoplayInterval = setInterval(next, 5000); }
    function resetAutoplay() { clearInterval(autoplayInterval); startAutoplay(); }

    startAutoplay();

    window.addEventListener('resize', () => {
      perView = window.innerWidth < 768 ? 1 : window.innerWidth < 1024 ? 2 : 3;
      goTo(0);
    }, { passive: true });
  }

  // ================================================================
  // 14. SCROLL REVEAL ANIMATIONS (Optimized Observer)
  // ================================================================
  const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.05, rootMargin: '0px 0px 50px 0px' });

  document.querySelectorAll('.reveal-up').forEach(el => revealObserver.observe(el));

  // ================================================================
  // 15. RIPPLE EFFECT
  // ================================================================
  function createRipple(e, el) {
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const size = Math.max(rect.width, rect.height) * 2;
    const wave = document.createElement('span');
    wave.className = 'ripple-wave';
    wave.style.cssText = `width:${size}px;height:${size}px;left:${x - size/2}px;top:${y - size/2}px`;
    el.appendChild(wave);
    setTimeout(() => wave.remove(), 600);
  }

  document.querySelectorAll('.ripple').forEach(btn => {
    btn.addEventListener('click', function(e) { createRipple(e, this); });
  });

  // ================================================================
  // 16. CART BOUNCE ANIMATION
  // ================================================================
  function triggerCartBounce() {
    cartToggleBtn.style.transform = 'scale(1.2)';
    setTimeout(() => cartToggleBtn.style.transform = '', 250);
  }

  // ================================================================
  // 17. NEWSLETTER SUBSCRIBE
  // ================================================================
  const newsletterBtn = document.querySelector('.btn-newsletter');
  if (newsletterBtn && newsletterEmail) {
    newsletterBtn.addEventListener('click', () => {
      const email = newsletterEmail.value.trim();
      if (!email || !email.includes('@')) {
        showToast('Please enter a valid email address', 'warning');
        return;
      }
      showToast('Subscribed! Exclusive deals will arrive in your inbox.', 'success');
      newsletterEmail.value = '';
    });
  }

  // ================================================================
  // 18. TOAST SYSTEM
  // ================================================================
  function showToast(message, type = 'success') {
    const toast = document.createElement('div');
    const icons = {
      success: 'fa-check-circle',
      info:    'fa-info-circle',
      warning: 'fa-exclamation-triangle',
      error:   'fa-times-circle',
    };
    toast.className = `toast toast-${type}`;
    toast.innerHTML = `<i class="fas ${icons[type] || icons.success}"></i><span>${message}</span>`;
    toastContainer.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateX(60px)';
      toast.style.transition = '0.3s ease';
      setTimeout(() => toast.remove(), 350);
    }, 3000);
  }

  // ================================================================
  // 19. LOCAL STORAGE
  // ================================================================
  function saveCartToStorage() {
    try { localStorage.setItem('crunchyBitesCart_v2', JSON.stringify(cart)); } catch(_) {}
  }

  function loadCartFromStorage() {
    try {
      const d = localStorage.getItem('crunchyBitesCart_v2');
      return d ? JSON.parse(d) : null;
    } catch(_) { return null; }
  }

  // ================================================================
  // INIT
  // ================================================================
  updateCartUI();

});