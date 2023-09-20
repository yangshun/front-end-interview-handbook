import type { PayloadV1, PayloadV2 } from './UserInterfaceQuestionCodeStorage';
import type { QuestionUserInterface } from '../common/QuestionsTypes';

import type {
  SandboxEnvironment,
  SandpackFile,
} from '@codesandbox/sandpack-react';

function makeQuestionKey(question: QuestionUserInterface): string {
  return `gfe:user-interface:${question.framework}:${question.metadata.slug}`;
}

const defaultSetups: Record<
  string,
  Readonly<{
    dependencies: Record<string, string>;
    entry: string;
    environment: SandboxEnvironment;
    main: string;
    visibleFiles?: Array<string>;
  }>
> = {
  react: {
    dependencies: {
      react: '^18.2.0',
      'react-dom': '^18.2.0',
      'react-scripts': '^4.0.0',
    },
    entry: '/index.js',
    environment: 'create-react-app',
    main: '/App.js',
  },
  vanilla: {
    dependencies: {},
    entry: '/src/index.js',
    environment: 'parcel',
    main: '/src/index.js',
  },
};

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

      const savePayload: PayloadV1 = {
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

      const payload = JSON.parse(savedPayload) as
        | PayloadV1
        | PayloadV2
        | null
        | undefined;

      if (!payload) {
        return null;
      }

      if (payload.version === 'v1') {
        return payload.setup;
      }

      const v2Payload = payload as PayloadV2;

      return {
        files: v2Payload.files,
        ...defaultSetups[question.framework],
      };
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
