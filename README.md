# WearLab — Interactive T-Shirt Customizer

WearLab is a modern, responsive, and accessible interactive product customization interface built in React. It demonstrates component composition, derived state management, controlled inputs, resilient `localStorage` synchronization, accessible keyboard/screen-reader semantics, and fluid inline SVG rendering.

---

## Scope & Purpose

- **Scope:** Frontend demonstration and portfolio project. The **Add to Bag** action captures the active customization snapshot and presents an accessible, polite confirmation toast. There is no external e-commerce backend, persistent cart, or payment gateway.
- **Goal:** Clean, readable, production-grade React patterns for learning and professional codebases without external CSS frameworks, UI component libraries, or animation runtimes.

---

## Features

- **Live T-Shirt Vector Preview:** Handcrafted inline SVG t-shirt with realistic collar, neckline, sleeve contours, stitching, and shading. Features smooth CSS color transitions and dynamic chest print rendering (Plain, React atom, or Developer `</>` tag).
- **Intelligent Contrast Adaptation:** Chest graphics automatically toggle between light and dark tones based on garment luminance for optimal legibility.
- **Interactive Option Selectors:**
  - **Colour:** 6 circular swatches with selection ring, checkmark indicator, and visible contrast border for light shades.
  - **Size:** S, M, L, XL, and XXL with a dedicated callout for the XXL material surcharge.
  - **Chest Print:** Compact option cards displaying graphic type and incremental cost.
  - **Gift Packaging:** Optional recyclable gift box packaging toggle with instant price recalculation.
- **Dynamic Derived Pricing:** Strictly derived calculations (no redundant React state) formatted in Indian Rupees (`₹`) via `Intl.NumberFormat('en-IN')`.
- **Resilient LocalStorage Persistence:** Auto-syncs configuration under `wearlab-customization-v1` with validation against valid options, corrupt data fallbacks, and lazy `useState` initialization.
- **Accessible Notification Toast:** Auto-dismisses after 6 seconds, pauses on hover or keyboard focus, supports manual dismissal, and announces through an `aria-live="polite"` region without stealing keyboard focus.
- **Responsive Layout:** Two-column desktop grid with sticky preview and stacked single-column mobile view, strictly maintaining 44px+ touch targets and zero horizontal scroll down to 320px viewport width.
- **Accessible & Motion-Aware:** Native semantic form controls (`fieldset`, `legend`, `input[type="radio"]`, `input[type="checkbox"]`), visible focus rings, and full `prefers-reduced-motion` compliance.

---

## Tech Stack

- **Framework:** React 19 (JavaScript and JSX only)
- **Tooling:** Vite 8
- **Styling:** Standard CSS with CSS Custom Properties and colocated component stylesheets (No Tailwind, CSS-in-JS, or external fonts)
- **Linting:** ESLint 9 (Flat configuration with `eslint-plugin-react` and `eslint-plugin-react-hooks`)
- **Package Manager:** npm

---

## Folder Structure

```
wearlab/
├── public/
├── src/
│   ├── components/
│   │   ├── Header/
│   │   │   ├── Header.jsx
│   │   │   └── Header.css
│   │   ├── ProductPreview/
│   │   │   ├── ProductPreview.jsx
│   │   │   └── ProductPreview.css
│   │   ├── ColorSelector/
│   │   │   ├── ColorSelector.jsx
│   │   │   └── ColorSelector.css
│   │   ├── SizeSelector/
│   │   │   ├── SizeSelector.jsx
│   │   │   └── SizeSelector.css
│   │   ├── PrintSelector/
│   │   │   ├── PrintSelector.jsx
│   │   │   └── PrintSelector.css
│   │   ├── PriceSummary/
│   │   │   ├── PriceSummary.jsx
│   │   │   └── PriceSummary.css
│   │   └── Toast/
│   │       ├── Toast.jsx
│   │       └── Toast.css
│   ├── pages/
│   │   └── Customizer/
│   │       ├── Customizer.jsx
│   │       └── Customizer.css
│   ├── data/
│   │   └── product.js
│   ├── utils/
│   │   ├── storage.js
│   │   └── formatCurrency.js
│   ├── styles/
│   │   ├── variables.css
│   │   └── global.css
│   ├── App.jsx
│   └── main.jsx
├── .gitignore
├── eslint.config.js
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

---

## Prerequisites

- **Node.js:** v18.0.0 or higher
- **npm:** v9.0.0 or higher

---

## Installation & Commands

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Development Server
```bash
npm run dev
```
Launches the app at `http://localhost:3000`.

