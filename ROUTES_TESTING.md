# Route Testing Checklist

Use this checklist to test all the route examples created in this project.

## 🚀 Setup

- [x] Dev server started: `npm run dev`
- [x] Server URL: http://localhost:3001/

---

## 🧪 Test Each Route

### 1. Index & Static Routes

- [ ] **Home Page** - http://localhost:3001/
  - File: `_index.tsx`
  - Should show: Welcome page with navigation links
  - Features: Root index route

- [ ] **About Page** - http://localhost:3001/about
  - File: `about.tsx`
  - Should show: About page with static content
  - Features: Simple static route

- [ ] **Contact Page** - http://localhost:3001/contact
  - File: `contact.tsx`
  - Should show: Contact form
  - Test: Submit the form and verify action response
  - Features: Static route with action

- [ ] **Search Page** - http://localhost:3001/search
  - File: `search.tsx`
  - Should show: Search form
  - Test: Add `?q=test&category=products` to URL
  - Features: Query parameter handling

---

### 2. Product Routes

- [ ] **Products Index** - http://localhost:3001/products
  - File: `products._index.tsx`
  - Should show: List of products with links
  - Features: Nested index route

- [ ] **Product Detail** - http://localhost:3001/products/product-123
  - File: `products.$productId.tsx`
  - Should show: Product details for "product-123"
  - Test: Try different IDs: `/products/abc`, `/products/xyz-789`
  - Features: Single dynamic parameter

---

### 3. Blog Routes

- [ ] **Blog Post** - http://localhost:3001/blog/2024/11/my-first-post
  - File: `blog.$year.$month.$slug.tsx`
  - Should show: Blog post with year, month, slug displayed
  - Test: Try `/blog/2023/12/another-post`
  - Features: Multiple dynamic parameters

---

### 4. Documentation Routes

- [ ] **Docs Root** - http://localhost:3001/docs
  - File: `docs.$.tsx`
  - Should show: Documentation home
  - Features: Splat route with empty splat

- [ ] **Docs Page** - http://localhost:3001/docs/getting-started
  - File: `docs.$.tsx`
  - Should show: Getting started doc
  - Features: Splat capturing one segment

- [ ] **Nested Docs** - http://localhost:3001/docs/api/authentication
  - File: `docs.$.tsx`
  - Should show: API authentication doc with breadcrumbs
  - Test: Try `/docs/guides/deployment/vercel`
  - Features: Splat capturing multiple segments

---

### 5. Category Routes

- [ ] **Category Root** - http://localhost:3001/categories/electronics
  - File: `categories.$category.$.tsx`
  - Should show: Electronics category
  - Features: Dynamic parameter + empty splat

- [ ] **Nested Category** - http://localhost:3001/categories/electronics/phones
  - File: `categories.$category.$.tsx`
  - Should show: Electronics > Phones
  - Features: Dynamic + splat with one segment

- [ ] **Deep Category** - http://localhost:3001/categories/electronics/phones/apple
  - File: `categories.$category.$.tsx`
  - Should show: Electronics > Phones > Apple
  - Features: Dynamic + splat with multiple segments

---

### 6. Dashboard Routes (Layout)

- [ ] **Dashboard Home** - http://localhost:3001/dashboard
  - File: `dashboard.tsx` + `dashboard._index.tsx`
  - Should show: Dashboard layout with sidebar + overview stats
  - Features: Layout route + nested index

- [ ] **Dashboard Settings** - http://localhost:3001/dashboard/settings
  - File: `dashboard.settings.tsx`
  - Should show: Dashboard layout + settings form
  - Test: Submit the settings form
  - Features: Nested route under layout

- [ ] **Dashboard Analytics** - http://localhost:3001/dashboard/analytics
  - File: `dashboard.analytics.tsx`
  - Should show: Dashboard layout + analytics data
  - Features: Nested route under layout

---

### 7. Auth Routes (Pathless Layout)

- [ ] **Account Page** - http://localhost:3001/account
  - File: `_auth.tsx` + `_auth.account.tsx`
  - Should show: Auth layout message + account details
  - Note: URL is `/account` NOT `/_auth/account`
  - Features: Pathless layout route

---

### 8. Resource Routes (API)

- [ ] **Products API** - http://localhost:3001/api/products
  - File: `api.products.tsx`
  - Should show: JSON response with products array
  - Test: Verify Content-Type is application/json
  - Features: Resource route returning JSON

- [ ] **Webhook API** - http://localhost:3001/api/webhook
  - File: `api.webhook.tsx`
  - Should show: JSON with "Method not allowed" (GET)
  - Test: POST to it using curl or Postman
  - Features: Resource route with action

