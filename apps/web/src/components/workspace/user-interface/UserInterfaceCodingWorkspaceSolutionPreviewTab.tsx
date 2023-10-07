import { useAppThemePreferences } from '~/components/global/dark/AppThemePreferencesProvider';
import type { QuestionUserInterfaceBundle } from '~/components/questions/common/QuestionsTypes';
import Banner from '~/components/ui/Banner';
import Text from '~/components/ui/Text';

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
    <div className="flex h-full w-full flex-col">
      <Banner size="sm">
        <Text display="block" size="body3">
          You're viewing a preview of the solution
        </Text>
      </Banner>
      <div className="flex h-0 grow">
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
    </div>
  );
}