### 3. Build for Production
```bash
npm run build
```
Creates an optimized production bundle in the `dist/` directory.

### 4. Preview Production Build
```bash
npm run preview
```

### 5. Lint Codebase
```bash
npm run lint
```
Runs ESLint against all JavaScript and JSX source files.

---

## State & Props Architecture

- **`Customizer.jsx` (Single Source of Truth):**
  - Manages the single state object: `{ color, size, print, giftPackaging }`.
  - Manages feedback UI state: `isAdding` (boolean submission lock) and `activeToastOrder` (immutable snapshot captured at click time).
  - Supplies controlled values and event handlers down to child components via props.
- **Derived Values:**
  - `total = basePrice + sizeSurcharge + printPrice + packagingCost`.
  - Calculated on each render directly from `customization` state and imported `product.js` tables without redundant `useState` or stale synchronization bugs.
- **Component Boundaries:**
  - `ProductPreview`: Receives active color, size, and print objects to update SVG garment fills, seams, and chest artwork.
  - `ColorSelector`, `SizeSelector`, `PrintSelector`: Pure controlled input groups wrapping semantic native radios with keyboard focus rings.
  - `PriceSummary`: Formats line items and total display.
  - `Toast`: Self-contained countdown timer with hover/focus pause triggers.

---

## Pricing Rules

| Component | Option | Cost (INR) |
| :--- | :--- | :--- |
| **Base Tee** | Everyday Cotton Tee | ₹699 |
| **Size** | S, M, L, XL | ₹0 |
| **Size** | XXL | +₹100 |
| **Chest Print** | Plain | ₹0 |
| **Chest Print** | React Atom | +₹150 |
| **Chest Print** | Developer (`</>`) | +₹100 |
| **Packaging** | Standard Bag | ₹0 |
| **Packaging** | Gift Packaging | +₹79 |

**Formula:**
$$\text{Total} = 699 + \text{Size Surcharge} + \text{Print Surcharge} + \text{Packaging Surcharge}$$

---

## LocalStorage Behaviour

- **Key:** `wearlab-customization-v1`
- **Initialization:** Lazy `useState(() => loadSavedCustomization(...))` reads and verifies stored values before the first render.
- **Validation:** Every field is validated against active IDs in `product.js`. If any option is missing, unknown, or corrupted, it falls back to the safe default (`Cloud White`, `M`, `Plain`, `giftPackaging: false`).
- **Safety:** Storage reads and writes are wrapped in `try...catch` blocks to prevent crashes in private browsing mode, disabled cookie environments, or storage quota limits.
- **Isolation:** Transient states (toasts, button cooldowns, computed totals) are never persisted.

---

## Accessibility & Responsive Decisions

- **Semantic Form Elements:** Each selector is built with `<fieldset>` and `<legend>`. Native hidden radio inputs handle arrow-key navigation, space selection, and visible `:focus-visible` styling on labels.
- **Screen Reader Announcements:** The SVG canvas is labelled via `role="img"` with an informative dynamic `aria-label`. The toast notification uses `role="status"` and `aria-live="polite"`.
- **Touch & Zoom Targets:** All clickable controls exceed 44×44px touch targets. Layout scales seamlessly up to 200% zoom without horizontal clipping.
- **Reduced Motion:** All transitions and keyframe animations collapse to 0.01ms when `@media (prefers-reduced-motion: reduce)` is detected.

---

## Verification Checklist

1. [x] **Fresh Load:** Default options (Cloud White, M, Plain, No Gift) total ₹699.
2. [x] **Surcharge Calculation:** XXL (+₹100) + React print (+₹150) + Gift packaging (+₹79) totals ₹1,028.
3. [x] **Garment Color Sync:** Selecting Midnight, Ocean Blue, Forest Green, Rose, or Lavender immediately updates the SVG garment fill.
4. [x] **Chest Print Sync:** Toggling between Plain, React, and Developer updates the SVG chest graphic and adjusts contrast against shirt shade.
5. [x] **Reset:** Clicking Reset restores default selections and persists them to localStorage.
6. [x] **Persistence:** Refreshing the page preserves custom configuration.
7. [x] **Resilience:** Injecting invalid JSON into `localStorage` falls back safely to defaults without errors.
8. [x] **Add to Bag Toast:** Displays immutable snapshot of configuration and total; stays open while hovered/focused; dismisses after 6 seconds.
9. [x] **Keyboard Navigation:** Full Tab and Arrow key traversal with visible focus indicator.
10. [x] **Viewport Adaptation:** Tested down to 320px mobile viewport without horizontal scroll.
