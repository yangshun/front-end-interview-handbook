import { useRef } from 'react';

import { useCodingPreferences } from '~/components/global/CodingPreferencesProvider';

import { useSandpack, useSandpackConsole } from '@codesandbox/sandpack-react';

const reloadableErrors = [
  'ModuleNotFoundError', // Typically "Could not find module in path: 'react/cjs/react-jsx-runtime.development.js' relative to '/node_modules/react/jsx-runtime.js'"
  'ReferenceError: Babel is not defined',
];

/**
 * Sometimes when loading a UI question, intermittent network errors cause some deps to
 * fail to load. Refreshing will usually make it go away.
 *
 * We want to reload only once per unique error.
 *
 * Can be tested by blocking loading of certain deps in the network tab.
 */
export default function useSandpackModuleErrorRefreshBrowser() {
  const { consoleShouldPreserveLogs } = useCodingPreferences();

  const seenErrors = useRef<Set<string>>(new Set());

  const sb = useSandpack();
  const { logs } = useSandpackConsole({
    resetOnPreviewRestart: !consoleShouldPreserveLogs,
    showSyntaxError: false,
  });

  let refresh = false;

  logs.forEach((log) => {
    if (log.method !== 'error') {
      return;
    }

    log.data?.forEach((message) => {
      if (typeof message !== 'string') {
        return;
      }

      reloadableErrors.forEach((reloadableError) => {
        if (
          message.includes(reloadableError) &&
          !seenErrors.current.has(message)
        ) {
          seenErrors.current.add(message);
          refresh = true;
        }
      });
    });
  });

  if (refresh) {
    sb.dispatch({
      type: 'refresh',
    });
    refresh = false;
  }
}
