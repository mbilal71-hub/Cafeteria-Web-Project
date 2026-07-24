# Technical Documentation - Crunchy Bites

This document provides a comprehensive technical overview of the Crunchy Bites web application.

---

## Project Structure

```text
Cafeteria Web/
├── index.html        # Main HTML structure, semantic layout, accessibility metadata
├── style.css         # CSS design system, design tokens, glassmorphism, responsive grid
├── script.js         # Interactive application logic, cart drawer, search, timers
├── README.md         # Public repository documentation
├── DOCUMENTATION.md  # Detailed technical specifications
└── update-images.ps1 # Helper script for batch image updates
```

---

## Architecture & Components

### 1. HTML (`index.html`)
The document uses semantic HTML5 elements structured into cohesive sections:
- **Navbar**: Sticky glassmorphism header containing the logo, responsive navigation links, quick search overlay, wishlist count badge, cart drawer trigger, and user login action.
- **Hero Section**: Fullscreen split layout with call-to-action buttons, delivery guarantee badge, statistical indicators, floating product cards, and key promotional highlights.
- **Offer Marquee**: Continuous horizontal ticker demonstrating active deals and promotions.
- **Deals Section**: Interactive promotional offer cards featuring live JavaScript countdown timers.
- **Food Categories**: Grid of circular category selection targets for rapid section navigation.
- **Featured Products**: Highlighted best-selling menu items featuring quick-view and add-to-cart controls.
- **Full Menu Catalogue**: Organised menu blocks (Crispy Chicken, Burgers, Pizza, Beverages, Sides, Desserts) utilizing data attributes (`data-name`, `data-price`) for dynamic state management.
- **Why Choose Us**: Dark-themed brand value proposition grid detailing quality, speed, and security guarantees.
- **Testimonial Carousel**: Multi-slide customer feedback slider with automatic rotation and manual dot/arrow pagination controls.
- **Mobile App Banner**: Dedicated promotional section with CSS-rendered smartphone UI mockup and download CTA buttons.
- **Cart Drawer**: Slide-over panel containing order items, quantity controls, promo code engine, live subtotal/tax/delivery calculation, payment gateway selectors, and instant checkout triggers.
- **Footer**: Brand links, help center documentation, location info, newsletter subscription, and supported payment network indicators.

### 2. CSS Architecture (`style.css`)
- **Design Tokens**: Standardized CSS custom properties for primary (`#E31837`), secondary (`#FFC72C`), background, typography, and shadow depth.
- **Typography System**: Google Fonts pairing using `Poppins` for display headers and `Manrope` for UI copy.
- **Micro-Interactions**: Custom CSS animation keyframes for floating hero assets, marquee scrolling, modal entry, ripple button feedback, and reveal animations.
- **Responsive Layout**: Fluid CSS Grid and Flexbox structures supporting viewports down to 320px width without layout breakage.

### 3. JavaScript Application Logic (`script.js`)
- **State Management**: LocalStorage-persisted cart array tracking menu items, price values, and quantities.
- **Cart Engine**: Dynamic calculation of subtotal, free shipping thresholds (orders over Rs. 800), tax rates (5%), and applied promotional coupon discounts.
- **Interactive Search**: Debounced client-side menu filter displaying instant query suggestions and auto-scrolling to selected menu items.
- **Timer Subsystem**: Interval-based countdown renderer for limited-time promotional deals.
- **Carousel Engine**: Touch-friendly testimonial slider supporting automatic rotation and window resize recalculations.

---

## Maintenance & Updates

- **Adding Menu Items**: Add a `.menu-card` or `.product-card` element to the designated category block inside `index.html`. Set `data-name` and `data-price` attributes to enable automated cart integration.
- **Modifying Theme Variables**: Adjust color hex codes inside `:root` in `style.css` to update the global design theme.
