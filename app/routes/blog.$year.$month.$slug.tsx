/**
 * DYNAMIC ROUTE - Multiple Parameters
 * File: app/blog.$year.$month.$slug.tsx
 * URL: /blog/:year/:month/:slug (e.g., /blog/2024/11/my-first-post)
 *
 * Multiple dynamic segments create a nested path structure.
 * Each $ segment becomes a parameter accessible via params.
 */

import {useLoaderData, Link} from 'react-router';
import type {LoaderFunctionArgs} from 'react-router';

export async function loader({params}: LoaderFunctionArgs) {
  const {year, month, slug} = params;

  // In a real app, fetch blog post from CMS or database
  return {
    year,
    month,
    slug,
    post: {
      title: slug
        ?.split('-')
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' '),
      content: 'This is a blog post with multiple dynamic segments in the URL.',
      author: 'John Doe',
      publishedDate: `${year}-${month}-01`,
    },
  };
}

export default function BlogPost() {
  const {post, year, month, slug} = useLoaderData<typeof loader>();

  return (
    <div className="blog-post">
      <h1>{post.title}</h1>
      <p>
        Route file: <code>app/blog.$year.$month.$slug.tsx</code>
      </p>
      <p>
        URL:{' '}
        <code>
          /blog/{year}/{month}/{slug}
        </code>
      </p>
      <p>
        Type: <strong>Dynamic Route (Multiple Parameters)</strong>
      </p>

      <div style={{background: '#f0f0f0', padding: '1rem', margin: '1rem 0'}}>
        <p>
          <strong>Parameters:</strong>
        </p>
        <ul>
          <li>$year = {year}</li>
          <li>$month = {month}</li>
          <li>$slug = {slug}</li>
        </ul>
      </div>

      <article style={{border: '1px solid #ccc', padding: '1rem'}}>
        <p>
          <strong>By:</strong> {post.author}
        </p>
        <p>
          <strong>Published:</strong> {post.publishedDate}
        </p>
        <p>{post.content}</p>
      </article>

      <div style={{marginTop: '1rem'}}>
        <Link to="/">← Back to Home</Link>
      </div>
    </div>
  );
}
