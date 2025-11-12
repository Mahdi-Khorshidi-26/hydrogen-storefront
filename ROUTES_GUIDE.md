# Complete Hydrogen/React Router Route Examples

This directory contains comprehensive examples of **every possible route type** supported by React Router's file-based routing system in a Shopify Hydrogen project.

## 📁 Route Types Overview

### 1. **Index Routes** (Root & Nested)

Routes that render at their parent's path without adding a URL segment.

| File                       | URL          | Description            |
| -------------------------- | ------------ | ---------------------- |
| `app/_index.tsx`           | `/`          | Home page (root index) |
| `app/products._index.tsx`  | `/products`  | Products listing page  |
| `app/dashboard._index.tsx` | `/dashboard` | Dashboard overview     |

**Convention:** Use `_index.tsx` or `[folder]._index.tsx`

---

### 2. **Static Routes**

Simple routes where the filename directly maps to the URL path.

| File              | URL        | Description                   |
| ----------------- | ---------- | ----------------------------- |
| `app/about.tsx`   | `/about`   | About page                    |
| `app/contact.tsx` | `/contact` | Contact form page             |
| `app/search.tsx`  | `/search`  | Search page with query params |

**Convention:** `filename.tsx` → `/filename`

---

### 3. **Dynamic Routes**

Routes with parameters that match variable path segments.

#### Single Parameter

| File                          | URL                    | Params        |
| ----------------------------- | ---------------------- | ------------- |
| `app/products.$productId.tsx` | `/products/:productId` | `{productId}` |

Example URLs:

- `/products/product-123` → `params.productId = "product-123"`
- `/products/gid-xyz` → `params.productId = "gid-xyz"`

#### Multiple Parameters

| File                              | URL                        | Params                |
| --------------------------------- | -------------------------- | --------------------- |
| `app/blog.$year.$month.$slug.tsx` | `/blog/:year/:month/:slug` | `{year, month, slug}` |

Example URLs:

- `/blog/2024/11/my-post` → `{year: "2024", month: "11", slug: "my-post"}`

**Convention:** Use `$paramName` for dynamic segments

---

### 4. **Splat Routes (Catch-all)**

Routes that capture remaining path segments using the splat parameter.

| File             | URL       | Splat Param   |
| ---------------- | --------- | ------------- |
| `app/docs.$.tsx` | `/docs/*` | `params["*"]` |

Example URLs:

- `/docs/getting-started` → `params["*"] = "getting-started"`
- `/docs/api/users/create` → `params["*"] = "api/users/create"`

**Convention:** File ending with `.$.tsx` captures all remaining segments

---

### 5. **Dynamic + Splat Combination**

Combine dynamic parameters with splat routes.

| File                             | URL                       | Params            |
| -------------------------------- | ------------------------- | ----------------- |
| `app/categories.$category.$.tsx` | `/categories/:category/*` | `{category, "*"}` |

Example URLs:

- `/categories/electronics` → `{category: "electronics", "*": ""}`
- `/categories/electronics/phones/apple` → `{category: "electronics", "*": "phones/apple"}`

---

### 6. **Layout Routes**

Routes that wrap child routes with shared UI/logic using `<Outlet />`.

| File                | URL                        | Child Routes            |
| ------------------- | -------------------------- | ----------------------- |
| `app/dashboard.tsx` | `/dashboard` (layout only) | All `dashboard.*` files |

Children:

- `app/dashboard._index.tsx` → `/dashboard`
- `app/dashboard.settings.tsx` → `/dashboard/settings`
- `app/dashboard.analytics.tsx` → `/dashboard/analytics`

**Convention:** Parent route renders `<Outlet />`, children render inside it

---

### 7. **Pathless Layout Routes**

Layouts that don't add to the URL but wrap child routes with shared logic.

| File                    | URL        | Description            |
| ----------------------- | ---------- | ---------------------- |
| `app/_auth.tsx`         | (none)     | Authentication wrapper |
| `app/_auth.account.tsx` | `/account` | Uses auth layout       |

**Convention:** Prefix with `_` to create pathless layout. Children inherit the layout but URL doesn't include the prefix.

Example:

- `_auth.account.tsx` → URL is `/account` (not `/_auth/account`)

---

### 8. **Resource Routes (No UI)**

Routes that return data (JSON, XML, etc.) instead of rendering UI.

| File                   | URL             | Response Type |
| ---------------------- | --------------- | ------------- |
| `app/api.products.tsx` | `/api/products` | JSON          |
| `app/api.webhook.tsx`  | `/api/webhook`  | JSON          |
| `app/rss.xml.tsx`      | `/rss.xml`      | XML           |

**Convention:** No `default export` = Resource Route

```typescript
// Resource route example
export async function loader() {
  return Response.json({data: '...'});
}
// No default export!
```

---

## 🔧 How It Works

### File-Based Routing

React Router scans the `app/` directory and automatically generates routes based on file names:

```typescript
// app/routes.ts
import {flatRoutes} from '@react-router/fs-routes';
import {hydrogenRoutes} from '@shopify/hydrogen';

export default hydrogenRoutes([
  ...(await flatRoutes()), // Auto-generated from files
  // Manual routes can be added here
]);
```

### Special Characters in Filenames

