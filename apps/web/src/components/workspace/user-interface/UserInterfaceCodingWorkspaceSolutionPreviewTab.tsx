'use client';

import { SandpackProvider } from '@codesandbox/sandpack-react';
import clsx from 'clsx';

import { useColorSchemePreferences } from '~/components/global/color-scheme/ColorSchemePreferencesProvider';
import type { QuestionUserInterfaceBundle } from '~/components/interviews/questions/common/QuestionsTypes';
import { useIntl } from '~/components/intl';
import Anchor from '~/components/ui/Anchor';
import Banner from '~/components/ui/Banner';

import sandpackProviderOptions from '../common/sandpack/sandpackProviderOptions';
import UserInterfaceCodingWorkspacePreview from './UserInterfaceCodingWorkspacePreview';
import useUserInterfaceCodingWorkspaceTilesContext from './useUserInterfaceCodingWorkspaceTilesContext';

type Props = Readonly<{
  bundle: QuestionUserInterfaceBundle;
}>;

export default function UserInterfaceCodingWorkspaceSolutionPreviewTab({
  bundle,
}: Props) {
  const intl = useIntl();
  const { colorScheme } = useColorSchemePreferences();
  const { workspace, files } = bundle;
  const { dispatch, getTabById } =
    useUserInterfaceCodingWorkspaceTilesContext();

  return (
    <div className="size-full flex flex-col">
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
