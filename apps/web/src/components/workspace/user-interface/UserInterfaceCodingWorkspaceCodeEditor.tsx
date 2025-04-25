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
import { useVimMode } from '~/components/workspace/common/editor/hooks/useVimMode';
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
  isViewingSave = false,
}: Readonly<{
  filePath: string;
  isViewingSave?: boolean;
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
  const { isVimModeEnabled } = useVimMode();
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

  if (files[filePath] == null) {
    return (
      <div className="size-full flex items-center justify-center">
        <Text color="subtle" size="body2">
          {intl.formatMessage({
            defaultMessage: 'This file has been deleted or renamed.',
            description:
              'Message shown when a file in the code editor no longer exists',
            id: 'M9GFCh',
          })}
        </Text>
      </div>
    );
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
          <Text className="flex gap-x-1" color="subtle" size="body3">
            <span className="flex items-center gap-x-1">
              <CodingWorkspaceTabIcons.versions.icon className="size-4" />{' '}
              {intl.formatMessage({
                defaultMessage: 'Version',
                description: 'Coding workspace saved code version',
                id: 'HYkgJI',
              })}
              {': '}
            </span>
            <Text color="active" size="body3" weight="medium">
              <button
                className="line-clamp-1 hover:underline"
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
          {intl.formatMessage({
            defaultMessage:
              'You are viewing the solution code. Changes will not be saved.',
            description: 'Coding workspace viewing solution code message',
            id: '2ttaph',
          })}
        </Banner>
      )}
      {isViewingSave && (
        <Banner size="xs" truncate={true} variant="primary">
          {intl.formatMessage({
            defaultMessage:
              'You are viewing save from a user. The modifications will not be persisted.',
            description: 'Coding workspace viewing solution code message',
            id: 'Rhsmgb',
          })}
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
        isVimModeEnabled={isVimModeEnabled}
        value={files[filePath].code}
        onChange={(val) => {
          updateFile(filePath, val ?? '');
        }}
        onFocus={onFocus}
      />
    </div>
  );
}
