import type { Metadata } from 'next/types';

import { INTERVIEWS_REVAMP_BOTTOM_CONTENT } from '~/data/FeatureFlags';

import CSS3Logo from '~/components/icons/CSS3Logo';
import HTML5Logo from '~/components/icons/HTML5Logo';
import JavaScriptLogo from '~/components/icons/JavaScriptLogo';
import QuestionsCategoryPage from '~/components/interviews/questions/category/QuestionsCategoryPage';
import type {
  QuestionCodingFormat,
  QuestionLanguage,
  QuestionTopic,
  QuestionUserFacingFormat,
} from '~/components/interviews/questions/common/QuestionsTypes';
import {
  filterQuestions,
  sortQuestions,
} from '~/components/interviews/questions/listings/filters/QuestionsProcessor';
import type { QuestionListCategory } from '~/components/interviews/questions/listings/types';

import { fetchInterviewListingBottomContent } from '~/db/contentlayer/InterviewsListingBottomContentReader';
import { fetchQuestionCompletionCount } from '~/db/QuestionsCount';
import {
  fetchQuestionsListCoding,
  fetchQuestionsListQuiz,
} from '~/db/QuestionsListReader';
import { roundQuestionCountToNearestTen } from '~/db/QuestionsUtils';
import { getIntlServerOnly } from '~/i18n';
import { generateStaticParamsWithLocale } from '~/next-i18nostic/src';
import defaultMetadata from '~/seo/defaultMetadata';

const CATEGORY_TO_LANGUAGE: Record<QuestionListCategory, QuestionLanguage> = {
  css: 'css',
  html: 'html',
  js: 'js',
};

