// Currently we can't make it server-only due to usage within API routes.
// import 'server-only';

// This file reads from filesystem only (hence the term "reader" in the name)
// It's only meant to be used on the server.
import fs from 'node:fs';

import { filterQuestions } from '~/components/questions/common/QuestionsProcessor';
import type {
  QuestionFramework,
  QuestionMetadata,
  QuestionQuizMetadata,
} from '~/components/questions/common/QuestionsTypes';

import { getQuestionsListOutFilenameCoding } from './questions-bundlers/QuestionsBundlerCodingConfig';
import { getQuestionsListOutFilenameJavaScript } from './questions-bundlers/QuestionsBundlerJavaScriptConfig';
import { getQuestionsListOutFilenameQuiz } from './questions-bundlers/QuestionsBundlerQuizConfig';
import { getQuestionsListOutFilenameSystemDesign } from './questions-bundlers/QuestionsBundlerSystemDesignConfig';
import { getQuestionsListOutFilenameUserInterface } from './questions-bundlers/QuestionsBundlerUserInterfaceConfig';

export async function fetchQuestionsListQuiz(requestedLocale = 'en'): Promise<
  Readonly<{
    loadedLocale: string;
    questions: ReadonlyArray<QuestionQuizMetadata>;
  }>
> {
  let loadedLocale = requestedLocale;
  const response = (() => {
    try {
      return fs.readFileSync(getQuestionsListOutFilenameQuiz(requestedLocale));
    } catch {
      loadedLocale = 'en';

      // Fallback to English.
      return fs.readFileSync(getQuestionsListOutFilenameQuiz(loadedLocale));
    }
  })();

  return {
    loadedLocale,
    questions: JSON.parse(
      String(response),
    ) as ReadonlyArray<QuestionQuizMetadata>,
  };
}

export async function fetchQuestionsListJavaScript(
  requestedLocale = 'en',
): Promise<
  Readonly<{
    loadedLocale: string;
    questions: ReadonlyArray<QuestionMetadata>;
  }>
> {
  let loadedLocale = requestedLocale;
  const response = (() => {
    try {
      return fs.readFileSync(
        getQuestionsListOutFilenameJavaScript(requestedLocale),
      );
    } catch {
      loadedLocale = 'en';

      // Fallback to English.
      return fs.readFileSync(
        getQuestionsListOutFilenameJavaScript(loadedLocale),
      );
    }
  })();

  return {
    loadedLocale,
    questions: JSON.parse(String(response)) as ReadonlyArray<QuestionMetadata>,
  };
}

export async function fetchQuestionsListUserInterface(
  requestedLocale = 'en',
): Promise<
  Readonly<{
    loadedLocale: string;
    questions: ReadonlyArray<QuestionMetadata>;
  }>
> {
  let loadedLocale = requestedLocale;
  const response = (() => {
    try {
      return fs.readFileSync(
        getQuestionsListOutFilenameUserInterface(requestedLocale),
      );
    } catch {
      loadedLocale = 'en';

      // Fallback to English.
      return fs.readFileSync(
        getQuestionsListOutFilenameUserInterface(loadedLocale),
      );
    }
  })();

  return {
    loadedLocale,
    questions: JSON.parse(String(response)) as ReadonlyArray<QuestionMetadata>,
  };
}

export async function fetchQuestionsListCoding(requestedLocale = 'en'): Promise<
  Readonly<{
    loadedLocale: string;
    questions: ReadonlyArray<QuestionMetadata>;
  }>
> {
  let loadedLocale = requestedLocale;
  const response = (() => {
    try {
      return fs.readFileSync(
        getQuestionsListOutFilenameCoding(requestedLocale),
      );
    } catch {
      loadedLocale = 'en';

      // Fallback to English.
      return fs.readFileSync(getQuestionsListOutFilenameCoding(loadedLocale));
    }
  })();

  return {
    loadedLocale,
    questions: JSON.parse(String(response)) as ReadonlyArray<QuestionMetadata>,
  };
}

export async function fetchQuestionsListSystemDesign(
  requestedLocale = 'en',
): Promise<
  Readonly<{
    loadedLocale: string;
    questions: ReadonlyArray<QuestionMetadata>;
  }>
> {
  let loadedLocale = requestedLocale;
  const response = (() => {
    try {
      return fs.readFileSync(
        getQuestionsListOutFilenameSystemDesign(requestedLocale),
      );
    } catch {
      loadedLocale = 'en';

      // Fallback to English.
      return fs.readFileSync(
        getQuestionsListOutFilenameSystemDesign(loadedLocale),
      );
    }
  })();

  return {
    loadedLocale,
    questions: JSON.parse(String(response)) as ReadonlyArray<QuestionMetadata>,
  };
}

export async function fetchCodingQuestionsForFramework(
  framework: QuestionFramework,
): Promise<ReadonlyArray<QuestionMetadata>> {
  const { questions } = await fetchQuestionsListCoding();

  return filterQuestions(questions, [
    (question) =>
      question.frameworks.some(
        (frameworkItem) => framework === frameworkItem.framework,
      ),
  ]);
}
