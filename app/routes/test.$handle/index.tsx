import {useLoaderData, data} from 'react-router';
import type {LoaderFunctionArgs} from 'react-router';

export async function loader({params, context}: LoaderFunctionArgs) {
  const {handle} = params;
  const {storefront} = context;
  return data({handle, storefront});
}

export default function TestHandle() {
  const {handle} = useLoaderData<typeof loader>();

  return (
    <div>
      <h1>Test Handle Route (from folder)</h1>
      <p>
        Handle parameter: <strong>{handle}</strong>
      </p>
    </div>
  );
}
