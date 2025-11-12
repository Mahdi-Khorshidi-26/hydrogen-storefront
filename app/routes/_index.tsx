/**
 * ROOT INDEX ROUTE
 * File: app/_index.tsx
 * URL: /
 *
 * This is the home page route. The underscore prefix makes it an index route.
 * It renders at the root path when no other segments are present.
 */

import {useLoaderData, Link} from 'react-router';
import type {LoaderFunctionArgs, MetaFunction} from 'react-router';

export async function loader({context}: LoaderFunctionArgs) {
  const {storefront} = context;

  return {
    title: 'Home Page',
    description: 'Welcome to the Hydrogen storefront',
    timestamp: new Date().toISOString(),
  };
}

export const meta: MetaFunction<typeof loader> = ({data}) => {
  return [
    {title: data?.title || 'Home'},
    {name: 'description', content: data?.description || 'Home page'},
  ];
};

export default function Index() {
  const data = useLoaderData<typeof loader>();

  return (
    <div className="home">
      <h1>Home Page (Index Route)</h1>
      <p>
        Route file: <code>app/_index.tsx</code>
      </p>
      <p>
        URL: <code>/</code>
      </p>
      <p>Loaded at: {data.timestamp}</p>

      <nav>
        <h2>Explore Route Examples:</h2>
        <ul>
          <li>
            <Link to="/about">About (Static Route)</Link>
          </li>
          <li>
            <Link to="/products">Products (Index Route)</Link>
          </li>
          <li>
            <Link to="/products/product-123">
              Product Detail (Dynamic Route)
            </Link>
          </li>
          <li>
            <Link to="/blog/2024/11/my-post">Blog Post (Multi-segment)</Link>
          </li>
          <li>
            <Link to="/docs/getting-started">Docs (Splat Route)</Link>
          </li>
          <li>
            <Link to="/dashboard/settings">Dashboard (Nested Layout)</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}
