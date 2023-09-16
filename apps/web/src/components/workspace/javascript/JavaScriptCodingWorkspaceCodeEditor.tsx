import QuestionCodingWorkingLanguageSelect from '~/components/questions/content/QuestionCodingWorkingLanguageSelect';
import CodingWorkspaceEditorShortcutsButton from '~/components/questions/editor/CodingWorkspaceEditorShortcutsButton';
import CodingWorkspaceResetButton from '~/components/questions/editor/CodingWorkspaceResetButton';
import CodingWorkspaceThemeSelect from '~/components/questions/editor/CodingWorkspaceThemeSelect';

import { useJavaScriptCodingWorkspaceContext } from './JavaScriptCodingWorkspaceContext';
import MonacoCodeEditor from '../common/editor/MonacoCodeEditor';

import { useSandpack } from '@codesandbox/sandpack-react';

export default function JavaScriptCodingWorkspaceCodeEditor({
  filePath,
}: Readonly<{
  filePath: string;
}>) {
  const { resetFile, language, setLanguage } =
    useJavaScriptCodingWorkspaceContext();
  const { sandpack } = useSandpack();
  const { files, updateFile } = sandpack;

  return (
    <div className="flex w-full flex-col">
      <div className="flex items-center justify-between px-3 py-1.5">
        <QuestionCodingWorkingLanguageSelect
          value={language}
          onChange={setLanguage}
        />
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
