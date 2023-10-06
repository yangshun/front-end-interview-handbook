import { useAppThemePreferences } from '~/components/global/dark/AppThemePreferencesProvider';
import type { QuestionUserInterfaceBundle } from '~/components/questions/common/QuestionsTypes';

import sandpackProviderOptions from '../common/sandpack/sandpackProviderOptions';

import { SandpackPreview, SandpackProvider } from '@codesandbox/sandpack-react';

type Props = Readonly<{
  bundle: QuestionUserInterfaceBundle;
}>;

export default function UserInterfaceCodingWorkspaceSolutionPreviewTab({
  bundle,
}: Props) {
  const { appTheme } = useAppThemePreferences();
  const { workspace, files } = bundle;

  return (
    <div className="h-full w-full">
      <SandpackProvider
        customSetup={{
          environment: workspace?.environment,
        }}
        files={files}
        options={{
          ...sandpackProviderOptions,
          classes: {
            'sp-input': 'touch-none select-none pointer-events-none',
            'sp-layout': 'h-full',
            'sp-stack': 'h-full',
            'sp-wrapper': '!w-full !h-full !text-sm flex-1',
          },
        }}
        theme={appTheme === 'dark' ? 'dark' : undefined}>
        <SandpackPreview showNavigator={true} showOpenInCodeSandbox={false} />
      </SandpackProvider>
    </div>
  );
}
