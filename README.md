# Hydrogen template: Skeleton

Hydrogen is Shopify's stack for headless commerce. Hydrogen is designed to dovetail with [Remix](https://remix.run/), Shopify's full stack web framework. This template contains a **minimal setup** of components, queries and tooling to get started with Hydrogen.

[Check out Hydrogen docs](https://shopify.dev/custom-storefronts/hydrogen)
[Get familiar with Remix](https://remix.run/docs/en/v1)

---

## 🎓 Complete Routing Examples Included!

This project now includes **comprehensive examples of EVERY possible route type** supported by React Router's file-based routing system:

### 📚 Documentation Files

1. **[ROUTES_SUMMARY.md](./ROUTES_SUMMARY.md)** - Quick overview of what was created
2. **[ROUTES_INDEX.md](./ROUTES_INDEX.md)** - Index of all route files with quick reference
3. **[ROUTES_GUIDE.md](./ROUTES_GUIDE.md)** - Comprehensive guide to all route types
4. **[ROUTES_VISUAL.md](./ROUTES_VISUAL.md)** - Visual diagrams and decision trees
5. **[ROUTES_TESTING.md](./ROUTES_TESTING.md)** - Complete testing checklist

### 🗂️ Route Examples Created

- ✅ **Index Routes** - Root and nested index routes
- ✅ **Static Routes** - Simple page routes
- ✅ **Dynamic Routes** - Single and multiple parameters
- ✅ **Splat Routes** - Catch-all patterns
- ✅ **Layout Routes** - Nested layouts with Outlet
- ✅ **Pathless Layouts** - Shared logic without URL segments
- ✅ **Resource Routes** - API endpoints (JSON/XML)
- ✅ **404 Routes** - Custom not found pages

### 🚀 Quick Start with Examples

```bash
# Start the dev server
npm run dev

# Visit these URLs to see examples:
http://localhost:3001/                      # Home page
http://localhost:3001/about                 # Static route
http://localhost:3001/products              # Product listing
http://localhost:3001/products/product-123  # Dynamic route
http://localhost:3001/dashboard             # Layout example
http://localhost:3001/api/products          # API endpoint

# See ROUTES_TESTING.md for complete testing guide
```

### 📖 Start Learning

1. Read **[ROUTES_SUMMARY.md](./ROUTES_SUMMARY.md)** for a quick overview
2. Open **[ROUTES_INDEX.md](./ROUTES_INDEX.md)** to navigate all examples
3. Study individual route files in `app/` - each has detailed comments
4. Follow **[ROUTES_TESTING.md](./ROUTES_TESTING.md)** to test everything

---ogen template: Skeleton

Hydrogen is Shopify’s stack for headless commerce. Hydrogen is designed to dovetail with [Remix](https://remix.run/), Shopify’s full stack web framework. This template contains a **minimal setup** of components, queries and tooling to get started with Hydrogen.

[Check out Hydrogen docs](https://shopify.dev/custom-storefronts/hydrogen)
[Get familiar with Remix](https://remix.run/docs/en/v1)

## What's included

- Remix
- Hydrogen
- Oxygen
- Vite
- Shopify CLI
- ESLint
- Prettier
- GraphQL generator
- TypeScript and JavaScript flavors
- Minimal setup of components and routes

## Getting started

**Requirements:**

- Node.js version 18.0.0 or higher

```bash
npm create @shopify/hydrogen@latest
```

## Building for production

```bash
npm run build
```

## Local development

```bash
npm run dev
```

## Setup for using Customer Account API (`/account` section)

Follow step 1 and 2 of <https://shopify.dev/docs/custom-storefronts/building-with-the-customer-account-api/hydrogen#step-1-set-up-a-public-domain-for-local-development>
