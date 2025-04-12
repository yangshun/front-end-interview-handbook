// Currently we can't make it server-only due to usage within API routes.
// import 'server-only';

// This file reads from filesystem only (hence the term "reader" in the name)
// It's only meant to be used on the server.
import fs from 'node:fs';
import nullthrows from 'nullthrows';

import type {
  QuestionCodingFormat,
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
import { hashQuestion } from './QuestionsUtils';

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
  locale: string,
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
  locale: string,
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
  locale: string,
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
  locale: string,
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
  locale: string,
): Promise<ReadonlyArray<QuestionMetadata>> {
  const { questions } = await fetchQuestionsListCoding(locale);

  return filterQuestions(questions, [
    (question) => question.languages.includes(language),
  ]);
}

async function fetchQuestionsListQuizForLanguage(
  language: QuestionLanguage,
  locale: string,
): Promise<ReadonlyArray<QuestionMetadata>> {
  const { questions } = await fetchQuestionsListQuiz(locale);

  return filterQuestions(questions, [
    (question) =>
      language === 'js' || language === 'ts'
        ? question.topics.includes('javascript')
        : question.topics.includes(language),
  ]);
}

export async function fetchQuestionsListForCompany(
  company: QuestionCompany,
  locale: string,
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
  locale: string,
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

  const qnHashToQnMetadataMap = new Map<
    QuestionHash,
    Readonly<QuestionMetadata>
  >(
    [
      ...quizQuestions,
      ...algoQuestions,
      ...jsQuestions,
      ...uiQuestions,
      ...systemDesignQuestions,
    ].map((qn) => [hashQuestion({ format: qn.format, slug: qn.slug }), qn]),
  );

  const questionMetadata = questionHashes.map((qnHash) =>
    qnHashToQnMetadataMap.get(qnHash),
  );

  return questionMetadata.flatMap((item) => (item != null ? [item] : []));
}

function filterQuestionByCodingFormat(
  questions: ReadonlyArray<QuestionMetadata>,
  formats: ReadonlyArray<QuestionCodingFormat>,
) {
  if (formats.length === 0) {
    return questions;
  }

  return questions.filter(
    (metadata) =>
      formats.findIndex((format) => format === metadata.format) >= 0,
  );
}

export async function fetchQuestionsList(
  listType: QuestionListTypeData,
  requestedLocale: string,
): Promise<
  Readonly<{
    loadedLocale: string;
    questions: ReadonlyArray<QuestionMetadata>;
  }>
> {
  switch (listType.type) {
    case 'practice': {
      switch (listType.tab) {
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
      const results = await fetchQuestionsListForLanguage(
        {
          format: listType.tab,
          language: listType.value,
        },
        requestedLocale,
      );

      return {
        loadedLocale: results.loadedLocale,
        questions: filterQuestionByCodingFormat(
          results.questions,
          listType.filters?.formats ?? [],
        ),
      };
    }
    case 'framework': {
      const results = await fetchQuestionsListForFramework(
        {
          format: listType.tab,
          framework: listType.value,
        },
        requestedLocale,
      );

      return {
        loadedLocale: results.loadedLocale,
        questions: filterQuestionByCodingFormat(
          results.questions,
          listType.filters?.formats ?? [],
        ),
      };
    }
    case 'format': {
      return await fetchQuestionsListForFormat(listType.value, requestedLocale);
    }
    default: {
      throw `Unsupported list type "${listType.value}"`;
    }
  }
}

export async function fetchQuestion(
  metadata: Readonly<{
    format: QuestionFormat;
    slug: string;
  }>,
  requestedLocale: string,
): Promise<{ loadedLocale: string; question: QuestionMetadata }> {
  const [
    { questions: quizQuestions, loadedLocale: quizLoadedLocale },
    { questions: algoQuestions, loadedLocale: algoLoadedLocale },
    { questions: jsQuestions, loadedLocale: jsLoadedLocale },
    { questions: uiQuestions, loadedLocale: uiLoadedLocale },
    {
      questions: systemDesignQuestions,
      loadedLocale: systemDesignLoadedLocale,
    },
  ] = await Promise.all([
    fetchQuestionsListQuiz(requestedLocale),
    fetchQuestionsListAlgo(requestedLocale),
    fetchQuestionsListJavaScript(requestedLocale),
    fetchQuestionsListUserInterface(requestedLocale),
    fetchQuestionsListSystemDesign(requestedLocale),
  ]);

  const { format, slug } = metadata;

  switch (format) {
    case 'algo': {
      return {
        loadedLocale: algoLoadedLocale,
        question: nullthrows(
          algoQuestions.find((question) => question.slug === slug),
        ),
      };
    }
    case 'javascript': {
      return {
        loadedLocale: jsLoadedLocale,
        question: nullthrows(
          jsQuestions.find((question) => question.slug === slug),
        ),
      };
    }
    case 'user-interface': {
      return {
        loadedLocale: uiLoadedLocale,
        question: nullthrows(
          uiQuestions.find((question) => question.slug === slug),
        ),
      };
    }
    case 'system-design': {
      return {
        loadedLocale: systemDesignLoadedLocale,
        question: nullthrows(
          systemDesignQuestions.find((question) => question.slug === slug),
        ),
      };
    }
    case 'quiz': {
      return {
        loadedLocale: quizLoadedLocale,
        question: nullthrows(
          quizQuestions.find((question) => question.slug === slug),
        ),
      };
    }
  }
}
