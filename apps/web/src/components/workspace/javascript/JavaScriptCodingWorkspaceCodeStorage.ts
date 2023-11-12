import type {
  QuestionCodingWorkingLanguage,
  QuestionMetadata,
} from '../../interviews/questions/common/QuestionsTypes';

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

export function loadLocalJavaScriptQuestionCode(
  metadata: QuestionMetadata,
  language: QuestionCodingWorkingLanguage,
) {
  const questionKey = makeQuestionKey(metadata, language);

  try {
    if (typeof window === 'undefined') {
      return null;
    }

    const savedPayload: string | null =
      window.localStorage.getItem(questionKey);

    if (savedPayload == null) {
      return null;
    }

    const payload = JSON.parse(savedPayload) as Payload;

    return payload.code;
  } catch (error) {
    console.error(error);

    return null;
  }
}

export function saveJavaScriptQuestionCodeLocally(
  metadata: QuestionMetadata,
  language: QuestionCodingWorkingLanguage,
  code: string,
) {
  const questionKey = makeQuestionKey(metadata, language);

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

export function deleteLocalJavaScriptQuestionCode(
  metadata: QuestionMetadata,
  language: QuestionCodingWorkingLanguage,
) {
  const questionKey = makeQuestionKey(metadata, language);

  setTimeout(() => {
    window.localStorage.removeItem(questionKey);
  }, 0);
}
