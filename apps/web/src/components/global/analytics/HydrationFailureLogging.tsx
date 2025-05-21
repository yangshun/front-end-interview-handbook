'use client';

import { useEffect } from 'react';

export default function HydrationFailureLogging() {
  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    window.__hydrated = true;
  }, []);

  return (
    <script
      dangerouslySetInnerHTML={{
        __html: `(function (w) {
        w.setTimeout(function() {
          if (w.__hydrated) {
            return;
          }
          w.fetch('/api/logging/events', {
            body: JSON.stringify({
              clientSHA: '${
                process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_SHA ?? ''
              }'.slice(0, 7),
              name: 'hydration.fail',
              pathname: window.location.pathname,
              payload: {
                url: window.location.href,
              },
            }),
            headers: { 'Content-Type': 'application/json' },
            method: 'POST',
          });
          ${
            process.env.NODE_ENV === 'production'
              ? 'window.location.reload();'
              : ''
          }
        }, 10000);
      })(window);
    `,
      }}
      id="hydration-reload"
    />
  );
}
