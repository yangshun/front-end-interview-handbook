'use client';

import { useEffect } from 'react';

import ErrorMessageBlock from '~/components/global/error/ErrorMessageBlock';
import { chunkLoadErrorReload } from '~/logging/chunkErrorReload';

import logEvent from '~/logging/logEvent';
import logMessage from '~/logging/logMessage';

type Props = Readonly<{
  error: Error & { digest?: string };
  reset: () => void;
}>;

export default function Error({ error }: Props) {
  useEffect(() => {
    console.error(error);
    // If the error is a ChunkLoadError, we reload the page to try to load the chunk again because it's likely an intermittent network issue.
    if (error.name === 'ChunkLoadError') {
      chunkLoadErrorReload();

      return;
    }

    logMessage({
      level: 'error',
      message: error.message,
      namespace: 'interviews',
      title: 'Page error',
    });
    logEvent('error', {
      digest: error.digest,
      message: error.message,
      name: error.name,
      namespace: 'interviews',
      stack: error.stack,
      title: 'Page error',
    });
  }, [error]);

  return <ErrorMessageBlock returnHref="/interviews/dashboard" />;
}
