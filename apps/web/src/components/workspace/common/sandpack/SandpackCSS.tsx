'use client';

import { useServerInsertedHTML } from 'next/navigation';

import { getSandpackCssText } from '@codesandbox/sandpack-react';

// Ideally we import this only where we use Sandpack... but
// the <style> tag gets injected multiple times on the page.
// Can't figure it out, so just add to RootLayout.
export default function SandpackCSS() {
  useServerInsertedHTML(() => {
    return (
      <>
        <style
          dangerouslySetInnerHTML={{ __html: getSandpackCssText() }}
          id="sandpack"
        />
        {/* Override unwanted Sandpack typography variables */}
        <style id="sandpack-overrides">
          {`@media {
  .light, .dark {
    --sp-font-body: inherit !important;
    --sp-font-size: inherit !important;
    --sp-font-lineHeight: inherit !important;
  }
}`}
        </style>
      </>
    );
  });

  return null;
}
