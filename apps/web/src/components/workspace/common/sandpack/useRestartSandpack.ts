import { useEffect } from 'react';

import { useSandpack } from '@codesandbox/sandpack-react';

export default function useRestartSandpack() {
  const { sandpack } = useSandpack();

  // Restart sandpack automatically when it becomes idle.
  useEffect(() => {
    if (sandpack.status === 'idle') {
      // Somehow must run in the next loop.
      setTimeout(() => {
        sandpack.runSandpack();
      }, 0);
    }
  }, [sandpack]);
}
