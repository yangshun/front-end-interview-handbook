import type { SandpackBundlerFiles } from '@codesandbox/sandpack-client';
import type { SandpackFiles } from '@codesandbox/sandpack-react';

import reducer, {
  initialSolutionState,
  onUpdateSolutionCode,
  resetHasUnsavedSolutionChanges,
  type SolutionState,
  updateCurrentOpenedSolution,
} from './solution-slice';

describe('solutionSlice', () => {
  let initialState: SolutionState = { ...initialSolutionState };

  const mockFiles: SandpackFiles = {
    '/index.js': { code: 'console.log("hello")' },
    '/utils.js': { code: 'export const a = 1' },
  };

  beforeEach(() => {
    initialState = {
      ...initialSolutionState,
    };
  });

  test('should update currentOpenedSolution and reset hasUnsavedSolutionChanges', () => {
    const action = updateCurrentOpenedSolution({
      attemptId: 'a1',
      files: mockFiles,
      name: 'Test Solution',
    });

    const newState = reducer(initialState, action);

    expect(newState.currentOpenedSolution?.name).toBe('Test Solution');
    expect(newState.hasUnsavedSolutionChanges).toBe(false);
  });

  test('should detect unsaved changes in solution code', () => {
    const openedState: SolutionState = {
      currentOpenedSolution: {
        attemptId: 'a1',
        files: mockFiles,
        name: 'Test Solution',
      },
      hasUnsavedSolutionChanges: false,
    };

    const updatedFiles: SandpackBundlerFiles = {
      '/index.js': { code: 'console.log("hello world")' }, // Changed
      '/utils.js': { code: 'export const a = 1' }, // Unchanged
    };

    const newState = reducer(openedState, onUpdateSolutionCode(updatedFiles));

    expect(newState.hasUnsavedSolutionChanges).toBe(true);
  });

  test('should not detect changes if code is identical', () => {
    const openedState: SolutionState = {
      currentOpenedSolution: {
        attemptId: 'a1',
        files: mockFiles,
        name: 'Test Solution',
      },
      hasUnsavedSolutionChanges: false,
    };

    const identicalFiles: SandpackBundlerFiles = {
      '/index.js': { code: 'console.log("hello")' },
      '/utils.js': { code: 'export const a = 1' },
    };

    const newState = reducer(openedState, onUpdateSolutionCode(identicalFiles));

    expect(newState.hasUnsavedSolutionChanges).toBe(false);
  });

  test('should do nothing if currentOpenedSolution is null', () => {
    const updatedFiles: SandpackBundlerFiles = {
      '/index.js': { code: 'console.log("test")' },
    };

    const newState = reducer(initialState, onUpdateSolutionCode(updatedFiles));

    expect(newState).toEqual(initialState);
  });

  test('should reset hasUnsavedSolutionChanges', () => {
    const dirtyState: SolutionState = {
      currentOpenedSolution: {
        attemptId: 'a1',
        files: mockFiles,
        name: 'Dirty',
      },
      hasUnsavedSolutionChanges: true,
    };

    const newState = reducer(dirtyState, resetHasUnsavedSolutionChanges());

    expect(newState.hasUnsavedSolutionChanges).toBe(false);
  });
});
