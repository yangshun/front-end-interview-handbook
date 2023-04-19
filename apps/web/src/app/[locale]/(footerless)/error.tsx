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

  return <ErrorMessageBlock />;
}
