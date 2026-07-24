# Crunchy Bites - Premium Fast Food Restaurant Web Application

Crunchy Bites is a modern, responsive, and high-performance fast-food restaurant web application designed to deliver an international brand experience inspired by top global fast-food chains.

---

## Project Description

Crunchy Bites provides customers with a seamless online ordering platform for gourmet fast food including crispy fried chicken, handcrafted burgers, stone-baked pizzas, chilled beverages, side items, and desserts. The web application features an express checkout system, live promo code engine, interactive menu search, deal countdown timers, mobile cart drawer, and customer review slider—built entirely using clean Vanilla HTML5, CSS3, and JavaScript without external runtime dependencies.

---

## Features

- **Glassmorphism Navigation**: Sticky header with blur effects, dynamic scroll-shrink effect, active section tracking, and mobile navigation overlay.
- **Hero Showcase**: Split-screen design featuring bold typography, floating food highlights, express delivery status, verified rating counters, and dual call-to-action buttons.
- **Continuous Offer Ticker**: Animated horizontal marquee presenting active deals and seasonal discounts.
- **Promotional Deals & Countdowns**: Promotional deal cards with real-time countdown timers and quick claim triggers.
- **Categorized Food Selection**: Interactive circular category items offering instant scroll navigation to specific menu catalogue sections.
- **Best Seller Showcase**: Featured products grid with rating scores, wishlist toggles, and quick-add actions.
- **Complete Menu Catalogue**: Comprehensive food listings across 6 categories (Chicken, Burgers, Pizza, Beverages, Sides, Desserts) with rich imagery and price details.
- **Brand Excellence Metrics**: Dark-themed brand value section outlining fresh ingredient sourcing, 30-minute delivery guarantees, 256-bit secure payments, and 24/7 customer service.
- **Customer Testimonials**: Auto-rotating review carousel showcasing verified guest feedback and rating scores.
- **App Download Showcase**: Mobile application promotion banner with detailed CSS-rendered smartphone mockup and store links.
- **Slide-In Cart Drawer**: Slide-over panel featuring real-time subtotal calculations, tax computations, free delivery thresholds, coupon validation, payment method selectors, and order confirmation modal.
- **Wishlist & Live Search**: Debounced search overlay providing instant menu suggestions with automatic scroll-to-item capabilities.

---

## Technologies Used

- **HTML5**: Semantic elements, accessibility metadata, Open Graph tags.
- **CSS3**: CSS Custom Properties (Design Tokens), Flexbox, CSS Grid, Glassmorphism, Custom Animations.
- **JavaScript (ES6+)**: Vanilla JS DOM manipulation, LocalStorage persistence, debounced search, IntersectionObserver scroll reveal, interval timers, carousel slider logic.
- **Iconography & Fonts**: Font Awesome 6 Free, Google Fonts (Poppins & Manrope).

---

## Folder Structure

```text
Cafeteria Web/
├── index.html        # Main HTML layout, accessibility markup, and component structure
├── style.css         # Complete design system, utility classes, and responsive layouts
├── script.js         # Interactive application logic, state management, and cart engine
├── README.md         # Official repository documentation
├── DOCUMENTATION.md  # In-depth technical architecture documentation
└── update-images.ps1 # PowerShell automation utility for batch image updates
```

---

## Installation Steps

1. Clone or download the repository to your local machine:
   ```bash
   git clone https://github.com/mbilal71/Cafeteria-Web-Project.git
   ```
2. Navigate to the project directory:
   ```bash
   cd Cafeteria-Web-Project
   ```

---

## Running the Project

Because Crunchy Bites is built using native web technologies, no build tools or package managers are strictly required.

### Method 1: Local File System
Double-click `index.html` or open it directly in any modern web browser (Google Chrome, Mozilla Firefox, Microsoft Edge, Apple Safari).

### Method 2: Development Server (Recommended)
Run using a local HTTP server such as Live Server in VS Code, Python HTTP server, or Node.js `serve`:

```bash
# Using Python 3
python -m http.server 3000

# Using Node.js npx
npx serve .
```

Access the application in your browser at `http://localhost:3000`.

---

## Build Commands

This project uses Vanilla web standards and does not require a compilation build step. For production deployment:

1. Minify CSS:
   ```bash
   npx clean-css-cli -o style.min.css style.css
   ```
2. Minify JavaScript:
   ```bash
   npx terser script.js -o script.min.js
   ```
3. Deploy static asset files (`index.html`, `style.css`, `script.js`) to any static hosting provider (GitHub Pages, Vercel, Netlify, Cloudflare Pages).

---

## Customization

- **Branding & Colors**: Modify the design tokens in `style.css`:
  ```css
  :root {
    --primary: #E31837;      /* Primary Red */
    --secondary: #FFC72C;    /* Golden Yellow */
    --accent: #111111;       /* Dark Neutral */
  }
  ```
- **Menu Items**: Update or insert new menu items within `index.html` inside the appropriate section block. Ensure `data-name` and `data-price` attributes are present.
- **Promo Coupons**: Edit valid coupon codes inside `script.js`:
  ```javascript
  const COUPONS = {
    'WELCOME10': { type: 'percent', value: 10, label: '10% discount applied!' },
    'SAVE50':    { type: 'flat',    value: 50, label: 'Rs. 50 discount applied!' }
  };
  ```

---

## Responsive Design

Crunchy Bites is built mobile-first and fully responsive across all device sizes:
- **Desktop (1280px+)**: 4-column menu layout, side-by-side hero split, full sticky navbar.
- **Tablet (768px - 1024px)**: 3-column menu grid, mobile navigation toggle, floating cart shortcut.
- **Mobile (320px - 767px)**: Single/double column layout, optimized category circles, full-width cart drawer.

---

## Future Improvements

- Backend API integration for live order tracking and payment gateway authorization.
- User account authentication and saved delivery address management.
- Multi-language support (English / Urdu).
- Interactive food customization options (sides selection, crust choices, spice levels).

---

## Credits

- Photography sourced from [Unsplash](https://unsplash.com).
- Vector Icons by [Font Awesome](https://fontawesome.com).
- Typography by [Google Fonts](https://fonts.google.com).

---

## License

Copyright 2026 Crunchy Bites. All Rights Reserved. Released for educational and portfolio demonstration purposes.
