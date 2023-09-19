import type {
  QuestionUserInterface,
  QuestionUserInterfaceSandpackSetup,
} from '../common/QuestionsTypes';

import type { SandpackFile } from '@codesandbox/sandpack-react';

function makeQuestionKey(question: QuestionUserInterface): string {
  return `gfe:user-interface:${question.framework}:${question.metadata.slug}`;
}

type Payload = Readonly<{
  setup: QuestionUserInterfaceSandpackSetup;
  type: 'user-interface';
  version: 'v1';
}>;

// TODO(workspace): delete
export default function useUserInterfaceQuestionCode(
  question: QuestionUserInterface,
) {
  let loadedFilesFromClientStorage = false;
  const questionKey = makeQuestionKey(question);

  function saveFiles(files: Record<string, SandpackFile>) {
    setTimeout(() => {
      if (question.skeletonSetup == null) {
        return;
      }

      const savePayload: Payload = {
        setup: {
          ...question.skeletonSetup,
          files,
        },
        type: 'user-interface',
        version: 'v1',
      };

      window.localStorage.setItem(questionKey, JSON.stringify(savePayload));
    }, 0);
  }

  function deleteFilesFromClientStorage() {
    setTimeout(() => {
      window.localStorage.removeItem(questionKey);
    }, 0);
  }

  const setup = (() => {
    const defaultSetup = question.skeletonSetup;

    try {
      if (typeof window === 'undefined') {
        return defaultSetup;
      }

      const savedPayload: string | null =
        window.localStorage.getItem(questionKey);

      if (savedPayload == null) {
        return defaultSetup;
      }

      loadedFilesFromClientStorage = true;

      const payload = JSON.parse(savedPayload) as Payload;

      return payload.setup;
    } catch (error) {
      console.error(error);

      return defaultSetup;
    }
  })();

  return {
    deleteFilesFromClientStorage,
    loadedFilesFromClientStorage,
    saveFiles,
    setup,
  };
}
