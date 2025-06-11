'use client';

import React from 'react';
import { useEffect } from 'react';

import ErrorMessageBlock from '~/components/global/error/ErrorMessageBlock';
import { chunkLoadErrorReload } from '~/logging/chunkErrorReload';

import logEvent from '~/logging/logEvent';
import logMessage from '~/logging/logMessage';

type Props = Readonly<{
  error: Error & { digest?: string };
  reset: () => void;
}>;

export default function AuthError({ error }: Props) {
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
      namespace: 'auth',
      title: 'Auth namespace error',
    });
    logEvent('error', {
      digest: error.digest,
      message: error.message,
      name: error.name,
      namespace: 'auth',
      stack: error.stack,
      title: 'Auth namespace error',
    });
  }, [error]);

  return <ErrorMessageBlock returnHref="/login" />;
}
