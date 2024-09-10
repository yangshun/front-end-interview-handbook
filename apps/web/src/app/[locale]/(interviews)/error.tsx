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

export default function InterviewsError({ error }: Props) {
  useEffect(() => {
    console.error(error);
    logMessage({
      level: 'error',
      message: `${error.message}`,
      namespace: 'interviews',
      title: 'Interviews namespace error',
    });
    logEvent('error', {
      digest: error.digest,
      message: `${error.message}`,
      namespace: 'interviews',
      title: 'Interviews namespace error',
    });
  }, [error]);

  return <ErrorMessageBlock returnHref="/prepare" />;
}
