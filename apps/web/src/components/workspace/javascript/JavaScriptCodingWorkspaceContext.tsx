import type { ReactNode } from 'react';
import { useEffect } from 'react';
import { createContext, useCallback, useContext } from 'react';

import type {
  QuestionCodingWorkingLanguage,
  QuestionJavaScriptSkeleton,
  QuestionJavaScriptWorkspace,
} from '~/components/questions/common/QuestionsTypes';
import useJavaScriptQuestionCode from '~/components/questions/editor/useJavaScriptQuestionCode';

import useCodingWorkspaceWorkingLanguage from '../common/useCodingWorkspaceWorkingLanguage';
import type { QuestionMetadata } from '../../questions/common/QuestionsTypes';

import { useSandpack } from '@codesandbox/sandpack-react';

export type QuestionJavaScriptV2 = Readonly<{
  files: Record<string, string>;
  skeleton: QuestionJavaScriptSkeleton;
  workspace: QuestionJavaScriptWorkspace;
}>;

type Context = Readonly<{
  language: QuestionCodingWorkingLanguage;
  resetAllFiles: () => void;
  resetFile: (filePath: string) => void;
  setLanguage: (language: QuestionCodingWorkingLanguage) => void;
  skeleton: QuestionJavaScriptSkeleton;
  workspace: QuestionJavaScriptWorkspace;
}>;

const JavaScriptCodingWorkspaceContext = createContext<Context>({
  language: 'js',
  resetAllFiles: () => {},
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
  metadata: QuestionMetadata;
  skeleton: QuestionJavaScriptSkeleton;
  workspace: QuestionJavaScriptWorkspace;
}>;

export function JavaScriptCodingWorkspaceContextProvider({
  children,
  metadata,
  skeleton,
  workspace,
}: Props) {
  const { sandpack } = useSandpack();
  const { updateFile, resetFile, files } = sandpack;
  const [language, setLanguage] = useCodingWorkspaceWorkingLanguage();

  const { saveCode, deleteCodeFromClientStorage } = useJavaScriptQuestionCode(
    metadata,
    language,
    skeleton,
  );

  const mainFile = files[workspace.main];

  useEffect(() => {
    if (mainFile.code != null) {
      saveCode(mainFile.code);
    }
  }, [mainFile.code, saveCode]);

  const resetFileCustom = useCallback(
    (filePath: string) => {
      if (filePath === workspace.main) {
        return updateFile(filePath, skeleton[language]);
      }

      resetFile(filePath);
    },
    [language, resetFile, workspace.main, skeleton, updateFile],
  );

  const resetAllFiles = useCallback(() => {
    resetFileCustom(workspace.main);
    resetFileCustom(workspace.run);
    deleteCodeFromClientStorage();
  }, [
    resetFileCustom,
    workspace.main,
    workspace.run,
    deleteCodeFromClientStorage,
  ]);

  return (
    <JavaScriptCodingWorkspaceContext.Provider
      value={{
        language,
        resetAllFiles,
        resetFile: resetFileCustom,
        setLanguage,
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
