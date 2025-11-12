/**
 * NESTED ROUTE under Layout
 * File: app/dashboard.analytics.tsx
 * URL: /dashboard/analytics
 *
 * Another nested route under the dashboard layout
 */

import {useLoaderData} from 'react-router';
import type {LoaderFunctionArgs} from 'react-router';

export async function loader({context}: LoaderFunctionArgs) {
  return {
    analytics: {
      pageViews: 15420,
      uniqueVisitors: 3241,
      bounceRate: '42%',
      avgSessionDuration: '3m 24s',
    },
  };
}

export default function DashboardAnalytics() {
  const {analytics} = useLoaderData<typeof loader>();

  return (
    <div className="dashboard-analytics">
      <h2>Analytics</h2>
      <p>
        Route file: <code>app/dashboard.analytics.tsx</code>
      </p>
      <p>
        URL: <code>/dashboard/analytics</code>
      </p>
      <p>
        Type: <strong>Nested Route under Layout</strong>
      </p>

      <div style={{marginTop: '1rem'}}>
        <div
          style={{
            border: '1px solid #ccc',
            padding: '1rem',
            marginBottom: '1rem',
          }}
        >
          <h3>Page Views</h3>
          <p style={{fontSize: '2rem', margin: 0}}>
            {analytics.pageViews.toLocaleString()}
          </p>
        </div>
        <div
          style={{
            border: '1px solid #ccc',
            padding: '1rem',
            marginBottom: '1rem',
          }}
        >
          <h3>Unique Visitors</h3>
          <p style={{fontSize: '2rem', margin: 0}}>
            {analytics.uniqueVisitors.toLocaleString()}
          </p>
        </div>
        <div
          style={{
            border: '1px solid #ccc',
            padding: '1rem',
            marginBottom: '1rem',
          }}
        >
          <h3>Bounce Rate</h3>
          <p style={{fontSize: '2rem', margin: 0}}>{analytics.bounceRate}</p>
        </div>
        <div style={{border: '1px solid #ccc', padding: '1rem'}}>
          <h3>Avg. Session Duration</h3>
          <p style={{fontSize: '2rem', margin: 0}}>
            {analytics.avgSessionDuration}
          </p>
        </div>
      </div>
    </div>
  );
}
