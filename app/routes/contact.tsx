/**
 * NESTED STATIC ROUTE
 * File: app/contact.tsx
 * URL: /contact
 *
 * Another static route with a form action example.
 */

import {Form, useLoaderData, useActionData, Link} from 'react-router';
import type {ActionFunctionArgs, LoaderFunctionArgs} from 'react-router';

export async function loader({request}: LoaderFunctionArgs) {
  return {
    pageTitle: 'Contact Us',
    email: 'support@example.com',
  };
}

export async function action({request}: ActionFunctionArgs) {
  const formData = await request.formData();
  const name = formData.get('name');
  const email = formData.get('email');
  const message = formData.get('message');

  // Simulate form processing
  //   console.log('Contact form submission:', {name, email, message});

  return {
    success: true,
    message: `Thanks ${name}! We received your message.`,
  };
}

export default function Contact() {
  const data = useLoaderData<typeof loader>();
  const actionData = useActionData<typeof action>();

  return (
    <div className="contact">
      <h1>{data.pageTitle}</h1>
      <p>
        Route file: <code>app/contact.tsx</code>
      </p>
      <p>
        URL: <code>/contact</code>
      </p>
      <p>
        Type: <strong>Static Route with Action</strong>
      </p>
      <p>Email: {data.email}</p>

      {actionData?.success && (
        <div
          style={{padding: '1rem', background: '#d4edda', marginBottom: '1rem'}}
        >
          {actionData.message}
        </div>
      )}

      <Form method="post">
        <div>
          <label>
            Name: <input type="text" name="name" required />
          </label>
        </div>
        <div>
          <label>
            Email: <input type="email" name="email" required />
          </label>
        </div>
        <div>
          <label>
            Message: <textarea name="message" required />
          </label>
        </div>
        <button type="submit">Submit</button>
      </Form>

      <Link to="/">← Back to Home</Link>
    </div>
  );
}
