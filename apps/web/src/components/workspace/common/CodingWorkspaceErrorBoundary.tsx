'use client';

import type { ReactNode } from 'react';
import React from 'react';

import Button from '~/components/ui/Button';
import EmptyState from '~/components/ui/EmptyState';

import { chunkLoadErrorReload } from '~/logging/chunkErrorReload';
import logEvent from '~/logging/logEvent';
import logMessage from '~/logging/logMessage';

type Props = Readonly<{
  children: ReactNode;
}>;

type State = Readonly<{
  hasError: boolean;
}>;

// ErrorBoundary-s don't support hooks and functional components as of react@18.2.3
export default class CodingWorkspaceErrorBoundary extends React.Component<
  Props,
  State
> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error & { digest?: string }) {
    console.error(error);
    // If the error is a ChunkLoadError, we reload the page to try to load the chunk again because it's likely an intermittent network issue.
    if (error.name === 'ChunkLoadError') {
      chunkLoadErrorReload();

      return;
    }

    logMessage({
      level: 'error',
      message: error.message,
      namespace: 'workspace',
      title: 'Workspace error',
    });
    logEvent('error', {
      digest: error.digest,
      message: error.message,
      name: error.name,
      namespace: 'workspace',
      stack: error.stack,
      title: 'Workspace error',
    });
  }

  render() {
    const { hasError } = this.state;
    const { children } = this.props;

    if (hasError) {
      return (
        <div className="size-full flex flex-col items-center justify-center px-10">
          <EmptyState
            action={
              <Button
                label="Try again?"
                size="md"
                type="button"
                variant="primary"
                onClick={() => this.setState({ hasError: false })}
              />
            }
            subtitle="The error has been logged and we will be looking into it. If you recently updated some code, try reverting the change."
            title="Oops! An error has occurred"
            variant="error"
          />
        </div>
      );
    }

    return children;
  }
}
