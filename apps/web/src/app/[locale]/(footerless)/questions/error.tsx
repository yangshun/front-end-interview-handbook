'use client';

import { useEffect } from 'react';

import logMessage from '~/logging/logMessage';

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
    logMessage({
      level: 'error',
      message: `Questions error ${error.message}`,
    });
  }, [error]);

  return (
    <div>
      <h1>Something went wrong loading the questions!</h1>
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
