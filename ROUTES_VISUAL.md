# Route File Structure Visual Guide

## 📂 File Tree and URL Mapping

```
app/
├── _index.tsx                           → /
├── about.tsx                            → /about
├── contact.tsx                          → /contact
├── search.tsx                           → /search?q=...
│
├── products._index.tsx                  → /products
├── products.$productId.tsx              → /products/:productId
│
├── blog.$year.$month.$slug.tsx          → /blog/:year/:month/:slug
│
├── docs.$.tsx                           → /docs/*
│
├── categories.$category.$.tsx           → /categories/:category/*
│
├── dashboard.tsx                        → /dashboard (layout)
├── dashboard._index.tsx                 → /dashboard
├── dashboard.settings.tsx               → /dashboard/settings
├── dashboard.analytics.tsx              → /dashboard/analytics
│
├── _auth.tsx                            → (pathless layout)
├── _auth.account.tsx                    → /account
│
├── api.products.tsx                     → /api/products (JSON)
├── api.webhook.tsx                      → /api/webhook (JSON)
├── rss.xml.tsx                          → /rss.xml (XML)
│
└── $.tsx                                → * (404 catch-all)
```

---

## 🗺️ Route Hierarchy Visual

```
┌─────────────────────────────────────────────────────────┐
│  root.tsx (Root Layout - wraps everything)             │
│  ┌───────────────────────────────────────────────────┐  │
│  │ <PageLayout> (Header, Footer)                     │  │
│  │                                                    │  │
│  │  <Outlet /> ← All routes render here             │  │
│  └───────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────┘
                         │
         ┌───────────────┼────────────────┬──────────────┐
         │               │                │              │
    ┌────▼────┐    ┌─────▼─────┐    ┌────▼────┐   ┌─────▼──────┐
    │  Index  │    │  Static   │    │ Dynamic │   │  Layouts   │
    │ Routes  │    │  Routes   │    │ Routes  │   │            │
    └─────────┘    └───────────┘    └─────────┘   └────────────┘
         │              │                │              │
         │              │                │              │
    _index.tsx      about.tsx      products.      dashboard.tsx
    products.       contact.tsx    $productId        (Outlet)
    _index.tsx      search.tsx                         │
                                                       │
                                    ┌──────────────────┼─────────┐
                                    │                  │         │
                            dashboard.           dashboard.  dashboard.
                            _index.tsx          settings.tsx analytics.tsx
```

---

## 🎯 Route Matching Priority

React Router matches routes in this order:

```
1. Exact static matches
   /about → about.tsx ✓

2. Dynamic segments
   /products/abc-123 → products.$productId.tsx ✓

3. Nested routes
   /dashboard/settings → dashboard.settings.tsx ✓

4. Splat routes (most specific first)
   /docs/guide/intro → docs.$.tsx ✓
   /categories/electronics/phones → categories.$category.$.tsx ✓

5. Root splat (404 catch-all)
   /anything/else → $.tsx ✓
```

---

## 🔄 Layout Nesting Example

### Regular Layout (adds to URL)

```
dashboard.tsx              → /dashboard (layout with <Outlet />)
  └─ dashboard._index.tsx  → /dashboard (renders in Outlet)
  └─ dashboard.settings.tsx → /dashboard/settings (renders in Outlet)
```

### Pathless Layout (doesn't add to URL)

```
_auth.tsx                  → no URL segment (layout with <Outlet />)
  └─ _auth.account.tsx     → /account (NOT /_auth/account)
  └─ _auth.orders.tsx      → /orders (NOT /_auth/orders)
```

---

## 📊 Parameter Extraction Examples

### Single Dynamic Segment

```typescript
// File: products.$productId.tsx
// URL:  /products/abc-123

params = {
  productId: 'abc-123',
};
```

### Multiple Dynamic Segments

```typescript
// File: blog.$year.$month.$slug.tsx
// URL:  /blog/2024/11/my-post

params = {
  year: '2024',
  month: '11',
  slug: 'my-post',
};
```

### Splat Route

```typescript
// File: docs.$.tsx
// URL:  /docs/api/users/create

params = {
  '*': 'api/users/create',
};
```

### Dynamic + Splat

```typescript
// File: categories.$category.$.tsx
// URL:  /categories/electronics/phones/apple

params = {
  category: 'electronics',
  '*': 'phones/apple',
};
```

### Query Parameters

```typescript
// File: search.tsx
// URL:  /search?q=test&category=all

const url = new URL(request.url);
const query = url.searchParams.get('q'); // "test"
const category = url.searchParams.get('category'); // "all"
```

---

## 🎨 Route Component Structure

### UI Route (default export)

```typescript
// Renders UI
export default function MyRoute() {
  return <div>Page content</div>;
}
```

### Resource Route (no default export)

```typescript
// Returns data (JSON, XML, etc.)
export async function loader() {
  return Response.json({data: '...'});
}
// No default export!
```

---

## 🚦 Data Flow

```
User visits URL
      │
      ▼
Route Matched
      │
      ▼
Loader Runs (server)
      │
      ▼
Component Renders
      │
      ├─→ useLoaderData() ← reads loader data
      └─→ useParams() ← reads URL params
```

---

## 🎭 Special Route Types Summary

| Symbol      | Meaning         | Example File       | URL             |
| ----------- | --------------- | ------------------ | --------------- |
| `_index`    | Index route     | `_index.tsx`       | `/`             |
| `_prefix`   | Pathless layout | `_auth.tsx`        | (none)          |
| `$param`    | Dynamic segment | `$id.tsx`          | `/:id`          |
| `$.` suffix | Splat/catch-all | `docs.$.tsx`       | `/docs/*`       |
| `.` dot     | Nested route    | `parent.child.tsx` | `/parent/child` |
| No default  | Resource route  | `api.json.tsx`     | `/api/json`     |

---

## 📝 Quick Decision Tree

```
Need a route? Ask yourself:

├─ Does it have a specific path?
│  ├─ YES → Use static route (about.tsx)
│  └─ NO → Use index route (_index.tsx)
│
├─ Does it need parameters?
│  ├─ YES → Use dynamic route ($id.tsx)
│  └─ NO → Use static route
│
├─ Should it catch multiple segments?
│  ├─ YES → Use splat route (docs.$.tsx)
│  └─ NO → Use specific route
│
├─ Should it wrap other routes?
│  ├─ YES → Use layout with <Outlet />
│  └─ NO → Use regular route
│
├─ Should it add to the URL?
│  ├─ YES → Use normal route (dashboard.tsx)
│  └─ NO → Use pathless route (_auth.tsx)
│
└─ Should it render UI?
   ├─ YES → Export default component
   └─ NO → Only export loader/action (resource route)
```

---

## ✅ Checklist for Creating Routes

- [ ] Choose appropriate file name pattern
- [ ] Add loader if data fetching is needed
- [ ] Add action if form handling is needed
- [ ] Add meta function for SEO
- [ ] Add error boundary for error handling
- [ ] Use TypeScript types for type safety
- [ ] Test the route in the browser
- [ ] Add navigation links from other pages

---

**Happy Routing! 🚀**
