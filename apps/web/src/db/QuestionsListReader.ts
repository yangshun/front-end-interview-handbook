// Currently we can't make it server-only due to usage within API routes.
// import 'server-only';

// This file reads from filesystem only (hence the term "reader" in the name)
// It's only meant to be used on the server.
import fs from 'node:fs';

import { filterQuestions } from '~/components/questions/common/QuestionsProcessor';
import type {
  QuestionFormat,
  QuestionFramework,
  QuestionMetadata,
  QuestionQuizMetadata,
  QuestionSlug,
} from '~/components/questions/common/QuestionsTypes';
import { ReadyQuestions } from '~/components/questions/content/system-design/SystemDesignConfig';

import { getQuestionsListOutFilenameCoding } from './questions-bundlers/QuestionsBundlerCodingConfig';
import { getQuestionsListOutFilenameJavaScript } from './questions-bundlers/QuestionsBundlerJavaScriptConfig';
import { getQuestionsListOutFilenameQuiz } from './questions-bundlers/QuestionsBundlerQuizConfig';
import { getQuestionsListOutFilenameSystemDesign } from './questions-bundlers/QuestionsBundlerSystemDesignConfig';
import { getQuestionsListOutFilenameUserInterface } from './questions-bundlers/QuestionsBundlerUserInterfaceConfig';

export type QuestionTotalAvailableCount = Record<QuestionFormat, number>;

export async function fetchQuestionsListCount(): Promise<QuestionTotalAvailableCount> {
  const [js, ui, quiz, sd] = await Promise.all([
    fetchQuestionsListJavaScript(),
    fetchQuestionsListUserInterface(),
    fetchQuestionsListQuiz(),
    fetchQuestionsListSystemDesign(),
  ]);

  const sdCount = sd.questions.filter((metadata) =>
    ReadyQuestions.includes(metadata.slug),
  ).length;

  return {
    javascript: js.questions.length,
    quiz: quiz.questions.length,
    'system-design': sdCount,
    'user-interface': ui.questions.length,
  };
}

export async function fetchQuestionsListQuiz(
  requestedLocale = 'en-US',
): Promise<
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
      loadedLocale = 'en-US';

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
  requestedLocale = 'en-US',
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
      loadedLocale = 'en-US';

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
  requestedLocale = 'en-US',
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
      loadedLocale = 'en-US';

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

export async function fetchQuestionsListCoding(
  requestedLocale = 'en-US',
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
        getQuestionsListOutFilenameCoding(requestedLocale),
      );
    } catch {
      loadedLocale = 'en-US';

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
  requestedLocale = 'en-US',
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
      loadedLocale = 'en-US';

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

export async function fetchQuestionsBySlug(
  slugs: Record<QuestionFormat, ReadonlyArray<QuestionSlug>>,
  locale = 'en-US',
): Promise<Record<QuestionFormat, ReadonlyArray<QuestionMetadata>>> {
  const [
    { questions: quizQuestions },
    { questions: jsQuestions },
    { questions: uiQuestions },
    { questions: systemDesignQuestions },
  ] = await Promise.all([
    fetchQuestionsListQuiz(locale),
    fetchQuestionsListJavaScript(locale),
    fetchQuestionsListUserInterface(locale),
    fetchQuestionsListSystemDesign(locale),
  ]);

  // TODO: Improve the lookup.
  const jsQuestionsFiltered = jsQuestions.filter((question) =>
    slugs.javascript.includes(question.slug),
  );
  const uiQuestionsFiltered = uiQuestions.filter((question) =>
    slugs['user-interface'].includes(question.slug),
  );
  const quizQuestionsFiltered = quizQuestions.filter((question) =>
    slugs.quiz.includes(question.slug),
  );
  const systemDesignQuestionsFiltered = systemDesignQuestions.filter(
    (question) => slugs['system-design'].includes(question.slug),
  );

  return {
    javascript: jsQuestionsFiltered,
    quiz: quizQuestionsFiltered,
    'system-design': systemDesignQuestionsFiltered,
    'user-interface': uiQuestionsFiltered,
  };
}
