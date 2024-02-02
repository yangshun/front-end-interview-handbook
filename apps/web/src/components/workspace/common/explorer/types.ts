import type { SandpackState } from '@codesandbox/sandpack-react';

export type SandpackBundlerFiles = SandpackState['files'];
export type SandpackBundlerFile = SandpackState['files'][string];

export type FileExplorerFile = {
  fullPath: string;
  isDirectory: false;
  name: string;
};

export type FileExplorerDirectory = {
  contents: Record<string, FileExplorerItem>;
  fullPath: string;
  isDirectory: true;
  name: string;
};

export type FileExplorerItem = FileExplorerDirectory | FileExplorerFile;
