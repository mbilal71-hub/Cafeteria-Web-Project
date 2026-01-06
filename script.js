document.addEventListener("DOMContentLoaded", () => {
  // Initialize state
  let cart = [];
  const menuItems = []; // Will be populated from DOM or manually

  // --- 1. Populate Menu Data from DOM ---
  // We scan the tables to build our menu index for search and cart adds
  document.querySelectorAll(".section table tr").forEach((row, index) => {
    // Skip header rows
    if (row.querySelector("th")) return;

    const cells = row.querySelectorAll("td");
    if (cells.length >= 2) {
      const name = cells[0].innerText;
      const price = parseInt(cells[1].innerText);

      // Store reference to the row to show/hide it during search
      row.dataset.itemName = name.toLowerCase();

      // Create 'Add' button dynamically
      const actionCell = document.createElement("td");
      const btn = document.createElement("button");
      btn.className = "add-btn";
      btn.innerHTML = '<i class="fas fa-plus"></i> Add';
      btn.onclick = () => addToCart(name, price);
      actionCell.appendChild(btn);
      row.appendChild(actionCell);

      menuItems.push({ name, price, row });
    } else {
      // If there's a header row, we need to add an empty "Action" header cell
      // We do this by finding the previous sibling TR or parent's previous sibling
      // A cleaner way is to handle the TH in the specific table header logic below
    }
  });

  // Add "Action" header to all tables
  document.querySelectorAll("table").forEach((table) => {
    const headerRow = table.querySelector("tr");
    if (headerRow) {
      const th = document.createElement("th");
      th.innerText = "Add";
      headerRow.appendChild(th);
    }
  });

  // --- 2. Cart Functionality ---

  window.addToCart = (name, price) => {
    // Check if item already exists to update quantity (optional, simple logic for now: just add)
    // Detailed logic:
    const existingItem = cart.find((item) => item.name === name);
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.push({ name, price, quantity: 1 });
    }
    updateCartDisplay();
    // Optional: visual feedback
    showToast(`Added ${name} to cart`);
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
  };

  function updateCartDisplay() {
    const cartContainer = document.querySelector(".cart-items");
    const totalEl = document.querySelector("#cart-total-amount");

    cartContainer.innerHTML = "";

    if (cart.length === 0) {
      cartContainer.innerHTML =
        '<p style="text-align:center; color: #64748b; margin-top: 1rem;">Your cart is empty</p>';
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
            <div class="cart-item-name">${item.name} <span style="font-size:0.8em; color:#94a3b8;">x${item.quantity}</span></div>
        </div>
        <div style="display:flex; align-items:center;">
             <div class="cart-item-price">Rs. ${itemTotal}</div>
             <button class="remove-btn" onclick="removeFromCart('${item.name}')"><i class="fas fa-trash"></i></button>
        </div>
      `;
      cartContainer.appendChild(itemEl);
    });

    totalEl.innerText = total;
  }

  // Pay Bill
  document.querySelector(".pay-btn").addEventListener("click", () => {
    if (cart.length === 0) {
      alert("Cart is empty!");
      return;
    }
    const total = document.querySelector("#cart-total-amount").innerText;
    alert(
      `Thank you for dining at Tea 2 Night!\nTotal Bill: Rs. ${total}\nPayment processed successfully.`
    );
    cart = [];
    updateCartDisplay();
  });

  // --- 3. Search Functionality ---

  const searchInput = document.querySelector(".search-bar input");
  const suggestionsBox = document.querySelector(".search-suggestions");

  searchInput.addEventListener("input", (e) => {
    const query = e.target.value.toLowerCase().trim();

    // Suggestion Logic (1-2 words)
    // We filter unique names that start with the query
    if (query.length > 0) {
      const matches = menuItems
        .filter((item) => item.name.toLowerCase().includes(query))
        .slice(0, 5); // Limit to 5 suggestions

      showSuggestions(matches);
    } else {
      suggestionsBox.style.display = "none";
      // Reset all rows if search cleared
      menuItems.forEach((item) => (item.row.style.display = ""));
    }

    // Filter Logic (Real-time filtering of tables)
    menuItems.forEach((item) => {
      if (item.name.toLowerCase().includes(query)) {
        item.row.style.display = "";
      } else {
        item.row.style.display = "none";
      }
    });
  });

  function showSuggestions(matches) {
    if (matches.length === 0) {
      suggestionsBox.style.display = "none";
      return;
    }

    suggestionsBox.innerHTML = "";
    matches.forEach((match) => {
      const div = document.createElement("div");
      div.innerText = match.name;
      div.onclick = () => {
        searchInput.value = match.name;
        // Trigger filter manually
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

  // Simple Toast function
  function showToast(msg) {
    // Could implement a nice UI toast, using alert temporarily or console
    console.log(msg);
  }
});
