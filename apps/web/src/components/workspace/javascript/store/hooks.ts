import { useDispatch, useSelector } from 'react-redux';

import type {
  JavaScriptCodingWorkspaceDispatch,
  JavaScriptCodingWorkspaceState,
} from './javascript-store';

// These have more typesafety compared to plain `useDispatch` and `useSelector`
export const useJavaScriptCodingWorkspaceDispatch =
  useDispatch.withTypes<JavaScriptCodingWorkspaceDispatch>();
export const useJavaScriptCodingWorkspaceSelector =
  useSelector.withTypes<JavaScriptCodingWorkspaceState>();
