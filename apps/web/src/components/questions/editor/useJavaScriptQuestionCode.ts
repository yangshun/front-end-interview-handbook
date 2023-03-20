import type { QuestionJavaScript } from '../common/QuestionsTypes';

function makeQuestionKey(question: QuestionJavaScript): string {
  return `gfe:javascript:${question.metadata.slug}`;
}

type Payload = Readonly<{
  code: string;
  type: 'javascript';
  version: 'v1';
}>;

export default function useJavaScriptQuestionCode(
  question: QuestionJavaScript,
) {
  let loadedCodeFromClientStorage = false;
  const questionKey = makeQuestionKey(question);

  function saveCode(code: string) {
    setTimeout(() => {
      const savePayload: Payload = {
        code,
        type: 'javascript',
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
    const defaultCode = question.skeleton;

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
