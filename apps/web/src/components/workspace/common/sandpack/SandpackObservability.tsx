import { useSandpack } from '@codesandbox/sandpack-react';
import { useEffect, useRef } from 'react';

import sandpackProviderOptions from '~/components/workspace/common/sandpack/sandpackProviderOptions';

import logEvent from '~/logging/logEvent';
import { getErrorMessage } from '~/utils/getErrorMessage';

type Props = Readonly<{
  // Identify which instance this happened. Should be unique within the page.
  instance?: string;
}>;

const pingURL = new URL(
  'version.txt',
  sandpackProviderOptions.bundlerURL,
).toString();

function usePingSandpackBundler(instance?: string) {
  const pingSentRef = useRef(false);
  const isUnloadingRef = useRef(false);

  useEffect(() => {
    if (pingSentRef.current) {
      return;
    }

    function handleBeforeUnload() {
      isUnloadingRef.current = true;
    }

    window.addEventListener('beforeunload', handleBeforeUnload);

    async function pingSandpackBundler() {
      if (isUnloadingRef.current) {
        return;
      }

      pingSentRef.current = true;

      try {
        const response = await fetch(pingURL);
        const text = await response.text();

        logEvent('sandpack.reachable', {
          instance,
          namespace: 'workspace',
          url: sandpackProviderOptions.bundlerURL,
          version: text,
        });
      } catch (error: unknown) {
        logEvent('sandpack.unreachable', {
          error: getErrorMessage(error),
          instance,
          namespace: 'workspace',
          online: navigator.onLine,
          stack: error instanceof Error ? error.stack : null,
          url: sandpackProviderOptions.bundlerURL,
        });
      }
    }

    pingSandpackBundler();

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [instance]);
}

const sandpackStartedEventName = 'sandpack-started';
const sandpackReadyEventName = 'sandpack-ready';

export default function SandpackObservability({ instance }: Props) {
  const { sandpack } = useSandpack();
  const { status: sandpackStatus } = sandpack;
  const loadingStartedRef = useRef(false);
  const readySentRef = useRef(false);
  const timeoutSentRef = useRef(false);

  usePingSandpackBundler(instance);

  useEffect(() => {
    if (sandpackStatus === 'timeout' && !timeoutSentRef.current) {
      logEvent('sandpack.timeout', {
        instance,
        namespace: 'workspace',
      });
      timeoutSentRef.current = true;
    }
  }, [instance, sandpackStatus]);

  useEffect(() => {
    if (loadingStartedRef.current) {
      return;
    }

    loadingStartedRef.current = true;
    performance.mark(sandpackStartedEventName);
  }, []);

  useEffect(() => {
    if (sandpackStatus === 'running' && !readySentRef.current) {
      performance.mark(sandpackReadyEventName);

      const sandpackReady = performance.measure(
        'sandpack-ready',
        sandpackStartedEventName,
        sandpackReadyEventName,
      );

      logEvent('sandpack.running', {
        duration: Math.floor(sandpackReady.duration),
        instance,
        namespace: 'workspace',
        url: sandpackProviderOptions.bundlerURL,
      });
      readySentRef.current = true;
    }
  }, [instance, sandpackStatus]);

  return null;
}
