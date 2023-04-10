import type {
  QuestionCodingWorkingLanguage,
  QuestionJavaScript,
} from '../common/QuestionsTypes';

function makeQuestionKey(
  question: QuestionJavaScript,
  language: QuestionCodingWorkingLanguage,
): string {
  switch (language) {
    case 'js':
      return `gfe:javascript:${question.metadata.slug}`;
    case 'ts':
      return `gfe:javascript:${question.metadata.slug}:ts`;
  }
}

type Payload = Readonly<{
  code: string;
  format: 'javascript';
  language: QuestionCodingWorkingLanguage;
  version: 'v1';
}>;

export default function useJavaScriptQuestionCode(
  question: QuestionJavaScript,
  language: QuestionCodingWorkingLanguage,
) {
  let loadedCodeFromClientStorage = false;
  const questionKey = makeQuestionKey(question, language);

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
    const defaultCode = question.skeleton?.[language] ?? '';

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
