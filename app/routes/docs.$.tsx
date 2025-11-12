/**
 * SPLAT ROUTE (Catch-all)
 * File: app/docs.$.tsx
 * URL: /docs/* (matches /docs/getting-started, /docs/api/users, etc.)
 *
 * The $ at the end creates a splat route that captures remaining path segments.
 * Access via params["*"] (the splat parameter)
 */

import {useLoaderData, Link} from 'react-router';
import type {LoaderFunctionArgs} from 'react-router';

export async function loader({params}: LoaderFunctionArgs) {
  const splat = params['*'] || '';
  const pathSegments = splat.split('/').filter(Boolean);

  // In a real app, fetch documentation based on the path
  return {
    splat,
    pathSegments,
    breadcrumbs: pathSegments,
    content: {
      title: pathSegments[pathSegments.length - 1] || 'Documentation Home',
      body: `This is documentation for: ${splat || 'home'}`,
    },
  };
}

export default function Docs() {
  const {splat, pathSegments, breadcrumbs, content} =
    useLoaderData<typeof loader>();

  return (
    <div className="docs">
      <h1>Documentation</h1>
      <p>
        Route file: <code>app/docs.$.tsx</code>
      </p>
      <p>
        URL: <code>/docs/{splat || '...'}</code>
      </p>
      <p>
        Type: <strong>Splat Route (Catch-all)</strong>
      </p>

      <div style={{background: '#f0f0f0', padding: '1rem', margin: '1rem 0'}}>
        <p>
          <strong>Splat parameter ($):</strong> {splat || '(empty)'}
        </p>
        <p>
          <strong>Path segments:</strong>{' '}
          {pathSegments.length > 0 ? pathSegments.join(' > ') : 'none'}
        </p>
      </div>

      <nav style={{margin: '1rem 0'}}>
        <strong>Breadcrumbs:</strong>
        <Link to="/docs">Docs</Link>
        {breadcrumbs.map((segment, index) => {
          const path = `/docs/${breadcrumbs.slice(0, index + 1).join('/')}`;
          return (
            <span key={path}>
              {' > '}
              <Link to={path}>{segment}</Link>
            </span>
          );
        })}
      </nav>

      <article style={{border: '1px solid #ccc', padding: '1rem'}}>
        <h2>{content.title}</h2>
        <p>{content.body}</p>
      </article>

      <div style={{marginTop: '1rem'}}>
        <h3>Try these paths:</h3>
        <ul>
          <li>
            <Link to="/docs/getting-started">Getting Started</Link>
          </li>
          <li>
            <Link to="/docs/api/authentication">API Authentication</Link>
          </li>
          <li>
            <Link to="/docs/guides/deployment/vercel">Deployment Guide</Link>
          </li>
        </ul>
      </div>

      <Link to="/">← Back to Home</Link>
    </div>
  );
}
