/**
 * ROUTE under PATHLESS LAYOUT
 * File: app/_auth.account.tsx
 * URL: /account
 *
 * This route uses the _auth pathless layout without adding "_auth" to the URL.
 * The URL is /account, but it inherits the auth layout logic.
 */

import {useLoaderData, Form, Link} from 'react-router';
import type {LoaderFunctionArgs, ActionFunctionArgs} from 'react-router';

export async function loader({context}: LoaderFunctionArgs) {
  const {customerAccount} = context;

  return {
    account: {
      name: 'John Doe',
      email: 'john@example.com',
      orders: 12,
      joinDate: '2024-01-15',
    },
  };
}

export async function action({request}: ActionFunctionArgs) {
  const formData = await request.formData();
  const intent = formData.get('intent');

  if (intent === 'logout') {
    // Handle logout
    return {success: true, message: 'Logged out successfully'};
  }

  return {success: false};
}

export default function Account() {
  const {account} = useLoaderData<typeof loader>();

  return (
    <div className="account">
      <h1>My Account</h1>
      <p>
        Route file: <code>app/_auth.account.tsx</code>
      </p>
      <p>
        URL: <code>/account</code>
      </p>
      <p>
        Type: <strong>Route under Pathless Layout (_auth)</strong>
      </p>
      <p>
        Note: Uses _auth layout but URL doesn&apos;t include &quot;_auth&quot;
      </p>

      <div
        style={{border: '1px solid #ccc', padding: '1rem', marginTop: '1rem'}}
      >
        <h2>Account Details</h2>
        <p>
          <strong>Name:</strong> {account.name}
        </p>
        <p>
          <strong>Email:</strong> {account.email}
        </p>
        <p>
          <strong>Total Orders:</strong> {account.orders}
        </p>
        <p>
          <strong>Member Since:</strong> {account.joinDate}
        </p>
      </div>

      <Form method="post" style={{marginTop: '1rem'}}>
        <input type="hidden" name="intent" value="logout" />
        <button type="submit">Logout</button>
      </Form>

      <div style={{marginTop: '1rem'}}>
        <Link to="/">← Back to Home</Link>
      </div>
    </div>
  );
}
