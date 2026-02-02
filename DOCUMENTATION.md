# 📖 Project Documentation - Premium Bites

This document provides a technical overview of the "Premium Bites" Cafeteria Web project.

## 📂 Project Structure

```text
/Resturant Web
├── index.html        # Main entry point, project structure
├── style.css         # Visual design and responsive layouts
├── script.js         # Interactivity and business logic
├── README.md         # Project overview
├── DOCUMENTATION.md  # Technical documentation
└── update-images.ps1 # Automation script for image updates
```

---

## 🏛️ Components

### 1. HTML (`index.html`)
The structure is divided into several main semantic sections:
- **Header**: Contains the logo, navigation links, and the search bar.
- **Banner**: A hero section with a call-to-action button.
- **Menu Section**: A two-column grid:
    - **Menu Content**: Grouped into categories (Fried Chicken, Burgers, Pizza, etc.) using `menu-grid` and `menu-card`.
    - **Cart Sidebar**: Floating container that tracks selected items.
- **Footer**: Social links and copyright information.

### 2. CSS (`style.css`)
- **Color Palette**: 
    - Secondary/Accents: `#ffbd21` (Gold), `#ff4d4d` (Red)
    - Dark Theme: `#0f172a`, `#1e293b` (Slate shades)
- **Typography**: Uses `Montserrat` for body text and `Sora` for headings.
- **Key Classes**:
    - `.fade-in-up`: Handles the scroll-reveal animations.
    - `.menu-card`: Styled container for individual food items.
    - `.cart-sidebar`: Fixed/Sticky layout for easy access to the order summary.

### 3. JavaScript (`script.js`)
- **State Management**: Uses an `orderItems` array to keep track of the cart contents.
- **Cart Logic**:
    - `addToCart(item)`: Adds an item and updates the UI.
    - `updateCartUI()`: Re-renders the cart sidebar and calculates the total amount.
- **Search Logic**:
    - Listens for input on the search bar.
    - Filters existing menu items based on the search query.
- **Animations**: Uses `IntersectionObserver` to trigger the `fade-in-up` class on scroll.

---

## ⚙️ Automation

### `update-images.ps1`
A PowerShell script used to manage and update image URLs across the website. This helps in maintaining high-definition imagery from sources like Unsplash without manually editing hundreds of lines of HTML.

---

## 🛠️ Maintenance & Future Updates
- **Adding Items**: To add a new menu item, replicate a `.menu-card` div within the appropriate category in `index.html`. Ensure `data-name` and `data-price` attributes are correctly set.
- **Styling Changes**: Global theme colors can be updated in the `:root` or top-level variables in `style.css`.
