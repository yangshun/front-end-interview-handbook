'use client';

import { useEffect } from 'react';

import ErrorMessageBlock from '~/components/global/error/ErrorMessageBlock';

import logEvent from '~/logging/logEvent';
import logMessage from '~/logging/logMessage';

type Props = Readonly<{ error: Error; reset: () => void }>;

export default function GlobalError({ error }: Props) {
  useEffect(() => {
    console.error(error);
    logMessage({
      level: 'error',
      message: `${error.message}`,
      namespace: 'general',
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
