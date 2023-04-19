'use client';

import { useEffect } from 'react';

import ErrorMessageBlock from '~/components/global/error/ErrorMessageBlock';

import logEvent from '~/logging/logEvent';
import logMessage from '~/logging/logMessage';

import * as Sentry from '@sentry/react';

export default function GlobalError({
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
        <ErrorMessageBlock />
      </body>
    </html>
  );
}