| Character    | Meaning         | Example                                          |
| ------------ | --------------- | ------------------------------------------------ |
| `$`          | Dynamic segment | `$productId` → `:productId`                      |
| `_` (prefix) | Pathless route  | `_auth.tsx` → no URL segment                     |
| `_index`     | Index route     | `_index.tsx` → renders at parent path            |
| `.` (dot)    | Nested route    | `dashboard.settings.tsx` → `/dashboard/settings` |
| `$` (suffix) | Splat/catch-all | `docs.$.tsx` → `/docs/*`                         |

---

## 📝 Route Features

### Loaders (Data Fetching)

Run on the server before rendering:

```typescript
export async function loader({params, request, context}: LoaderFunctionArgs) {
  const {storefront} = context;
  // Fetch data
  return {data: '...'};
}
```

### Actions (Form Handling)

Handle form submissions and mutations:

```typescript
export async function action({request}: ActionFunctionArgs) {
  const formData = await request.formData();
  // Process form
  return {success: true};
}
```

### Meta & Links

Set page metadata and link tags:

```typescript
export const meta: MetaFunction = ({data}) => {
  return [
    {title: data.title},
    {name: 'description', content: data.description},
  ];
};
```

### Error Boundaries

Handle errors at the route level:

```typescript
export function ErrorBoundary() {
  const error = useRouteError();
  return <div>Error: {error.message}</div>;
}
```

---

## 🚀 Quick Reference

### Creating New Routes

1. **Static page:** Create `app/pagename.tsx`
2. **Dynamic page:** Create `app/items.$id.tsx`
3. **Nested pages:** Create `app/parent.child.tsx`
4. **Index page:** Create `app/folder._index.tsx`
5. **Catch-all:** Create `app/docs.$.tsx`
6. **API endpoint:** Create `app/api.endpoint.tsx` (no default export)
7. **Layout:** Create `app/section.tsx` with `<Outlet />`

### Navigation

```tsx
import {Link, NavLink} from 'react-router';

// Basic link
<Link to="/about">About</Link>

// Dynamic link
<Link to={`/products/${id}`}>Product</Link>

// NavLink with active state
<NavLink to="/dashboard" className={({isActive}) => isActive ? 'active' : ''}>
  Dashboard
</NavLink>
```

### Reading Data

```tsx
import {useLoaderData, useParams} from 'react-router';

export default function MyRoute() {
  const data = useLoaderData<typeof loader>();
  const params = useParams();

  return <div>{data.title}</div>;
}
```

---

## 🎯 Examples by Use Case

### E-commerce Routes

- Product listing: `products._index.tsx` → `/products`
- Product detail: `products.$handle.tsx` → `/products/awesome-shirt`
- Collection: `collections.$handle.tsx` → `/collections/summer-sale`
- Cart: `cart.tsx` → `/cart`
- Checkout: `checkout.tsx` → `/checkout`

### Content Routes

- Blog listing: `blog._index.tsx` → `/blog`
- Blog post: `blog.$slug.tsx` → `/blog/my-post`
- Pages: `pages.$handle.tsx` → `/pages/about`

### Account Routes (with pathless layout)

- Auth wrapper: `_auth.tsx`
- Account page: `_auth.account.tsx` → `/account`
- Orders: `_auth.orders.tsx` → `/orders`
- Profile: `_auth.profile.tsx` → `/profile`

### API Routes

- Product API: `api.products.tsx` → `/api/products`
- Webhook: `api.webhook.tsx` → `/api/webhook`
- Sitemap: `sitemap.xml.tsx` → `/sitemap.xml`
- RSS feed: `rss.xml.tsx` → `/rss.xml`

---

## 🔗 Testing Routes

Start the dev server:

```bash
npm run dev
```

Visit these URLs to test each route type:

- `/` - Home (index)
- `/about` - Static route
- `/products` - Nested index
- `/products/product-123` - Dynamic route
- `/blog/2024/11/my-post` - Multiple params
- `/docs/getting-started` - Splat route
- `/dashboard` - Layout with nested routes
- `/dashboard/settings` - Nested route
- `/account` - Pathless layout route
- `/categories/electronics/phones` - Dynamic + splat
- `/api/products` - Resource route (JSON)
- `/search?q=test` - Query parameters

---

## 📚 Additional Resources

- [React Router Docs](https://reactrouter.com)
- [Hydrogen Docs](https://shopify.dev/docs/custom-storefronts/hydrogen)
- [File-based Routing Conventions](https://reactrouter.com/api/framework-conventions/routes.ts)

---

## ✅ Route Type Checklist

- ✅ Index routes (\_index.tsx)
- ✅ Static routes (filename.tsx)
- ✅ Dynamic routes ($param)
- ✅ Multiple dynamic segments ($year.$month)
- ✅ Splat routes ($.tsx)
- ✅ Dynamic + splat combination
- ✅ Layout routes with Outlet
- ✅ Nested routes under layouts
- ✅ Pathless layouts (\_prefix)
- ✅ Resource routes (no default export)
- ✅ Query parameters (?q=value)
- ✅ Form actions (POST/PUT/DELETE)
- ✅ API endpoints
- ✅ XML/RSS feeds

**All route types are now demonstrated! 🎉**
