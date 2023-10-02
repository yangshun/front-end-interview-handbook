import type { ReactNode } from 'react';
import { useEffect } from 'react';
import { createContext, useCallback, useContext } from 'react';

import type {
  QuestionCodingWorkingLanguage,
  QuestionJavaScriptSkeleton,
  QuestionJavaScriptWorkspace,
} from '~/components/questions/common/QuestionsTypes';
import { saveJavaScriptQuestionCodeLocally } from '~/components/questions/editor/JavaScriptQuestionCodeStorage';

import { useCodingWorkspaceContext } from '../CodingWorkspaceContext';
import type { QuestionMetadata } from '../../questions/common/QuestionsTypes';

import { useSandpack } from '@codesandbox/sandpack-react';

type Context = Readonly<{
  language: QuestionCodingWorkingLanguage;
  resetFile: (filePath: string) => void;
  setLanguage: (language: QuestionCodingWorkingLanguage) => void;
  skeleton: QuestionJavaScriptSkeleton;
  workspace: QuestionJavaScriptWorkspace;
}>;

const JavaScriptCodingWorkspaceContext = createContext<Context>({
  language: 'js',
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
  metadata: QuestionMetadata;
  onLanguageChange: (language: QuestionCodingWorkingLanguage) => void;
  skeleton: QuestionJavaScriptSkeleton;
  workspace: QuestionJavaScriptWorkspace;
}>;

export function JavaScriptCodingWorkspaceContextProvider({
  children,
  metadata,
  skeleton,
  workspace,
  language,
  onLanguageChange,
}: Props) {
  const { deleteCodeFromLocalStorage } = useCodingWorkspaceContext();
  const { sandpack } = useSandpack();
  const { updateFile, resetFile, files } = sandpack;

  const mainFile = files[workspace.main];

  useEffect(() => {
    if (mainFile.code != null) {
      saveJavaScriptQuestionCodeLocally(metadata, language, mainFile.code);
    }
  }, [language, mainFile.code, metadata]);

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

  return (
    <JavaScriptCodingWorkspaceContext.Provider
      value={{
        language,
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
