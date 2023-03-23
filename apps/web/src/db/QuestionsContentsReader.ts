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
  requestedLocale = 'en',
): Readonly<{
  loadedLocale: string;
  question: QuestionJavaScript;
}> {
  let loadedLocale = requestedLocale;
  const response = (() => {
    try {
      return fs.readFileSync(
        path.join(
          getQuestionOutPathJavaScript(slug),
          `${requestedLocale}.json`,
        ),
      );
    } catch {
      loadedLocale = 'en';

      // Fallback to English.
      return fs.readFileSync(
        path.join(getQuestionOutPathJavaScript(slug), `${loadedLocale}.json`),
      );
    }
  })();

  return {
    loadedLocale,
    question: JSON.parse(String(response)) as QuestionJavaScript,
  };
}

export function readQuestionQuizContents(
  slug: string,
  requestedLocale = 'en',
): Readonly<{
  loadedLocale: string;
  question: QuestionQuiz;
}> {
  let loadedLocale = requestedLocale;
  const response = (() => {
    try {
      return fs.readFileSync(
        path.join(getQuestionOutPathQuiz(slug), `${requestedLocale}.json`),
      );
    } catch {
      loadedLocale = 'en';

      // Fallback to English.
      return fs.readFileSync(
        path.join(getQuestionOutPathQuiz(slug), `${loadedLocale}.json`),
      );
    }
  })();

  return {
    loadedLocale,
    question: JSON.parse(String(response)) as QuestionQuiz,
  };
}

export function readQuestionSystemDesignContents(
  slug: string,
  requestedLocale = 'en',
): Readonly<{
  loadedLocale: string;
  question: QuestionSystemDesign;
}> {
  let loadedLocale = requestedLocale;
  const response = (() => {
    try {
      return fs.readFileSync(
        path.join(
          getQuestionOutPathSystemDesign(slug),
          `${requestedLocale}.json`,
        ),
      );
    } catch {
      loadedLocale = 'en';

      // Fallback to English.
      return fs.readFileSync(
        path.join(getQuestionOutPathSystemDesign(slug), `${loadedLocale}.json`),
      );
    }
  })();

  return {
    loadedLocale,
    question: JSON.parse(String(response)) as QuestionSystemDesign,
  };
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
