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

export default function useJavaScriptQuestionCode(
  metadata: QuestionMetadata,
  language: QuestionCodingWorkingLanguage,
  skeleton: QuestionJavaScriptSkeleton | null,
) {
  let loadedCodeFromClientStorage = false;
  const questionKey = makeQuestionKey(metadata, language);

  function saveCode(code: string) {
    setTimeout(() => {
      const savePayload: Payload = {
        code,
        format: 'javascript',
        language,
        version: 'v1',
      };

      window.localStorage.setItem(questionKey, JSON.stringify(savePayload));
    }, 0);
  }

  function deleteCodeFromClientStorage() {
    setTimeout(() => {
      window.localStorage.removeItem(questionKey);
    }, 0);
  }

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
