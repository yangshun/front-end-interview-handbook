import { render } from '@react-email/components';

/**
 * This function is also used on the client, do not add any server-side dependencies
 */
export async function renderEmail(emailElement: JSX.Element) {
  const [html, text] = await Promise.all([
    render(emailElement),
    render(emailElement, { plainText: true }),
  ]);

  return { html, text };
}
