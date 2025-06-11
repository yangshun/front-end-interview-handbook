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

// `global-error.tsx` is only enabled in production, which makes it hard
// to test: https://nextjs.org/docs/app/api-reference/file-conventions/error#global-errorjs

// So we put an `error.tsx` in `/app/[locale]` which somewhat achieves the same effect since
// it's quite high up in the hierarchy.
export default function GlobalError({ error }: Props) {
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
      namespace: 'general',
      title: 'Global error',
    });
    logEvent('error', {
      digest: error.digest,
      message: error.message,
      name: error.name,
      namespace: 'general',
      stack: error.stack,
      title: 'Global error',
    });
  }, [error]);

  return <ErrorMessageBlock returnHref="/" />;
}
