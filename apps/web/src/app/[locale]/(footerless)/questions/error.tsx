'use client';

import { useEffect } from 'react';

import ErrorMessageBlock from '~/components/global/error/ErrorMessageBlock';

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
      title: 'Question page error',
    });
    logEvent('error', {
      message: error.message,
      title: 'Question page error',
    });
  }, [error]);

  return <ErrorMessageBlock onReloadClick={reset} />;
}
