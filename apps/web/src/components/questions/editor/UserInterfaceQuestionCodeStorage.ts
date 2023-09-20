import type {
  QuestionUserInterfaceSandpackSetup,
  QuestionUserInterfaceV2,
} from '../common/QuestionsTypes';

import type { SandpackFiles } from '@codesandbox/sandpack-react';

function makeQuestionKey(question: QuestionUserInterfaceV2): string {
  return `gfe:user-interface:${question.framework}:${question.metadata.slug}`;
}

export type PayloadV1 = Readonly<{
  setup: QuestionUserInterfaceSandpackSetup;
  type: 'user-interface';
  version: 'v1';
}>;

export type PayloadV2 = Readonly<{
  files: SandpackFiles;
  type: 'user-interface';
  version: 'v2';
}>;

export function loadLocalUserInterfaceQuestionCode(
  question: QuestionUserInterfaceV2,
) {
  const questionKey = makeQuestionKey(question);

  try {
    if (typeof window === 'undefined') {
      return null;
    }

    const savedPayload: string | null =
      window.localStorage.getItem(questionKey);

    if (savedPayload == null) {
      return null;
    }

    const payload = JSON.parse(savedPayload) as
      | PayloadV1
      | PayloadV2
      | null
      | undefined;

    if (!payload) {
      return null;
    }

    if (payload.version === 'v1') {
      const v1Payload = payload as PayloadV1;

      // TODO(workspace): Migrate to v2 files format.
      return v1Payload.setup.files;
    }

    return (payload as PayloadV2).files;
  } catch (error) {
    console.error(error);

    return null;
  }
}

export function saveUserInterfaceQuestionCodeLocally(
  question: QuestionUserInterfaceV2,
  files: SandpackFiles | null,
) {
  const questionKey = makeQuestionKey(question);

  setTimeout(() => {
    if (files == null) {
      return;
    }

    const payload: PayloadV2 = {
      files,
      type: 'user-interface',
      version: 'v2',
    };

    window.localStorage.setItem(questionKey, JSON.stringify(payload));
  }, 0);
}

export function deleteLocalUserInterfaceQuestionCode(
  question: QuestionUserInterfaceV2,
) {
  const questionKey = makeQuestionKey(question);

  setTimeout(() => {
    window.localStorage.removeItem(questionKey);
  }, 0);
}
