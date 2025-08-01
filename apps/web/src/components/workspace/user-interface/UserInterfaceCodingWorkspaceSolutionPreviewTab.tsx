'use client';

import { SandpackProvider } from '@codesandbox/sandpack-react';
import clsx from 'clsx';

import { useColorSchemePreferences } from '~/components/global/color-scheme/ColorSchemePreferencesProvider';
import type { QuestionUserInterfaceBundle } from '~/components/interviews/questions/common/QuestionsTypes';
import { useIntl } from '~/components/intl';
import Anchor from '~/components/ui/Anchor';
import Banner from '~/components/ui/Banner';
import SandpackObservability from '~/components/workspace/common/sandpack/SandpackObservability';
import { useSandpackBundlerURL } from '~/components/workspace/common/sandpack/useSandpackBundlerURL';

import UserInterfaceCodingWorkspacePreview from './UserInterfaceCodingWorkspacePreview';
import useUserInterfaceCodingWorkspaceTilesContext from './useUserInterfaceCodingWorkspaceTilesContext';

type Props = Readonly<{
  bundle: QuestionUserInterfaceBundle;
}>;

const sandpackO11yInstance = 'workspace.ui.solution_preview';

export default function UserInterfaceCodingWorkspaceSolutionPreviewTab({
  bundle,
}: Props) {
  const intl = useIntl();
  const { colorScheme } = useColorSchemePreferences();
  const bundlerURL = useSandpackBundlerURL(sandpackO11yInstance);
  const { dispatch, getTabById } =
    useUserInterfaceCodingWorkspaceTilesContext();

  const { files, workspace } = bundle;

  return (
    <div className="flex size-full flex-col">
      <Banner size="xs" variant="primary">
        {intl.formatMessage({
          defaultMessage: 'This is a preview of the solution.',
          description: 'Coding workspace solution preview banner',
          id: 'GyoQO7',
        })}{' '}
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
          {intl.formatMessage({
            defaultMessage: 'Close and return to description',
            description: 'Coding workspace solution preview close button',
            id: 'Ee50Lt',
          })}
        </Anchor>
      </Banner>
      <div className="flex h-0 grow">
        <SandpackProvider
          // Remount if the bundler URL changes
          key={bundlerURL}
          customSetup={{
            environment: workspace?.environment,
          }}
          files={files}
          options={{
            bundlerURL,
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
          <SandpackObservability
            bundlerURL={bundlerURL}
            instance={sandpackO11yInstance}
          />
        </SandpackProvider>
      </div>
    </div>
  );
}
