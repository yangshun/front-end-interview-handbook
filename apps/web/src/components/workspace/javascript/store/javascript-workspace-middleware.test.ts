import type { Middleware } from '@reduxjs/toolkit';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { beforeEach, describe, expect, test, vi } from 'vitest';

import type { QuestionJavaScript } from '~/components/interviews/questions/common/QuestionsTypes';
import type { SandpackState } from '~/components/workspace/common/store/sandpack-slice';
import { initializeSandpack } from '~/components/workspace/common/store/sandpack-slice';

import * as InitialFiles from '../javascriptCodingWorkspaceGetInitialFiles';
import * as LanguageStorage from '../JavaScriptCodingWorkspaceWorkingLanguageStorage';
import { javaScriptWorkspaceMiddleware } from './javascript-workspace-middleware';
import javascriptWorkspaceReducer, {
  setLanguage,
} from './javascript-workspace-slice';

vi.mock('../JavaScriptCodingWorkspaceWorkingLanguageStorage', () => ({
  saveJavaScriptCodingWorkspaceWorkingLanguage: vi.fn(),
}));

vi.mock('../javascriptCodingWorkspaceGetInitialFiles', () => ({
  javascriptCodingWorkspaceGetInitialSandpackState: vi.fn(),
}));

const mockSaveLanguage =
  vi.mocked(LanguageStorage).saveJavaScriptCodingWorkspaceWorkingLanguage;
const mockGetInitialSandpackState =
  vi.mocked(InitialFiles).javascriptCodingWorkspaceGetInitialSandpackState;

describe('JavaScript workspace middleware', () => {
  const mockQuestion = {} as QuestionJavaScript;
  const mockSandpackState: SandpackState = {
    current: {
      activeFile: '/index.js',
      files: { '/index.js': { code: 'console.log("hi")' } },
      visibleFiles: ['/index.js'],
    },
    default: {
      activeFile: '/index.js',
      files: { '/index.js': { code: 'console.log("hi")' } },
      visibleFiles: ['/index.js'],
    },
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('should save language and initialize sandpack when setLanguage is dispatched', () => {
    mockSaveLanguage.mockImplementation(() => {});
    mockGetInitialSandpackState.mockReturnValue(mockSandpackState);

    const mockReducer = combineReducers({
      workspace: javascriptWorkspaceReducer,
    });

    type DispatchedAction =
      | ReturnType<typeof initializeSandpack>
      | ReturnType<typeof setLanguage>;

    const dispatchedActions: Array<DispatchedAction> = [];

    // eslint-disable-next-line prefer-const, init-declarations
    let store: ReturnType<typeof configureStore>;

    const testMiddleware: Middleware = () => (next) => (action) => {
      dispatchedActions.push(action as DispatchedAction);

      return javaScriptWorkspaceMiddleware({
        dispatch: ((a: DispatchedAction) =>
          dispatchedActions.push(a)) as typeof store.dispatch,
        getState: store.getState,
      })(next)(action);
    };

    store = configureStore({
      middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(testMiddleware),
      preloadedState: {
        workspace: {
          language: 'js',
          question: mockQuestion,
          testFocus: null,
        },
      },
      reducer: mockReducer,
    });

    // Dispatch setLanguage action
    store.dispatch(setLanguage('ts'));

    expect(mockSaveLanguage).toHaveBeenCalledWith('ts');
    expect(mockGetInitialSandpackState).toHaveBeenCalledWith({
      language: 'ts',
      question: mockQuestion,
    });

    const found = dispatchedActions.find((a) => initializeSandpack.match?.(a));

    expect(found).toBeDefined();
    expect(found?.payload).toEqual(mockSandpackState);
  });
});
