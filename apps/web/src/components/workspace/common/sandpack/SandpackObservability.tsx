import { useSandpack } from '@codesandbox/sandpack-react';
import { useEffect, useRef } from 'react';
import url from 'url';

import sandpackProviderOptions from '~/components/workspace/common/sandpack/sandpackProviderOptions';

import logEvent from '~/logging/logEvent';
import { getErrorMessage } from '~/utils/getErrorMessage';

type Props = Readonly<{
  // Identify which instance this happened. Should be unique within the page.
  instance?: string;
}>;

const pingURL = new URL(
  url.format({ pathname: 'version.txt' }),
  sandpackProviderOptions.bundlerURL,
);

async function pingSandpackBundler(instance?: string) {
  try {
    const response = await fetch(pingURL);
    const text = await response.text();

    logEvent('sandpack.reachable', {
      instance,
      namespace: 'workspace',
      url: sandpackProviderOptions.bundlerURL,
      version: text,
    });
  } catch (error) {
    logEvent('sandpack.unreachable', {
      error: getErrorMessage(error),
      instance,
      namespace: 'workspace',
      url: sandpackProviderOptions.bundlerURL,
    });
    console.error(getErrorMessage(error));
  }
}

const sandpackStartedEventName = 'sandpack-started';
const sandpackReadyEventName = 'sandpack-ready';

export default function SandpackObservability({ instance }: Props) {
  const { sandpack } = useSandpack();
  const { status: sandpackStatus } = sandpack;
  const loadingStartedRef = useRef(false);
  const readySentRef = useRef(false);
  const pingSentRef = useRef(false);
  const timeoutSentRef = useRef(false);

  useEffect(() => {
    if (pingSentRef.current) {
      return;
    }

    pingSentRef.current = true;
    pingSandpackBundler();
  }, []);

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
