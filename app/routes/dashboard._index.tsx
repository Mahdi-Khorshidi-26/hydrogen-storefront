/**
 * NESTED ROUTE - Index under Layout
 * File: app/dashboard._index.tsx
 * URL: /dashboard
 *
 * This renders inside the DashboardLayout when visiting /dashboard
 */

import {useLoaderData} from 'react-router';
import type {LoaderFunctionArgs} from 'react-router';

export async function loader({context}: LoaderFunctionArgs) {
  return {
    stats: {
      totalOrders: 142,
      totalRevenue: '$12,450',
      activeCustomers: 89,
    },
  };
}

export default function DashboardIndex() {
  const {stats} = useLoaderData<typeof loader>();

  return (
    <div className="dashboard-overview">
      <h2>Dashboard Overview</h2>
      <p>
        Route file: <code>app/dashboard._index.tsx</code>
      </p>
      <p>
        URL: <code>/dashboard</code>
      </p>
      <p>
        Type: <strong>Nested Index Route (inside Layout)</strong>
      </p>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '1rem',
          marginTop: '1rem',
        }}
      >
        <div style={{border: '1px solid #ccc', padding: '1rem'}}>
          <h3>Total Orders</h3>
          <p style={{fontSize: '2rem', margin: 0}}>{stats.totalOrders}</p>
        </div>
        <div style={{border: '1px solid #ccc', padding: '1rem'}}>
          <h3>Revenue</h3>
          <p style={{fontSize: '2rem', margin: 0}}>{stats.totalRevenue}</p>
        </div>
        <div style={{border: '1px solid #ccc', padding: '1rem'}}>
          <h3>Customers</h3>
          <p style={{fontSize: '2rem', margin: 0}}>{stats.activeCustomers}</p>
        </div>
      </div>
    </div>
  );
}
