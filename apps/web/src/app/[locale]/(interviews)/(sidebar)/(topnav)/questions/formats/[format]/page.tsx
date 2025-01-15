import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { QuestionFormatSEOToRawMapping } from '~/data/QuestionCategories';

import {
  type QuestionFormat,
  type QuestionFormatSEO,
  type QuestionMetadata,
} from '~/components/interviews/questions/common/QuestionsTypes';
import InterviewsQuestionFormatPage from '~/components/interviews/questions/listings/practice/InterviewsQuestionFormatPage';

import { fetchInterviewListingBottomContent } from '~/db/contentlayer/InterviewsListingBottomContentReader';
import {
  readAllFrontEndInterviewGuides,
  readAllFrontendSystemDesignGuides,
} from '~/db/guides/GuidesReader';
import { fetchQuestionsCompletionCount } from '~/db/QuestionsCount';
import { fetchQuestionsList } from '~/db/QuestionsListReader';
import { roundQuestionCountToNearestTen } from '~/db/QuestionsUtils';
import { getIntlServerOnly } from '~/i18n';
import { generateStaticParamsWithLocale } from '~/next-i18nostic/src';
import defaultMetadata from '~/seo/defaultMetadata';

type Props = Readonly<{
  params: Readonly<{
    format: QuestionFormatSEO;
    locale: string;
  }>;
}>;

