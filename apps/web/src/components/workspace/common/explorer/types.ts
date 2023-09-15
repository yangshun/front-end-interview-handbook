import type { SandpackBundlerFile } from '@codesandbox/sandpack-client';

export type { SandpackBundlerFile } from '@codesandbox/sandpack-client';
import type { SandpackState } from '@codesandbox/sandpack-react';

export type FileExplorerFile = {
  fullPath: string;
  isDirectory: false;
  name: string;
  sandpackFile: SandpackBundlerFile;
};

export type FileExplorerDirectory = {
  contents: Record<string, FileExplorerItem>;
  fullPath: string;
  isDirectory: true;
  name: string;
};

export type FileExplorerItem = FileExplorerDirectory | FileExplorerFile;

export type SandpackBundlerFiles = SandpackState['files'];
