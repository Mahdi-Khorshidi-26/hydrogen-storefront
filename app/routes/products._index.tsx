/**
 * NESTED INDEX ROUTE
 * File: app/products._index.tsx
 * URL: /products
 *
 * This is an index route for the /products path.
 * The dot notation (_index) makes it render at the parent path.
 */

import {useLoaderData, Link} from 'react-router';
import type {LoaderFunctionArgs} from 'react-router';

export async function loader({context}: LoaderFunctionArgs) {
  // In a real app, fetch from Shopify storefront API
  const {storefront} = context;

  return {
    products: [
      {id: 'product-123', title: 'T-Shirt', price: '$29.99'},
      {id: 'product-456', title: 'Jeans', price: '$79.99'},
      {id: 'product-789', title: 'Sneakers', price: '$129.99'},
    ],
  };
}

export default function ProductsIndex() {
  const {products} = useLoaderData<typeof loader>();

  return (
    <div className="products-index">
      <h1>All Products</h1>
      <p>
        Route file: <code>app/products._index.tsx</code>
      </p>
      <p>
        URL: <code>/products</code>
      </p>
      <p>
        Type: <strong>Nested Index Route</strong>
      </p>

      <div className="product-grid">
        {products.map((product) => (
          <div
            key={product.id}
            style={{
              border: '1px solid #ccc',
              padding: '1rem',
              margin: '0.5rem',
            }}
          >
            <h3>{product.title}</h3>
            <p>{product.price}</p>
            <Link to={`/products/${product.id}`}>View Details →</Link>
          </div>
        ))}
      </div>

      <Link to="/">← Back to Home</Link>
    </div>
  );
}
