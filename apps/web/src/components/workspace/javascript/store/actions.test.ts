import { describe, expect, test, vi } from 'vitest';

import type {
  QuestionCodingWorkingLanguage,
  QuestionJavaScript,
} from '~/components/interviews/questions/common/QuestionsTypes';
import {
  resetFile,
  updateFile,
} from '~/components/workspace/common/store/sandpack-slice';
import {
  initialSolutionState,
  updateCurrentOpenedSolution,
} from '~/components/workspace/common/store/solution-slice';

import { deleteLocalJavaScriptQuestionCode } from '../JavaScriptCodingWorkspaceCodeStorage';
import {
  changeJavaScriptCodingWorkspaceLanguage,
  resetJavaScriptCodingWorkspaceFile,
} from './actions';
import { setLanguage } from './javascript-workspace-slice';

describe('changeJavaScriptCodingWorkspaceLanguage', () => {
  const mockDispatch = vi.fn();
  const mockGetState = vi.fn();

  const mockSetUnsavedChangesDialog = vi.fn();

  const tsLang = 'ts' as QuestionCodingWorkingLanguage;

  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('dispatches setLanguage and clears solution if there are no unsaved changes', () => {
    mockGetState.mockReturnValue({
      solution: {
        hasUnsavedSolutionChanges: false,
      },
    });

    changeJavaScriptCodingWorkspaceLanguage(
      tsLang,
      mockSetUnsavedChangesDialog,
    )(mockDispatch, mockGetState, undefined);

    expect(mockDispatch).toHaveBeenCalledWith(setLanguage(tsLang));
    expect(mockDispatch).toHaveBeenCalledWith(
      updateCurrentOpenedSolution(null),
    );
    expect(mockSetUnsavedChangesDialog).not.toHaveBeenCalled();
  });

  test('opens unsaved changes dialog if there are unsaved changes', () => {
    mockGetState.mockReturnValue({
      solution: {
        hasUnsavedSolutionChanges: true,
      },
    });

    changeJavaScriptCodingWorkspaceLanguage(
      tsLang,
      mockSetUnsavedChangesDialog,
    )(mockDispatch, mockGetState, undefined);

    expect(mockSetUnsavedChangesDialog).toHaveBeenCalledWith(
      expect.objectContaining({
        onAction: expect.any(Function),
        show: true,
      }),
    );

    expect(mockDispatch).not.toHaveBeenCalledWith(setLanguage(tsLang));
  });

  test('onAction in dialog dispatches language change and closes dialog', () => {
    mockGetState.mockReturnValue({
      solution: {
        hasUnsavedSolutionChanges: true,
      },
    });

    let dialogAction: (() => void) | undefined = undefined;

    mockSetUnsavedChangesDialog.mockImplementationOnce(({ onAction }) => {
      dialogAction = onAction;
    });

    changeJavaScriptCodingWorkspaceLanguage(
      tsLang,
      mockSetUnsavedChangesDialog,
    )(mockDispatch, mockGetState, undefined);

    expect(dialogAction).toBeDefined();

    // Simulate taking action in dialog
    dialogAction!();

    expect(mockDispatch).toHaveBeenCalledWith(setLanguage(tsLang));
    expect(mockDispatch).toHaveBeenCalledWith(
      updateCurrentOpenedSolution(null),
    );
    expect(mockSetUnsavedChangesDialog).toHaveBeenCalledWith({ show: false });
  });
});

describe('resetJavaScriptCodingWorkspaceFile', () => {
  const dispatch = vi.fn();
  const mockGetState = vi.fn();
  const state = {
    sandpack: {
      current: {
        activeFile: '/main.js',
        files: {
          '/main.js': { code: 'default code' },
          '/utils.js': { code: 'utils default' },
        },
        visibleFiles: [],
      },
      default: {
        activeFile: '/main.js',
        files: {
          '/main.js': { code: 'default code' },
          '/utils.js': { code: 'utils default' },
        },
        visibleFiles: [],
      },
    },
    solution: initialSolutionState,
    workspace: {
      language: 'js' as QuestionCodingWorkingLanguage,
      question: {
        metadata: { slug: 'q1' },
        workspace: { main: '/main.js' },
      } as QuestionJavaScript,
    },
  } as const;

  // Mock the required functions
  vi.mock('~/components/workspace/common/store/sandpack-slice', () => ({
    resetFile: vi.fn((path) => ({ payload: path, type: 'resetFile' })),
    updateFile: vi.fn((payload) => ({ payload, type: 'updateFile' })),
  }));

  vi.mock('../JavaScriptCodingWorkspaceCodeStorage', () => ({
    deleteLocalJavaScriptQuestionCode: vi.fn(),
  }));

  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('resets a non-main file using resetFile', () => {
    mockGetState.mockReturnValue(state);

    const thunk = resetJavaScriptCodingWorkspaceFile('/utils.js');

    thunk(dispatch, mockGetState, undefined);

    expect(dispatch).toHaveBeenCalledWith(resetFile('/utils.js'));
    expect(dispatch).toHaveBeenCalledTimes(1);
  });

  test('restores main file from currentOpenedSolution', () => {
    const modifiedState = {
      ...state,
      solution: {
        currentOpenedSolution: {
          attemptId: 'attempt-123',
          files: {
            '/main.js': { code: 'solution code' },
          },
          name: 'solution',
        },
        hasUnsavedSolutionChanges: false,
      },
    };

    mockGetState.mockReturnValue(modifiedState);

    const thunk = resetJavaScriptCodingWorkspaceFile('/main.js');

    thunk(dispatch, mockGetState, undefined);

    expect(dispatch).toHaveBeenCalledWith(
      updateFile({
        content: 'solution code',
        path: '/main.js',
      }),
    );
  });

  test('restores default main file and deletes saved local code if no solution exists', () => {
    mockGetState.mockReturnValue(state);

    const thunk = resetJavaScriptCodingWorkspaceFile('/main.js');

    thunk(dispatch, mockGetState, undefined);

    expect(deleteLocalJavaScriptQuestionCode).toHaveBeenCalledWith(
      { slug: 'q1' },
      'js',
    );

    expect(dispatch).toHaveBeenCalledWith(
      updateFile({
        content: 'default code',
        path: '/main.js',
      }),
    );
  });
});
