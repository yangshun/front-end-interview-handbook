import { createContext, useContext, useMemo, useState } from 'react';

import { ExplorerDirectory } from './CodingExplorerItem';
import type { FileExplorerItem } from './types';
import { getAllFilesInDirectory, parseFiles } from './utils';

import { useSandpack } from '@codesandbox/sandpack-react';

type CodingFileExplorerContextType = Readonly<{
  activeFile: string;
  cancelItemRename: () => void;
  deleteItem: (fullPath: string) => void;
  openDirectories: Set<string>;
  renameItem: (item: FileExplorerItem, newPath: string) => boolean;
  renamingItem: string | null;
  setActiveFile: (fullPath: string) => void;
  setDirectoryOpen: (fullPath: string, open: boolean) => void;
  startItemRename: (fullPath: string) => void;
}>;

const CodingFileExplorerContext = createContext<CodingFileExplorerContextType>({
  activeFile: '',
  cancelItemRename: () => {},
  deleteItem: () => {},
  openDirectories: new Set(),
  renameItem: () => true,
  renamingItem: null,
  setActiveFile: () => {},
  setDirectoryOpen: () => {},
  startItemRename: () => {},
});

export function useCodingFileExplorerContext() {
  return useContext(CodingFileExplorerContext);
}

type Props = Readonly<{
  onOpenFile?: (fileName: string, fromFilePath?: string) => void;
}>;

export default function CodingFileExplorer({ onOpenFile }: Props) {
  const {
    sandpack: {
      files,
      setActiveFile,
      activeFile,
      addFile,
      openFile,
      closeFile,
      deleteFile,
      visibleFiles,
    },
  } = useSandpack();

  const { rootDirectory, directoryPaths } = useMemo(() => {
    return parseFiles(files);
  }, [files]);

  const [openDirectories, setOpenDirectories] = useState(directoryPaths);
  const [renamingItem, setRenamingItem] = useState<string | null>(null);

  const renameFile = (oldPath: string, newPath: string) => {
    const file = files[oldPath];

    addFile(
      {
        [newPath]: file,
      },
      file.code,
      true,
    );
    closeFile(oldPath);
    deleteFile(oldPath, true);
    if (visibleFiles.includes(oldPath)) {
      openFile(newPath);
    }
    if (activeFile === oldPath) {
      setActiveFile(newPath);
    }
  };

  const handleRename = (item: FileExplorerItem, newPath: string) => {
    const { isDirectory, fullPath: oldPath } = item;

    setRenamingItem(null);
    if (oldPath === newPath) {
      return true;
    }
    if (Object.hasOwn(files, newPath)) {
      return false;
    }
    if (isDirectory) {
      const affectedFiles = getAllFilesInDirectory(item);

      affectedFiles.forEach((file) => {
        const newFilePath = file.fullPath.replace(oldPath, newPath);

        renameFile(file.fullPath, newFilePath);
      });
      if (openDirectories.has(oldPath)) {
        const affectedDirectories = Array.from(openDirectories.keys()).filter(
          (directoryPath) => directoryPath.startsWith(oldPath),
        );
        const newOpenDirectories = new Set(openDirectories);

        affectedDirectories.forEach((oldDirectoryPath) => {
          newOpenDirectories.delete(oldDirectoryPath);
          newOpenDirectories.add(oldDirectoryPath.replace(oldPath, newPath));
        });
        setOpenDirectories(newOpenDirectories);
      }
    } else {
      renameFile(oldPath, newPath);
    }

    return true;
  };

  const handleDelete = (fullPath: string) => {
    const shouldDelete = confirm(
      `Are you sure you want to delete ${fullPath}?`,
    );

    if (!shouldDelete) {
      return;
    }

    closeFile(fullPath);
    deleteFile(fullPath);
  };

  return (
    <CodingFileExplorerContext.Provider
      value={{
        activeFile,
        cancelItemRename: () => {
          setRenamingItem(null);
        },
        deleteItem: handleDelete,
        openDirectories,
        renameItem: handleRename,
        renamingItem,
        setActiveFile: (fullPath) => {
          openFile(fullPath);
          onOpenFile?.(fullPath);
          setActiveFile(fullPath);
        },
        setDirectoryOpen: (fullPath, open) => {
          const newOpenDirectories = new Set(openDirectories);

          if (open) {
            newOpenDirectories.add(fullPath);
          } else {
            newOpenDirectories.delete(fullPath);
          }
          setOpenDirectories(newOpenDirectories);
        },
        startItemRename: (fullPath) => {
          setRenamingItem(fullPath);
        },
      }}>
      <div className="flex flex-col w-full">
        <ExplorerDirectory {...rootDirectory} indent={-1} />
      </div>
    </CodingFileExplorerContext.Provider>
  );
}
