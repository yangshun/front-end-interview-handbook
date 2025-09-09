import { useDispatch, useSelector } from 'react-redux';

import type {
  CodingWorkspaceDispatch,
  CodingWorkspaceState,
} from './coding-workspace-store';

// These have more typesafety compared to plain `useDispatch` and `useSelector`
export const useCodingWorkspaceDispatch =
  useDispatch.withTypes<CodingWorkspaceDispatch>();
export const useCodingWorkspaceSelector =
  useSelector.withTypes<CodingWorkspaceState>();
