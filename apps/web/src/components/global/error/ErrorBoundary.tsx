'use client';

import type { ReactNode } from 'react';
import React from 'react';

import Button from '~/components/ui/Button';
import Heading from '~/components/ui/Heading';
import Text from '~/components/ui/Text';

import logEvent from '~/logging/logEvent';
import logMessage from '~/logging/logMessage';

type ErrorBoundaryProps = Readonly<{
  children: ReactNode;
}>;

type ErrorBoundaryState = Readonly<{
  hasError: boolean;
}>;

class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error & { digest?: string }) {
    logMessage({
      level: 'error',
      message: error.message,
      namespace: 'interviews',
      title: 'Interviews namespace error',
    });
    logEvent('error', {
      digest: error.digest,
      message: error.message,
      name: error.name,
      namespace: 'interviews',
      stack: error.stack,
      title: 'Interviews namespace error',
    });
  }

  render() {
    const { hasError } = this.state;
    const { children } = this.props;

    if (hasError) {
      return (
        <div className="size-full flex flex-col items-center justify-center gap-y-2">
          <Heading className="text-center" level="heading6">
            Oops! An error has occurred
          </Heading>
          <div className="flex flex-col items-center gap-6">
            <Text size="body2">
              The error has been logged and we will be looking into it.
            </Text>
            <Button
              label="Try again?"
              size="md"
              type="button"
              variant="primary"
              onClick={() => this.setState({ hasError: false })}
            />
          </div>
        </div>
      );
    }

    return children;
  }
}

export default ErrorBoundary;
