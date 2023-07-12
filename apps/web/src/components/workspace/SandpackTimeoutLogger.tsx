import { useSandpack } from '@codesandbox/sandpack-react';
import { useEffect, useRef } from 'react';
import logEvent from '~/logging/logEvent';

type Props = Readonly<{
  // Identify which instance this happened. Should be unique within the page.
  instance?: string;
}>;

export default function SandpackTimeoutLogger({ instance }: Props) {
  const { sandpack } = useSandpack();
  const { status: sandpackStatus } = sandpack;
  const sentRef = useRef(false);

  useEffect(() => {
    if (sandpack.status === 'timeout' && !sentRef.current) {
      logEvent('sandpack.timeout', {
        instance,
      });
      sentRef.current = true;
    }
  }, [sandpackStatus]);

  return null;
}
