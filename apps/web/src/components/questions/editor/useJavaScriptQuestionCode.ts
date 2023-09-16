import { useCallback } from 'react';

import type {
  QuestionCodingWorkingLanguage,
  QuestionJavaScriptSkeleton,
  QuestionMetadata,
} from '../common/QuestionsTypes';

function makeQuestionKey(
  metadata: QuestionMetadata,
  language: QuestionCodingWorkingLanguage,
): string {
  switch (language) {
    case 'js':
      return `gfe:javascript:${metadata.slug}`;
    case 'ts':
      return `gfe:javascript:${metadata.slug}:ts`;
  }
}

type Payload = Readonly<{
  code: string;
  format: 'javascript';
  language: QuestionCodingWorkingLanguage;
  version: 'v1';
}>;

// Actually this doesn't need to be a hook...
export default function useJavaScriptQuestionCode(
  metadata: QuestionMetadata,
  language: QuestionCodingWorkingLanguage,
  skeleton: QuestionJavaScriptSkeleton | null,
) {
  let loadedCodeFromClientStorage = false;
  const questionKey = makeQuestionKey(metadata, language);

  const saveCode = useCallback(
    (code: string) => {
      setTimeout(() => {
        const savePayload: Payload = {
          code,
          format: 'javascript',
          language,
          version: 'v1',
        };

        window.localStorage.setItem(questionKey, JSON.stringify(savePayload));
      }, 0);
    },
    [language, questionKey],
  );

  const deleteCodeFromClientStorage = useCallback(() => {
    setTimeout(() => {
      window.localStorage.removeItem(questionKey);
    }, 0);
  }, [questionKey]);

  const code = (() => {
    const defaultCode = skeleton?.[language] ?? '';

    try {
      if (typeof window === 'undefined') {
        return defaultCode;
      }

      const savedPayload: string | null =
        window.localStorage.getItem(questionKey);

      if (savedPayload == null) {
        return defaultCode;
      }

      loadedCodeFromClientStorage = true;

      const payload = JSON.parse(savedPayload) as Payload;

      return payload.code;
    } catch (error) {
      console.error(error);

      return defaultCode;
    }
  })();

  return {
    code,
    deleteCodeFromClientStorage,
    loadedCodeFromClientStorage,
    saveCode,
  };
}
