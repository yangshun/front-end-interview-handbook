import type { Metadata } from 'next/types';
import { generateStaticParamsWithLocale } from 'next-i18nostic';

import {
  filterQuestions,
  sortQuestions,
} from '~/components/questions/common/QuestionsProcessor';
import type {
  QuestionCodingFormat,
  QuestionLanguage,
  QuestionQuizTopic,
  QuestionUserFacingFormat,
} from '~/components/questions/common/QuestionsTypes';
import type { QuestionListCategory } from '~/components/questions/listings/types';

import {
  fetchQuestionsListCoding,
  fetchQuestionsListQuiz,
} from '~/db/QuestionsListReader';
import { roundQuestionCountToNearestTen } from '~/db/QuestionsUtils';
import defaultMetadata from '~/seo/defaultMetadata';

import QuestionsCategoryPage from './QuestionsCategoryPage';

const CategoryStrings: Record<
  QuestionListCategory,
  Readonly<{
    description: (count: number) => string;
    pageTitle: (count: number) => string;
    seoTitle: (count: number) => string;
  }>
> = {
  css: {
    description: (count: number) =>
      `${roundQuestionCountToNearestTen(
        count,
      )}+ CSS interview questions, including quiz-style knowledge questions and CSS coding questions.`,
    pageTitle: () => 'CSS Questions',
    seoTitle: () =>
      'Practice Top CSS Front End Interview Questions with Solutions',
  },
  html: {
    description: (count: number) =>
      `${roundQuestionCountToNearestTen(
        count,
      )}+ HTML interview questions, including quiz-style knowledge questions and HTML coding questions.`,
    pageTitle: () => 'HTML Questions',
    seoTitle: () =>
      'Practice Top HTML Front End Interview Questions with Solutions',
  },
  js: {
    description: (count: number) =>
      `${roundQuestionCountToNearestTen(
        count,
      )}+ JavaScript interview questions, from implementing common library APIs, utility functions, algorithms, to building UI components and more.`,
    pageTitle: () => 'JavaScript Questions',
    seoTitle: () =>
      'Practice Top JavaScript Front End Interview Questions with Solutions',
  },
};

const CATEGORY_TO_LANGUAGE: Record<QuestionListCategory, QuestionLanguage> = {
  css: 'css',
  html: 'html',
  js: 'js',
};

const CATEGORY_TO_QUIZ_TOPIC: Record<QuestionListCategory, QuestionQuizTopic> =
  {
    css: 'css',
    html: 'html',
    js: 'javascript',
  };

export async function generateStaticParams() {
  const paths: ReadonlyArray<{
    category: QuestionListCategory;
    codingFormat?: QuestionCodingFormat;
    format?: QuestionUserFacingFormat;
  }> = [
    {
      category: 'js',
    },
    {
      category: 'js',
      format: 'coding',
    },
    {
      category: 'js',
      codingFormat: 'data-structures-algorithms',
      format: 'coding',
    },
    {
      category: 'js',
      codingFormat: 'utilities',
      format: 'coding',
    },
    {
      category: 'js',
      codingFormat: 'user-interface',
      format: 'coding',
    },
    {
      category: 'js',
      format: 'quiz',
    },
    {
      category: 'html',
    },
    {
      category: 'html',
      format: 'coding',
    },
    {
      category: 'html',
      codingFormat: 'utilities',
      format: 'coding',
    },
    {
      category: 'html',
      codingFormat: 'user-interface',
      format: 'coding',
    },
    {
      category: 'html',
      format: 'quiz',
    },
    {
      category: 'css',
    },
    {
      category: 'css',
      format: 'coding',
    },
    {
      category: 'css',
      codingFormat: 'utilities',
      format: 'coding',
    },
    {
      category: 'css',
      codingFormat: 'user-interface',
      format: 'coding',
    },
    {
      category: 'css',
      format: 'quiz',
    },
  ];

  return generateStaticParamsWithLocale(
    paths.map(({ category, format, codingFormat }) => ({
      category,
      rest: [format ?? '', codingFormat ?? ''].filter(Boolean),
    })),
  );
}

async function processParams(params: Props['params']) {
  const { category = 'js', rest } = params;

  const format: QuestionUserFacingFormat | null =
    (rest?.[0] as QuestionUserFacingFormat) ?? null;
  // Coding format is only present when format is coding.
  const codingFormat: QuestionCodingFormat | null =
    format === 'coding' ? (rest?.[1] as QuestionCodingFormat) ?? null : null;

  const language = CATEGORY_TO_LANGUAGE[category];
  const quizTopic = CATEGORY_TO_QUIZ_TOPIC[category];

  const [quizQuestionsAll, codingQuestionsAll] = await Promise.all([
    fetchQuestionsListQuiz(),
    fetchQuestionsListCoding(),
  ]);

  const quizQuestions = filterQuestions(quizQuestionsAll, [
    (question) => question.topics.includes(quizTopic),
  ]);
  const codingQuestions = filterQuestions(codingQuestionsAll, [
    (question) =>
      question.languages.some((languageItem) => languageItem === language),
  ]);

  const totalQuestions = codingQuestions.length + quizQuestions.length;
  const description = CategoryStrings[category].description(totalQuestions);
  const pageTitle = CategoryStrings[category].pageTitle(totalQuestions);
  const seoTitle = CategoryStrings[category].seoTitle(totalQuestions);

  return {
    category,
    codingFormat,
    codingQuestions,
    description,
    format,
    language,
    pageTitle,
    quizQuestions,
    seoTitle,
    totalQuestions,
  };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category, seoTitle, description } = await processParams(params);

  return defaultMetadata({
    description,
    pathname: `/questions/${category}`,
    title: seoTitle,
  });
}

type Props = Readonly<{
  params: Readonly<{
    category: QuestionListCategory;
    rest: Array<string>;
  }>;
}>;

export default async function Page({ params }: Props) {
  const {
    category,
    format,
    codingFormat,
    codingQuestions,
    description,
    pageTitle,
    quizQuestions,
  } = await processParams(params);

  return (
    <QuestionsCategoryPage
      category={category}
      codingFormat={codingFormat}
      codingQuestions={codingQuestions}
      description={description}
      format={format}
      pageTitle={pageTitle}
      quizQuestions={sortQuestions(quizQuestions, 'importance', false)}
    />
  );
}
