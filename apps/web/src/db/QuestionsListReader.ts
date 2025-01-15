// Currently we can't make it server-only due to usage within API routes.
// import 'server-only';

// This file reads from filesystem only (hence the term "reader" in the name)
// It's only meant to be used on the server.
import fs from 'node:fs';

import type {
  QuestionCompany,
  QuestionFormat,
  QuestionFormatForList,
  QuestionFramework,
  QuestionHash,
  QuestionLanguage,
  QuestionListTypeData,
  QuestionMetadata,
  QuestionPracticeFormat,
} from '~/components/interviews/questions/common/QuestionsTypes';
import { ReadyQuestions } from '~/components/interviews/questions/content/system-design/SystemDesignConfig';
import { filterQuestions } from '~/components/interviews/questions/listings/filters/QuestionsProcessor';

import { getQuestionsListOutFilenameAlgo } from './questions-bundlers/QuestionsBundlerAlgoConfig';
import { getQuestionsListOutFilenameCoding } from './questions-bundlers/QuestionsBundlerCodingConfig';
import { getQuestionsListOutFilenameJavaScript } from './questions-bundlers/QuestionsBundlerJavaScriptConfig';
import { getQuestionsListOutFilenameQuiz } from './questions-bundlers/QuestionsBundlerQuizConfig';
import { getQuestionsListOutFilenameSystemDesign } from './questions-bundlers/QuestionsBundlerSystemDesignConfig';
import { getQuestionsListOutFilenameUserInterface } from './questions-bundlers/QuestionsBundlerUserInterfaceConfig';
import { unhashQuestion } from './QuestionsUtils';

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

async function fetchQuestionsListQuiz(requestedLocale = 'en-US'): Promise<
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

async function fetchQuestionsListAlgo(requestedLocale = 'en-US'): Promise<
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

async function fetchQuestionsListJavaScript(requestedLocale = 'en-US'): Promise<
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

