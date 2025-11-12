/**
 * DEBUG ROUTE - View all route IDs
 * Visit: http://localhost:3000/debug-routes
 *
 * This shows you all the route IDs in your app so you know
 * what to pass to useRouteLoaderData()
 */

import {useMatches, useLocation} from 'react-router';

export default function DebugRoutes() {
  const matches = useMatches();
  const location = useLocation();

  return (
    <div style={{padding: '2rem', fontFamily: 'monospace'}}>
      <h1>🔍 Route Debug Information</h1>

      <div
        style={{marginBottom: '2rem', padding: '1rem', background: '#f0f0f0'}}
      >
        <h2>Current URL</h2>
        <p>
          <strong>Pathname:</strong> {location.pathname}
        </p>
        <p>
          <strong>Search:</strong> {location.search}
        </p>
        <p>
          <strong>Hash:</strong> {location.hash}
        </p>
      </div>

      <div>
        <h2>Matched Routes (in order)</h2>
        <p style={{marginBottom: '1rem', color: '#666'}}>
          These are all the routes that matched your current URL. Copy the Route
          ID and use it with useRouteLoaderData hook
        </p>

        <table style={{width: '100%', borderCollapse: 'collapse'}}>
          <thead>
            <tr style={{background: '#333', color: 'white'}}>
              <th style={{padding: '0.5rem', textAlign: 'left'}}>Route ID</th>
              <th style={{padding: '0.5rem', textAlign: 'left'}}>Pathname</th>
              <th style={{padding: '0.5rem', textAlign: 'left'}}>Params</th>
              <th style={{padding: '0.5rem', textAlign: 'left'}}>
                Has Loader Data?
              </th>
            </tr>
          </thead>
          <tbody>
            {matches.map((match, index) => (
              <tr
                key={match.id}
                style={{
                  background: index % 2 === 0 ? 'white' : '#f9f9f9',
                  borderBottom: '1px solid #ddd',
                }}
              >
                <td
                  style={{
                    padding: '0.5rem',
                    fontWeight: 'bold',
                    color: '#0066cc',
                  }}
                >
                  {match.id}
                </td>
                <td style={{padding: '0.5rem'}}>{match.pathname}</td>
                <td style={{padding: '0.5rem'}}>
                  {Object.keys(match.params).length > 0
                    ? JSON.stringify(match.params)
                    : '—'}
                </td>
                <td style={{padding: '0.5rem'}}>
                  {match.data ? '✅ Yes' : '❌ No'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div
        style={{
          marginTop: '2rem',
          padding: '1rem',
          background: '#fff3cd',
          border: '1px solid #ffc107',
        }}
      >
        <h3>💡 How to Use</h3>
        <p>To access loader data from a parent route, use:</p>
        <pre
          style={{
            background: '#333',
            color: '#0f0',
            padding: '1rem',
            overflow: 'auto',
          }}
        >
          {`const data = useRouteLoaderData('route-id');

// Example for root route:
const rootData = useRouteLoaderData('root');

// Example for other routes (copy ID from table above):
const dashboardData = useRouteLoaderData('routes/dashboard');`}
        </pre>
      </div>

      <div style={{marginTop: '2rem'}}>
        <h3>Test Other Routes</h3>
        <p>Navigate to different pages to see which routes match:</p>
        <ul>
          <li>
            <a href="/">Home</a>
          </li>
          <li>
            <a href="/about">About</a>
          </li>
          <li>
            <a href="/products">Products</a>
          </li>
          <li>
            <a href="/dashboard">Dashboard</a>
          </li>
          <li>
            <a href="/dashboard/settings">Dashboard Settings</a>
          </li>
          <li>
            <a href="/test">Test</a>
          </li>
          <li>
            <a href="/test/hello">Test with Handle</a>
          </li>
        </ul>
      </div>
    </div>
  );
}
