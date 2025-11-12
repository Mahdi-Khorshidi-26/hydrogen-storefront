/**
 * RESOURCE ROUTE (No UI - JSON API)
 * File: app/api.products.tsx
 * URL: /api/products
 *
 * Resource routes return data (JSON) instead of rendering UI.
 * Useful for API endpoints, webhooks, RSS feeds, etc.
 */

import type {LoaderFunctionArgs} from 'react-router';

export async function loader({request, context}: LoaderFunctionArgs) {
  const {storefront} = context;

  // In a real app, fetch products from Shopify
  const products = [
    {id: '1', name: 'Product 1', price: 29.99},
    {id: '2', name: 'Product 2', price: 49.99},
    {id: '3', name: 'Product 3', price: 79.99},
  ];

  // Return JSON response
  return Response.json(
    {
      success: true,
      products,
      total: products.length,
      timestamp: new Date().toISOString(),
    },
    {
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'public, max-age=300',
      },
    },
  );
}

// No default export = Resource Route (no UI rendering)
