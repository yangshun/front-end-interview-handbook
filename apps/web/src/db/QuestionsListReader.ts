// Currently we can't make it server-only due to usage within API routes.
// import 'server-only';

// This file reads from filesystem only (hence the term "reader" in the name)
// It's only meant to be used on the server.
import fs from 'node:fs';

import type {
  QuestionFormat,
  QuestionFramework,
  QuestionLanguage,
  QuestionMetadata,
  QuestionSlug,
} from '~/components/interviews/questions/common/QuestionsTypes';
import { ReadyQuestions } from '~/components/interviews/questions/content/system-design/SystemDesignConfig';
import { filterQuestions } from '~/components/interviews/questions/listings/filters/QuestionsProcessor';

import { getQuestionsListOutFilenameAlgo } from './questions-bundlers/QuestionsBundlerAlgoConfig';
import { getQuestionsListOutFilenameCoding } from './questions-bundlers/QuestionsBundlerCodingConfig';
import { getQuestionsListOutFilenameJavaScript } from './questions-bundlers/QuestionsBundlerJavaScriptConfig';
import { getQuestionsListOutFilenameQuiz } from './questions-bundlers/QuestionsBundlerQuizConfig';
import { getQuestionsListOutFilenameSystemDesign } from './questions-bundlers/QuestionsBundlerSystemDesignConfig';
import { getQuestionsListOutFilenameUserInterface } from './questions-bundlers/QuestionsBundlerUserInterfaceConfig';

export type QuestionTotalAvailableCount = Record<QuestionFormat, number>;

export async function fetchQuestionsListCount(): Promise<QuestionTotalAvailableCount> {
  const [algo, js, ui, quiz, sd] = await Promise.all([
    fetchQuestionsListAlgo(),
    fetchQuestionsListJavaScript(),
    fetchQuestionsListUserInterface(),
    fetchQuestionsListQuiz(),
    fetchQuestionsListSystemDesign(),
  ]);

  const sdCount = sd.questions.filter((metadata) =>
    ReadyQuestions.includes(metadata.slug),
  ).length;

  return {
    algo: algo.questions.length,
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
    questions: ReadonlyArray<QuestionMetadata>;
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
    questions: JSON.parse(String(response)) as ReadonlyArray<QuestionMetadata>,
  };
}

export async function fetchQuestionsListAlgo(
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
      return fs.readFileSync(getQuestionsListOutFilenameAlgo(requestedLocale));
    } catch {
      loadedLocale = 'en-US';

      // Fallback to English.
      return fs.readFileSync(getQuestionsListOutFilenameAlgo(loadedLocale));
    }
  })();

  return {
    loadedLocale,
    questions: JSON.parse(String(response)) as ReadonlyArray<QuestionMetadata>,
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
    { questions: algoQuestions },
    { questions: jsQuestions },
    { questions: uiQuestions },
    { questions: systemDesignQuestions },
  ] = await Promise.all([
    fetchQuestionsListQuiz(locale),
    fetchQuestionsListAlgo(locale),
    fetchQuestionsListJavaScript(locale),
    fetchQuestionsListUserInterface(locale),
    fetchQuestionsListSystemDesign(locale),
  ]);

  // TODO(interviews): Improve the lookup.
  const algoQuestionsFiltered = algoQuestions.filter((question) =>
    slugs.algo.includes(question.slug),
  );
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
    algo: algoQuestionsFiltered,
    javascript: jsQuestionsFiltered,
    quiz: quizQuestionsFiltered,
    'system-design': systemDesignQuestionsFiltered,
    'user-interface': uiQuestionsFiltered,
  };
}

export async function categorizeQuestionsByFrameworkAndLanguage(
  locale = 'en-US',
): Promise<
  Readonly<{
    framework: Record<QuestionFramework, ReadonlyArray<QuestionMetadata>>;
    language: Record<QuestionLanguage, ReadonlyArray<QuestionMetadata>>;
  }>
> {
  const { questions: codingQuestions } = await fetchQuestionsListCoding(locale);
  const { questions: quizQuestions } = await fetchQuestionsListQuiz(locale);
  const allQuestions = [...codingQuestions, ...quizQuestions];

  const framework = {
    angular: filterQuestions(codingQuestions, [
      (question) =>
        question.frameworks.some(
          (frameworkItem) => 'angular' === frameworkItem.framework,
        ),
    ]),
    react: filterQuestions(codingQuestions, [
      (question) =>
        question.frameworks.some(
          (frameworkItem) => 'react' === frameworkItem.framework,
        ),
    ]),
    svelte: filterQuestions(codingQuestions, [
      (question) =>
        question.frameworks.some(
          (frameworkItem) => 'svelte' === frameworkItem.framework,
        ),
    ]),
    vanilla: filterQuestions(codingQuestions, [
      (question) =>
        question.frameworks.some(
          (frameworkItem) => 'vanilla' === frameworkItem.framework,
        ),
    ]),
    vue: filterQuestions(codingQuestions, [
      (question) =>
        question.frameworks.some(
          (frameworkItem) => 'vue' === frameworkItem.framework,
        ),
    ]),
  };

  const language = {
    css: filterQuestions(allQuestions, [
      (question) =>
        question.languages.includes('css') || question.topics.includes('css'),
    ]),
    html: filterQuestions(allQuestions, [
      (question) =>
        question.languages.includes('html') || question.topics.includes('html'),
    ]),
    js: filterQuestions(allQuestions, [
      (question) =>
        question.languages.includes('js') ||
        question.topics.includes('javascript'),
    ]),

    ts: filterQuestions(allQuestions, [
      (question) => question.languages.includes('ts'),
    ]),
  };

  return {
    framework,
    language,
  };
}
