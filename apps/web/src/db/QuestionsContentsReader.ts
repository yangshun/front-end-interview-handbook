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
} from '~/components/interviews/questions/common/QuestionsTypes';

import { getQuestionOutPathAlgo } from './questions-bundlers/QuestionsBundlerAlgoConfig';
import { getQuestionOutPathJavaScript } from './questions-bundlers/QuestionsBundlerJavaScriptConfig';
import { getQuestionOutPathQuiz } from './questions-bundlers/QuestionsBundlerQuizConfig';
import { getQuestionOutPathSystemDesign } from './questions-bundlers/QuestionsBundlerSystemDesignConfig';
import { getQuestionOutPathUserInterface } from './questions-bundlers/QuestionsBundlerUserInterfaceConfig';

// Add functions which read from the generated content files.

export function readQuestionAlgoContents(
  slug: string,
  isViewerPremium: boolean,
  requestedLocale = 'en-US',
): Readonly<{
  loadedLocale: string;
  question: QuestionJavaScript;
}> {
  let loadedLocale = requestedLocale;
  const response = (() => {
    try {
      return fs.readFileSync(
        path.join(getQuestionOutPathAlgo(slug), `${requestedLocale}.json`),
      );
    } catch {
      loadedLocale = 'en-US';

      // Fallback to English.
      return fs.readFileSync(
        path.join(getQuestionOutPathAlgo(slug), `${loadedLocale}.json`),
      );
    }
  })();

  let question = JSON.parse(String(response)) as QuestionJavaScript;

  // Hide solution if user does not have access.
  if (
    !isViewerPremium &&
    (question.metadata.access === 'standard' ||
      question.metadata.access === 'premium')
  ) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { solution, ...rest } = question;

    question = {
      ...rest,
      solution: null,
    };
  }

  return {
    loadedLocale,
    question,
  };
}

export function readQuestionJavaScriptContents(
  slug: string,
  isViewerPremium: boolean,
  requestedLocale = 'en-US',
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
      loadedLocale = 'en-US';

      // Fallback to English.
      return fs.readFileSync(
        path.join(getQuestionOutPathJavaScript(slug), `${loadedLocale}.json`),
      );
    }
  })();

  let question = JSON.parse(String(response)) as QuestionJavaScript;

  // Hide solution if user does not have access.
  if (
    !isViewerPremium &&
    (question.metadata.access === 'standard' ||
      question.metadata.access === 'premium')
  ) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { solution, ...rest } = question;

    question = {
      ...rest,
      solution: null,
    };
  }

  return {
    loadedLocale,
    question,
  };
}

export function readQuestionQuizContents(
  slug: string,
  requestedLocale = 'en-US',
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
      loadedLocale = 'en-US';

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
  requestedLocale = 'en-US',
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
      loadedLocale = 'en-US';

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
  isViewerPremium: boolean,
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
    const response = fs.readFileSync(
      path.join(questionOutDir, framework, `skeleton.json`),
    );

    return JSON.parse(String(response)) as QuestionUserInterfaceBundle;
  })();

  const solutionBundle = (() => {
    const response = fs.readFileSync(
      path.join(questionOutDir, framework, `${codeId ?? 'solution'}.json`),
    );

    const solutionBundleValue: QuestionUserInterfaceBundle = JSON.parse(
      String(response),
    );

    const canAccessSolutionWriteup =
      isViewerPremium || metadata.access === 'free';

    return {
      ...solutionBundleValue,
      writeup: canAccessSolutionWriteup ? solutionBundleValue.writeup : null,
    };
  })();

  return {
    description: skeletonBundle?.writeup ?? null,
    framework,
    metadata,
    skeletonBundle,
    solution: solutionBundle?.writeup ?? null,
    solutionBundle,
  };
}
