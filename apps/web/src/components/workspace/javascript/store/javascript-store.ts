import type { Action, ThunkAction } from '@reduxjs/toolkit';
import { configureStore } from '@reduxjs/toolkit';

import { codingWorkspaceReducers } from '~/components/workspace/common/store/coding-workspace-store';
import { sandpackInitialState } from '~/components/workspace/common/store/sandpack-slice';
import { initialSolutionState } from '~/components/workspace/common/store/solution-slice';
import { timerInitialState } from '~/components/workspace/common/store/timer-slice';

import enhancedSolutionReducer from './enhanced-solution-reducer';
import enhancedTimerReducer from './enhanced-timer-reducer';
import executionReducer, { executionInitialState } from './execution-slice';
import { javaScriptWorkspaceMiddleware } from './javascript-workspace-middleware';
import javascriptWorkspaceReducer, {
  initialJavaScriptWorkspaceState,
} from './javascript-workspace-slice';

const javaScriptCodingWorkspaceReducers = {
  execution: executionReducer,
  workspace: javascriptWorkspaceReducer,
};

const combinedReducers = {
  ...javaScriptCodingWorkspaceReducers,
  ...codingWorkspaceReducers,
  solution: enhancedSolutionReducer,
  timer: enhancedTimerReducer,
};

export function makeJavaScriptCodingWorkspaceStore(
  preloadedState?: Partial<JavaScriptCodingWorkspaceState>,
) {
  return configureStore({
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(javaScriptWorkspaceMiddleware),
    preloadedState: {
      execution: executionInitialState,
      sandpack: sandpackInitialState,
      solution: initialSolutionState,
      timer: timerInitialState,
      workspace: initialJavaScriptWorkspaceState,
      ...preloadedState,
    },
    reducer: combinedReducers,
  });
}

export type JavaScriptCodingWorkspaceStore = ReturnType<
  typeof configureStore<{
    [K in keyof typeof combinedReducers]: ReturnType<
      (typeof combinedReducers)[K]
    >;
  }>
>;
export type JavaScriptCodingWorkspaceState = ReturnType<
  JavaScriptCodingWorkspaceStore['getState']
>;
export type JavaScriptCodingWorkspaceDispatch =
  JavaScriptCodingWorkspaceStore['dispatch'];
export type JavaScriptCodingWorkspaceThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  JavaScriptCodingWorkspaceState,
  unknown,
  Action<string>
>;
