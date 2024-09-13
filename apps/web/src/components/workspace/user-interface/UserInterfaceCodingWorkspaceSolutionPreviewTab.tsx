import clsx from 'clsx';

import { useColorSchemePreferences } from '~/components/global/color-scheme/ColorSchemePreferencesProvider';
import type { QuestionUserInterfaceBundle } from '~/components/interviews/questions/common/QuestionsTypes';
import Anchor from '~/components/ui/Anchor';
import Banner from '~/components/ui/Banner';

import UserInterfaceCodingWorkspacePreview from './UserInterfaceCodingWorkspacePreview';
import useUserInterfaceCodingWorkspaceTilesContext from './useUserInterfaceCodingWorkspaceTilesContext';
import sandpackProviderOptions from '../common/sandpack/sandpackProviderOptions';

import { SandpackProvider } from '@codesandbox/sandpack-react';

type Props = Readonly<{
  bundle: QuestionUserInterfaceBundle;
}>;

export default function UserInterfaceCodingWorkspaceSolutionPreviewTab({
  bundle,
}: Props) {
  const { colorScheme } = useColorSchemePreferences();
  const { workspace, files } = bundle;
  const { dispatch, getTabById } =
    useUserInterfaceCodingWorkspaceTilesContext();

  return (
    <div className="size-full flex flex-col">
      <Banner size="xs" variant="primary">
        This is a preview of the solution.{' '}
        <Anchor
          className="underline"
          href="#"
          variant="unstyled"
          onClick={(event) => {
            event.preventDefault();
            dispatch({
              payload: {
                tabId: 'solution_preview',
              },
              type: 'tab-close',
            });
            dispatch({
              payload: {
                tabId: getTabById('description')!.tabId,
              },
              type: 'tab-set-active',
            });
          }}>
          Close and return to description
        </Anchor>
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
              'sp-wrapper': clsx(
                '!w-full !h-full !text-sm flex-1',
                // Needed to disable iframe from interfering with resizing.
                'pointer-events-inherit',
              ),
            },
          }}
          theme={colorScheme === 'dark' ? 'dark' : undefined}>
          <UserInterfaceCodingWorkspacePreview />
        </SandpackProvider>
      </div>
    </div>
  );
}
