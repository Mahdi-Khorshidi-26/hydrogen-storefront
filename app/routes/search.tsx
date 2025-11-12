/**
 * OPTIONAL DYNAMIC SEGMENT
 * File: app/search.tsx
 * URL: /search or /search?q=query
 *
 * Optional parameters are typically handled via query strings.
 * For optional path segments, use splat routes or separate route files.
 */

import {useLoaderData, Link, Form} from 'react-router';
import type {LoaderFunctionArgs} from 'react-router';

export async function loader({request}: LoaderFunctionArgs) {
  const url = new URL(request.url);
  const query = url.searchParams.get('q') || '';
  const category = url.searchParams.get('category') || 'all';

  // In a real app, perform search via Shopify API
  const results = query
    ? [
        {id: '1', title: `Result 1 for "${query}"`, type: 'product'},
        {id: '2', title: `Result 2 for "${query}"`, type: 'page'},
      ]
    : [];

  return {
    query,
    category,
    results,
    totalResults: results.length,
  };
}

export default function Search() {
  const {query, category, results, totalResults} =
    useLoaderData<typeof loader>();

  return (
    <div className="search">
      <h1>Search</h1>
      <p>
        Route file: <code>app/search.tsx</code>
      </p>
      <p>
        URL:{' '}
        <code>
          /search?q={query || '...'}&category={category}
        </code>
      </p>
      <p>
        Type: <strong>Route with Optional Query Parameters</strong>
      </p>

      <Form method="get">
        <div>
          <input
            type="text"
            name="q"
            placeholder="Search..."
            defaultValue={query}
          />
          <select name="category" defaultValue={category}>
            <option value="all">All</option>
            <option value="products">Products</option>
            <option value="pages">Pages</option>
          </select>
          <button type="submit">Search</button>
        </div>
      </Form>

      {query && (
        <div style={{marginTop: '1rem'}}>
          <h2>
            Results for &quot;{query}&quot; in {category}
          </h2>
          <p>Found {totalResults} results</p>

          {results.map((result) => (
            <div
              key={result.id}
              style={{
                border: '1px solid #ccc',
                padding: '1rem',
                margin: '0.5rem 0',
              }}
            >
              <h3>{result.title}</h3>
              <p>Type: {result.type}</p>
            </div>
          ))}
        </div>
      )}

      <div style={{marginTop: '1rem'}}>
        <Link to="/">← Back to Home</Link>
      </div>
    </div>
  );
}
