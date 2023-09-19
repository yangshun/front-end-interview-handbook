import clsx from 'clsx';
import { useCallback } from 'react';
import { RiFolder3Line } from 'react-icons/ri';
import { FormattedMessage, useIntl } from 'react-intl';
import { useIsMounted } from 'usehooks-ts';

import CodingWorkspaceEditorShortcutsButton from '~/components/questions/editor/CodingWorkspaceEditorShortcutsButton';
import CodingWorkspaceResetButton from '~/components/questions/editor/CodingWorkspaceResetButton';
import CodingWorkspaceThemeSelect from '~/components/questions/editor/CodingWorkspaceThemeSelect';
import { deleteLocalUserInterfaceQuestionCode } from '~/components/questions/editor/userInterfaceQuestionCodeStorage';
import Anchor from '~/components/ui/Anchor';
import Banner from '~/components/ui/Banner';
import Button from '~/components/ui/Button';
import Text from '~/components/ui/Text';
import { themeDivideColor } from '~/components/ui/theme';
import MonacoCodeEditor from '~/components/workspace/common/editor/MonacoCodeEditor';

import { useTilesContext } from '~/react-tiling/state/useTilesContext';

import { useCodingWorkspaceContext } from '../CodingWorkspaceContext';

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
  const { files, updateFile, setActiveFile, resetFile, resetAllFiles } =
    sandpack;
  const { dispatch } = useTilesContext();
  const {
    showLoadedFilesFromLocalStorageMessage,
    setShowLoadedFilesFromLocalStorageMessage,
    deleteCodeFromLocalStorage,
  } = useCodingWorkspaceContext();
  const isMounted = useIsMounted();

  const onFocus = useCallback(() => {
    setActiveFile(filePath);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filePath]);

  function resetToDefaultCode() {
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

    setShowLoadedFilesFromLocalStorageMessage(false);
    resetAllFiles();
    deleteCodeFromLocalStorage();
  }

  return (
    <div
      className={clsx('flex w-full flex-col', ['divide-y', themeDivideColor])}>
      <div className="flex items-center justify-between gap-x-2 px-3 py-1.5">
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
        <div className="-mr-2 flex items-center gap-x-1.5">
          <CodingWorkspaceThemeSelect />
          <CodingWorkspaceEditorShortcutsButton />
          <CodingWorkspaceResetButton
            onClick={() => {
              if (!confirm('Reset code to original? Changes will be lost!')) {
                return;
              }
              resetFile(filePath);
            }}
          />
        </div>
      </div>
      {showNotSavedBanner && (
        <Banner size="xs" variant="primary">
          You are viewing the solution code. Changes will not be saved.
        </Banner>
      )}
      {showLoadedFilesFromLocalStorageMessage && isMounted() && (
        <Banner
          size="xs"
          variant="primary"
          onHide={() => {
            setShowLoadedFilesFromLocalStorageMessage(false);
          }}>
          <FormattedMessage
            defaultMessage="Your previous code was restored. <link>Reset to default</link>"
            description="Message that appears under the coding workspace when user has previously worked on this problem and we restored their code"
            id="0Vl72x"
            values={{
              link: (chunks) => (
                <Anchor
                  className="text-neutral-100 underline"
                  href="#"
                  variant="unstyled"
                  onClick={() => {
                    resetToDefaultCode();
                  }}>
                  {chunks}
                </Anchor>
              ),
            }}
          />
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
