import type { ReactNode } from 'react';
import { createContext, useCallback, useContext } from 'react';

import type { QuestionCodingWorkingLanguage } from '~/components/questions/common/QuestionsTypes';

import useCodingWorkspaceWorkingLanguage from '../common/useCodingWorkspaceWorkingLanguage';

import { useSandpack } from '@codesandbox/sandpack-react';

export type JavaScriptCodingWorkspaceConfig = Readonly<{
  main: string;
  run: string;
  submit: string;
}>;

export type JavaScriptCodingSkeleton = Record<
  QuestionCodingWorkingLanguage,
  string
>;

export type QuestionJavaScriptV2 = Readonly<{
  files: Record<string, string>;
  skeleton: JavaScriptCodingSkeleton;
  workspace: JavaScriptCodingWorkspaceConfig;
}>;

type Context = Readonly<{
  language: QuestionCodingWorkingLanguage;
  resetAllFiles: () => void;
  resetFile: (filePath: string) => void;
  setLanguage: (language: QuestionCodingWorkingLanguage) => void;
  skeleton: JavaScriptCodingSkeleton;
  workspace: JavaScriptCodingWorkspaceConfig;
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
  skeleton: JavaScriptCodingSkeleton;
  workspace: JavaScriptCodingWorkspaceConfig;
}>;

export function JavaScriptCodingWorkspaceContextProvider({
  children,
  skeleton,
  workspace,
}: Props) {
  const { sandpack } = useSandpack();
  const { updateFile, resetFile } = sandpack;
  const [language, setLanguage] = useCodingWorkspaceWorkingLanguage();

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
    resetFile(workspace.run);
  }, [resetFile, resetFileCustom, workspace.run, workspace.main]);

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
