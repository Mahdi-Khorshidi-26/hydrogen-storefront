/**
 * PATHLESS ROUTE GROUP
 * File: app/_auth.tsx
 * URL: None (this is a pathless layout)
 *
 * The underscore prefix creates a route that doesn't add to the URL.
 * Useful for grouping routes with shared logic without changing URLs.
 */

import {Outlet, useLoaderData} from 'react-router';
import type {LoaderFunctionArgs} from 'react-router';

export async function loader({context}: LoaderFunctionArgs) {
  const {customerAccount} = context;

  // Check authentication
  const isLoggedIn = await customerAccount.isLoggedIn();

  // In a real app, you might redirect if not logged in
  // if (!isLoggedIn) {
  //   throw redirect('/login');
  // }

  return {
    isLoggedIn,
    user: isLoggedIn ? {name: 'John Doe', email: 'john@example.com'} : null,
  };
}

export default function AuthLayout() {
  const {isLoggedIn, user} = useLoaderData<typeof loader>();

  return (
    <div className="auth-layout">
      <div
        style={{background: '#f0f0f0', padding: '0.5rem', marginBottom: '1rem'}}
      >
        {isLoggedIn && user ? (
          <p>
            Logged in as: {user.name} ({user.email})
          </p>
        ) : (
          <p>Not authenticated</p>
        )}
      </div>

      {/* Child routes render here */}
      <Outlet />
    </div>
  );
}
