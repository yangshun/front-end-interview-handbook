import { useCodingPreferences } from '~/components/global/CodingPreferencesProvider';
import JavaScriptConsole from '~/components/questions/devtools/JavaScriptConsole';

import { useSandpackConsole } from '@codesandbox/sandpack-react';

type Props = Readonly<{
  showExplicitInvocationMessage?: boolean;
}>;

export default function CodingWorkspaceConsole({
  showExplicitInvocationMessage,
}: Props) {
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
      showExplicitInvocationMessage={showExplicitInvocationMessage}
      onClear={reset}
      onShouldPreserveLogsChange={setConsoleShouldPreserveLogs}
    />
  );
}
