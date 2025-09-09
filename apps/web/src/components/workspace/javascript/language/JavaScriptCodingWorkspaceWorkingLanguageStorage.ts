import type { QuestionCodingWorkingLanguage } from '~/components/interviews/questions/common/QuestionsTypes';

const STORAGE_KEY = 'gfe:coding:language';

export function loadJavaScriptCodingWorkspaceWorkingLanguage(): QuestionCodingWorkingLanguage {
  try {
    if (typeof window === 'undefined') {
      return 'js';
    }

    const savedPayload: string | null =
      window.localStorage.getItem(STORAGE_KEY);

    if (savedPayload == null) {
      return 'js';
    }

    // Remove quotes if it exist, as the value is stored without quotes
    const payload = savedPayload.replace(
      /^['"]|['"]$/g,
      '',
    ) as QuestionCodingWorkingLanguage;

    return payload;
  } catch (error) {
    console.error(error);

    return 'js';
  }
}

export function saveJavaScriptCodingWorkspaceWorkingLanguage(
  language: QuestionCodingWorkingLanguage,
) {
  window.localStorage.setItem(STORAGE_KEY, language);
}
