import type { SandpackFiles } from '@codesandbox/sandpack-react';
import type { ReactNode } from 'react';
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';

import logEvent from '~/logging/logEvent';

import CodingWorkspaceBottomBarEmitter from './CodingWorkspaceBottomBarEmitter';

export type CodingWorkspaceTabContents<TabType extends string> = Readonly<
  Partial<
    Record<
      TabType,
      Readonly<{
        contents: ReactNode;
        icon: (iconProps: React.ComponentProps<'svg'>) => JSX.Element;
        iconSecondary?: (iconProps: React.ComponentProps<'svg'>) => JSX.Element;
        label: string;
      }>
    >
  >
>;

type Status = 'idle' | 'loading' | 'running_tests' | 'submitting';

type BaseContext = Readonly<{
  defaultFiles: SandpackFiles;
  deleteCodeFromLocalStorage: () => void;
  openCommunitySolution?: (solutionId: string) => void;
  openFile?: (filePath: string, fromFilePath?: string) => void;
  openSubmission?: (submissionId: string) => void;
  resetToDefaultCode: () => void;
}>;

type Props = Readonly<{
  children: ReactNode;
  incrementAuthPoints?: () => boolean;
  loadedFilesFromLocalStorage?: boolean;
  value: BaseContext;
}>;

type AdditionalContext = Readonly<{
  executionComplete: () => void;
  runTests: () => void;
  setShowLoadedFilesFromLocalStorageMessage: (show: boolean) => void;
  showLoadedFilesFromLocalStorageMessage: boolean;
  status: Status;
  submit: () => void;
}>;

type ContextValue = AdditionalContext & BaseContext;

const CodingWorkspaceContext = createContext<ContextValue>({
  defaultFiles: {},
  deleteCodeFromLocalStorage: () => {},
  executionComplete: () => {},
  openCommunitySolution: () => {},
  openFile: () => {},
  openSubmission: () => {},
  resetToDefaultCode: () => {},
  runTests: () => {},
  setShowLoadedFilesFromLocalStorageMessage: () => {},
  showLoadedFilesFromLocalStorageMessage: false,
  status: 'idle',
  submit: () => {},
});

CodingWorkspaceContext.displayName = 'CodingWorkspaceContext';

const runTestsStartedEventName = 'workspace-run-tests-started';
const runTestsCompleteEventName = 'workspace-run-tests-complete';
const submitStartedEventName = 'workspace-submit-started';
const submitCompleteEventName = 'workspace-submit-complete';

export function CodingWorkspaceProvider({
  children,
  incrementAuthPoints,
  loadedFilesFromLocalStorage = false,
  value,
}: Props) {
  const [status, setStatus] = useState<Status>('idle');
  const lastExecutionMode = useRef<'submit' | 'test' | null>(null);
  const runTestsSequenceNumber = useRef(0);
  const submitSequenceNumber = useRef(0);
  const [
    showLoadedFilesFromLocalStorageMessage,
    setShowLoadedFilesFromLocalStorageMessage,
  ] = useState(loadedFilesFromLocalStorage);

  const runTests = useCallback(() => {
    const maxAuthPointsReached = incrementAuthPoints?.();

    if (maxAuthPointsReached) {
      return;
    }

    setStatus('running_tests');
    lastExecutionMode.current = 'test';
    runTestsSequenceNumber.current += 1;
    performance.mark(runTestsStartedEventName);
  }, [incrementAuthPoints]);

  const submit = useCallback(() => {
    const maxAuthPointsReached = incrementAuthPoints?.();

    if (maxAuthPointsReached) {
      return;
    }

    CodingWorkspaceBottomBarEmitter.emit('pause_timer');
    setStatus('submitting');
    lastExecutionMode.current = 'submit';
    submitSequenceNumber.current += 1;
    performance.mark(submitStartedEventName);
  }, [incrementAuthPoints]);

  useEffect(() => {
    if (status !== 'idle' || lastExecutionMode.current === null) {
      return;
    }

    if (lastExecutionMode.current === 'test') {
      performance.mark(runTestsCompleteEventName);

      const runTestsDuration = performance.measure(
        'run-tests-duration',
        runTestsStartedEventName,
        runTestsCompleteEventName,
      );

      logEvent('question.run.complete', {
        duration: Math.floor(runTestsDuration.duration),
        namespace: 'workspace',
        sequence: runTestsSequenceNumber.current,
      });
      lastExecutionMode.current = null;
    }

    if (lastExecutionMode.current === 'submit') {
      performance.mark(submitCompleteEventName);

      const submitDuration = performance.measure(
        'submit-duration',
        submitStartedEventName,
        submitCompleteEventName,
      );

      logEvent('question.submit.complete', {
        duration: Math.floor(submitDuration.duration),
        namespace: 'workspace',
        sequence: submitSequenceNumber.current,
      });
      lastExecutionMode.current = null;
    }
  }, [status]);

  const executionComplete = useCallback(() => {
    setStatus('idle');
  }, []);

  function deleteCodeFromLocalStorage() {
    setShowLoadedFilesFromLocalStorageMessage(false);
    value.deleteCodeFromLocalStorage();
  }

  function resetToDefaultCode() {
    deleteCodeFromLocalStorage();
    value.resetToDefaultCode();
  }

  return (
    <CodingWorkspaceContext.Provider
      value={{
        ...value,
        deleteCodeFromLocalStorage,
        executionComplete,
        resetToDefaultCode,
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

export function useCodingWorkspaceContext() {
  return useContext(CodingWorkspaceContext);
}
