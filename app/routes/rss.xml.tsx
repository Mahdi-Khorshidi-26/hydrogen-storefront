/**
 * RESOURCE ROUTE - RSS Feed
 * File: app/rss.xml.tsx
 * URL: /rss.xml
 *
 * Generate RSS feed as XML. Note the .xml extension in the filename.
 */

import type {LoaderFunctionArgs} from 'react-router';

export async function loader({request, context}: LoaderFunctionArgs) {
  const {storefront} = context;

  // In a real app, fetch blog posts or products
  const items = [
    {
      title: 'New Product Launch',
      link: 'https://example.com/products/new-product',
      description: 'Check out our latest product',
      pubDate: new Date().toUTCString(),
    },
    {
      title: 'Summer Sale Starts Now',
      link: 'https://example.com/collections/summer-sale',
      description: 'Up to 50% off on selected items',
      pubDate: new Date(Date.now() - 86400000).toUTCString(),
    },
  ];

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>My Shopify Store</title>
    <link>https://example.com</link>
    <description>Latest updates from our store</description>
    <language>en</language>
    ${items
      .map(
        (item) => `
    <item>
      <title>${item.title}</title>
      <link>${item.link}</link>
      <description>${item.description}</description>
      <pubDate>${item.pubDate}</pubDate>
    </item>`,
      )
      .join('')}
  </channel>
</rss>`;

  return new Response(rss, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600',
    },
  });
}

// No default export = Resource Route
