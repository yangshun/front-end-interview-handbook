import type { ReactNode } from 'react';
import { createContext, useCallback, useContext, useState } from 'react';

import type { QuestionBase } from '../questions/common/QuestionsTypes';
import { deleteLocalUserInterfaceQuestionCode } from '../questions/editor/userInterfaceQuestionCodeStorage';

import type { SandpackFiles } from '@codesandbox/sandpack-react/types';

export type CodingWorkspaceTabContents<Key extends string = string> = Readonly<
  Record<
    Key,
    Readonly<{
      contents: ReactNode;
      icon: (iconProps: React.ComponentProps<'svg'>) => JSX.Element;
      label: string;
    }>
  >
>;

type Status = 'idle' | 'loading' | 'running_tests' | 'submitting';

type BaseContext<T extends QuestionBase> = Readonly<{
  defaultFiles: SandpackFiles;
  deleteCodeFromLocalStorage: () => void;
  openFile?: (filePath: string, fromFilePath?: string) => void;
  question: T;
}>;

type Props<T extends QuestionBase> = Readonly<{
  children: ReactNode;
  loadedFilesFromLocalStorage?: boolean;
  value: BaseContext<T>;
}>;

type AdditionalContext = Readonly<{
  executionComplete: () => void;
  runTests: () => void;
  setShowLoadedFilesFromLocalStorageMessage: (show: boolean) => void;
  showLoadedFilesFromLocalStorageMessage: boolean;
  status: Status;
  submit: () => void;
}>;

type ContextValue<T extends QuestionBase> = AdditionalContext & BaseContext<T>;

const CodingWorkspaceContext = createContext<ContextValue<any>>({
  defaultFiles: {},
  deleteCodeFromLocalStorage: () => {},
  executionComplete: () => {},
  openFile: () => {},
  question: {},
  runTests: () => {},
  setShowLoadedFilesFromLocalStorageMessage: () => {},
  showLoadedFilesFromLocalStorageMessage: false,
  status: 'idle',
  submit: () => {},
});

CodingWorkspaceContext.displayName = 'CodingWorkspaceContext';

export function CodingWorkspaceProvider<T extends QuestionBase>({
  children,
  value,
  loadedFilesFromLocalStorage = false,
}: Props<T>) {
  const [status, setStatus] = useState<Status>('idle');
  const [
    showLoadedFilesFromLocalStorageMessage,
    setShowLoadedFilesFromLocalStorageMessage,
  ] = useState(loadedFilesFromLocalStorage);

  const runTests = useCallback(() => {
    setStatus('running_tests');
  }, []);

  const submit = useCallback(() => {
    setStatus('submitting');
  }, []);

  const executionComplete = useCallback(() => {
    setStatus('idle');
  }, []);

  return (
    <CodingWorkspaceContext.Provider
      value={{
        ...value,
        executionComplete,
        runTests,
        setShowLoadedFilesFromLocalStorageMessage,
        showLoadedFilesFromLocalStorageMessage,
        status,
        submit,
      }}>
      {children}
    </CodingWorkspaceContext.Provider>
  );
}

export function useCodingWorkspaceContext<T extends QuestionBase>() {
  const context = useContext(CodingWorkspaceContext);

  return context as ContextValue<T>;
}
