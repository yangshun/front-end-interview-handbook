import type { SandpackMessage } from '@codesandbox/sandpack-client';
import { useEffect, useState } from 'react';

type CodeSandboxStatus = 'compiling' | 'idle' | 'initialized' | 'initializing';

export default function useCodeSandboxStatus(): CodeSandboxStatus {
  const [status, setStatus] = useState<CodeSandboxStatus>('initializing');

  useEffect(() => {
    function onIframeEvents(event: MessageEvent) {
      if (event.data?.codesandbox) {
        const message = event.data as SandpackMessage;

        switch (message.type) {
          case 'status': {
            switch (message.status) {
              case 'initializing': {
                setStatus('initializing');

                return;
              }
              case 'installing-dependencies':
              case 'transpiling':
              case 'evaluating': {
                setStatus('compiling');

                return;
              }
              case 'idle': {
                setStatus('idle');

                return;
              }
            }

            return;
          }
        }
      }
    }

    window.addEventListener('message', onIframeEvents);

    return () => {
      window.removeEventListener('message', onIframeEvents);
    };
  }, []);

  return status;
}
