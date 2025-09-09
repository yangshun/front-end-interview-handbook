import { useSandpack } from '@codesandbox/sandpack-react';
import clsx from 'clsx';
import { useCallback } from 'react';
import { RiFolder3Line } from 'react-icons/ri';

import { useIntl } from '~/components/intl';
import Banner from '~/components/ui/Banner';
import Button from '~/components/ui/Button';
import { themeBorderColor } from '~/components/ui/theme';
import { useCodingWorkspaceContext } from '~/components/workspace/common/context/CodingWorkspaceContext';
import CodingWorkspaceEditorShortcutsButton from '~/components/workspace/common/editor/CodingWorkspaceEditorShortcutsButton';
import CodingWorkspaceResetButton from '~/components/workspace/common/editor/CodingWorkspaceResetButton';
import CodingWorkspaceThemeSelect from '~/components/workspace/common/editor/CodingWorkspaceThemeSelect';
import MonacoCodeEditor from '~/components/workspace/common/editor/MonacoCodeEditor';
import useUserInterfaceCodingWorkspaceTilesContext from '~/components/workspace/user-interface/hooks/useUserInterfaceCodingWorkspaceTilesContext';

export default function ProjectsUserInterfaceCodingWorkspaceCodeEditor({
  filePath,
  showNotSavedBanner,
}: Readonly<{
  filePath: string;
  showNotSavedBanner: boolean;
}>) {
  const {
    sandpack: { files, setActiveFile, updateFile },
  } = useSandpack();
  const intl = useIntl();
  const { defaultFiles } = useCodingWorkspaceContext();
  const { tilesDispatch } = useUserInterfaceCodingWorkspaceTilesContext();

  const onFocus = useCallback(() => {
    setActiveFile(filePath);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filePath]);

  return (
    <div className={clsx('flex w-full flex-col')}>
      <div
        className={clsx(
          'flex items-center justify-between gap-x-2 px-3 py-1.5',
          ['border-b', themeBorderColor],
        )}>
        <div className="-ml-1">
          <Button
            icon={RiFolder3Line}
            isLabelHidden={true}
            label={intl.formatMessage({
              defaultMessage: 'File explorer',
              description: 'Coding workspace file explorer label',
              id: '7hMBWU',
            })}
            size="xs"
            tooltip={intl.formatMessage({
              defaultMessage: 'File explorer',
              description: 'Coding workspace file explorer label',
              id: '7hMBWU',
            })}
            variant="tertiary"
            onClick={() => {
              tilesDispatch({
                payload: {
                  tabId: 'file_explorer',
                },
                type: 'tab-set-active',
              });
            }}
          />
        </div>
        <div className="-mr-2 flex items-center gap-x-1.5">
          <CodingWorkspaceThemeSelect isLabelHidden={true} />
          <CodingWorkspaceEditorShortcutsButton />
          <CodingWorkspaceResetButton
            onClick={() => {
              if (
                !confirm(
                  intl.formatMessage({
                    defaultMessage:
                      'Your existing code will be discarded, are you sure?',
                    description:
                      'Text on browser confirmation pop-up when user attempts to use the reset button to reset their code',
                    id: '8aQEL8',
                  }),
                )
              ) {
                return;
              }

              if (defaultFiles[filePath] == null) {
                return;
              }

              const defaultFile = defaultFiles[filePath];

              if (typeof defaultFile === 'string') {
                updateFile(filePath, defaultFile);

                return;
              }

              updateFile(filePath, defaultFile?.code);
            }}
          />
        </div>
      </div>
      {showNotSavedBanner && (
        <Banner size="xs" truncate={true} variant="primary">
          {intl.formatMessage({
            defaultMessage:
              'You are viewing the solution code. Changes will not be saved.',
            description: 'Coding workspace viewing solution code message',
            id: '2ttaph',
          })}
        </Banner>
      )}
      <MonacoCodeEditor
        filePath={filePath}
        value={files[filePath].code}
        onChange={(val) => {
          updateFile(filePath, val ?? '');
        }}
        onFocus={onFocus}
      />
    </div>
  );
}
