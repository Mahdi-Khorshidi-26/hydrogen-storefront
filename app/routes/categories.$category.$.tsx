/**
 * DYNAMIC ROUTE with OPTIONAL CATCH-ALL
 * File: app/categories.$category.$.tsx
 * URL: /categories/:category/*
 * Example: /categories/electronics/phones/apple
 *
 * Combines a dynamic segment ($category) with a splat ($) for subcategories
 */

import {useLoaderData, Link} from 'react-router';
import type {LoaderFunctionArgs} from 'react-router';

export async function loader({params}: LoaderFunctionArgs) {
  const {category} = params;
  const subcategory = params['*'] || '';

  return {
    category,
    subcategory,
    breadcrumbs: [category, ...subcategory.split('/').filter(Boolean)],
    products: [
      {id: '1', name: `${category} Product 1`},
      {id: '2', name: `${category} Product 2`},
    ],
  };
}

export default function CategoryProducts() {
  const {category, subcategory, breadcrumbs, products} =
    useLoaderData<typeof loader>();

  return (
    <div className="category-products">
      <h1>Category: {category}</h1>
      <p>
        Route file: <code>app/categories.$category.$.tsx</code>
      </p>
      <p>
        URL:{' '}
        <code>
          /categories/{category}/{subcategory || '...'}
        </code>
      </p>
      <p>
        Type: <strong>Dynamic + Splat Route</strong>
      </p>

      <nav style={{margin: '1rem 0'}}>
        <strong>Breadcrumbs:</strong>
        <Link to="/categories">Categories</Link>
        {breadcrumbs.map((crumb, index) => {
          const isFirst = index === 0;
          const path = isFirst
            ? `/categories/${crumb}`
            : `/categories/${breadcrumbs[0]}/${breadcrumbs.slice(1, index + 1).join('/')}`;
          return (
            <span key={path}>
              {' > '}
              <Link to={path}>{crumb}</Link>
            </span>
          );
        })}
      </nav>

      <div>
        <h2>Products</h2>
        {products.map((product) => (
          <div
            key={product.id}
            style={{
              border: '1px solid #ccc',
              padding: '1rem',
              margin: '0.5rem 0',
            }}
          >
            {product.name}
          </div>
        ))}
      </div>

      <div style={{marginTop: '1rem'}}>
        <h3>Try these paths:</h3>
        <ul>
          <li>
            <Link to="/categories/electronics">Electronics</Link>
          </li>
          <li>
            <Link to="/categories/electronics/phones">
              Electronics → Phones
            </Link>
          </li>
          <li>
            <Link to="/categories/electronics/phones/apple">
              Electronics → Phones → Apple
            </Link>
          </li>
        </ul>
      </div>

      <Link to="/">← Back to Home</Link>
    </div>
  );
}