const CATEGORY_TO_TOPIC: Record<QuestionListCategory, QuestionTopic> = {
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
      codingFormat: 'algo',
      format: 'coding',
    },
    {
      category: 'js',
      codingFormat: 'javascript',
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
      codingFormat: 'javascript',
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
      codingFormat: 'javascript',
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
  const { category = 'js', rest, locale } = params;

  const intl = await getIntlServerOnly(locale);

  const CategoryStrings: Record<
    QuestionListCategory,
    Readonly<{
      description: (count: number) => string;
      featuredSectionTitle: string;
      logo: (props: React.ComponentProps<'svg'>) => JSX.Element;
      pageTitle: (count: number) => string;
      seoTitle: (count: number) => string;
      titleAddOn?: string;
    }>
  > = {
    css: {
      description: (count: number) =>
        intl.formatMessage(
          {
            defaultMessage:
              '{questionCount}+ CSS interview questions, including quiz-style knowledge questions and CSS coding questions.',
            description: 'Subtitle for CSS questions list page',
            id: 'ZYtAFY',
          },
          {
            questionCount: roundQuestionCountToNearestTen(count),
          },
        ),
      featuredSectionTitle: intl.formatMessage({
        defaultMessage: 'Try these popular CSS questions',
        description: 'Title for featured questions section',
        id: '16RIbp',
      }),
      logo: CSS3Logo,
      pageTitle: () =>
        intl.formatMessage({
          defaultMessage: 'CSS Questions',
          description: 'CSS Questions list page title',
          id: 'LYxZLx',
        }),
      seoTitle: () =>
        intl.formatMessage({
          defaultMessage:
            'Practice Top CSS Front End Interview Questions with Solutions',
          description: 'SEO title for CSS questions list page',
          id: 'MyaXLl',
        }),
    },
    html: {
      description: (count: number) =>
        intl.formatMessage(
          {
            defaultMessage:
              '{questionCount}+ HTML interview questions, including quiz-style knowledge questions and HTML coding questions.',
            description: 'Subtitle for HTML questions list page',
            id: 'NPBHO+',
          },
          {
            questionCount: roundQuestionCountToNearestTen(count),
          },
        ),
      featuredSectionTitle: intl.formatMessage({
        defaultMessage: 'Try these popular HTML questions',
        description: 'Title for featured questions section',
        id: 'Wgz18L',
      }),
      logo: HTML5Logo,
      pageTitle: () =>
        intl.formatMessage({
          defaultMessage: 'HTML Questions',
          description: 'HTML Questions list page title',
          id: 'c7lcjj',
        }),
      seoTitle: () =>
        intl.formatMessage({
          defaultMessage:
            'Practice Top HTML Front End Interview Questions with Solutions',
          description: 'SEO title for HTML questions list page',
          id: '7wqhjF',
        }),
    },
    js: {
      description: (count: number) =>
        intl.formatMessage(
          {
            defaultMessage:
              '{questionCount}+ JavaScript and TypeScript interview questions, from implementing common library APIs, utility functions, algorithms, to building UI components and more.',
            description: 'Subtitle for JavaScript questions list page',
            id: 'fcYNb3',
          },
          {
            questionCount: roundQuestionCountToNearestTen(count),
          },
        ),
      featuredSectionTitle: intl.formatMessage({
        defaultMessage: 'Try these popular JavaScript questions',
        description: 'Title for featured questions section',
        id: 'ke8J8T',
      }),
      logo: JavaScriptLogo,
      pageTitle: () =>
        intl.formatMessage({
          defaultMessage: 'JavaScript Questions',
          description: 'JavaScript Questions list page title',
          id: 'CsuGzS',
        }),
      seoTitle: () =>
        intl.formatMessage({
          defaultMessage:
            'Practice Top JavaScript and TypeScript Front End Interview Questions with Solutions',
          description: 'SEO title for JavaScript questions list page',
          id: '+p6rsI',
        }),
      titleAddOn: intl.formatMessage({
        defaultMessage: 'TypeScript supported',
        description: 'JavaScript questions can be done in TypeScript',
        id: '04Q6JH',
      }),
    },
  };

  const format: QuestionUserFacingFormat | null =
    (rest?.[0] as QuestionUserFacingFormat) ?? null;
  // Coding format is only present when format is coding.
  const codingFormat: QuestionCodingFormat | null =
    format === 'coding' ? (rest?.[1] as QuestionCodingFormat) ?? null : null;

  const language = CATEGORY_TO_LANGUAGE[category];
  const topic = CATEGORY_TO_TOPIC[category];

  const [
    { questions: quizQuestionsAll },
    { questions: codingQuestionsAll },
    questionCompletionCount,
  ] = await Promise.all([
    fetchQuestionsListQuiz(locale),
    fetchQuestionsListCoding(locale),
    fetchQuestionCompletionCount(['user-interface', 'javascript', 'quiz']),
  ]);

  const quizQuestions = filterQuestions(quizQuestionsAll, [
    (question) => question.topics.includes(topic),
  ]);
  const codingQuestions = filterQuestions(codingQuestionsAll, [
    (question) =>
      question.languages.some((languageItem) => languageItem === language),
  ]);

  const totalQuestions = codingQuestions.length + quizQuestions.length;
  const description = CategoryStrings[category].description(totalQuestions);
  const pageTitle = CategoryStrings[category].pageTitle(totalQuestions);
  const seoTitle = CategoryStrings[category].seoTitle(totalQuestions);
  const { featuredSectionTitle, logo, titleAddOn } = CategoryStrings[category];

  return {
    category,
    codingFormat,
    codingQuestions,
    description,
    featuredSectionTitle,
    format,
    language,
    locale,
    logo,
    pageTitle,
    questionCompletionCount,
    quizQuestions,
    seoTitle,
    titleAddOn,
    totalQuestions,
  };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category, locale, seoTitle, description } =
    await processParams(params);

  return defaultMetadata({
    description,
    locale,
    pathname: `/questions/${category}`,
    title: seoTitle,
  });
}

type Props = Readonly<{
  params: Readonly<{
    category: QuestionListCategory;
    locale: string;
    rest: Array<string>;
  }>;
}>;

export default async function Page({ params }: Props) {
  const bottomContent = await fetchInterviewListingBottomContent(
    'javascript-interview-questions',
  );

  const {
    category,
    format,
    codingFormat,
    featuredSectionTitle,
    codingQuestions,
    description,
    logo: Logo,
    pageTitle,
    quizQuestions,
    questionCompletionCount,
    titleAddOn,
  } = await processParams(params);

  const featuredQuestions = (() => {
    if (format == null || format === 'coding') {
      return codingQuestions.filter((question) => question.featured);
    }

    if (format === 'quiz') {
      return quizQuestions.filter((question) => question.featured);
    }

    return [];
  })();

  return (
    <QuestionsCategoryPage
      bottomContent={
        INTERVIEWS_REVAMP_BOTTOM_CONTENT ? bottomContent : undefined
      }
      category={category}
      codingFormat={codingFormat}
      codingQuestions={codingQuestions}
      description={description}
      featuredQuestions={featuredQuestions}
      featuredSectionTitle={featuredSectionTitle}
      format={format}
      logo={<Logo className="size-16 rounded-md" />}
      pageTitle={pageTitle}
      questionCompletionCount={questionCompletionCount}
      quizQuestions={sortQuestions(quizQuestions, 'importance', false)}
      titleAddOnText={titleAddOn}
    />
  );
}
