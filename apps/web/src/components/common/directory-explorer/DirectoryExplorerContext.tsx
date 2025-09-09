import { createContext, useContext } from 'react';

type DirectoryExplorerContextType = Readonly<{
  activeFile: string;
  openDirectories: Set<string>;
  setActiveFile: (fullPath: string) => void;
  setDirectoryOpen: (fullPath: string, open: boolean) => void;
}>;

export const DirectoryExplorerContext =
  createContext<DirectoryExplorerContextType>({
    activeFile: '',
    openDirectories: new Set(),
    setActiveFile: () => {},
    setDirectoryOpen: () => {},
  });

export function useDirectoryExplorerContext() {
  return useContext(DirectoryExplorerContext);
}
