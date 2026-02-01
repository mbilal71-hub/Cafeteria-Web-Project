document.addEventListener("DOMContentLoaded", () => {
  // Initialize state
  let cart = loadCartFromStorage() || [];
  const menuItems = [];

  // --- 1. Populate Menu Data from Cards ---
  document.querySelectorAll(".menu-card").forEach((card) => {
    const name = card.dataset.name;
    const price = parseInt(card.dataset.price);
    const btn = card.querySelector(".add-btn");

    if (btn && name && price) {
      btn.onclick = () => addToCart(name, price);
      menuItems.push({ name, price, card });
    }
  });

  // --- 2. Scroll Animations with Intersection Observer ---
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.classList.add("visible");
        }, index * 100);
      }
    });
  }, observerOptions);

  document.querySelectorAll(".fade-in-up").forEach((el) => {
    observer.observe(el);
  });

  // --- 3. Cart Functionality ---

  window.addToCart = (name, price) => {
    const existingItem = cart.find((item) => item.name === name);
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.push({ name, price, quantity: 1 });
    }
    updateCartDisplay();
    saveCartToStorage();
    showToast(`✓ ${name} added to cart!`, "success");

    // Add visual feedback
    if (event && event.target) {
      const btn = event.target.closest(".add-btn");
      if (btn) {
        btn.classList.add("clicked");
        setTimeout(() => btn.classList.remove("clicked"), 300);
      }
    }
  };

  window.removeFromCart = (name) => {
    const index = cart.findIndex((item) => item.name === name);
    if (index > -1) {
      if (cart[index].quantity > 1) {
        cart[index].quantity -= 1;
      } else {
        cart.splice(index, 1);
      }
    }
    updateCartDisplay();
    saveCartToStorage();
    showToast(`${name} removed from cart`, "info");
  };

  window.incrementQuantity = (name) => {
    const item = cart.find((item) => item.name === name);
    if (item) {
      item.quantity += 1;
      updateCartDisplay();
      saveCartToStorage();
    }
  };

  window.decrementQuantity = (name) => {
    const item = cart.find((item) => item.name === name);
    if (item && item.quantity > 1) {
      item.quantity -= 1;
      updateCartDisplay();
      saveCartToStorage();
    }
  };

  function updateCartDisplay() {
    const cartContainer = document.querySelector(".cart-items");
    const totalEl = document.querySelector("#cart-total-amount");

    cartContainer.innerHTML = "";

    if (cart.length === 0) {
      cartContainer.innerHTML =
        '<p style="text-align:center; color: #94a3b8; margin-top: 1rem;">Your cart is empty</p>';
      totalEl.innerText = "0";
      return;
    }

    let total = 0;

    cart.forEach((item) => {
      const itemTotal = item.price * item.quantity;
      total += itemTotal;

      const itemEl = document.createElement("div");
      itemEl.className = "cart-item";
      itemEl.innerHTML = `
        <div class="cart-item-info">
            <div class="cart-item-name">${item.name}</div>
            <div style="display: flex; align-items: center; gap: 0.5rem; margin-top: 0.3rem;">
              <button onclick="decrementQuantity('${item.name}')" style="background: rgba(255,99,71,0.2); border: none; color: #ff6347; width: 24px; height: 24px; border-radius: 4px; cursor: pointer; font-weight: bold;">-</button>
              <span style="font-size:0.9em; color:#94a3b8; min-width: 30px; text-align: center;">${item.quantity}</span>
              <button onclick="incrementQuantity('${item.name}')" style="background: rgba(255,99,71,0.2); border: none; color: #ff6347; width: 24px; height: 24px; border-radius: 4px; cursor: pointer; font-weight: bold;">+</button>
            </div>
        </div>
        <div style="display:flex; align-items:center; gap: 0.5rem;">
             <div class="cart-item-price">Rs. ${itemTotal}</div>
             <button class="remove-btn" onclick="removeFromCart('${item.name}')"><i class="fas fa-trash"></i></button>
        </div>
      `;
      cartContainer.appendChild(itemEl);
    });

    totalEl.innerText = total;
  }

  // --- 4. Local Storage ---
  function saveCartToStorage() {
    localStorage.setItem("premiumBitesCart", JSON.stringify(cart));
  }

  function loadCartFromStorage() {
    const saved = localStorage.getItem("premiumBitesCart");
    return saved ? JSON.parse(saved) : null;
  }

  // --- 5. Pay Bill ---
  document.querySelector(".pay-btn").addEventListener("click", () => {
    if (cart.length === 0) {
      showToast("⚠ Cart is empty!", "warning");
      return;
    }
    const total = document.querySelector("#cart-total-amount").innerText;

    // Create custom modal
    const modal = document.createElement("div");
    modal.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0,0,0,0.9);
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 3000;
      animation: fadeIn 0.3s ease;
    `;

    modal.innerHTML = `
      <div style="
        background: linear-gradient(135deg, #1a1a1a, #000);
        padding: 3rem;
        border-radius: 20px;
        text-align: center;
        border: 2px solid #ff6347;
        box-shadow: 0 10px 50px rgba(255,99,71,0.6);
        animation: slideInUp 0.3s ease;
        max-width: 400px;
      ">
        <i class="fas fa-check-circle" style="font-size: 4rem; color: #22c55e; margin-bottom: 1rem;"></i>
        <h2 style="color: #d4af37; margin-bottom: 1rem;">Order Confirmed!</h2>
        <p style="color: #f1f5f9; font-size: 1.1rem; margin-bottom: 0.5rem;">Thank you for dining at Premium Bites!</p>
        <p style="color: #ff6347; font-size: 1.5rem; font-weight: bold; margin: 1rem 0;">Total: Rs. ${total}</p>
        <p style="color: #94a3b8; font-size: 0.9rem; margin-bottom: 2rem;">Your order will be ready shortly!</p>
        <button onclick="this.parentElement.parentElement.remove()" style="
          background: linear-gradient(135deg, #ff6347, #ff4520);
          color: white;
          border: none;
          padding: 1rem 2rem;
          border-radius: 50px;
          font-size: 1rem;
          font-weight: 600;
          cursor: pointer;
          box-shadow: 0 5px 20px rgba(255,99,71,0.5);
        ">Close</button>
      </div>
    `;

    document.body.appendChild(modal);

    cart = [];
    updateCartDisplay();
    saveCartToStorage();
  });

  // --- 6. Search Functionality ---
  const searchInput = document.querySelector(".search-bar input");
  const suggestionsBox = document.querySelector(".search-suggestions");

  // Debounce function
  function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }

  const handleSearch = debounce((e) => {
    const query = e.target.value.toLowerCase().trim();

    if (query.length > 0) {
      const matches = menuItems
        .filter((item) => item.name.toLowerCase().includes(query))
        .slice(0, 5);

      showSuggestions(matches);
    } else {
      suggestionsBox.style.display = "none";
      menuItems.forEach((item) => (item.card.style.display = ""));
    }

    // Filter cards
    menuItems.forEach((item) => {
      if (item.name.toLowerCase().includes(query)) {
        item.card.style.display = "";
      } else {
        item.card.style.display = "none";
      }
    });
  }, 300);

  searchInput.addEventListener("input", handleSearch);

  function showSuggestions(matches) {
    if (matches.length === 0) {
      suggestionsBox.style.display = "none";
      return;
    }

    suggestionsBox.innerHTML = "";
    matches.forEach((match) => {
      const div = document.createElement("div");
      div.innerHTML = `<i class="fas fa-search" style="margin-right: 0.5rem; opacity: 0.5;"></i>${match.name}`;
      div.onclick = () => {
        searchInput.value = match.name;
        const event = new Event("input");
        searchInput.dispatchEvent(event);
        suggestionsBox.style.display = "none";
      };
      suggestionsBox.appendChild(div);
    });

    suggestionsBox.style.display = "flex";
  }

  // Close suggestions when clicking outside
  document.addEventListener("click", (e) => {
    if (!e.target.closest(".search-container")) {
      suggestionsBox.style.display = "none";
    }
  });

  // --- 7. Toast Notification System ---
  function showToast(message, type = "success") {
    // Remove existing toasts
    const existingToast = document.querySelector(".toast");
    if (existingToast) {
      existingToast.remove();
    }

    const toast = document.createElement("div");
    toast.className = "toast";

    const icons = {
      success: "fa-check-circle",
      info: "fa-info-circle",
      warning: "fa-exclamation-triangle",
    };

    const colors = {
      success: "linear-gradient(135deg, #22c55e, #16a34a)",
      info: "linear-gradient(135deg, #3b82f6, #2563eb)",
      warning: "linear-gradient(135deg, #f59e0b, #d97706)",
    };

    toast.style.background = colors[type] || colors.success;
    toast.innerHTML = `
      <i class="fas ${icons[type] || icons.success}"></i>
      <span>${message}</span>
    `;

    document.body.appendChild(toast);

    setTimeout(() => {
      toast.remove();
    }, 3000);
  }

  // --- 8. Smooth Scroll for Navigation ---
  document.querySelectorAll("nav a").forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      const href = this.getAttribute("href");
      if (href.startsWith("#")) {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          target.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }
    });
  });

  // --- 9. Mobile Cart Toggle ---
  const cartSidebar = document.querySelector(".cart-sidebar");
  if (window.innerWidth <= 900) {
    cartSidebar.addEventListener("click", (e) => {
      if (e.target.closest("h3")) {
        cartSidebar.classList.toggle("open");
      }
    });
  }

  // --- 10. Header Scroll Effect ---
  let lastScroll = 0;
  window.addEventListener("scroll", () => {
    const header = document.querySelector("header");
    const currentScroll = window.pageYOffset;

    if (currentScroll > 100) {
      header.style.boxShadow = "0 4px 30px rgba(255, 99, 71, 0.5)";
    } else {
      header.style.boxShadow = "0 4px 20px rgba(255, 99, 71, 0.3)";
    }

    lastScroll = currentScroll;
  });

  // Initialize cart display on load
  updateCartDisplay();

  // Welcome toast
  setTimeout(() => {
    showToast("🍔 Welcome to Premium Bites!", "success");
  }, 500);
});
