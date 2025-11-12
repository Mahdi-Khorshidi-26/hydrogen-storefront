/**
 * DYNAMIC ROUTE - Single Parameter
 * File: app/products.$productId.tsx
 * URL: /products/:productId (e.g., /products/product-123)
 *
 * The $ prefix creates a dynamic segment that matches any value.
 * Access the parameter via params.productId
 */

import {useLoaderData, Link} from 'react-router';
import type {LoaderFunctionArgs} from 'react-router';

export async function loader({params, context}: LoaderFunctionArgs) {
  const {productId} = params;
  const {storefront} = context;

  // In a real app, fetch product by ID from Shopify
  // const product = await storefront.query(PRODUCT_QUERY, {variables: {id: productId}});

  return {
    productId,
    product: {
      id: productId,
      title: `Product ${productId}`,
      description: 'This is a dynamic product page.',
      price: '$99.99',
      images: ['https://via.placeholder.com/400'],
    },
  };
}

export default function ProductDetail() {
  const {product, productId} = useLoaderData<typeof loader>();

  return (
    <div className="product-detail">
      <h1>{product.title}</h1>
      <p>
        Route file: <code>app/products.$productId.tsx</code>
      </p>
      <p>
        URL: <code>/products/{productId}</code>
      </p>
      <p>
        Type: <strong>Dynamic Route (Single Parameter)</strong>
      </p>
      <p>
        Dynamic segment: <code>$productId = {productId}</code>
      </p>

      <div
        style={{border: '1px solid #ccc', padding: '1rem', marginTop: '1rem'}}
      >
        <img
          src={product.images[0]}
          alt={product.title}
          style={{maxWidth: '300px'}}
        />
        <p>{product.description}</p>
        <p>
          <strong>Price:</strong> {product.price}
        </p>
        <button>Add to Cart</button>
      </div>

      <div style={{marginTop: '1rem'}}>
        <Link to="/products">← Back to Products</Link>
      </div>
    </div>
  );
}
