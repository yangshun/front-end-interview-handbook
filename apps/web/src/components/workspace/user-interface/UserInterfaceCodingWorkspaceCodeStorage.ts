import type { SandpackFiles } from '@codesandbox/sandpack-react';

import type {
  QuestionUserInterface,
  QuestionUserInterfaceSandpackSetup,
} from '../../interviews/questions/common/QuestionsTypes';

function makeQuestionKey(question: QuestionUserInterface): string {
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

function migrateFilesFromV1toV2(
  v1Files: SandpackFiles,
  v2SkeletonFiles: SandpackFiles,
) {
  const newFiles = { ...v2SkeletonFiles };

  Object.keys(newFiles).forEach((filePath) => {
    if (filePath.startsWith('/src')) {
      const potentialOriginalFilePath = filePath.replace(/^\/src/, '');

      if (v1Files[potentialOriginalFilePath]) {
        newFiles[filePath] = v1Files[potentialOriginalFilePath];
      }
    }
  });

  return newFiles;
}

export function loadLocalUserInterfaceQuestionCode(
  question: QuestionUserInterface,
  v2SkeletonFiles: SandpackFiles,
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
      const { files: v1Files } = v1Payload.setup;

      if (question.framework === 'react') {
        return migrateFilesFromV1toV2(v1Files, v2SkeletonFiles);
      }

      return v1Files;
    }

    return (payload as PayloadV2).files;
  } catch (error) {
    console.error(error);

    return null;
  }
}

export function saveUserInterfaceQuestionCodeLocally(
  question: QuestionUserInterface,
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
  question: QuestionUserInterface,
) {
  const questionKey = makeQuestionKey(question);

  setTimeout(() => {
    window.localStorage.removeItem(questionKey);
  }, 0);
}
