'use client';

import Script from 'next/script';
import { useEffect } from 'react';

type Props = Readonly<{
  countryCode: string;
}>;

export default function HydrationFailureLogging({ countryCode }: Props) {
  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    window.__hydrated = true;
  }, []);

  return (
    <Script id="unresponsive-logging">
      {`(function (w) {
        w.setTimeout(function() {
          if (w.__hydrated) { return; }
          w.fetch('/api/logging/message', {
            body: JSON.stringify({ level: 'error', message: window.location.href, title: 'Unhydrated page for ${countryCode}', sha: '${
        process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_SHA ?? ''
      }'.slice(0, 7) }),
            headers: { 'Content-Type': 'application/json' },
            method: 'POST',
          });
        }, 5000);
      })(window);
    `}
    </Script>
  );
}
