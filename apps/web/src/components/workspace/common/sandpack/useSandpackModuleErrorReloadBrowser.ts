import { useRef } from 'react';

import { useCodingPreferences } from '~/components/global/CodingPreferencesProvider';

import { useSandpack, useSandpackConsole } from '@codesandbox/sandpack-react';

export default function useSandpackModuleErrorReloadBrowser() {
  const { consoleShouldPreserveLogs } = useCodingPreferences();
  const hasReloaded = useRef<boolean>(false);
  const sb = useSandpack();
  const { logs } = useSandpackConsole({
    resetOnPreviewRestart: !consoleShouldPreserveLogs,
    showSyntaxError: false,
  });

  if (hasReloaded.current) {
    return;
  }

  // Sometimes when loading a UI question, there's an error `react/cjs/react-jsx-runtime.development.js`
  // failed to load and refreshing will make it go away (probably race condition).
  if (
    logs.find(
      (log) =>
        log.method === 'error' &&
        log.data?.find(
          (message) =>
            typeof message === 'string' &&
            message.includes('ModuleNotFoundError'),
        ),
    )
  ) {
    sb.dispatch({
      type: 'refresh',
    });
    hasReloaded.current = true;
  }
}
