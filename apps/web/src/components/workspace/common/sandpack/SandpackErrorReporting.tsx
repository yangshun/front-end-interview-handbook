import { useEffect, useRef } from 'react';
import url from 'url';

import sandpackProviderOptions from '~/components/workspace/common/sandpack/sandpackProviderOptions';

import logEvent from '~/logging/logEvent';
import { getErrorMessage } from '~/utils/getErrorMessage';

import { useSandpack } from '@codesandbox/sandpack-react';

type Props = Readonly<{
  // Identify which instance this happened. Should be unique within the page.
  instance?: string;
}>;

const pingURL = new URL(
  url.format({ pathname: 'version.txt' }),
  sandpackProviderOptions.bundlerURL,
);

async function pingSandpackBundler() {
  try {
    const response = await fetch(pingURL);
    const text = await response.text();

    logEvent('sandpack.reachable', {
      namespace: 'workspace',
      url: sandpackProviderOptions.bundlerURL,
      version: text,
    });
  } catch (error) {
    logEvent('sandpack.unreachable', {
      error: getErrorMessage(error),
      namespace: 'workspace',
      url: sandpackProviderOptions.bundlerURL,
    });
    console.error(getErrorMessage(error));
  }
}

export default function SandpackErrorReporting({ instance }: Props) {
  const { sandpack } = useSandpack();
  const { status: sandpackStatus } = sandpack;
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

  return null;
}
