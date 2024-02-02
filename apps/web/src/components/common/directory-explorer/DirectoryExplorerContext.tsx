import { createContext, useContext } from 'react';

import type { FileExplorerItem } from '~/components/workspace/common/explorer/types';

type MutatingCallbacks = Readonly<{
  cancelItemRename: () => void;
  deleteItem: (fullPath: string) => void;
  renameItem: (item: FileExplorerItem, newPath: string) => boolean;
  startItemRename: (fullPath: string) => void;
}>;

type NonReadonlyProps = MutatingCallbacks &
  Readonly<{
    readOnly: boolean;
    renamingItem: string | null;
  }>;

type ReadonlyProps = Partial<MutatingCallbacks> &
  Readonly<{
    readOnly: true;
    renamingItem: null;
  }>;

type DirectoryExplorerContextType = Readonly<
  {
    activeFile: string;
    openDirectories: Set<string>;
    setActiveFile: (fullPath: string) => void;
    setDirectoryOpen: (fullPath: string, open: boolean) => void;
  } & (NonReadonlyProps | ReadonlyProps)
>;

export const DirectoryExplorerContext =
  createContext<DirectoryExplorerContextType>({
    activeFile: '',
    cancelItemRename: () => {},
    deleteItem: () => {},
    openDirectories: new Set(),
    readOnly: true,
    renameItem: () => true,
    renamingItem: null,
    setActiveFile: () => {},
    setDirectoryOpen: () => {},
    startItemRename: () => {},
  });

export function useDirectoryExplorerContext() {
  return useContext(DirectoryExplorerContext);
}
