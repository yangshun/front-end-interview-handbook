import { useSandpackConsole } from '@codesandbox/sandpack-react';

import { useCodingPreferences } from '~/components/global/CodingPreferencesProvider';
import JavaScriptConsole from '~/components/workspace/common/console/JavaScriptConsole';

export default function CodingWorkspaceConsole() {
  const { consoleShouldPreserveLogs, setConsoleShouldPreserveLogs } =
    useCodingPreferences();

  const { logs, reset } = useSandpackConsole({
    resetOnPreviewRestart: !consoleShouldPreserveLogs,
    showSyntaxError: false,
  });

  return (
    <JavaScriptConsole
      // In some cases, logs returns non-log values as well, filter out only the logs
      // log values contains method property in it
      logs={logs.filter((log) => !!log.method)}
      shouldPreserveLogs={consoleShouldPreserveLogs}
      onClear={reset}
      onShouldPreserveLogsChange={setConsoleShouldPreserveLogs}
    />
  );
}
