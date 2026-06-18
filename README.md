# Storefront

A React SPA that fetches products from the [Fake Store API](https://fakestoreapi.com), displays them in a filterable grid, and lets users manage a shopping cart.

## Tech Stack

| Layer | Choice |
|---|---|
| Bundler | Vite 8 |
| Language | TypeScript 5 (strict) |
| Routing | react-router-dom v7 |
| Data fetching | TanStack Query v5 + axios |
| State (cart) | Context API + useReducer |
| Styling | Tailwind CSS v4 |
| Testing | Vitest + React Testing Library + msw v2 |
| Linting | ESLint 9 + Prettier |

## Getting Started

```bash
# Install dependencies
npm install

# Start the dev server
npm run dev
```

The app runs at `http://localhost:5173`.

## Available Scripts

| Script | Description |
|---|---|
| `npm run dev` | Start Vite dev server |
| `npm run build` | Type-check then bundle for production |
| `npm run preview` | Serve the production build locally |
| `npm test` | Run the full test suite (single pass) |
| `npm run test:watch` | Run tests in watch mode |
| `npm run lint` | Lint all source files |

## Running Tests

```bash
npm test
```

Tests use [Vitest](https://vitest.dev) with [React Testing Library](https://testing-library.com) and [msw](https://mswjs.io) for API mocking. Coverage includes:

- Cart reducer (all actions + derived totals)
- `ProductCard` — renders correctly, Add to Cart wires to context
- `CartItem` — renders details, quantity controls, remove
- `StorePage` — loading skeletons, product grid, error state

## Project Structure

```
src/
├── __tests__/       # Vitest + RTL test suite (cartReducer, pages, components)
├── components/
│   ├── cart/        # CartItem, CartSummary
│   ├── home/        # HeroBanner, CategoryCards, FeaturedProducts
│   ├── layout/      # Header, Footer, Layout, ScrollToTop
│   ├── products/    # ProductCard, ProductGrid, CategoryFilterButton
│   └── ui/          # EmptyState, Spinner, SkeletonCard, ProductGridSkeleton,
│                    #   DetailSkeleton, RatingStars, UndoToast, SlideLink, StartupLoader
├── context/         # CartContext (useReducer + localStorage persistence)
├── hooks/           # useCart, useProducts, useCategories, useFilteredProducts, useAddToCart
├── mocks/           # msw handlers and server (test only)
├── pages/           # HomePage, ProductsPage, ProductDetailPage, CartPage
├── services/        # Axios instance + API functions
├── types/           # Shared TypeScript interfaces
└── utils/           # formatCurrency, imageFallback, categoryMeta
```

## Known Limitations

- Cart state is persisted to `localStorage` — it survives page refreshes but is not synced across browser tabs or backed by a server
- "Proceed to Checkout" is UI-only — no payment flow is implemented
- The Fake Store API has no auth, pagination, or search endpoint — all filtering is client-side
