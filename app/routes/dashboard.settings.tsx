/**
 * NESTED ROUTE under Layout
 * File: app/dashboard.settings.tsx
 * URL: /dashboard/settings
 *
 * This renders inside the DashboardLayout's Outlet
 */

import {Form, useLoaderData, useActionData} from 'react-router';
import type {LoaderFunctionArgs, ActionFunctionArgs} from 'react-router';

export async function loader({context}: LoaderFunctionArgs) {
  // In a real app, fetch user settings
  return {
    settings: {
      email: 'user@example.com',
      notifications: true,
      theme: 'light',
    },
  };
}

export async function action({request}: ActionFunctionArgs) {
  const formData = await request.formData();
  const email = formData.get('email');
  const notifications = formData.get('notifications') === 'on';
  const theme = formData.get('theme');

  // Save settings
  return {
    success: true,
    message: 'Settings saved successfully!',
  };
}

export default function DashboardSettings() {
  const {settings} = useLoaderData<typeof loader>();
  const actionData = useActionData<typeof action>();

  return (
    <div className="dashboard-settings">
      <h2>Settings</h2>
      <p>
        Route file: <code>app/dashboard.settings.tsx</code>
      </p>
      <p>
        URL: <code>/dashboard/settings</code>
      </p>
      <p>
        Type: <strong>Nested Route under Layout</strong>
      </p>

      {actionData?.success && (
        <div
          style={{padding: '1rem', background: '#d4edda', marginBottom: '1rem'}}
        >
          {actionData.message}
        </div>
      )}

      <Form method="post" style={{maxWidth: '400px'}}>
        <div style={{marginBottom: '1rem'}}>
          <label>
            Email:
            <br />
            <input
              type="email"
              name="email"
              defaultValue={settings.email}
              style={{width: '100%'}}
            />
          </label>
        </div>
        <div style={{marginBottom: '1rem'}}>
          <label>
            <input
              type="checkbox"
              name="notifications"
              defaultChecked={settings.notifications}
            />{' '}
            Enable notifications
          </label>
        </div>
        <div style={{marginBottom: '1rem'}}>
          <label>
            Theme:
            <br />
            <select
              name="theme"
              defaultValue={settings.theme}
              style={{width: '100%'}}
            >
              <option value="light">Light</option>
              <option value="dark">Dark</option>
            </select>
          </label>
        </div>
        <button type="submit">Save Settings</button>
      </Form>
    </div>
  );
}
