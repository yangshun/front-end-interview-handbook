import { useSandpack } from '@codesandbox/sandpack-react';
import { useEffect, useRef } from 'react';

import logEvent from '~/logging/logEvent';

type Props = Readonly<{
  instance: string;
  onTimeout: (instance: string) => void;
}>;

export function SandpackTimeout({ instance, onTimeout }: Props) {
  const timeoutSentRef = useRef(false);

  const { sandpack } = useSandpack();
  const { status: sandpackStatus } = sandpack;

  useEffect(() => {
    if (sandpackStatus === 'timeout' && !timeoutSentRef.current) {
      onTimeout(instance);
      logEvent('sandpack.timeout', {
        instance,
        namespace: 'workspace',
      });
      timeoutSentRef.current = true;
    }
  }, [instance, sandpackStatus, onTimeout]);

  return null;
}
