import type { QuestionCodingWorkingLanguage } from '~/components/interviews/questions/common/QuestionsTypes';
import type { SetUnsavedChangesDialogType } from '~/components/workspace/common/CodingWorkspaceUnsavedSolutionContext';
import {
  resetFile,
  updateFile,
} from '~/components/workspace/common/store/sandpack-slice';
import { updateCurrentOpenedSolution } from '~/components/workspace/common/store/solution-slice';

import { deleteLocalJavaScriptQuestionCode } from '../JavaScriptCodingWorkspaceCodeStorage';
import type { JavaScriptCodingWorkspaceThunk } from './javascript-store';
import { setLanguage } from './javascript-workspace-slice';

export const changeJavaScriptCodingWorkspaceLanguage =
  (
    language: QuestionCodingWorkingLanguage,
    setUnsavedChangesDialog: SetUnsavedChangesDialogType,
  ): JavaScriptCodingWorkspaceThunk =>
  (dispatch, getState) => {
    const { hasUnsavedSolutionChanges } = getState().solution;

    function applyLanguageChange() {
      dispatch(setLanguage(language));
      dispatch(updateCurrentOpenedSolution(null));
    }
    if (!hasUnsavedSolutionChanges) {
      applyLanguageChange();

      return;
    }
    setUnsavedChangesDialog({
      onAction: () => {
        applyLanguageChange();
        setUnsavedChangesDialog({
          show: false,
        });
      },
      show: true,
    });
  };

export const resetJavaScriptCodingWorkspaceFile =
  (filePath: string): JavaScriptCodingWorkspaceThunk =>
  (dispatch, getState) => {
    const defaultFiles = getState().sandpack.default.files;
    const { language, question } = getState().workspace;
    const { currentOpenedSolution } = getState().solution;
    const { metadata, workspace } = question;

    // If it's not the main file, just reset it
    if (filePath !== workspace.main) {
      dispatch(resetFile(filePath));

      return;
    }
    // If solution exists, restore from it
    if (currentOpenedSolution) {
      const mainFile = currentOpenedSolution.files[workspace.main];
      const content = typeof mainFile === 'string' ? mainFile : mainFile.code;

      dispatch(
        updateFile({
          content,
          path: filePath,
        }),
      );

      return;
    }
    // Else, clear saved code and restore default
    deleteLocalJavaScriptQuestionCode(metadata, language);
    dispatch(
      updateFile({
        content: defaultFiles[workspace.main].code,
        path: filePath,
      }),
    );
  };
