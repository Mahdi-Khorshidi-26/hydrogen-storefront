import {useLoaderData, Link, data} from 'react-router';
import type {LoaderFunctionArgs} from 'react-router';

export async function loader({params, context}: LoaderFunctionArgs) {
  const {handle} = params;
  const {storefront} = context;
  return data({handle, storefront});
}

export default function Test() {
  const {handle, storefront} = useLoaderData<typeof loader>();

  return <h1>This is a test route with handle: {handle}</h1>;
}