- [ ] **RSS Feed** - http://localhost:3001/rss.xml
  - File: `rss.xml.tsx`
  - Should show: XML RSS feed
  - Test: Verify Content-Type is application/xml
  - Features: Resource route returning XML

---

### 9. 404 Route

- [ ] **404 Page** - http://localhost:3001/this-does-not-exist
  - File: `$.tsx`
  - Should show: 404 error page with available routes
  - Test: Try any random URL that doesn't match other routes
  - Features: Catch-all splat route

---

## 🔍 Advanced Testing

### Navigation Testing

- [ ] Click through all links on home page
- [ ] Use browser back/forward buttons
- [ ] Test NavLink active states in Dashboard sidebar
- [ ] Test prefetch behavior (check network tab)

### Data Loading Testing

- [ ] Open Network tab in DevTools
- [ ] Navigate between routes
- [ ] Verify loaders fire on navigation
- [ ] Check for data waterfalls vs parallel loading

### Form Testing

- [ ] Submit contact form (should show success message)
- [ ] Submit dashboard settings (should show success message)
- [ ] Try POST to webhook API endpoint

### Error Testing

- [ ] Visit `/products/invalid-id` (should still work)
- [ ] Visit `/dashboard/nonexistent` (should 404 or error)
- [ ] Test with JavaScript disabled (should still render)

### SEO Testing

- [ ] View page source of any route
- [ ] Verify meta tags are rendered
- [ ] Check Open Graph tags (if added)
- [ ] Verify canonical URLs

---

## 📊 Verification Checklist

### Route Matching

- [ ] Static routes work
- [ ] Dynamic routes capture params correctly
- [ ] Multiple params extract properly
- [ ] Splat routes capture remaining segments
- [ ] 404 catches unmatched routes

### Layouts

- [ ] Dashboard layout renders on all dashboard pages
- [ ] Dashboard sidebar navigation works
- [ ] Auth layout wraps account page
- [ ] Root layout (PageLayout) wraps all routes

### Data Flow

- [ ] Loaders run on navigation
- [ ] useLoaderData returns correct data
- [ ] useParams returns correct parameters
- [ ] Actions process form submissions

### Resource Routes

- [ ] API endpoints return JSON
- [ ] RSS feed returns XML
- [ ] No HTML/UI is rendered for resource routes
- [ ] Correct Content-Type headers

---

## 🐛 Common Issues to Check

- [ ] Are types imported correctly? (`LoaderFunctionArgs`, etc.)
- [ ] Do all routes have proper exports? (default export or loader/action)
- [ ] Are dynamic params accessed correctly? (`params.paramName`)
- [ ] Is splat accessed correctly? (`params["*"]`)
- [ ] Do layouts render `<Outlet />`?
- [ ] Are pathless layouts prefixed with `_`?
- [ ] Are index routes suffixed with `._index`?

---

## ✅ Success Criteria

All route types work if:

1. ✅ All URLs above load without errors
2. ✅ Correct content displays for each route
3. ✅ Parameters are extracted correctly
4. ✅ Forms submit successfully
5. ✅ Resource routes return correct format (JSON/XML)
6. ✅ Layouts wrap child routes properly
7. ✅ 404 catches unmatched routes
8. ✅ Navigation between routes works smoothly

---

## 📝 Testing Notes

**Browser DevTools:**

- Use Network tab to see loader requests
- Use React DevTools to inspect component tree
- Use Console to see any errors

**Testing Tools:**

- Browser: Test UI routes
- curl: Test API endpoints
- Postman: Test webhook endpoints

**Example curl Commands:**

```bash
# Test products API
curl http://localhost:3001/api/products

# Test webhook (POST)
curl -X POST http://localhost:3001/api/webhook \
  -H "Content-Type: application/json" \
  -d '{"event":"test"}'

# Test RSS feed
curl http://localhost:3001/rss.xml
```

---

## 🎯 Quick Test Script

Copy and run in browser console:

```javascript
// Test all main routes
const routes = [
  '/',
  '/about',
  '/products',
  '/products/test-123',
  '/blog/2024/11/test-post',
  '/docs/getting-started',
  '/dashboard',
  '/dashboard/settings',
  '/account',
  '/categories/electronics/phones',
  '/search?q=test',
  '/nonexistent',
];

console.log('Testing routes...');
routes.forEach((route) => {
  console.log(
    `✓ ${route} - Test by visiting: ${window.location.origin}${route}`,
  );
});
```

---

## 🏆 Completion

**Date Tested:** ********\_********

**Tester:** ********\_********

**Results:**

- Routes Passing: \_\_\_\_ / 19
- Issues Found: \_\_\_\_
- Notes: ********\_********

---

**Happy Testing! 🧪**
