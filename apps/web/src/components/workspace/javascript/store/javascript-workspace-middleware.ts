import type { Middleware, MiddlewareAPI } from '@reduxjs/toolkit';

import { initializeSandpack } from '~/components/workspace/common/store/sandpack-slice';

import { saveJavaScriptCodingWorkspaceWorkingLanguage } from '../language/JavaScriptCodingWorkspaceWorkingLanguageStorage';
import { javascriptCodingWorkspaceGetInitialSandpackState } from '../utils/javascriptCodingWorkspaceGetInitialFiles';
import type {
  JavaScriptCodingWorkspaceDispatch,
  JavaScriptCodingWorkspaceState,
} from './javascript-store';
import { setLanguage } from './javascript-workspace-slice';

export const javaScriptWorkspaceMiddleware: Middleware =
  (
    store: MiddlewareAPI<
      JavaScriptCodingWorkspaceDispatch,
      JavaScriptCodingWorkspaceState
    >,
  ) =>
  (next) =>
  (action) => {
    if (setLanguage.match(action)) {
      const workspaceState = store.getState().workspace;
      const { question } = workspaceState;
      const language = action.payload;

      saveJavaScriptCodingWorkspaceWorkingLanguage(language);

      const sandpackState = javascriptCodingWorkspaceGetInitialSandpackState({
        language,
        question,
      });

      store.dispatch(initializeSandpack(sandpackState));
    }

    return next(action);
  };
