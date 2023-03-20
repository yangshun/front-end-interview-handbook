import 'server-only';

import fs from 'fs';
import path from 'path';

import type {
  QuestionFramework,
  QuestionJavaScript,
  QuestionMetadata,
  QuestionQuiz,
  QuestionSystemDesign,
  QuestionUserInterface,
  QuestionUserInterfaceBundle,
} from '~/components/questions/common/QuestionsTypes';

import { getQuestionOutPathJavaScript } from './questions-bundlers/QuestionsBundlerJavaScriptConfig';
import { getQuestionOutPathQuiz } from './questions-bundlers/QuestionsBundlerQuizConfig';
import { getQuestionOutPathSystemDesign } from './questions-bundlers/QuestionsBundlerSystemDesignConfig';
import { getQuestionOutPathUserInterface } from './questions-bundlers/QuestionsBundlerUserInterfaceConfig';

// Add functions which read from the generated content files.

export function readQuestionJavaScriptContents(
  slug: string,
  locale = 'en',
): QuestionJavaScript {
  const response = (() => {
    try {
      return fs.readFileSync(
        path.join(getQuestionOutPathJavaScript(slug), `${locale}.json`),
      );
    } catch {
      // Fallback to English.
      return fs.readFileSync(
        path.join(getQuestionOutPathJavaScript(slug), `en.json`),
      );
    }
  })();

  return JSON.parse(String(response)) as QuestionJavaScript;
}

export function readQuestionQuizContents(
  slug: string,
  locale = 'en',
): QuestionQuiz {
  const response = (() => {
    try {
      return fs.readFileSync(
        path.join(getQuestionOutPathQuiz(slug), `${locale}.json`),
      );
    } catch {
      // Fallback to English.
      return fs.readFileSync(
        path.join(getQuestionOutPathQuiz(slug), `en.json`),
      );
    }
  })();

  return JSON.parse(String(response)) as QuestionQuiz;
}

export function readQuestionSystemDesignContents(
  slug: string,
  locale = 'en',
): QuestionSystemDesign {
  const response = (() => {
    try {
      return fs.readFileSync(
        path.join(getQuestionOutPathSystemDesign(slug), `${locale}.json`),
      );
    } catch {
      // Fallback to English.
      return fs.readFileSync(
        path.join(getQuestionOutPathSystemDesign(slug), `en.json`),
      );
    }
  })();

  return JSON.parse(String(response)) as QuestionSystemDesign;
}

export async function readQuestionUserInterface(
  slug: string,
  frameworkParam?: QuestionFramework | null,
  codeId?: string,
): Promise<QuestionUserInterface> {
  const questionOutDir = getQuestionOutPathUserInterface(slug);
  const metadata = (() => {
    const response = fs.readFileSync(
      path.join(questionOutDir, `metadata.json`),
    );

    return JSON.parse(String(response)) as QuestionMetadata;
  })();

  const framework = frameworkParam ?? metadata.frameworkDefault ?? 'vanilla';

  const skeletonBundle = (() => {
    try {
      const response = fs.readFileSync(
        path.join(questionOutDir, framework, `skeleton.json`),
      );

      return JSON.parse(String(response)) as QuestionUserInterfaceBundle;
    } catch (err) {
      console.error(err);

      return null;
    }
  })();

  const solutionBundle = (() => {
    try {
      const response = fs.readFileSync(
        path.join(questionOutDir, framework, `${codeId ?? 'solution'}.json`),
      );

      return JSON.parse(String(response)) as QuestionUserInterfaceBundle;
    } catch (err) {
      console.error(err);

      return null;
    }
  })();

  return {
    description: skeletonBundle?.writeup ?? null,
    format: 'user-interface',
    framework,
    metadata,
    skeletonSetup: skeletonBundle?.sandpack ?? null,
    solution: solutionBundle?.writeup ?? null,
    solutionSetup: solutionBundle?.sandpack ?? null,
  };
}
