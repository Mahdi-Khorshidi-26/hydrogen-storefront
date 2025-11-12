/**
 * RESOURCE ROUTE with POST handler
 * File: app/api.webhook.tsx
 * URL: /api/webhook
 *
 * Handles POST requests for webhooks. No UI component.
 */

import type {ActionFunctionArgs, LoaderFunctionArgs} from 'react-router';

export async function loader({request}: LoaderFunctionArgs) {
  // GET requests return method info
  return Response.json(
    {
      message: 'This endpoint accepts POST requests for webhooks',
      methods: ['POST'],
    },
    {status: 405},
  );
}

export async function action({request}: ActionFunctionArgs) {
  if (request.method !== 'POST') {
    return Response.json({error: 'Method not allowed'}, {status: 405});
  }

  try {
    const payload = (await request.json()) as object;

    // Process webhook payload
    // Example: Shopify order webhook, payment confirmation, etc.

    return Response.json(
      {
        success: true,
        message: 'Webhook received',
        receivedAt: new Date().toISOString(),
        payloadKeys: Object.keys(payload),
      },
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
  } catch (error) {
    return Response.json(
      {
        success: false,
        error: 'Invalid JSON payload',
      },
      {status: 400},
    );
  }
}

// No default export = Resource Route
