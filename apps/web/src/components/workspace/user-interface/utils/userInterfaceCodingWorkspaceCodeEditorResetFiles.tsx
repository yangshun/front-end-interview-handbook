import type { SandpackFiles } from '@codesandbox/sandpack-react';

import { codingWorkspaceTabFileId } from '~/components/workspace/common/tabs/codingWorkspaceTabId';

import type { UserInterfaceCodingWorkspaceTabsType } from '../UserInterfaceCodingWorkspaceTypes';
import userInterfaceCodingWorkspaceNormalizeFilePaths from './userInterfaceCodingWorkspaceNormalizeSolutionFilePaths';

export type ResetUserInterfaceCodeEditorFilesProps = Readonly<{
  changeActiveFile: (tabId: UserInterfaceCodingWorkspaceTabsType) => void;
  closeFile: (tabId: UserInterfaceCodingWorkspaceTabsType) => void;
  openFile: (filePath: string) => void;
}>;

export default function userInterfaceCodingWorkspaceCodeEditorResetFiles({
  activeFile,
  changeActiveFile,
  closeFile,
  files,
  newFiles,
  openFile,
  updateWorkspace,
  visibleFiles,
}: {
  activeFile?: string;
  changeActiveFile: (tabId: UserInterfaceCodingWorkspaceTabsType) => void;
  closeFile: (tabId: UserInterfaceCodingWorkspaceTabsType) => void;
  files: SandpackFiles;
  newFiles: SandpackFiles;
  openFile: (filePath: string) => void;
  updateWorkspace: (
    props: Readonly<{
      activeFile?: string;
      updatedFiles: SandpackFiles;
      visibleFiles?: Array<string>;
    }>,
  ) => void;
  visibleFiles: Array<string>;
}) {
  const originalPaths = Object.keys(files);
  const updatedPaths = Object.keys(newFiles);

  const filePathsToClose = originalPaths.filter(
    (path) => !updatedPaths.includes(path),
  );

  const newVisibleMap = userInterfaceCodingWorkspaceNormalizeFilePaths(
    visibleFiles,
    updatedPaths,
  );
  const newActiveFile = newVisibleMap[activeFile ?? ''] ?? activeFile;
  const newVisibleFilePaths = Object.values(newVisibleMap);

  // Close removed files
  filePathsToClose.forEach((path) => {
    closeFile(codingWorkspaceTabFileId(path));
  });

  // Update the workspace data with the new files
  updateWorkspace({
    activeFile: newActiveFile,
    updatedFiles: newFiles,
    visibleFiles: newVisibleFilePaths,
  });

  // Open new files and set active tab
  setTimeout(() => {
    newVisibleFilePaths.forEach(openFile);
    if (newVisibleFilePaths.includes(newActiveFile)) {
      changeActiveFile(codingWorkspaceTabFileId(newActiveFile));
    }
  }, 0);
}
