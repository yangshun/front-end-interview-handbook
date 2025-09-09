import { useDispatch, useSelector } from 'react-redux';

import type {
  UserInterfaceCodingWorkspaceDispatch,
  UserInterfaceCodingWorkspaceState,
} from './user-interface-store';

// These have more typesafety compared to plain `useDispatch` and `useSelector`
export const useUserInterfaceCodingWorkspaceDispatch =
  useDispatch.withTypes<UserInterfaceCodingWorkspaceDispatch>();
export const useUserInterfaceCodingWorkspaceSelector =
  useSelector.withTypes<UserInterfaceCodingWorkspaceState>();
