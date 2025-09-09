import { useSandpack } from '@codesandbox/sandpack-react';
import { useEffect } from 'react';

import { useCodingWorkspaceSelector } from '../store/hooks';

export default function useCodingWorkspaceSyncSandpackFiles() {
  const files = useCodingWorkspaceSelector(
    (state) => state.sandpack.current.files,
  );
  const { sandpack } = useSandpack();
  const { deleteFile, files: sandpackFiles, updateFile } = sandpack;
  const removedFiles = Object.keys(sandpackFiles).filter(
    (filePath) => !files[filePath],
  );

  useEffect(() => {
    updateFile(files);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [files]);
  useEffect(() => {
    removedFiles.forEach((filePath) => {
      deleteFile(filePath);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [removedFiles]);
}