async function processParams(params: Props['params']) {
  const { format, locale } = params;
  const questionFormatSEO = format.replace(/\/$/g, '') as QuestionFormatSEO;

  const intl = await getIntlServerOnly(locale);
  const algoSocialTitle = intl.formatMessage({
    defaultMessage: 'Algorithmic Coding Interview Questions',
    description: 'Social title for algo coding question format page',
    id: '2T4Rg2',
  });
  const jsSocialTitle = intl.formatMessage({
    defaultMessage: 'JavaScript Coding Interview Questions',
    description: 'Social title for JavaScript coding question format page',
    id: 'z9RrSL',
  });
  const quizSocialTitle = intl.formatMessage({
    defaultMessage: 'Front End Quiz Interview Questions',
    description: 'Social title for quiz question format page',
    id: '1XIBhp',
  });
  const systemDesignSocialTitle = intl.formatMessage({
    defaultMessage: 'Front End System Design Interview Questions',
    description: 'Social title for System design question format page',
    id: 'CmlQsV',
  });
  const userInterfaceSocialTitle = intl.formatMessage({
    defaultMessage: 'User Interface Coding Interview Questions',
    description: 'Social title for UI question format page',
    id: 'VaPcOr',
  });
  const QuestionFormatStrings: Record<
    QuestionFormat,
    Readonly<{
      description: string;
      ogImageTitle: string;
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
      ogImageTitle: algoSocialTitle,
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
      socialTitle: `${algoSocialTitle} | GreatFrontEnd`,
    },
    javascript: {
      description: intl.formatMessage({
        defaultMessage:
          'Implement JavaScript functions like utility methods, polyfills, or DOM APIs.',
        description: 'JavaScript coding question format page description',
        id: '1a25kg',
      }),
      ogImageTitle: jsSocialTitle,
      pageTitle: intl.formatMessage({
        defaultMessage: 'JavaScript Functions',
        description: 'Page title for JavaScript coding question format',
        id: 'Fvz5KG',
      }),
      seoDescription: intl.formatMessage({
        defaultMessage:
          'Practice JavaScript coding interview questions by implementing utility functions like throttle or polyfills. Code in-browser with solutions from ex-interviewers.',
        description:
          'SEO description for JavaScript coding question format page',
        id: '+NbHNn',
      }),
      seoTitle: () =>
        intl.formatMessage({
          defaultMessage:
            'Practice JavaScript Coding Interview Questions with Solutions',
          description: 'SEO title for JavaScript coding question format page',
          id: 'CJmMgh',
        }),
      socialTitle: `${jsSocialTitle} | GreatFrontEnd`,
    },
    quiz: {
      description: intl.formatMessage({
        defaultMessage:
          'Test your knowledge on front end theory with trivia-style questions on critical front end topics.',
        description: 'Description for quiz question format page',
        id: 'f2JA9U',
      }),
      ogImageTitle: quizSocialTitle,
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
      socialTitle: `${quizSocialTitle} | GreatFrontEnd`,
    },
    'system-design': {
      description: intl.formatMessage({
        defaultMessage:
          'Design scalable and maintainable front-end systems. Deep-dive into real-world scenarios like video streaming or e-commerce.',
        description: 'Description for System design question format page',
        id: 'nyzAxQ',
      }),
      ogImageTitle: systemDesignSocialTitle,
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
      socialTitle: `${systemDesignSocialTitle} | GreatFrontEnd`,
    },
    'user-interface': {
      description: intl.formatMessage({
        defaultMessage:
          'Build dynamic user interfaces using HTML, CSS, JavaScript, or popular UI frameworks like React, Angular, or Vue.',
        description: 'Description for UI question format page',
        id: 'h2eWtB',
      }),
      ogImageTitle: userInterfaceSocialTitle,
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
      socialTitle: `${userInterfaceSocialTitle} | GreatFrontEnd`,
    },
  };

  const questionFormat = QuestionFormatSEOToRawMapping[questionFormatSEO];

  const { seoDescription, socialTitle, pageTitle, description, ogImageTitle } =
    QuestionFormatStrings[questionFormat];
  let seoTitle = QuestionFormatStrings[questionFormat].seoTitle(0);
  let questions: ReadonlyArray<QuestionMetadata> = [];

  if (questionFormat === 'quiz') {
    const { questions: quizQuestions } = await fetchQuestionsList(
      { type: 'format', value: 'quiz' },
      locale,
    );

    seoTitle = QuestionFormatStrings[questionFormat].seoTitle(
      quizQuestions.length,
    );
    questions = quizQuestions;
  }

  if (questionFormat === 'system-design') {
    const { questions: systemDesignQuestions } = await fetchQuestionsList(
      { type: 'format', value: 'system-design' },
      locale,
    );

    questions = systemDesignQuestions;
  }

  if (
    questionFormat === 'algo' ||
    questionFormat === 'javascript' ||
    questionFormat === 'user-interface'
  ) {
    const { questions: qnList } = await fetchQuestionsList(
      { type: 'format', value: questionFormat },
      locale,
    );

    questions = qnList;
  }

  return {
    description,
    ogImageTitle,
    pageTitle,
    questions,
    seoDescription,
    seoTitle,
    socialTitle,
  };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, format } = params;

  try {
    const [intl, { seoTitle, socialTitle, seoDescription, ogImageTitle }] =
      await Promise.all([getIntlServerOnly(locale), processParams(params)]);

    return defaultMetadata({
      description: seoDescription,
      locale,
      ogImagePageType: intl.formatMessage({
        defaultMessage: 'Question formats',
        description: 'OG image page type for question format page',
        id: 'Pp+bFM',
      }),
      ogImageTitle,
      pathname: `/questions/${format}`,
      socialTitle,
      title: seoTitle,
    });
  } catch {
    notFound();
  }
}

export async function generateStaticParams() {
  const questionFormats: Record<QuestionFormatSEO, null> = {
    'algo-coding': null,
    'javascript-functions': null,
    quiz: null,
    'system-design': null,
    'ui-coding': null,
  };

  return generateStaticParamsWithLocale(
    Object.keys(questionFormats).map((questionFormat) => ({
      format: questionFormat,
    })),
  );
}

export default async function Page({ params }: Props) {
  const { format } = params;
  const questionFormatSEO = format.replace(/\/$/g, '') as QuestionFormatSEO;
  const questionFormat = QuestionFormatSEOToRawMapping[questionFormatSEO];

  const [
    { pageTitle, description, questions },
    questionCompletionCount,
    bottomContent,
    guides,
  ] = await Promise.all([
    processParams(params),
    fetchQuestionsCompletionCount([questionFormat]),
    fetchInterviewListingBottomContent(`${format}-question-format`),
    format === 'system-design'
      ? readAllFrontendSystemDesignGuides(params.locale)
      : readAllFrontEndInterviewGuides(params.locale),
  ]);

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
