import 'server-only';

import fs from 'fs';
import path from 'path';

import { questionsFindClosestToSlug } from '~/components/interviews/questions/common/QuestionsClosestSlug';
import type {
  InterviewsQuestionItemJavaScript,
  InterviewsQuestionItemMinimal,
  InterviewsQuestionItemUserInterface,
  QuestionFramework,
  QuestionQuiz,
  QuestionSystemDesign,
  QuestionUserInterfaceBundle,
} from '~/components/interviews/questions/common/QuestionsTypes';

import { getQuestionOutPathAlgo } from './questions-bundlers/QuestionsBundlerAlgoConfig';
import { getQuestionOutPathJavaScript } from './questions-bundlers/QuestionsBundlerJavaScriptConfig';
import { getQuestionOutPathQuiz } from './questions-bundlers/QuestionsBundlerQuizConfig';
import { getQuestionOutPathSystemDesign } from './questions-bundlers/QuestionsBundlerSystemDesignConfig';
import { getQuestionOutPathUserInterface } from './questions-bundlers/QuestionsBundlerUserInterfaceConfig';
import { fetchQuestionsList } from './QuestionsListReader';

// Add functions which read from the generated content files.

export function readQuestionAlgoContents(
  slug: string,
  isViewerPremium: boolean,
  requestedLocale = 'en-US',
): Readonly<{
  loadedLocale: string;
  question: InterviewsQuestionItemJavaScript;
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

  // Read locale agnostic data
  const metadataResponse = fs.readFileSync(
    path.join(getQuestionOutPathAlgo(slug), 'metadata.json'),
  );
  const setupResponse = fs.readFileSync(
    path.join(getQuestionOutPathAlgo(slug), 'setup.json'),
  );

  const metadata = JSON.parse(String(metadataResponse));
  const setup = JSON.parse(String(setupResponse));
  const localeData = JSON.parse(String(response));

  let question = {
    metadata,
    ...setup,
    ...localeData,
  } as InterviewsQuestionItemJavaScript;

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
  question: InterviewsQuestionItemJavaScript;
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

  // Read locale agnostic data
  const metadataResponse = fs.readFileSync(
    path.join(getQuestionOutPathJavaScript(slug), 'metadata.json'),
  );
  const setupResponse = fs.readFileSync(
    path.join(getQuestionOutPathJavaScript(slug), 'setup.json'),
  );

  const metadata = JSON.parse(String(metadataResponse));
  const setup = JSON.parse(String(setupResponse));
  const localeData = JSON.parse(String(response));

  let question = {
    metadata,
    ...setup,
    ...localeData,
  } as InterviewsQuestionItemJavaScript;

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

export async function readQuestionQuizContents(
  slug: string,
  requestedLocale = 'en-US',
): Promise<Readonly<{
  exactMatch: boolean;
  loadedLocale: string;
  question: QuestionQuiz;
}> | null> {
  let loadedLocale = requestedLocale;
  let response = null;

  try {
    response = fs.readFileSync(
      path.join(getQuestionOutPathQuiz(slug), `${requestedLocale}.json`),
    );
  } catch {
    loadedLocale = 'en-US';

    try {
      // Fall back to English
      response = fs.readFileSync(
        path.join(getQuestionOutPathQuiz(slug), `${loadedLocale}.json`),
      );
    } catch {
      // Fall back to finding the closest question
      const quizQuestions = await fetchQuestionsList(
        { type: 'format', value: 'quiz' },
        requestedLocale,
      );

      const question = await questionsFindClosestToSlug(
        quizQuestions.questions,
        slug,
      );

      if (question == null) {
        return null;
      }

      const closestQuestion = await readQuestionQuizContents(
        question.metadata.slug,
        loadedLocale,
      );

      if (closestQuestion == null) {
        return null;
      }

      return { ...closestQuestion, exactMatch: false };
    }
  }

  // Read locale agnostic data
  const metadataResponse = fs.readFileSync(
    path.join(getQuestionOutPathQuiz(slug), 'metadata.json'),
  );

  const metadata = JSON.parse(String(metadataResponse));
  const localeData = JSON.parse(String(response));

  const question = {
    metadata,
    ...localeData,
  } as QuestionQuiz;

  return {
    exactMatch: true,
    loadedLocale,
    question,
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

  // Read locale agnostic data
  const metadataResponse = fs.readFileSync(
    path.join(getQuestionOutPathSystemDesign(slug), 'metadata.json'),
  );

  const metadata = JSON.parse(String(metadataResponse));
  const localeData = JSON.parse(String(response));

  const question = {
    metadata,
    ...localeData,
  } as QuestionSystemDesign;

  return {
    loadedLocale,
    question,
  };
}

export async function readQuestionUserInterface(
  slug: string,
  isViewerPremium: boolean,
  frameworkParam?: QuestionFramework | null,
  codeId?: string,
): Promise<InterviewsQuestionItemUserInterface> {
  const questionOutDir = getQuestionOutPathUserInterface(slug);
  const content = (() => {
    const response = fs.readFileSync(
      path.join(questionOutDir, `metadata.json`),
    );

    return JSON.parse(String(response)) as InterviewsQuestionItemMinimal;
  })();
  const { metadata } = content;

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
    ...content,
    skeletonBundle,
    solution: solutionBundle?.writeup ?? null,
    solutionBundle,
  };
}
