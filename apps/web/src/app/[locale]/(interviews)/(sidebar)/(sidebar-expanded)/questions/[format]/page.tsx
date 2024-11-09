import type { Metadata } from 'next';

import type { GuideCardMetadata } from '~/components/guides/types';
import type {
  QuestionFormat,
  QuestionMetadata,
} from '~/components/interviews/questions/common/QuestionsTypes';
import InterviewsQuestionFormatPage from '~/components/interviews/questions/listings/practice/InterviewsQuestionFormatPage';

import { fetchInterviewListingBottomContent } from '~/db/contentlayer/InterviewsListingBottomContentReader';
import { readAllFrontEndInterviewGuides } from '~/db/guides/GuidesReader';
import { fetchQuestionCompletionCount } from '~/db/QuestionsCount';
import {
  fetchQuestionsListCoding,
  fetchQuestionsListQuiz,
  fetchQuestionsListSystemDesign,
} from '~/db/QuestionsListReader';
import { roundQuestionCountToNearestTen } from '~/db/QuestionsUtils';
import { getIntlServerOnly } from '~/i18n';
import { generateStaticParamsWithLocale } from '~/next-i18nostic/src';
import defaultMetadata from '~/seo/defaultMetadata';

type Props = Readonly<{
  params: Readonly<{
    format: QuestionFormat;
    locale: string;
  }>;
}>;

async function processParams(params: Props['params']) {
  const { format, locale } = params;
  const questionFormat = format.replace(/\/$/g, '') as QuestionFormat;

  const intl = await getIntlServerOnly(locale);

  const QuestionFormatStrings: Record<
    QuestionFormat,
    Readonly<{
      description: string;
      pageTitle: string;
      seoDescription: string;
      seoTitle: (count: number) => string;
      socialTitle: string;
    }>
  > = {
    algo: {
      description: intl.formatMessage({
        defaultMessage:
          'Solve coding challenges involving performance-optimized data structures and algorithms.',
        description: 'Description for algo coding question format page',
        id: 'PPjL+V',
      }),
      pageTitle: intl.formatMessage({
        defaultMessage: 'Algorithmic Coding',
        description: 'Page title for algo coding question format page',
        id: 'W+UJZA',
      }),
      seoDescription: intl.formatMessage({
        defaultMessage:
          'Practice data structures and algorithms interview questions, solved in JavaScript/TypeScript. Code in-browser with curated solutions from ex-interviewers.',
        description: 'SEO description for algo coding question format page',
        id: 'wJYG50',
      }),
      seoTitle: () =>
        intl.formatMessage({
          defaultMessage:
            'Practice Front End Algorithmic Coding Interview Questions',
          description: 'SEO title for algo coding question format page',
          id: 'JCAJF/',
        }),
      socialTitle: intl.formatMessage({
        defaultMessage:
          'Algorithmic Coding Interview Questions | GreatFrontEnd',
        description: 'Social title for algo coding question format page',
        id: 'jPrd8a',
      }),
    },
    javascript: {
      description: intl.formatMessage({
        defaultMessage:
          'Implement JavaScript functions like utility methods, polyfills, or DOM APIs.',
        description: 'Javascript coding question format page description',
        id: 'rHrbfF',
      }),
      pageTitle: intl.formatMessage({
        defaultMessage: 'JavaScript Coding',
        description: 'Page title for Javascript coding question format',
        id: '8viqEG',
      }),
      seoDescription: intl.formatMessage({
        defaultMessage:
          'Practice JavaScript coding interview questions by implementing utility functions like throttle or polyfills. Code in-browser with solutions from ex-interviewers.',
        description:
          'SEO description for Javascript coding question format page',
        id: 'yC3EoK',
      }),
      seoTitle: () =>
        intl.formatMessage({
          defaultMessage:
            'Practice JavaScript Coding Interview Questions with Solutions',
          description: 'SEO title for Javascript coding question format page',
          id: 'Rrs+sq',
        }),
      socialTitle: intl.formatMessage({
        defaultMessage: 'JavaScript Coding Interview Questions | GreatFrontEnd',
        description: 'Social title for Javascript coding question format page',
        id: 'p53i2S',
      }),
    },
    quiz: {
      description: intl.formatMessage({
        defaultMessage:
          'Test your knowledge on front end theory with trivia-style questions on critical front end topics.',
        description: 'Description for quiz question format page',
        id: 'f2JA9U',
      }),
      pageTitle: intl.formatMessage({
        defaultMessage: 'Front End Quiz Questions',
        description: 'Page title for quiz question format page',
        id: 'FsGLoP',
      }),
      seoDescription: intl.formatMessage({
        defaultMessage:
          'Practice front end interview questions in the format of quizzes on topics like JavaScript, CSS, Accessibility, Performance, and more. Solutions by ex-interviewers.',
        description: 'SEO description for quiz question format page',
        id: 'UsEDlN',
      }),
      seoTitle: (count) =>
        intl.formatMessage(
          {
            defaultMessage:
              'Practice {questionCount}+ Front End Quiz Interview Questions with Answers',
            description: 'SEO title for quiz question format page',
            id: 'vhvbP/',
          },
          {
            questionCount: roundQuestionCountToNearestTen(count),
          },
        ),
      socialTitle: intl.formatMessage({
        defaultMessage: 'Front End Quiz Interview Questions | GreatFrontEnd',
        description: 'Social title for quiz question format page',
        id: '9n2L5+',
      }),
    },
    'system-design': {
      description: intl.formatMessage({
        defaultMessage:
          'Design scalable and maintainable front-end systems. Deep-dive into real-world scenarios like video streaming or e-commerce.',
        description: 'Description for System design question format page',
        id: 'nyzAxQ',
      }),
      pageTitle: intl.formatMessage({
        defaultMessage: 'Front End System Design',
        description: 'Page title for System design question format page',
        id: 'LmwfmQ',
      }),
      seoDescription: intl.formatMessage({
        defaultMessage:
          "Practice front end system design interview questions by describing how you'd architect UI components, apps, or games. Get detailed solutions from ex-interviewers.",
        description: 'SEO description for System design question format page',
        id: 'HDAMDM',
      }),
      seoTitle: () =>
        intl.formatMessage({
          defaultMessage:
            'Front End System Design Interview Questions with Solutions',
          description: 'SEO title for System design question format page',
          id: 'mtdzmn',
        }),
      socialTitle: intl.formatMessage({
        defaultMessage:
          'Front End System Design Interview Questions | GreatFrontEnd',
        description: 'Social title for System design question format page',
        id: 'fnBudE',
      }),
    },
    'user-interface': {
      description: intl.formatMessage({
        defaultMessage:
          'Build dynamic user interfaces using HTML, CSS, JavaScript, or popular UI frameworks like React, Angular, or Vue.',
        description: 'Description for UI question format page',
        id: 'h2eWtB',
      }),
      pageTitle: intl.formatMessage({
        defaultMessage: 'User Interface Coding',
        description: 'Page title for UI question format page',
        id: 'MU0N83',
      }),
      seoDescription: intl.formatMessage({
        defaultMessage:
          'Practice front end interview questions requiring you to build UI with HTML, CSS, JavaScript/TypeScript, or React, Angular, and Vue. Solutions and tests from ex-interviewers.',
        description: 'SEO description for UI question format page',
        id: '9uTTIS',
      }),
      seoTitle: () =>
        intl.formatMessage({
          defaultMessage:
            'Practice User Interface Interview Questions with Solutions',
          description: 'SEO title for UI question format page',
          id: 'UQMNWX',
        }),
      socialTitle: intl.formatMessage({
        defaultMessage:
          'User Interfaces Coding Interview Questions | GreatFrontEnd',
        description: 'Social title for UI question format page',
        id: 'N7Nseb',
      }),
    },
  };

  const { description } = QuestionFormatStrings[questionFormat];
  const { pageTitle } = QuestionFormatStrings[questionFormat];
  const { socialTitle } = QuestionFormatStrings[questionFormat];
  const { seoDescription } = QuestionFormatStrings[questionFormat];
  let seoTitle = QuestionFormatStrings[questionFormat].seoTitle(0);
  let questions: ReadonlyArray<QuestionMetadata> = [];

  if (questionFormat === 'quiz') {
    const { questions: quizQuestions } = await fetchQuestionsListQuiz(locale);

    seoTitle = QuestionFormatStrings[questionFormat].seoTitle(
      quizQuestions.length,
    );
    questions = quizQuestions;
  }

  if (questionFormat === 'system-design') {
    const { questions: systemDesignQuestions } =
      await fetchQuestionsListSystemDesign(locale);

    questions = systemDesignQuestions;
  }

  if (
    questionFormat === 'algo' ||
    questionFormat === 'javascript' ||
    questionFormat === 'user-interface'
  ) {
    const { questions: codingQuestions } =
      await fetchQuestionsListCoding(locale);
    const algoQuestions = codingQuestions.filter(
      (question) => question.format === 'algo',
    );
    const jsQuestions = codingQuestions.filter(
      (question) => question.format === 'javascript',
    );
    const uiQuestions = codingQuestions.filter(
      (question) => question.format === 'user-interface',
    );

    questions =
      questionFormat === 'algo'
        ? algoQuestions
        : questionFormat === 'javascript'
          ? jsQuestions
          : questionFormat === 'user-interface'
            ? uiQuestions
            : [];
  }

  return {
    description,
    pageTitle,
    questions,
    seoDescription,
    seoTitle,
    socialTitle,
  };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, format } = params;

  const { seoTitle, socialTitle, seoDescription } = await processParams(params);

  return defaultMetadata({
    description: seoDescription,
    locale,
    pathname: `/interviews/${format}`,
    socialTitle,
    title: seoTitle,
  });
}

