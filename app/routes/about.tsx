/**
 * STATIC ROUTE
 * File: app/about.tsx
 * URL: /about
 *
 * A simple static route. File name directly maps to the URL path.
 */

import {useLoaderData, Link} from 'react-router';
import type {LoaderFunctionArgs, MetaFunction} from 'react-router';

export async function loader({context}: LoaderFunctionArgs) {
  return {
    title: 'About Us',
    content: 'This is a static route example.',
    loadedAt: new Date().toISOString(),
  };
}

export const meta: MetaFunction<typeof loader> = ({data}) => {
  return [
    {title: data?.title || 'About'},
    {name: 'description', content: 'About page example'},
  ];
};

export default function About() {
  const data = useLoaderData<typeof loader>();

  return (
    <div className="about">
      <h1>{data.title}</h1>
      <p>
        Route file: <code>app/about.tsx</code>
      </p>
      <p>
        URL: <code>/about</code>
      </p>
      <p>
        Type: <strong>Static Route</strong>
      </p>
      <p>{data.content}</p>
      <p>Loaded at: {data.loadedAt}</p>
      <Link to="/">← Back to Home</Link>
    </div>
  );
}
