import type { SandpackBundlerFiles } from '@codesandbox/sandpack-client';
import type { SandpackFiles } from '@codesandbox/sandpack-react';
import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

import { codingWorkspaceConvertFilesToSandpackBundlerFiles } from '../codingWorkspaceConvertFiles';

type FileState = Readonly<{
  activeFile: string;
  files: SandpackBundlerFiles;
  visibleFiles: Array<string>;
}>;

export type SandpackState = Readonly<{
  current: FileState;
  default: FileState;
}>;

export const sandpackInitialState: SandpackState = {
  current: {
    activeFile: '',
    files: {},
    visibleFiles: [],
  },
  default: {
    activeFile: '',
    files: {},
    visibleFiles: [],
  },
};

export const sandpackSlice = createSlice({
  initialState: sandpackInitialState,
  name: 'sandpack',
  reducers: {
    initializeSandpack: (
      state,
      action: PayloadAction<{
        current: FileState;
        default: FileState;
      }>,
    ) => {
      state.current = action.payload.current;
      state.default = action.payload.default;
    },
    replaceCurrentFileState: (state, action: PayloadAction<FileState>) => {
      state.current = action.payload;
    },
    resetFile: (state, action: PayloadAction<string>) => {
      const path = action.payload;

      state.current.files[path] = state.default.files[path];
    },
    updateActiveFile: (state, action: PayloadAction<string>) => {
      state.current.activeFile = action.payload;
    },
    updateFile: (
      state,
      action: PayloadAction<
        | {
            content: string;
            path: string;
          }
        | {
            files: SandpackFiles;
          }
      >,
    ) => {
      if ('files' in action.payload) {
        state.current.files = {
          ...state.current.files,
          ...codingWorkspaceConvertFilesToSandpackBundlerFiles(
            action.payload.files,
          ),
        };

        return;
      }

      const { content, path } = action.payload;

      state.current.files[path] = {
        code: content,
      };
    },
  },
});

export const {
  initializeSandpack,
  replaceCurrentFileState,
  resetFile,
  updateActiveFile,
  updateFile,
} = sandpackSlice.actions;

export default sandpackSlice.reducer;
