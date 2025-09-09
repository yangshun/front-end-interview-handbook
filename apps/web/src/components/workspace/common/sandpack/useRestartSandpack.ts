import { useSandpack } from '@codesandbox/sandpack-react';
import { useEffect } from 'react';

export default function useRestartSandpack() {
  const {
    sandpack: { runSandpack, status: sandpackStatus },
  } = useSandpack();

  // Restart sandpack automatically when it becomes idle.
  useEffect(() => {
    if (sandpackStatus === 'idle') {
      // Somehow must run in the next loop.
      setTimeout(() => {
        runSandpack();
      }, 0);
    }
  }, [sandpackStatus, runSandpack]);
}
