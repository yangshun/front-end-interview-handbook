import type { SandpackBundlerFiles } from '@codesandbox/sandpack-client';
import type { SandpackFiles } from '@codesandbox/sandpack-react';
import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

type CurrentOpenSolutionType = {
  attemptId?: string;
  files: SandpackFiles;
  name: string;
} | null;

export type SolutionState = {
  currentOpenedSolution: CurrentOpenSolutionType;
  hasUnsavedSolutionChanges: boolean;
};

export const initialSolutionState: SolutionState = {
  currentOpenedSolution: null,
  hasUnsavedSolutionChanges: false,
};

export const solutionSlice = createSlice({
  initialState: initialSolutionState,
  name: 'solution',
  reducers: {
    onUpdateSolutionCode: (
      state,
      action: PayloadAction<SandpackBundlerFiles>,
    ) => {
      if (!state.currentOpenedSolution) {
        return;
      }

      const updatedFiles = action.payload;
      const solutionFiles = state.currentOpenedSolution.files;
      const isChanged = Object.keys(solutionFiles).some((path) =>
        typeof solutionFiles[path] === 'string'
          ? updatedFiles[path].code.trim() !== solutionFiles[path].trim()
          : updatedFiles[path].code.trim() !== solutionFiles[path].code.trim(),
      );

      state.hasUnsavedSolutionChanges = isChanged;
    },
    resetHasUnsavedSolutionChanges: (state) => {
      state.hasUnsavedSolutionChanges = false;
    },
    updateCurrentOpenedSolution: (
      state,
      action: PayloadAction<CurrentOpenSolutionType>,
    ) => {
      state.hasUnsavedSolutionChanges = false;
      state.currentOpenedSolution = action.payload;
    },
  },
});

export const {
  onUpdateSolutionCode,
  resetHasUnsavedSolutionChanges,
  updateCurrentOpenedSolution,
} = solutionSlice.actions;

export default solutionSlice.reducer;
