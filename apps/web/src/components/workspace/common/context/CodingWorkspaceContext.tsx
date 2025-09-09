import type { SandpackFiles } from '@codesandbox/sandpack-react';
import type { ReactNode } from 'react';
import { createContext, useContext, useState } from 'react';

export type CodingWorkspaceTabContents<TabType extends string> = Readonly<
  Partial<
    Record<
      TabType,
      Readonly<{
        contents: ReactNode;
        icon?: (iconProps: React.ComponentProps<'svg'>) => JSX.Element;
        iconSecondary?: (iconProps: React.ComponentProps<'svg'>) => JSX.Element;
        label: string;
      }>
    >
  >
>;

type BaseContext = Readonly<{
  defaultFiles: SandpackFiles;
  deleteCodeFromLocalStorage: () => void;
  resetToDefaultCode: () => void;
}>;

type Props = Readonly<{
  children: ReactNode;
  loadedFilesFromLocalStorage?: boolean;
  value: BaseContext;
}>;

type AdditionalContext = Readonly<{
  setShowLoadedFilesFromLocalStorageMessage: (show: boolean) => void;
  showLoadedFilesFromLocalStorageMessage: boolean;
}>;

type ContextValue = AdditionalContext & BaseContext;

const CodingWorkspaceContext = createContext<ContextValue>({
  defaultFiles: {},
  deleteCodeFromLocalStorage: () => {},
  resetToDefaultCode: () => {},
  setShowLoadedFilesFromLocalStorageMessage: () => {},
  showLoadedFilesFromLocalStorageMessage: false,
});

CodingWorkspaceContext.displayName = 'CodingWorkspaceContext';

export function CodingWorkspaceProvider({
  children,
  loadedFilesFromLocalStorage = false,
  value,
}: Props) {
  const [
    showLoadedFilesFromLocalStorageMessage,
    setShowLoadedFilesFromLocalStorageMessage,
  ] = useState(loadedFilesFromLocalStorage);

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
        resetToDefaultCode,
        setShowLoadedFilesFromLocalStorageMessage,
        showLoadedFilesFromLocalStorageMessage,
      }}>
      {children}
    </CodingWorkspaceContext.Provider>
  );
}

export function useCodingWorkspaceContext() {
  return useContext(CodingWorkspaceContext);
}
