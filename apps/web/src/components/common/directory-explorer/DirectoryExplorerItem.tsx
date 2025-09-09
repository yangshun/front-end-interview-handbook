import clsx from 'clsx';
import { sortBy } from 'lodash-es';
import type { PropsWithChildren, ReactNode } from 'react';
import { useMemo } from 'react';
import { PiFolderFill, PiFolderOpenFill } from 'react-icons/pi';
import { RiCodeLine } from 'react-icons/ri';

import {
  themeTextColor,
  themeTextColor_Hover,
  themeTextSecondaryColor,
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
  onClick?: () => void;
}>;

function ExplorerItem({
  children,
  className,
  icon,
  indent = -1,
  isActive = false,
  onClick,
}: ExplorerItemProps) {
  return (
    <button
      className={clsx(
        'group flex items-center justify-start gap-1 truncate rounded text-xs font-medium',
        'px-2 py-1.5',
        'shrink-0',
        isActive
          ? themeTextColor
          : [themeTextSecondaryColor, themeTextColor_Hover],
        className,
      )}
      style={{ marginLeft: indent * 16 }}
      type="button"
      onClick={onClick}>
      {icon}
      <span className="flex-auto truncate text-start">{children}</span>
    </button>
  );
}

export type ExplorerPassdownProps = Readonly<{
  indent?: number;
}>;

export function ExplorerFile({
  fullPath,
  indent,
  name,
}: ExplorerPassdownProps & FileExplorerFile) {
  const { activeFile, setActiveFile } = useDirectoryExplorerContext();

  const isActive = activeFile === fullPath;
  const Icon =
    codingWorkspaceExplorerFilePathToIcon(fullPath)?.icon ?? RiCodeLine;

  return (
    <ExplorerItem
      icon={<Icon className="size-4 flex-none" />}
      indent={indent}
      isActive={isActive}
      onClick={() => {
        setActiveFile(fullPath);
      }}>
      <span className="truncate">{name}</span>
    </ExplorerItem>
  );
}

export function ExplorerDirectory({
  contents,
  fullPath,
  indent = -1,
  name,
}: ExplorerPassdownProps & FileExplorerDirectory) {
  const { openDirectories, setDirectoryOpen } = useDirectoryExplorerContext();

  const isDirectoryOpen = openDirectories.has(fullPath);
  const FolderIcon = isDirectoryOpen ? PiFolderOpenFill : PiFolderFill;
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
          icon={<FolderIcon className="flex-none" height={16} width={16} />}
          indent={indent}
          onClick={() => {
            setDirectoryOpen(fullPath, !isDirectoryOpen);
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
