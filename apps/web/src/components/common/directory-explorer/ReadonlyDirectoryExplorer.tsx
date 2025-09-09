import { useEffect, useMemo, useState } from 'react';

import { DirectoryExplorerContext } from '~/components/common/directory-explorer/DirectoryExplorerContext';
import { ExplorerDirectory } from '~/components/common/directory-explorer/DirectoryExplorerItem';
import { createDirectoriesFromFilePaths } from '~/components/workspace/common/explorer/utils';

type Props = Readonly<{
  activeFile: string;
  filePaths: Array<string>;
  onActiveFileChange?: (fileName: string) => void;
}>;

export default function ReadonlyDirectoryExplorer({
  activeFile,
  filePaths,
  onActiveFileChange,
}: Props) {
  const { rootDirectory } = useMemo(() => {
    return createDirectoriesFromFilePaths(filePaths);
  }, [filePaths]);

  const [openDirectories, setOpenDirectories] = useState(
    new Set<string>(rootDirectory.fullPath),
  );

  useEffect(() => {
    setOpenDirectories(new Set<string>(rootDirectory.fullPath));
  }, [rootDirectory.fullPath]);

  return (
    <DirectoryExplorerContext.Provider
      value={{
        activeFile,
        openDirectories,
        setActiveFile: (fullPath) => {
          onActiveFileChange?.(fullPath);
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
      <ExplorerDirectory {...rootDirectory} />
    </DirectoryExplorerContext.Provider>
  );
}
