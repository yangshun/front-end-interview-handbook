import { useEffect, useRef } from 'react';

import logEvent from '~/logging/logEvent';

import { useSandpack } from '@codesandbox/sandpack-react';

type Props = Readonly<{
  // Identify which instance this happened. Should be unique within the page.
  instance?: string;
}>;

export default function SandpackTimeoutLogger({ instance }: Props) {
  const { sandpack } = useSandpack();
  const { status: sandpackStatus } = sandpack;
  const sentRef = useRef(false);

  useEffect(() => {
    if (sandpackStatus === 'timeout' && !sentRef.current) {
      logEvent('sandpack.timeout', {
        instance,
        namespace: 'general',
      });
      sentRef.current = true;
    }
  }, [instance, sandpackStatus]);

  return null;
}
