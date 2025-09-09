import type { SandpackFiles } from '@codesandbox/sandpack-react';
import { useMemo, useState } from 'react';

import { DirectoryExplorerContext } from '~/components/common/directory-explorer/DirectoryExplorerContext';
import { ExplorerDirectory } from '~/components/common/directory-explorer/DirectoryExplorerItem';

import { createDirectoriesFromFilePaths } from './utils';

type Props = Readonly<{
  activeFile: string;
  bottomAddOn?: React.ReactNode;
  files: SandpackFiles;
  onOpenFile?: (fileName: string, fromFilePath?: string) => void;
}>;

export default function CodingWorkspaceExplorer({
  activeFile,
  bottomAddOn,
  files,
  onOpenFile,
}: Props) {
  const { directoryPaths, rootDirectory } = useMemo(() => {
    return createDirectoriesFromFilePaths(Object.keys(files));
  }, [files]);

  const [openDirectories, setOpenDirectories] = useState(directoryPaths);

  return (
    <DirectoryExplorerContext.Provider
      value={{
        activeFile,
        openDirectories,
        setActiveFile: (fullPath) => {
          onOpenFile?.(fullPath);
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
      }}>
      <div className="flex w-full grow flex-col justify-between gap-y-3 p-1">
        <div className="flex w-full flex-col">
          <ExplorerDirectory {...rootDirectory} />
        </div>
        {bottomAddOn}
      </div>
    </DirectoryExplorerContext.Provider>
  );
}