async function fetchQuestionsListUserInterface(
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

async function fetchQuestionsListForFormat(
  format: QuestionFormatForList,
  requestedLocale = 'en-US',
): Promise<
  Readonly<{
    loadedLocale: string;
    questions: ReadonlyArray<QuestionMetadata>;
  }>
> {
  switch (format) {
    case 'algo':
      return fetchQuestionsListAlgo(requestedLocale);
    case 'javascript':
      return fetchQuestionsListJavaScript(requestedLocale);
    case 'user-interface':
      return fetchQuestionsListUserInterface(requestedLocale);
    case 'system-design':
      return fetchQuestionsListSystemDesign(requestedLocale);
    case 'quiz':
      return fetchQuestionsListQuiz(requestedLocale);
    case 'coding':
      return fetchQuestionsListCoding(requestedLocale);
  }
}

async function fetchQuestionsListCoding(requestedLocale = 'en-US'): Promise<
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

async function fetchQuestionsListSystemDesign(
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

async function fetchQuestionsListForFramework(
  {
    framework,
    format,
  }: { format?: QuestionPracticeFormat; framework: QuestionFramework },
  locale = 'en-US',
): Promise<
  Readonly<{
    loadedLocale: string;
    questions: ReadonlyArray<QuestionMetadata>;
  }>
> {
  const [questionsCoding, questionsQuiz] = await Promise.all([
    fetchQuestionsListCodingForFramework(framework, locale),
    fetchQuestionsListQuizForFramework(framework, locale),
  ]);

  switch (format) {
    case 'coding': {
      return {
        loadedLocale: locale,
        questions: questionsCoding,
      };
    }
    case 'quiz': {
      return {
        loadedLocale: locale,
        questions: questionsQuiz,
      };
    }
    default: {
      return {
        loadedLocale: locale,
        questions: [...questionsCoding, ...questionsQuiz],
      };
    }
  }
}

async function fetchQuestionsListCodingForFramework(
  framework: QuestionFramework,
  locale = 'en-US',
): Promise<ReadonlyArray<QuestionMetadata>> {
  const { questions } = await fetchQuestionsListCoding(locale);

  return filterQuestions(questions, [
    (question) =>
      question.frameworks.some(
        (frameworkItem) => frameworkItem.framework === framework,
      ),
  ]);
}

async function fetchQuestionsListQuizForFramework(
  framework: QuestionFramework,
  locale = 'en-US',
): Promise<ReadonlyArray<QuestionMetadata>> {
  const { questions } = await fetchQuestionsListQuiz(locale);

  return filterQuestions(questions, [
    (question) =>
      question.frameworks.some(
        (frameworkItem) => framework === frameworkItem.framework,
      ),
  ]);
}

async function fetchQuestionsListForLanguage(
  {
    language,
    format,
  }: { format?: QuestionPracticeFormat; language: QuestionLanguage },
  locale = 'en-US',
): Promise<
  Readonly<{
    loadedLocale: string;
    questions: ReadonlyArray<QuestionMetadata>;
  }>
> {
  const [questionsCoding, questionsQuiz] = await Promise.all([
    fetchQuestionsListCodingForLanguage(language, locale),
    fetchQuestionsListQuizForLanguage(language, locale),
  ]);

  switch (format) {
    case 'coding': {
      return {
        loadedLocale: locale,
        questions: questionsCoding,
      };
    }
    case 'quiz': {
      return {
        loadedLocale: locale,
        questions: questionsQuiz,
      };
    }
    default: {
      return {
        loadedLocale: locale,
        questions: [...questionsCoding, ...questionsQuiz],
      };
    }
  }
}

async function fetchQuestionsListCodingForLanguage(
  language: QuestionLanguage,
  locale = 'en-US',
): Promise<ReadonlyArray<QuestionMetadata>> {
  const { questions } = await fetchQuestionsListCoding(locale);

  return filterQuestions(questions, [
    (question) => question.languages.includes(language),
  ]);
}

async function fetchQuestionsListQuizForLanguage(
  language: QuestionLanguage,
  locale = 'en-US',
): Promise<ReadonlyArray<QuestionMetadata>> {
  const { questions } = await fetchQuestionsListQuiz(locale);

  return filterQuestions(questions, [
    (question) =>
      language === 'js' || language === 'ts'
        ? question.topics.includes('javascript')
        : question.topics.includes(language),
  ]);
}

export async function fetchQuestionsListQuizForCompany(
  company: QuestionCompany,
  locale = 'en-US',
): Promise<ReadonlyArray<QuestionMetadata>> {
  const [
    { questions: codingQuestions },
    { questions: quizQuestions },
    { questions: systemDesignQuestions },
  ] = await Promise.all([
    fetchQuestionsListCoding(locale),
    fetchQuestionsListQuiz(locale),
    fetchQuestionsListSystemDesign(locale),
  ]);

  return filterQuestions(
    [...codingQuestions, ...quizQuestions, ...systemDesignQuestions],
    [(question) => question.companies.includes(company)],
  );
}

export async function fetchQuestionsListByHash(
  questionHashes: ReadonlyArray<QuestionHash>,
  locale = 'en-US',
): Promise<ReadonlyArray<QuestionMetadata>> {
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

  const questionMetadata = questionHashes.map((qnHash) => {
    const [format, slug] = unhashQuestion(qnHash);

    // TODO(interviews): Make the lookup more efficient.
    switch (format) {
      case 'algo': {
        return algoQuestions.find((question) => question.slug === slug);
      }
      case 'javascript': {
        return jsQuestions.find((question) => question.slug === slug);
      }
      case 'user-interface': {
        return uiQuestions.find((question) => question.slug === slug);
      }
      case 'system-design': {
        return systemDesignQuestions.find((question) => question.slug === slug);
      }
      case 'quiz': {
        return quizQuestions.find((question) => question.slug === slug);
      }
    }
  });

  return questionMetadata.flatMap((item) => (item != null ? [item] : []));
}

export async function fetchQuestionsList(
  listType: QuestionListTypeData,
  requestedLocale = 'en-US',
): Promise<
  Readonly<{
    loadedLocale: string;
    questions: ReadonlyArray<QuestionMetadata>;
  }>
> {
  switch (listType.type) {
    case 'practice': {
      switch (listType.value) {
        case 'quiz': {
          return await fetchQuestionsListQuiz(requestedLocale);
        }
        case 'system-design': {
          return await fetchQuestionsListSystemDesign(requestedLocale);
        }
        case 'coding':
        default: {
          return await fetchQuestionsListCoding(requestedLocale);
        }
      }
    }
    case 'language': {
      return await fetchQuestionsListForLanguage({
        format: listType.tab,
        language: listType.value,
      });
    }
    case 'framework': {
      return await fetchQuestionsListForFramework({
        format: listType.tab,
        framework: listType.value,
      });
    }
    case 'format': {
      return await fetchQuestionsListForFormat(listType.value, requestedLocale);
    }
    default: {
      throw `Unsupported list type "${listType.value}"`;
    }
  }
}
