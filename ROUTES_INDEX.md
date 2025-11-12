# Route Examples Index

This directory contains **complete examples** of every possible route type in Shopify Hydrogen with React Router.

## 📖 Documentation Files

1. **[ROUTES_GUIDE.md](./ROUTES_GUIDE.md)** - Comprehensive guide to all route types with tables, conventions, and testing instructions
2. **[ROUTES_VISUAL.md](./ROUTES_VISUAL.md)** - Visual diagrams, decision trees, and file structure maps

## 🗂️ Route Files Created

### Basic Routes

- ✅ `_index.tsx` - Home page (root index route)
- ✅ `about.tsx` - Static about page
- ✅ `contact.tsx` - Static contact page with form action
- ✅ `search.tsx` - Search with query parameters

### Product Routes

- ✅ `products._index.tsx` - Product listing (nested index)
- ✅ `products.$productId.tsx` - Product detail (single dynamic param)

### Blog Routes

- ✅ `blog.$year.$month.$slug.tsx` - Blog post (multiple dynamic params)

### Documentation Routes

- ✅ `docs.$.tsx` - Documentation (splat/catch-all route)

### Category Routes

- ✅ `categories.$category.$.tsx` - Categories (dynamic + splat combination)

### Dashboard Routes (Layout Example)

- ✅ `dashboard.tsx` - Dashboard layout with sidebar
- ✅ `dashboard._index.tsx` - Dashboard overview
- ✅ `dashboard.settings.tsx` - Settings page
- ✅ `dashboard.analytics.tsx` - Analytics page

### Auth Routes (Pathless Layout Example)

- ✅ `_auth.tsx` - Authentication wrapper (pathless layout)
- ✅ `_auth.account.tsx` - Account page (uses pathless layout)

### API Routes (Resource Routes)

- ✅ `api.products.tsx` - Products API endpoint (JSON)
- ✅ `api.webhook.tsx` - Webhook handler (POST endpoint)
- ✅ `rss.xml.tsx` - RSS feed generator (XML)

### Special Routes

- ✅ `$.tsx` - 404 Not Found (catch-all for unmatched routes)

## 🎯 Route Type Coverage

| Type             | Count  | Examples                                                    |
| ---------------- | ------ | ----------------------------------------------------------- |
| Index Routes     | 3      | `_index.tsx`, `products._index.tsx`, `dashboard._index.tsx` |
| Static Routes    | 3      | `about.tsx`, `contact.tsx`, `search.tsx`                    |
| Single Dynamic   | 1      | `products.$productId.tsx`                                   |
| Multi Dynamic    | 1      | `blog.$year.$month.$slug.tsx`                               |
| Splat Routes     | 1      | `docs.$.tsx`                                                |
| Dynamic + Splat  | 1      | `categories.$category.$.tsx`                                |
| Layout Routes    | 1      | `dashboard.tsx`                                             |
| Pathless Layouts | 1      | `_auth.tsx`                                                 |
| Resource Routes  | 3      | `api.products.tsx`, `api.webhook.tsx`, `rss.xml.tsx`        |
| 404 Catch-all    | 1      | `$.tsx`                                                     |
| **Total**        | **16** | **All major route types covered!**                          |

## 🚀 Quick Start

### 1. Start the Development Server

```bash
npm run dev
```

### 2. Visit These URLs to Test Routes

#### Static & Index Routes

- http://localhost:3000/ - Home page
- http://localhost:3000/about - About page
- http://localhost:3000/contact - Contact form

#### Dynamic Routes

- http://localhost:3000/products - Product listing
- http://localhost:3000/products/product-123 - Product detail
- http://localhost:3000/blog/2024/11/my-first-post - Blog post

#### Splat Routes

- http://localhost:3000/docs/getting-started - Documentation
- http://localhost:3000/docs/api/authentication - Nested docs
- http://localhost:3000/categories/electronics - Category
- http://localhost:3000/categories/electronics/phones/apple - Nested category

#### Layout & Nested Routes

- http://localhost:3000/dashboard - Dashboard overview
- http://localhost:3000/dashboard/settings - Settings
- http://localhost:3000/dashboard/analytics - Analytics

#### Pathless Layout

- http://localhost:3000/account - Account (uses \_auth layout)

#### Resource Routes (API)

- http://localhost:3000/api/products - JSON API
- http://localhost:3000/rss.xml - RSS feed