export async function generateStaticParams() {
  const questionFormats: Record<QuestionFormat, null> = {
    algo: null,
    javascript: null,
    quiz: null,
    'system-design': null,
    'user-interface': null,
  };

  return generateStaticParamsWithLocale(
    Object.keys(questionFormats).map((questionFormat) => ({
      format: questionFormat,
    })),
  );
}

export default async function Page({ params }: Props) {
  const { format } = params;
  const questionFormat = format.replace(/\/$/g, '') as QuestionFormat;

  // TODO(interviews): add notFound() experience.

  const [
    { pageTitle, description, questions },
    questionCompletionCount,
    bottomContent,
  ] = await Promise.all([
    processParams(params),
    fetchQuestionCompletionCount([questionFormat]),
    fetchInterviewListingBottomContent(`${format}-question-format`),
  ]);
  let guides: ReadonlyArray<GuideCardMetadata> = [];

  // Need to show guides card only for javascript and algo format question
  if (questionFormat === 'javascript' || questionFormat === 'algo') {
    guides = await readAllFrontEndInterviewGuides(params.locale);
  }

  return (
    <InterviewsQuestionFormatPage
      bottomContent={bottomContent}
      description={description}
      format={questionFormat}
      guides={guides}
      questionCompletionCount={questionCompletionCount}
      questions={questions}
      title={pageTitle}
    />
  );
}
