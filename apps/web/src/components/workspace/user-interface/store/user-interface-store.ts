import type { Action, ThunkAction } from '@reduxjs/toolkit';
import { configureStore } from '@reduxjs/toolkit';

import { codingWorkspaceReducers } from '~/components/workspace/common/store/coding-workspace-store';
import { sandpackInitialState } from '~/components/workspace/common/store/sandpack-slice';
import { initialSolutionState } from '~/components/workspace/common/store/solution-slice';
import { timerInitialState } from '~/components/workspace/common/store/timer-slice';

import userInterfaceWorkspaceReducer, {
  initialUserInterfaceWorkspaceState,
} from './user-interface-workspace-slice';

const userInterfaceCodingWorkspaceReducers = {
  workspace: userInterfaceWorkspaceReducer,
};

const combinedReducers = {
  ...userInterfaceCodingWorkspaceReducers,
  ...codingWorkspaceReducers,
};

export function makeUserInterfaceCodingWorkspaceStore(
  preloadedState?: Partial<UserInterfaceCodingWorkspaceState>,
) {
  return configureStore({
    preloadedState: {
      sandpack: sandpackInitialState,
      solution: initialSolutionState,
      timer: timerInitialState,
      workspace: initialUserInterfaceWorkspaceState,
      ...preloadedState,
    },
    reducer: combinedReducers,
  });
}

export type UserInterfaceCodingWorkspaceStore = ReturnType<
  typeof configureStore<{
    [K in keyof typeof combinedReducers]: ReturnType<
      (typeof combinedReducers)[K]
    >;
  }>
>;
export type UserInterfaceCodingWorkspaceState = ReturnType<
  UserInterfaceCodingWorkspaceStore['getState']
>;
export type UserInterfaceCodingWorkspaceDispatch =
  UserInterfaceCodingWorkspaceStore['dispatch'];
export type UserInterfaceCodingWorkspaceThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  UserInterfaceCodingWorkspaceState,
  unknown,
  Action<string>
>;
