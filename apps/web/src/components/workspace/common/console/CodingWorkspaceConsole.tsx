import { useCodingPreferences } from '~/components/global/CodingPreferencesProvider';
import JavaScriptConsole from '~/components/workspace/common/console/JavaScriptConsole';

import { useSandpackConsole } from '@codesandbox/sandpack-react';

export default function CodingWorkspaceConsole() {
  const { consoleShouldPreserveLogs, setConsoleShouldPreserveLogs } =
    useCodingPreferences();

  const { logs, reset } = useSandpackConsole({
    resetOnPreviewRestart: !consoleShouldPreserveLogs,
    showSyntaxError: false,
  });

  return (
    <JavaScriptConsole
      logs={logs}
      shouldPreserveLogs={consoleShouldPreserveLogs}
      onClear={reset}
      onShouldPreserveLogsChange={setConsoleShouldPreserveLogs}
    />
  );
}
