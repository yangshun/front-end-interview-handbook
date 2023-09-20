import clsx from 'clsx';
import { useIntl } from 'react-intl';
import { useIsMounted } from 'usehooks-ts';

import QuestionCodingWorkingLanguageSelect from '~/components/questions/content/QuestionCodingWorkingLanguageSelect';
import CodingWorkspaceEditorShortcutsButton from '~/components/questions/editor/CodingWorkspaceEditorShortcutsButton';
import CodingWorkspaceResetButton from '~/components/questions/editor/CodingWorkspaceResetButton';
import CodingWorkspaceThemeSelect from '~/components/questions/editor/CodingWorkspaceThemeSelect';
import { themeLineColor } from '~/components/ui/theme';

import { useJavaScriptCodingWorkspaceContext } from './JavaScriptCodingWorkspaceContext';
import { useCodingWorkspaceContext } from '../CodingWorkspaceContext';
import CodingWorkspaceLoadedFilesBanner from '../common/editor/CodingWorkspaceLoadedFilesBanner';
import MonacoCodeEditor from '../common/editor/MonacoCodeEditor';

import { useSandpack } from '@codesandbox/sandpack-react';

export default function JavaScriptCodingWorkspaceCodeEditor({
  filePath,
}: Readonly<{
  filePath: string;
}>) {
  const {
    showLoadedFilesFromLocalStorageMessage,
    setShowLoadedFilesFromLocalStorageMessage,
  } = useCodingWorkspaceContext();
  const { resetFile, language, setLanguage, workspace } =
    useJavaScriptCodingWorkspaceContext();
  const { sandpack } = useSandpack();
  const intl = useIntl();
  const isMounted = useIsMounted();

  const { files, updateFile } = sandpack;
  const isMainFile = filePath === workspace.main;

  function resetCode() {
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
    resetFile(filePath);
  }

  return (
    <div className={clsx('flex w-full flex-col')}>
      <div
        className={clsx(
          'flex items-center justify-between gap-x-2 px-3 py-1.5',
          ['border-b', themeLineColor],
        )}>
        <div>
          {isMainFile && (
            <QuestionCodingWorkingLanguageSelect
              value={language}
              onChange={setLanguage}
            />
          )}
        </div>
        <div className="-mr-2 flex items-center gap-x-1.5">
          <CodingWorkspaceThemeSelect />
          <CodingWorkspaceEditorShortcutsButton />
          <CodingWorkspaceResetButton onClick={resetCode} />
        </div>
      </div>
      {isMainFile && showLoadedFilesFromLocalStorageMessage && isMounted() && (
        <CodingWorkspaceLoadedFilesBanner
          onHide={() => {
            setShowLoadedFilesFromLocalStorageMessage(false);
          }}
          onResetToDefaultCode={resetCode}
        />
      )}
      <MonacoCodeEditor
        filePath={filePath}
        value={files[filePath].code}
        onChange={(val) => {
          updateFile(filePath, val ?? '');
        }}
      />
    </div>
  );
}
