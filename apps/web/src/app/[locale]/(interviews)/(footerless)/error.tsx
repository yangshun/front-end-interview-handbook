'use client';

import { useEffect } from 'react';

import ErrorMessageBlock from '~/components/global/error/ErrorMessageBlock';

import logEvent from '~/logging/logEvent';
import logMessage from '~/logging/logMessage';

type Props = Readonly<{ error: Error; reset: () => void }>;

export default function Error({ error }: Props) {
  useEffect(() => {
    console.error(error);
    logMessage({
      level: 'error',
      message: error.message,
      namespace: 'interviews',
      title: 'Page error',
    });
    logEvent('error', {
      message: `${error.message}`,
      namespace: 'interviews',
      title: 'Page error',
    });
  }, [error]);

  return <ErrorMessageBlock />;
}
