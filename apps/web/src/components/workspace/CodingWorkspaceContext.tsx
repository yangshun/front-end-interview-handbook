import type { ReactNode } from 'react';
import { createContext, useCallback, useContext, useState } from 'react';

export type CodingWorkspaceTabContents = Readonly<
  Record<
    string,
    Readonly<{
      contents: ReactNode;
      icon: (iconProps: React.ComponentProps<'svg'>) => JSX.Element;
      label: string;
    }>
  >
>;

type Status = 'idle' | 'loading' | 'running_tests' | 'submitting';

type BaseContext = Readonly<{
  defaultFiles: Record<string, string>;
  openFile?: (filePath: string, fromFilePath?: string) => void;
}>;

type AdditionalContext = Readonly<{
  executionComplete: () => void;
  runTests: () => void;
  status: Status;
  submit: () => void;
}>;

type Context = AdditionalContext & BaseContext;

const CodingWorkspaceContext = createContext<Context>({
  defaultFiles: {},
  executionComplete: () => {},
  openFile: () => {},
  runTests: () => {},
  status: 'idle',
  submit: () => {},
});

CodingWorkspaceContext.displayName = 'CodingWorkspaceContext';

export function CodingWorkspaceProvider({
  children,
  value,
}: Readonly<{
  children: ReactNode;
  value: BaseContext;
}>) {
  const [status, setStatus] = useState<Status>('idle');

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
