/**
 * PATHLESS LAYOUT ROUTE
 * File: app/dashboard.tsx
 * URL: None (this is just a layout wrapper)
 *
 * This creates a layout that wraps child routes without adding to the URL.
 * Child routes like dashboard.settings.tsx will render inside the Outlet.
 */

import {Outlet, Link, useLocation} from 'react-router';

export default function DashboardLayout() {
  const location = useLocation();

  return (
    <div className="dashboard-layout">
      <h1>Dashboard Layout</h1>
      <p>
        Route file: <code>app/dashboard.tsx</code>
      </p>
      <p>
        Type: <strong>Layout Route (with Outlet)</strong>
      </p>
      <p>
        Current path: <code>{location.pathname}</code>
      </p>

      <div style={{display: 'flex', gap: '2rem', marginTop: '1rem'}}>
        <nav
          style={{
            width: '200px',
            borderRight: '1px solid #ccc',
            paddingRight: '1rem',
          }}
        >
          <h3>Dashboard Nav</h3>
          <ul style={{listStyle: 'none', padding: 0}}>
            <li>
              <Link to="/dashboard">Overview</Link>
            </li>
            <li>
              <Link to="/dashboard/settings">Settings</Link>
            </li>
            <li>
              <Link to="/dashboard/analytics">Analytics</Link>
            </li>
            <li>
              <Link to="/dashboard/profile">Profile</Link>
            </li>
          </ul>
        </nav>

        <main style={{flex: 1}}>
          {/* Child routes render here */}
          <Outlet />
        </main>
      </div>

      <div
        style={{
          marginTop: '2rem',
          paddingTop: '1rem',
          borderTop: '1px solid #ccc',
        }}
      >
        <Link to="/">← Back to Home</Link>
      </div>
    </div>
  );
}
