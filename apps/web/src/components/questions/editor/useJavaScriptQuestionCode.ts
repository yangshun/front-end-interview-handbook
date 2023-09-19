import { useCallback } from 'react';

import {
  deleteLocalJavaScriptQuestionCode,
  loadLocalJavaScriptQuestionCode,
  saveJavaScriptQuestionCodeLocally,
} from './JavaScriptQuestionCodeStorage';
import type {
  QuestionCodingWorkingLanguage,
  QuestionMetadata,
} from '../common/QuestionsTypes';

export default function useJavaScriptQuestionCode(
  metadata: QuestionMetadata,
  language: QuestionCodingWorkingLanguage,
) {
  const saveCode = useCallback(
    (code: string) => {
      saveJavaScriptQuestionCodeLocally(metadata, language, code);
    },
    [metadata, language],
  );

  const deleteCodeFromClientStorage = useCallback(() => {
    deleteLocalJavaScriptQuestionCode(metadata, language);
  }, [language, metadata]);

  const code = loadLocalJavaScriptQuestionCode(metadata, language);

  return {
    code,
    deleteCodeFromClientStorage,
    loadedCodeFromClientStorage: code != null,
    saveCode,
  };
}
