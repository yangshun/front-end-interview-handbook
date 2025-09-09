import type { SandpackBundlerFiles } from '@codesandbox/sandpack-client';
import type { SandpackFiles } from '@codesandbox/sandpack-react';

export function codingWorkspaceConvertFilesToSandpackBundlerFiles(
  files: SandpackFiles,
): SandpackBundlerFiles {
  const convertedFiles: SandpackBundlerFiles = {};

  Object.entries(files).forEach(([filePath, fileContent]) => {
    if (typeof fileContent === 'string') {
      convertedFiles[filePath] = {
        code: fileContent,
      };
    } else {
      convertedFiles[filePath] = fileContent;
    }
  });

  return convertedFiles;
}

export function codingWorkspaceConvertFilesToSandpackFiles(
  files: SandpackBundlerFiles,
): SandpackFiles {
  const convertedFiles: SandpackFiles = {};

  Object.entries(files).forEach(([filePath, fileContent]) => {
    convertedFiles[filePath] = {
      code: fileContent.code,
    };
  });

  return convertedFiles;
}
