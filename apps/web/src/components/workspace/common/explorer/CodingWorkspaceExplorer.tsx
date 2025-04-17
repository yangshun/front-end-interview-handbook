import clsx from 'clsx';
import { cloneDeep } from 'lodash-es';
import { useMemo, useState } from 'react';
import { RiFileAddLine, RiFolderAddLine } from 'react-icons/ri';

import { DirectoryExplorerContext } from '~/components/common/directory-explorer/DirectoryExplorerContext';
import { ExplorerDirectory } from '~/components/common/directory-explorer/DirectoryExplorerItem';
import { useIntl } from '~/components/intl';

import type { FileExplorerDirectory, FileExplorerItem } from './types';
import {
  createDirectoriesFromFilePaths,
  getAllFilesInDirectory,
} from './utils';

import { useSandpack } from '@codesandbox/sandpack-react';

type Props = Readonly<{
  bottomAddOn?: React.ReactNode;
  onOpenFile?: (fileName: string, fromFilePath?: string) => void;
  readOnly?: boolean;
}>;

export default function CodingWorkspaceExplorer({
  bottomAddOn,
  readOnly = true,
  onOpenFile,
}: Props) {
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
  const { formatMessage } = useIntl();

  const { rootDirectory, directoryPaths } = useMemo(() => {
    return createDirectoriesFromFilePaths(Object.keys(files));
  }, [files]);

  const [openDirectories, setOpenDirectories] = useState(directoryPaths);
  const [renamingItem, setRenamingItem] = useState<string | null>(null);
  const [lastActiveDirectory, setLastActiveDirectory] = useState<string>('/');
  const [creatingNewItem, setCreatingNewItem] = useState<{
    path: string;
    type: 'directory' | 'file';
  } | null>(null);

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
    if (Object.prototype.hasOwnProperty.call(files, newPath)) {
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
    const pathSegments = fullPath.split('/').filter(Boolean);

    let currentItem: FileExplorerDirectory | FileExplorerItem | undefined =
      rootDirectory;

    for (const segment of pathSegments) {
      if (!currentItem) {
        break;
      }
      if (!currentItem.isDirectory) {
        currentItem = undefined;
        break;
      }

      const directoryItem: FileExplorerDirectory = currentItem; // Explicitly type directoryItem

      currentItem = directoryItem.contents[segment];
    }

    if (!currentItem) {
      console.error(`Item not found for deletion: ${fullPath}`);

      return;
    }

    const { isDirectory } = currentItem;
    const displayName = isDirectory ? `${currentItem.name}/` : currentItem.name;

    const shouldDelete = confirm(
      formatMessage(
        {
          defaultMessage:
            'Are you sure you want to delete {displayName}? {directoryWarning}',
          description:
            'Confirmation message shown when deleting a file or directory',
          id: 'IIE89R',
        },
        {
          directoryWarning: isDirectory
            ? formatMessage({
                defaultMessage: 'This will delete all its contents.',
                description: 'Warning message shown when deleting a directory',
                id: 'oxAf2V',
              })
            : '',
          displayName,
        },
      ),
    );

    if (!shouldDelete) {
      return;
    }

    if (isDirectory) {
      const directoryItem = currentItem as FileExplorerDirectory;
      const filesToDelete = getAllFilesInDirectory(directoryItem);

      filesToDelete.forEach((file) => {
        closeFile(file.fullPath);
        deleteFile(file.fullPath, true);
      });

      const affectedDirectories = Array.from(openDirectories.keys()).filter(
        (dirPath) => dirPath === fullPath || dirPath.startsWith(`${fullPath}/`),
      );

      if (affectedDirectories.length > 0) {
        const newOpenDirectories = new Set(openDirectories);

        affectedDirectories.forEach((dirPath) => {
          newOpenDirectories.delete(dirPath);
        });
        setOpenDirectories(newOpenDirectories);
      }

      const gitkeepPath = `${fullPath}/.gitkeep`;

      if (files[gitkeepPath]) {
        deleteFile(gitkeepPath, true);
      }
    } else {
      // It's a file
      closeFile(fullPath);
      deleteFile(fullPath);
    }

    if (renamingItem === fullPath) {
      setRenamingItem(null);
    }
    if (creatingNewItem?.path.startsWith(fullPath)) {
      setCreatingNewItem(null);
    }
    if (
      activeFile === fullPath ||
      (isDirectory && activeFile?.startsWith(`${fullPath}/`))
    ) {
      setActiveFile(
        visibleFiles.filter(
          (vf) =>
            vf !== activeFile &&
            !(isDirectory && vf.startsWith(`${fullPath}/`)),
        )[0] ?? null,
      );
    }
  };

  const handleCreateItem = (name: string): boolean => {
    if (!creatingNewItem) {
      return false;
    }

    const { type, path } = creatingNewItem;

    if (!name.trim()) {
      setCreatingNewItem(null);

      return false;
    }

    const newPath = `${path === '/' ? '' : path}/${name}`;

    if (type === 'file') {
      if (Object.prototype.hasOwnProperty.call(files, newPath)) {
        return false;
      }

      addFile(
        {
          [newPath]: {
            active: true,
            code: '',
            hidden: false,
          },
        },
        '',
        true,
      );
      openFile(newPath);
      setActiveFile(newPath);
    } else {
      if (directoryPaths.has(newPath)) {
        return false;
      }

      // You can't create an empty directory. This is a workaround to prevent that in sandpack.
      const gitkeepPath = `${newPath}/.gitkeep`;

      addFile(
        {
          [gitkeepPath]: {
            code: '',
            hidden: true,
          },
        },
        '',
        true,
      );

      // Open the newly created directory
      const newOpenDirectories = new Set(openDirectories);

      newOpenDirectories.add(newPath);
      setOpenDirectories(newOpenDirectories);
    }

    setCreatingNewItem(null);

    return true;
  };

  const explorerDirectory = useMemo(() => {
    if (!creatingNewItem) {
      return rootDirectory;
    }

    try {
      const modifiedDirectory = cloneDeep(rootDirectory);
      const pathSegments = creatingNewItem.path.split('/').filter(Boolean);
      let currentDir = modifiedDirectory;

      for (const segment of pathSegments) {
        if (!currentDir.contents[segment]) {
          break;
        }
        currentDir = currentDir.contents[segment] as FileExplorerDirectory;
      }

      const tempItem: FileExplorerItem =
        creatingNewItem.type === 'directory'
          ? ({
              contents: {},
              fullPath: `${creatingNewItem.path}/__new_item__`,
              isDirectory: true,
              name: '',
            } as FileExplorerDirectory)
          : {
              fullPath: `${creatingNewItem.path}/__new_item__`,
              isDirectory: false,
              name: '',
            };

      currentDir.contents.__new_item__ = tempItem;

      return modifiedDirectory;
    } catch (error) {
      // If there's any error in creating the modified directory,
      // reset the state and return the original
      setCreatingNewItem(null);

      return rootDirectory;
    }
  }, [rootDirectory, creatingNewItem]);

  return (
    <DirectoryExplorerContext.Provider
      value={{
        activeFile,
        cancelItemRename: () => {
          if (creatingNewItem) {
            setCreatingNewItem(null);
          } else {
            setRenamingItem(null);
          }
        },
        deleteItem: (fullPath) => {
          if (creatingNewItem) {
            return;
          }
          handleDelete(fullPath);
        },
        openDirectories,
        readOnly,
        renameItem: (item, newPath) => {
          if (item.fullPath.endsWith('__new_item__')) {
            return handleCreateItem(newPath.split('/').pop() || '');
          }
          if (creatingNewItem) {
            return false;
          }

          return handleRename(item, newPath);
        },
        renamingItem: creatingNewItem
          ? `${creatingNewItem.path}/__new_item__`
          : renamingItem,
        setActiveFile: (fullPath) => {
          if (creatingNewItem) {
            return;
          }
          openFile(fullPath);
          onOpenFile?.(fullPath);
          setActiveFile(fullPath);

          const pathSegments = fullPath.split('/').filter(Boolean);
          const directoryPath = '/' + pathSegments.slice(0, -1).join('/');

          setLastActiveDirectory(directoryPath === '/' ? '/' : directoryPath);
        },
        setDirectoryOpen: (fullPath, open) => {
          // Allow directory operations only if we're not creating a new item
          // or if this is the parent directory of the new item being created
          if (creatingNewItem && !fullPath.startsWith(creatingNewItem.path)) {
            return;
          }

          const newOpenDirectories = new Set(openDirectories);

          setLastActiveDirectory(fullPath);

          if (open) {
            newOpenDirectories.add(fullPath);
          } else {
            // Don't allow closing the parent directory while creating a new item
            if (creatingNewItem && fullPath === creatingNewItem.path) {
              return;
            }
            newOpenDirectories.delete(fullPath);
          }
          setOpenDirectories(newOpenDirectories);
        },
        startItemRename: (fullPath) => {
          if (!creatingNewItem) {
            setRenamingItem(fullPath);
          }
        },
      }}>
      <div
        className={clsx(
          'flex w-full grow flex-col gap-y-1',
          creatingNewItem && 'pointer-events-none',
        )}
        onClick={(e) => {
          if (e.target === e.currentTarget) {
            setLastActiveDirectory('/');
          }
        }}>
        {!readOnly && (
          <div
            className={clsx(
              'flex items-center opacity-100',
              'gap-2 px-2 py-1',
              'border-b border-neutral-800',
              'pointer-events-auto',
            )}>
            <button
              className={clsx(
                'rounded p-1 text-neutral-400',
                'hover:bg-neutral-700/50 hover:text-neutral-200',
                'disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-transparent',
              )}
              disabled={creatingNewItem !== null}
              title={formatMessage({
                defaultMessage: 'New File',
                description: 'Button tooltip for creating a new file',
                id: 'GPM7SF',
              })}
              type="button"
              onClick={() => {
                if (creatingNewItem) {
                  return;
                }

                const path = lastActiveDirectory;

                setCreatingNewItem({ path, type: 'file' });
                // Ensure the parent directory is open
                if (path !== '/') {
                  setOpenDirectories(
                    new Set([...Array.from(openDirectories), path]),
                  );
                }
              }}>
              <RiFileAddLine className="size-4" />
            </button>
            <button
              className={clsx(
                'rounded p-1 text-neutral-400',
                'hover:bg-neutral-700/50 hover:text-neutral-200',
                'disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-transparent',
              )}
              disabled={creatingNewItem !== null}
              title={formatMessage({
                defaultMessage: 'New Folder',
                description: 'Button tooltip for creating a new folder',
                id: 'YRi3wG',
              })}
              type="button"
              onClick={() => {
                if (creatingNewItem) {
                  return;
                }

                const path = lastActiveDirectory;

                setCreatingNewItem({ path, type: 'directory' });
                // Ensure the parent directory is open
                if (path !== '/') {
                  setOpenDirectories(
                    new Set([...Array.from(openDirectories), path]),
                  );
                }
              }}>
              <RiFolderAddLine className="size-4" />
            </button>
          </div>
        )}
        <div className="flex w-full flex-col">
          <ExplorerDirectory {...explorerDirectory} />
        </div>
        {bottomAddOn}
      </div>
    </DirectoryExplorerContext.Provider>
  );
}
