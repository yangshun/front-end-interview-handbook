import { useSandpack } from '@codesandbox/sandpack-react';
import type { ReactNode } from 'react';
import { useEffect } from 'react';
import { createContext, useCallback, useContext } from 'react';

import type {
  QuestionCodingWorkingLanguage,
  QuestionJavaScriptSkeleton,
  QuestionJavaScriptWorkspace,
} from '~/components/interviews/questions/common/QuestionsTypes';
import { saveJavaScriptQuestionCodeLocally } from '~/components/workspace/javascript/JavaScriptCodingWorkspaceCodeStorage';

import type { InterviewsQuestionMetadata } from '../../interviews/questions/common/QuestionsTypes';
import { useCodingWorkspaceContext } from '../common/CodingWorkspaceContext';

type Context = Readonly<{
  language: QuestionCodingWorkingLanguage;
  mainFileCode: string;
  replaceMainEditorContents: ((code: string) => void) | null;
  resetFile: (filePath: string) => void;
  setLanguage: (language: QuestionCodingWorkingLanguage) => void;
  skeleton: QuestionJavaScriptSkeleton;
  workspace: QuestionJavaScriptWorkspace;
}>;

const JavaScriptCodingWorkspaceContext = createContext<Context>({
  language: 'js',
  mainFileCode: '',
  replaceMainEditorContents: null,
  resetFile: () => {},
  setLanguage: () => {},
  skeleton: { js: '', ts: '' },
  workspace: {
    main: '',
    run: '',
    submit: '',
  },
});

JavaScriptCodingWorkspaceContext.displayName =
  'JavaScriptCodingWorkspaceContext';

type Props = Readonly<{
  children: ReactNode;
  language: QuestionCodingWorkingLanguage;
  metadata: InterviewsQuestionMetadata;
  onLanguageChange: (language: QuestionCodingWorkingLanguage) => void;
  skeleton: QuestionJavaScriptSkeleton;
  workspace: QuestionJavaScriptWorkspace;
}>;

export function JavaScriptCodingWorkspaceContextProvider({
  children,
  language,
  metadata,
  onLanguageChange,
  skeleton,
  workspace,
}: Props) {
  const { deleteCodeFromLocalStorage } = useCodingWorkspaceContext();
  const { sandpack } = useSandpack();
  const { files, resetFile, updateFile } = sandpack;

  const mainFile = files[workspace.main];
  const mainFileCode = mainFile.code;

  useEffect(() => {
    if (mainFileCode != null) {
      saveJavaScriptQuestionCodeLocally(metadata, language, mainFileCode);
    }
  }, [language, mainFileCode, metadata]);

  const resetFileCustom = useCallback(
    (filePath: string) => {
      if (filePath === workspace.main) {
        deleteCodeFromLocalStorage();

        return updateFile(filePath, skeleton[language]);
      }

      resetFile(filePath);
    },
    [
      workspace.main,
      resetFile,
      deleteCodeFromLocalStorage,
      updateFile,
      skeleton,
      language,
    ],
  );

  function replaceMainEditorContents(code: string) {
    updateFile(workspace.main, code);
  }

  return (
    <JavaScriptCodingWorkspaceContext.Provider
      value={{
        language,
        mainFileCode,
        replaceMainEditorContents,
        resetFile: resetFileCustom,
        setLanguage: onLanguageChange,
        skeleton,
        workspace,
      }}>
      {children}
    </JavaScriptCodingWorkspaceContext.Provider>
  );
}

export function useJavaScriptCodingWorkspaceContext() {
  return useContext(JavaScriptCodingWorkspaceContext);
}
