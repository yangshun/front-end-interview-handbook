'use client';

import { SandpackProvider } from '@codesandbox/sandpack-react';
import clsx from 'clsx';

import { useColorSchemePreferences } from '~/components/global/color-scheme/ColorSchemePreferencesProvider';
import type { QuestionUserInterfaceBundle } from '~/components/interviews/questions/common/QuestionsTypes';
import { useIntl } from '~/components/intl';
import Anchor from '~/components/ui/Anchor';
import Banner from '~/components/ui/Banner';

import UserInterfaceCodingWorkspacePreview from './UserInterfaceCodingWorkspacePreview';
import useUserInterfaceCodingWorkspaceTilesContext from './useUserInterfaceCodingWorkspaceTilesContext';
import SandpackObservability from '~/components/workspace/common/sandpack/SandpackObservability';
import { useSandpackBundlerURL } from '~/components/workspace/common/sandpack/useSandpackBundlerURL';

type Props = Readonly<{
  bundle: QuestionUserInterfaceBundle;
}>;

export default function UserInterfaceCodingWorkspaceSolutionPreviewTab({
  bundle,
}: Props) {
  const intl = useIntl();
  const { colorScheme } = useColorSchemePreferences();
  const bundlerURL = useSandpackBundlerURL();
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
            instance="workspace.ui.solution_preview"
            bundlerURL={bundlerURL}
          />
        </SandpackProvider>
      </div>
    </div>
  );
}
