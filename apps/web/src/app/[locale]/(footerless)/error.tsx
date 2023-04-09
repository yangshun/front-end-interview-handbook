'use client';

import { useEffect } from 'react';

import logEvent from '~/logging/logEvent';
import logMessage from '~/logging/logMessage';

import * as Sentry from '@sentry/react';

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
    Sentry.captureException(error);
    logMessage({
      level: 'error',
      message: error.message,
      title: 'Page error',
    });
    logEvent('error', {
      message: `${error.message}`,
      title: 'Page error',
    });
  }, [error]);

  return (
    <div>
      <h1>Something went wrong...</h1>
      <button
        type="button"
        onClick={
          // Attempt to recover by trying to re-render the segment
          () => reset()
        }>
        Try again
      </button>
    </div>
  );
}
