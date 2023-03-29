'use client';

import { useEffect } from 'react';

import logEvent from '~/logging/logEvent';
import logMessage from '~/logging/logMessage';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  useEffect(() => {
    // TODO: Log the error to an error reporting service
    console.error(error);
    logMessage({
      level: 'error',
      message: `${error.message}`,
      title: 'Global error',
    });
    logEvent('error', {
      message: `${error.message}`,
      title: 'Global error',
    });
  }, [error]);

  return (
    // TODO: i18n
    <html lang="en">
      <title>Error</title>
      <body>
        <h1>Something went wrong!</h1>
        <button type="button" onClick={() => reset()}>
          Try again
        </button>
      </body>
    </html>
  );
}
