'use client';

import React from 'react';
import { useEffect } from 'react';

import ErrorMessageBlock from '~/components/global/error/ErrorMessageBlock';

import logEvent from '~/logging/logEvent';
import logMessage from '~/logging/logMessage';

type Props = Readonly<{
  error: Error & { digest?: string };
  reset: () => void;
}>;

export default function BlogError({ error }: Props) {
  useEffect(() => {
    console.error(error);
    logMessage({
      level: 'error',
      message: error.message,
      namespace: 'blog',
      title: 'Blog namespace error',
    });
    logEvent('error', {
      digest: error.digest,
      message: error.message,
      name: error.name,
      namespace: 'blog',
      stack: error.stack,
      title: 'Blog namespace error',
    });
  }, [error]);

  return <ErrorMessageBlock returnHref="/blog" />;
}
