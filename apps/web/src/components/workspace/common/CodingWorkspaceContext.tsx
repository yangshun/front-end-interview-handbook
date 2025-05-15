import type { SandpackFiles } from '@codesandbox/sandpack-react';
import type { ReactNode } from 'react';
import { createContext, useCallback, useContext, useState } from 'react';

import { useAuthPointOnActions } from '~/components/auth/auth-points';

import CodingWorkspaceBottomBarEmitter from './CodingWorkspaceBottomBarEmitter';

export type CodingWorkspaceTabContents<TabType extends string> = Readonly<
  Partial<Record<TabType, Readonly<{
      contents: ReactNode;
      icon: (iconProps: React.ComponentProps<'svg'>) => JSX.Element;
      iconSecondary?: (iconProps: React.ComponentProps<'svg'>) => JSX.Element;
      label: string;
    }>>>
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
  embed?: boolean;
  loadedFilesFromLocalStorage?: boolean;
  metadata?: Readonly<{
    slug: string;
  }>;
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

export function CodingWorkspaceProvider({
  children,
  value,
  loadedFilesFromLocalStorage = false,
  embed,
  metadata,
}: Props) {
  const { increaseAuthPoints } = useAuthPointOnActions({
    showAuthSignupDialogOnMaxPoints: !embed,
  });
  const [status, setStatus] = useState<Status>('idle');
  const [
    showLoadedFilesFromLocalStorageMessage,
    setShowLoadedFilesFromLocalStorageMessage,
  ] = useState(loadedFilesFromLocalStorage);

  const runTests = useCallback(() => {
    if (metadata?.slug) {
      const { maxAuthPointsReached } = increaseAuthPoints(
        'coding',
        metadata.slug,
      );

      if (maxAuthPointsReached) {
        return;
      }
    }
    setStatus('running_tests');
  }, [increaseAuthPoints, metadata?.slug]);

  const submit = useCallback(() => {
    if (metadata?.slug) {
      const { maxAuthPointsReached } = increaseAuthPoints(
        'coding',
        metadata.slug,
      );

      if (maxAuthPointsReached) {
        return;
      }
    }
    CodingWorkspaceBottomBarEmitter.emit('pause_timer');
    setStatus('submitting');
  }, [increaseAuthPoints, metadata?.slug]);

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
