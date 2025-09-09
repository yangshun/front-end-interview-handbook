import type { configureStore } from '@reduxjs/toolkit';

import sandpackReducer from './sandpack-slice';
import solutionReducer from './solution-slice';
import timerReducer from './timer-slice';

export const codingWorkspaceReducers = {
  sandpack: sandpackReducer,
  solution: solutionReducer,
  timer: timerReducer,
};

export type CodingWorkspaceStore = ReturnType<
  typeof configureStore<{
    [K in keyof typeof codingWorkspaceReducers]: ReturnType<
      (typeof codingWorkspaceReducers)[K]
    >;
  }>
>;
export type CodingWorkspaceState = ReturnType<CodingWorkspaceStore['getState']>;
export type CodingWorkspaceDispatch = CodingWorkspaceStore['dispatch'];
