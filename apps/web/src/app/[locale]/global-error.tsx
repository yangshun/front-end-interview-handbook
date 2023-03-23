'use client';

import { useEffect } from 'react';

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
      message: `Global error ${error.message}`,
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