#### Search & 404

- http://localhost:3000/search?q=test - Search with query
- http://localhost:3000/this-does-not-exist - 404 page

## 📚 Learning Path

### Beginners

1. Start with `_index.tsx` and `about.tsx` (basic routes)
2. Study `products.$productId.tsx` (dynamic routes)
3. Look at `dashboard.tsx` and children (layouts)

### Intermediate

4. Explore `blog.$year.$month.$slug.tsx` (multiple params)
5. Study `docs.$.tsx` (splat routes)
6. Review `_auth.tsx` (pathless layouts)

### Advanced

7. Examine `categories.$category.$.tsx` (dynamic + splat)
8. Study `api.products.tsx` (resource routes)
9. Review all route features (loaders, actions, meta, error boundaries)

## 🛠️ Common Patterns

### Creating a New Route

1. Choose the appropriate file naming pattern from ROUTES_GUIDE.md
2. Create the file in the `app/` directory
3. Add a loader if you need server data
4. Add an action if you need form handling
5. Export the default component

### Example: New Product Review Route

```typescript
// app/products.$productId.reviews.tsx
// URL: /products/:productId/reviews

import {useLoaderData, useParams} from 'react-router';
import type {LoaderFunctionArgs} from 'react-router';

export async function loader({params}: LoaderFunctionArgs) {
  const {productId} = params;
  // Fetch reviews for this product
  return {reviews: []};
}

export default function ProductReviews() {
  const {reviews} = useLoaderData<typeof loader>();
  const {productId} = useParams();

  return (
    <div>
      <h1>Reviews for Product {productId}</h1>
      {/* Render reviews */}
    </div>
  );
}
```

## 📋 Checklist for Understanding Routes

- [ ] Read ROUTES_GUIDE.md completely
- [ ] Review ROUTES_VISUAL.md for visual understanding
- [ ] Open each route file and read the comments
- [ ] Start dev server and test each URL
- [ ] Modify a route file and see changes
- [ ] Create your own route following the patterns
- [ ] Test loaders by adding console.log in server
- [ ] Test actions by submitting a form

## 🔍 Files to Explore

### Start Here (Easiest)

1. `_index.tsx` - Simple home page
2. `about.tsx` - Basic static route
3. `products._index.tsx` - Nested index route

### Then Move To (Medium)

4. `products.$productId.tsx` - Dynamic parameters
5. `dashboard.tsx` + children - Layout structure
6. `search.tsx` - Query parameters

### Finally Study (Advanced)

7. `docs.$.tsx` - Splat routes
8. `_auth.tsx` - Pathless layouts
9. `api.products.tsx` - Resource routes
10. `categories.$category.$.tsx` - Combined patterns

## 🎓 Key Concepts to Master

1. **File Naming Conventions** - How file names map to URLs
2. **Dynamic Segments** - Using `$param` for variable paths
3. **Nested Routes** - Using `.` notation for hierarchy
4. **Layouts** - Using `<Outlet />` to render children
5. **Loaders** - Fetching data on the server
6. **Actions** - Handling form submissions
7. **Resource Routes** - Returning JSON/XML instead of HTML
8. **Pathless Layouts** - Wrapping routes without URL segments

## 💡 Pro Tips

1. **Naming**: Use clear, descriptive names (`products.$handle.tsx` not `p.$h.tsx`)
2. **Comments**: Each example file has detailed comments at the top
3. **Type Safety**: Use TypeScript types from `LoaderFunctionArgs`, `ActionFunctionArgs`
4. **Error Handling**: Add ErrorBoundary exports to handle errors gracefully
5. **SEO**: Add meta exports for better search engine optimization
6. **Performance**: Use `shouldRevalidate` to control when loaders re-run

## 🤝 Contributing

To add more examples:

1. Follow the existing file naming patterns
2. Add detailed comments at the top of the file
3. Update this index file
4. Update ROUTES_GUIDE.md if introducing new patterns

## 📞 Need Help?

- Check ROUTES_GUIDE.md for detailed explanations
- Check ROUTES_VISUAL.md for diagrams
- Read React Router docs: https://reactrouter.com
- Read Hydrogen docs: https://shopify.dev/docs/custom-storefronts/hydrogen

---

**You now have a complete reference for every route type! 🎉**

Start exploring the files, test the URLs, and build your own routes!
