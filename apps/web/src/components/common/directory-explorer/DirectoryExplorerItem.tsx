import clsx from 'clsx';
import { sortBy } from 'lodash-es';
import type { PropsWithChildren, ReactNode } from 'react';
import { useMemo, useState } from 'react';
import {
  RiCloseLine,
  RiCodeLine,
  RiFolderFill,
  RiFolderOpenFill,
  RiPencilFill,
} from 'react-icons/ri';

import {
  themeBackgroundElementEmphasizedStateColor,
  themeTextBrandColor,
  themeTextBrandColor_Hover,
  themeTextSubtleColor,
} from '~/components/ui/theme';

import { codingWorkspaceExplorerFilePathToIcon } from '../../workspace/common/explorer/codingWorkspaceExplorerFilePathToIcon';
import type {
  FileExplorerDirectory,
  FileExplorerFile,
} from '../../workspace/common/explorer/types';
import { useDirectoryExplorerContext } from './DirectoryExplorerContext';

export type ExplorerItemProps = PropsWithChildren<{
  className?: string;
  icon?: ReactNode;
  indent?: number;
  isActive?: boolean;
  isRenaming: boolean;
  name: string;
  onClick?: () => void;
  onDelete?: () => void;
  onRename?: (name: string) => boolean;
  onRenameCancel?: () => void;
  onRenameStart?: () => void;
}>;

function ExplorerItem({
  children,
  className,
  icon,
  indent = -1,
  isActive = false,
  isRenaming,
  name,
  onClick,
  onDelete,
  onRename,
  onRenameCancel,
  onRenameStart,
}: ExplorerItemProps) {
  const [renameText, setRenameText] = useState(name);
  const { readOnly } = useDirectoryExplorerContext();

  return (
    <button
      className={clsx(
        'group flex items-center justify-start gap-2 truncate rounded text-sm',
        'py-1 pr-4',
        'shrink-0',
        isActive
          ? [themeTextBrandColor, themeBackgroundElementEmphasizedStateColor]
          : [themeTextSubtleColor, themeTextBrandColor_Hover],
        className,
      )}
      style={{ paddingLeft: 8 + indent * 12 }}
      type="button"
      onClick={(e) => {
        if (isRenaming) {
          e.preventDefault();

          return;
        }
        onClick?.();
      }}>
      {icon}
      <span className="flex-auto truncate text-start">
        {isRenaming ? (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              onRename?.(renameText);
              setRenameText(name);
            }}>
            <input
              autoFocus={true}
              className="bg-neutral-800"
              value={renameText}
              onBlur={(e) => {
                if (!onRename?.(renameText)) {
                  e.preventDefault();
                }
                setRenameText(name);
              }}
              onChange={(e) => {
                setRenameText(e.target.value);
              }}
              onKeyDown={(e) => {
                if (e.key === 'Escape') {
                  e.preventDefault();
                  onRenameCancel?.();
                  setRenameText(name);
                }
              }}
            />
          </form>
        ) : (
          children
        )}
      </span>
      {!isRenaming && !readOnly && (
        <div className="-mr-2 hidden gap-1 text-neutral-600 group-hover:flex">
          <RiPencilFill
            className="size-4 hover:text-neutral-500"
            onClick={(e) => {
              e.stopPropagation();
              onRenameStart?.();
            }}
          />
          <RiCloseLine
            className="size-4 hover:text-neutral-500"
            onClick={(e) => {
              e.stopPropagation();
              onDelete?.();
            }}
          />
        </div>
      )}
    </button>
  );
}

export type ExplorerPassdownProps = Readonly<{
  indent?: number;
}>;

export function ExplorerFile({
  fullPath,
  indent,
  isDirectory,
  name,
}: ExplorerPassdownProps & FileExplorerFile) {
  const file: FileExplorerFile = {
    fullPath,
    isDirectory,
    name,
  };
  const {
    activeFile,
    cancelItemRename,
    deleteItem,
    renameItem,
    renamingItem,
    setActiveFile,
    startItemRename,
  } = useDirectoryExplorerContext();

  const isRenaming = renamingItem === fullPath;
  const isActive = activeFile === fullPath;
  const Icon =
    codingWorkspaceExplorerFilePathToIcon(fullPath)?.icon ?? RiCodeLine;

  return (
    <ExplorerItem
      icon={<Icon className="size-4 flex-none" />}
      indent={indent}
      isActive={isActive}
      isRenaming={isRenaming}
      name={name}
      onClick={() => {
        setActiveFile(fullPath);
      }}
      onDelete={() => {
        deleteItem?.(fullPath);
      }}
      onRename={(newName) => {
        const folderName = fullPath.slice(0, fullPath.lastIndexOf('/'));

        return renameItem?.(file, folderName + '/' + newName) ?? false;
      }}
      onRenameCancel={cancelItemRename}
      onRenameStart={() => {
        startItemRename?.(fullPath);
      }}>
      <span className="truncate">{name}</span>
    </ExplorerItem>
  );
}

export function ExplorerDirectory({
  contents,
  fullPath,
  indent = -1,
  isDirectory,
  name,
}: ExplorerPassdownProps & FileExplorerDirectory) {
  const folder: FileExplorerDirectory = {
    contents,
    fullPath,
    isDirectory,
    name,
  };
  const {
    cancelItemRename,
    deleteItem,
    openDirectories,
    renameItem,
    renamingItem,
    setDirectoryOpen,
    startItemRename,
  } = useDirectoryExplorerContext();

  const isRenaming = renamingItem === fullPath;
  const isDirectoryOpen = openDirectories.has(fullPath);
  const FolderIcon = isDirectoryOpen ? RiFolderOpenFill : RiFolderFill;
  const itemProps = {
    indent: indent + 1,
  };

  const sortedFiles = useMemo(() => {
    return sortBy(
      sortBy(Object.entries(contents), ([key]) => key),
      ([_, file]) => !file.isDirectory,
    );
  }, [contents]);

  return (
    <>
      {fullPath !== '/' && (
        <ExplorerItem
          key={fullPath}
          className="text-neutral-500"
          icon={<FolderIcon className="flex-none" height={16} width={16} />}
          indent={indent}
          isRenaming={isRenaming}
          name={name}
          onClick={() => {
            setDirectoryOpen(fullPath, !isDirectoryOpen);
          }}
          onDelete={() => {
            deleteItem?.(fullPath);
          }}
          onRename={(newName) => {
            const folderName = fullPath.slice(0, fullPath.lastIndexOf('/'));

            return renameItem?.(folder, folderName + '/' + newName) ?? false;
          }}
          onRenameCancel={cancelItemRename}
          onRenameStart={() => {
            startItemRename?.(fullPath);
          }}>
          {name}
        </ExplorerItem>
      )}
      {isDirectoryOpen &&
        sortedFiles.map(([_, item]) =>
          item.isDirectory ? (
            <ExplorerDirectory key={item.fullPath} {...item} {...itemProps} />
          ) : (
            <ExplorerFile key={item.fullPath} {...item} {...itemProps} />
          ),
        )}
    </>
  );
}
