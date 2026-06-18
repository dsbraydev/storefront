# Storefront App — Implementation Plan

## Context

Building a React storefront SPA that fetches products from the Fake Store API, displays them in a browsable grid, and lets users manage a shopping cart. This is a senior-level implementation demonstrating TanStack Query, Context API + useReducer, react-router-dom, performance optimisation, and full test coverage.

The existing `/Users/duranray/Documents/storefront` directory is a Next.js 16 scaffold — it must be converted to a Vite + React SPA before any feature work begins.

---

## Stack

| Layer | Choice |
|---|---|
| Bundler | Vite |
| Language | TypeScript |
| Routing | react-router-dom v6 |
| Data fetching | @tanstack/react-query + axios |
| State (cart) | Context API + useReducer |
| Styling | Tailwind CSS |
| Testing | Jest + React Testing Library + msw |
| Linting | eslint + prettier |

---

## Folder Structure (target)

```
src/
├── assets/
├── components/
│   ├── ui/            # Button, Badge, Skeleton primitives
│   ├── layout/        # Header, Layout
│   ├── products/      # ProductCard, ProductGrid, ProductFilters
│   └── cart/          # CartDrawer, CartItem, CartSummary
├── context/
│   └── CartContext.tsx
├── hooks/
│   ├── useCart.ts
│   └── useProducts.ts
├── pages/
│   ├── StorePage.tsx
│   └── CartPage.tsx
├── services/
│   └── api.ts
├── types/
│   └── index.ts
├── utils/
│   └── formatCurrency.ts
├── __tests__/
├── App.tsx
└── main.tsx
```

---

## Phases

### Phase 0 — Convert to Vite SPA ✅
- [x] Delete all Next.js files: `app/`, `public/`, `next.config.ts`, `next-env.d.ts`, `postcss.config.mjs`, `types/`
- [x] Uninstall Next.js: `npm uninstall next`
- [x] Install Vite + React plugin and all project dependencies
- [x] Create `vite.config.ts`, `tsconfig.json`, `index.html`, `src/main.tsx`, `src/index.css`
- [x] Update `package.json` scripts: `dev`, `build`, `preview`, `test`

**Verify:** `npm run dev` starts; `npm run build` produces `dist/` ✅

**Commit:** `feat: phase 0 — convert to vite spa`

---

### Phase 1 — Project Setup (Routing Shell + Providers)
- [ ] `App.tsx` — `QueryClientProvider`, `CartProvider` (placeholder), `BrowserRouter` with `/` and `/cart` routes
- [ ] `src/components/layout/Header.tsx` — app name + cart icon linking to `/cart`
- [ ] `src/components/layout/Layout.tsx` — wraps Header + children
- [ ] `src/context/CartContext.tsx` — context shell (no logic yet)

**Verify:** Both routes render; header visible on all pages

**Commit:** `feat: phase 1 — routing shell and providers`

---

### Phase 2 — Types & API Layer
- [ ] `src/types/index.ts` — `Product`, `CartItem`, `CartState` interfaces
- [ ] `src/services/api.ts` — Axios instance (`baseURL: https://fakestoreapi.com`) + `fetchProducts`, `fetchProductById`, `fetchCategories`
- [ ] `src/hooks/useProducts.ts` — `useProducts()` and `useCategories()` TanStack Query hooks

**Verify:** Network tab shows API calls; TypeScript compiles clean

**Commit:** `feat: phase 2 — types and api layer`

---

### Phase 3 — Product Listing
- [ ] `src/components/products/ProductCard.tsx` — `React.memo`; image, title, category badge, price, "Add to Cart" button
- [ ] `src/components/products/ProductGrid.tsx` — responsive grid
- [ ] `src/components/ui/SkeletonCard.tsx` — loading placeholder
- [ ] `StorePage.tsx` — loading skeletons / error state / product grid

**Verify:** Products display; skeletons on load; error state on network failure

**Commit:** `feat: phase 3 — product listing`

---

### Phase 4 — Cart State
- [ ] `src/context/CartContext.tsx` — `useReducer` with `ADD_ITEM`, `REMOVE_ITEM`, `UPDATE_QUANTITY`, `CLEAR_CART`; derived `totalItems` + `totalPrice`
- [ ] `src/hooks/useCart.ts` — typed accessor hook with provider guard
- [ ] `Header.tsx` — `totalItems` badge on cart icon

**Verify:** Badge updates when items are added

**Commit:** `feat: phase 4 — cart state`

---

### Phase 5 — Cart UI
- [ ] `src/components/cart/CartItem.tsx` — image, name, price, qty controls, remove button
- [ ] `src/components/cart/CartSummary.tsx` — subtotal, count, checkout button (UI only)
- [ ] `CartPage.tsx` — cart items list + summary + empty state
- [ ] Wire `ProductCard` "Add to Cart" to `ADD_ITEM`

**Verify:** Full flow: add → view cart → adjust qty → remove → empty state

**Commit:** `feat: phase 5 — cart ui`

---

### Phase 6 — Filtering & Search
- [ ] Search input in `StorePage` — client-side, case-insensitive filter on title
- [ ] Category filter buttons from `useCategories()` — "All" default
- [ ] Combined filter (category AND search) in `useMemo`
- [ ] Filter state in `StorePage` local state

**Verify:** Search + category filter work independently and combined

**Commit:** `feat: phase 6 — filtering and search`

---

### Phase 7 — Polish & Animations
- [ ] `ProductCard` fade-in on mount
- [ ] Cart badge scale-pop when `totalItems` changes
- [ ] Responsive layout audit (1/2/3-4 col grid; stacked/side-by-side cart)
- [ ] Empty state on `StorePage` when no products match filters
- [ ] Hover + focus states on all interactive elements

**Verify:** Breakpoints, animations, and empty states all work

**Commit:** `feat: phase 7 — polish and animations`

---

### Phase 8 — Testing
- [ ] msw handlers for `GET /products` and `GET /categories`
- [ ] Jest + jsdom config with `@testing-library/jest-dom` setup
- [ ] `cartReducer.test.ts` — all actions + derived values
- [ ] `ProductCard.test.tsx` — renders correctly; Add to Cart fires action
- [ ] `CartItem.test.tsx` — renders; qty and remove work
- [ ] `StorePage.test.tsx` — skeletons → cards → error state

**Verify:** `npm test` all green

**Commit:** `feat: phase 8 — tests`

---

### Phase 9 — Final Cleanup
- [ ] Performance audit — `React.memo`, `useCallback`, `useMemo` where measurable
- [ ] Lazy load `CartPage` with `React.lazy` + `Suspense`
- [ ] Write `README.md`
- [ ] Remove all `console.log`s, unused imports, dead code
- [ ] `npm run build` — zero TypeScript/lint errors

**Verify:** Build clean; preview serves correctly; all tests pass

**Commit:** `feat: phase 9 — final cleanup`

---

## Commit Checkpoint Protocol

> After each phase is verified, commit before moving to the next phase.
> Message format: `feat: phase N — <phase name>`
