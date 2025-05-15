import 'server-only';

import fs from 'fs';
import path from 'path';

import { questionsFindClosestToSlug } from '~/components/interviews/questions/common/QuestionsClosestSlug';
import type {
  InterviewsQuestionItemJavaScript,
  InterviewsQuestionItemUserInterface,
  InterviewsQuestionMetadata,
  QuestionFramework,
  QuestionListTypeData,
  QuestionQuiz,
  QuestionSystemDesign,
  QuestionUserInterfaceBundle,
} from '~/components/interviews/questions/common/QuestionsTypes';

import {
  getQuestionOutPathAlgo,
  getQuestionOutPathAlgoLocaleContents,
} from './questions-bundlers/QuestionsBundlerAlgoConfig';
import {
  getQuestionOutPathJavaScript,
  getQuestionOutPathJavaScriptLocaleContents,
} from './questions-bundlers/QuestionsBundlerJavaScriptConfig';
import {
  getQuestionOutPathQuiz,
  getQuestionOutPathQuizLocaleContents,
} from './questions-bundlers/QuestionsBundlerQuizConfig';
import {
  getQuestionOutPathSystemDesign,
  getQuestionOutPathSystemDesignLocaleContents,
} from './questions-bundlers/QuestionsBundlerSystemDesignConfig';
import {
  getQuestionOutPathUserInterface,
  getQuestionOutPathUserInterfaceFrameworkLocaleWriteup,
  getQuestionOutPathUserInterfaceFrameworkSetup,
  getQuestionOutPathUserInterfaceLocaleInfo,
} from './questions-bundlers/QuestionsBundlerUserInterfaceConfig';
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
        getQuestionOutPathAlgoLocaleContents(slug, requestedLocale),
      );
    } catch {
      loadedLocale = 'en-US';

      // Fallback to English
      return fs.readFileSync(
        getQuestionOutPathAlgoLocaleContents(slug, loadedLocale),
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
        getQuestionOutPathJavaScriptLocaleContents(slug, requestedLocale),
      );
    } catch {
      loadedLocale = 'en-US';

      // Fallback to English
      return fs.readFileSync(
        getQuestionOutPathJavaScriptLocaleContents(slug, loadedLocale),
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
      getQuestionOutPathQuizLocaleContents(slug, requestedLocale),
    );
  } catch {
    loadedLocale = 'en-US';

    try {
      // Fall back to English
      response = fs.readFileSync(
        getQuestionOutPathQuizLocaleContents(slug, loadedLocale),
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

export async function readQuestionQuizContentsAll(
  listType: QuestionListTypeData,
  requestedLocale = 'en-US',
): Promise<ReadonlyArray<{
  exactMatch: boolean;
  loadedLocale: string;
  question: QuestionQuiz;
}> | null> {
  const { questions } = await fetchQuestionsList(listType, requestedLocale);

  const questionsContents = await Promise.all(
    questions.map((question) =>
      readQuestionQuizContents(question.metadata.slug, requestedLocale),
    ),
  );

  return questionsContents.flatMap((qn) => (qn != null ? [qn] : []));
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
        getQuestionOutPathSystemDesignLocaleContents(slug, requestedLocale),
      );
    } catch {
      loadedLocale = 'en-US';

      // Fallback to English
      return fs.readFileSync(
        getQuestionOutPathSystemDesignLocaleContents(slug, loadedLocale),
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

export async function readQuestionUserInterface({
  codeId,
  frameworkParam,
  isViewerPremium,
  requestedLocale = 'en-US',
  slug,
}: Readonly<{
  codeId?: string;
  frameworkParam?: QuestionFramework | null;
  isViewerPremium: boolean;
  requestedLocale: string;
  slug: string;
}>): Promise<InterviewsQuestionItemUserInterface> {
  const questionOutDir = getQuestionOutPathUserInterface(slug);

  let loadedLocale = requestedLocale;
  const [infoResponse, metadataResponse] = await Promise.all([
    (() => {
      try {
        return fs.readFileSync(
          getQuestionOutPathUserInterfaceLocaleInfo(slug, requestedLocale),
        );
      } catch {
        loadedLocale = 'en-US';

        // Fallback to English
        return fs.readFileSync(
          getQuestionOutPathUserInterfaceLocaleInfo(slug, loadedLocale),
        );
      }
    })(),
    (() => {
      return fs.readFileSync(path.join(questionOutDir, `metadata.json`));
    })(),
  ]);

  const metadata = JSON.parse(
    String(metadataResponse),
  ) as InterviewsQuestionMetadata;
  const info = JSON.parse(String(infoResponse));

  const framework = frameworkParam ?? metadata.frameworkDefault ?? 'vanilla';

  const writeupFile = fs.readFileSync(
    getQuestionOutPathUserInterfaceFrameworkLocaleWriteup(
      slug,
      framework,
      loadedLocale,
    ),
  );

  const writeup = JSON.parse(String(writeupFile));

  const skeletonBundle = (() => {
    const skeleton = fs.readFileSync(
      getQuestionOutPathUserInterfaceFrameworkSetup(
        slug,
        framework,
        'skeleton',
      ),
    );
    const skeletonBundleValue = JSON.parse(String(skeleton));

    return {
      ...skeletonBundleValue,
      writeup: writeup.skeleton,
    } as QuestionUserInterfaceBundle;
  })();

  const solutionBundle = (() => {
    const solution = fs.readFileSync(
      getQuestionOutPathUserInterfaceFrameworkSetup(
        slug,
        framework,
        `${codeId ?? 'solution'}`,
      ),
    );
    const solutionBundleValue = JSON.parse(String(solution));

    const canAccessSolutionWriteup =
      isViewerPremium || metadata.access === 'free';

    const solutionWriteup = canAccessSolutionWriteup
      ? writeup[codeId ?? 'solution']
      : null;
    const solutionWriteupValue =
      solutionWriteup != null ? String(solutionWriteup) : null;

    return {
      ...solutionBundleValue,
      writeup: canAccessSolutionWriteup ? solutionWriteupValue : null,
    } as QuestionUserInterfaceBundle;
  })();

  return {
    description: skeletonBundle.writeup ?? null,
    framework,
    info,
    metadata,
    skeletonBundle,
    solution: solutionBundle?.writeup ?? null,
    solutionBundle,
  };
}
