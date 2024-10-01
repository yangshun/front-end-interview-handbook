import clsx from 'clsx';
import { useCallback } from 'react';
import { RiFolder3Line } from 'react-icons/ri';
import { useIsMounted } from 'usehooks-ts';

import { useIntl } from '~/components/intl';
import Banner from '~/components/ui/Banner';
import Button from '~/components/ui/Button';
import Text from '~/components/ui/Text';
import { themeBorderColor } from '~/components/ui/theme';
import CodingWorkspaceEditorShortcutsButton from '~/components/workspace/common/editor/CodingWorkspaceEditorShortcutsButton';
import CodingWorkspaceResetButton from '~/components/workspace/common/editor/CodingWorkspaceResetButton';
import CodingWorkspaceThemeSelect from '~/components/workspace/common/editor/CodingWorkspaceThemeSelect';
import MonacoCodeEditor from '~/components/workspace/common/editor/MonacoCodeEditor';

import { useUserInterfaceCodingWorkspaceSavesContext } from './UserInterfaceCodingWorkspaceSaveContext';
import useUserInterfaceCodingWorkspaceTilesContext from './useUserInterfaceCodingWorkspaceTilesContext';
import { useCodingWorkspaceContext } from '../common/CodingWorkspaceContext';
import { CodingWorkspaceTabIcons } from '../common/CodingWorkspaceTabIcons';
import CodingWorkspaceLoadedFilesBanner from '../common/editor/CodingWorkspaceLoadedFilesBanner';

import { useSandpack } from '@codesandbox/sandpack-react';

export default function UserInterfaceCodingWorkspaceCodeEditor({
  filePath,
  showNotSavedBanner,
}: Readonly<{
  filePath: string;
  showNotSavedBanner: boolean;
}>) {
  const { sandpack } = useSandpack();
  const intl = useIntl();
  const { files, updateFile, setActiveFile } = sandpack;
  const { save } = useUserInterfaceCodingWorkspaceSavesContext();
  const { dispatch } = useUserInterfaceCodingWorkspaceTilesContext();
  const {
    defaultFiles,
    showLoadedFilesFromLocalStorageMessage,
    setShowLoadedFilesFromLocalStorageMessage,
    resetToDefaultCode,
  } = useCodingWorkspaceContext();
  const isMounted = useIsMounted();

  const onFocus = useCallback(() => {
    setActiveFile(filePath);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filePath]);

  function reset() {
    const shouldDiscard = window.confirm(
      intl.formatMessage({
        defaultMessage: 'Your existing code will be discarded, are you sure?',
        description:
          'Text on browser confirmation pop-up when user attempts to use the reset button to reset their code',
        id: '8aQEL8',
      }),
    );

    if (!shouldDiscard) {
      return;
    }

    resetToDefaultCode();
  }

  return (
    <div className={clsx('flex w-full flex-col')}>
      <div
        className={clsx(
          'flex items-center justify-between gap-x-2 px-3 py-1.5',
          ['border-b', themeBorderColor],
        )}>
        {save == null ? (
          <div className="-ml-1">
            <Button
              icon={RiFolder3Line}
              isLabelHidden={true}
              label="File explorer"
              size="xs"
              tooltip="File explorer"
              variant="tertiary"
              onClick={() => {
                dispatch({
                  payload: {
                    tabId: 'file_explorer',
                  },
                  type: 'tab-set-active',
                });
              }}
            />
          </div>
        ) : (
          <Text
            className="flex gap-x-1 whitespace-nowrap"
            color="subtle"
            size="body3">
            <span className="flex items-center gap-x-1">
              <CodingWorkspaceTabIcons.versions.icon className="size-4" />{' '}
              Version:{' '}
            </span>
            <Text color="active" size="body3" weight="medium">
              <button
                className="hover:underline"
                type="button"
                onClick={() => {
                  dispatch({
                    payload: {
                      tabId: 'versions',
                    },
                    type: 'tab-set-active',
                  });
                }}>
                {save.name}
              </button>
            </Text>
          </Text>
        )}
        <div className="-mr-2 flex items-center gap-x-1.5">
          <CodingWorkspaceThemeSelect />
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

              setShowLoadedFilesFromLocalStorageMessage(false);

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
          You are viewing the solution code. Changes will not be saved.
        </Banner>
      )}
      {showLoadedFilesFromLocalStorageMessage && isMounted() && (
        <CodingWorkspaceLoadedFilesBanner
          onHide={() => {
            setShowLoadedFilesFromLocalStorageMessage(false);
          }}
          onResetToDefaultCode={reset}
        />
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
