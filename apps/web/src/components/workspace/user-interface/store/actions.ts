import type { SandpackFiles } from '@codesandbox/sandpack-react';

import {
  codingWorkspaceConvertFilesToSandpackBundlerFiles,
  codingWorkspaceConvertFilesToSandpackFiles,
} from '~/components/workspace/common/codingWorkspaceConvertFiles';
import {
  replaceCurrentFileState,
  updateFile,
} from '~/components/workspace/common/store/sandpack-slice';
import { codingWorkspaceTabFileId } from '~/components/workspace/common/tabs/codingWorkspaceTabId';

import { saveUserInterfaceQuestionCodeLocally } from '../UserInterfaceCodingWorkspaceCodeStorage';
import userInterfaceCodingWorkspaceNormalizeFilePaths from '../userInterfaceCodingWorkspaceNormalizeSolutionFilePaths';
import type { UserInterfaceCodingWorkspaceTabsType } from '../UserInterfaceCodingWorkspaceTypes';
import type { UserInterfaceCodingWorkspaceThunk } from './user-interface-store';

export const resetUserInterfaceCodingWorkspaceFile =
  (filePath: string): UserInterfaceCodingWorkspaceThunk =>
  (dispatch, getState) => {
    const { question } = getState().workspace;
    const currentFiles = getState().sandpack.current.files;
    const defaultFiles = getState().sandpack.default.files;
    const { currentOpenedSolution } = getState().solution;
    const updatedFileCode = currentOpenedSolution
      ? currentOpenedSolution.files[filePath]
      : defaultFiles[filePath];
    const updatedFiles = {
      ...currentFiles,
      [filePath]: {
        code:
          typeof updatedFileCode === 'string'
            ? updatedFileCode
            : updatedFileCode.code,
      },
    };
    const sandpackUpdatedFiles =
      codingWorkspaceConvertFilesToSandpackFiles(updatedFiles);

    if (!currentOpenedSolution) {
      saveUserInterfaceQuestionCodeLocally(question, sandpackUpdatedFiles);
    }

    dispatch(updateFile({ files: sandpackUpdatedFiles }));
  };

export const replaceUserInterfaceCodeEditorContents =
  ({
    changeActiveFile,
    closeFile,
    newFiles,
    openFile,
  }: {
    changeActiveFile: (tabId: UserInterfaceCodingWorkspaceTabsType) => void;
    closeFile: (tabId: UserInterfaceCodingWorkspaceTabsType) => void;
    newFiles: SandpackFiles;
    openFile: (filePath: string) => void;
  }): UserInterfaceCodingWorkspaceThunk =>
  (dispatch, getState) => {
    const { activeFile, files, visibleFiles } = getState().sandpack.current;
    const originalPaths = Object.keys(files);
    const updatedPaths = Object.keys(newFiles);

    const newVisibleMap = userInterfaceCodingWorkspaceNormalizeFilePaths(
      visibleFiles,
      updatedPaths,
    );
    const newActiveFile = newVisibleMap[activeFile] ?? activeFile;
    const newVisibleFiles = Object.values(newVisibleMap);

    const filePathsToClose = originalPaths.filter(
      (path) => !updatedPaths.includes(path),
    );

    // Close removed files
    filePathsToClose.forEach((path) => {
      closeFile(codingWorkspaceTabFileId(path));
    });

    // Update the current sandpack state
    dispatch(
      replaceCurrentFileState({
        activeFile: newActiveFile,
        files: codingWorkspaceConvertFilesToSandpackBundlerFiles(newFiles),
        visibleFiles: newVisibleFiles,
      }),
    );

    // Open new files and set active tab
    newVisibleFiles.forEach((path) => openFile(path));
    if (newVisibleFiles.includes(newActiveFile)) {
      changeActiveFile(codingWorkspaceTabFileId(newActiveFile));
    }
  };
