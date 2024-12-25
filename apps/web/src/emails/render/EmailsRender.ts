import { render } from '@react-email/components';

/**
 * This function is also used on the client, do not add any server-side dependencies
 */
export async function renderEmail(component: JSX.Element) {
  const [html, text] = await Promise.all([
    render(component),
    render(component, { plainText: true }),
  ]);

  return { html, text };
}
