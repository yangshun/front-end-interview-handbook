import type { Metadata } from 'next/types';

import type {
  QuestionFramework,
  QuestionUserFacingFormat,
} from '~/components/interviews/questions/common/QuestionsTypes';
import InterviewsQuestionsCategoryFrameworkPage from '~/components/interviews/questions/listings/category/InterviewsQuestionsCategoryFrameworkPage';

import { fetchInterviewListingBottomContent } from '~/db/contentlayer/InterviewsListingBottomContentReader';
import { readAllFrontEndInterviewGuides } from '~/db/guides/GuidesReader';
import { fetchQuestionsCompletionCount } from '~/db/QuestionsCount';
import {
  fetchQuestionsListCodingForFramework,
  fetchQuestionsListQuizForFramework,
} from '~/db/QuestionsListReader';
import { roundQuestionCountToNearestTen } from '~/db/QuestionsUtils';
import { getIntlServerOnly } from '~/i18n';
import defaultMetadata from '~/seo/defaultMetadata';

const framework: QuestionFramework = 'react';
const format: QuestionUserFacingFormat = 'coding';

export const dynamic = 'force-static';

type Props = Readonly<{
  params: Readonly<{
    locale: string;
  }>;
}>;

async function processParams(params: Props['params']) {
  const { locale } = params;
  const [intl, questionsCoding, questionsQuiz] = await Promise.all([
    getIntlServerOnly(locale),
    fetchQuestionsListCodingForFramework(framework, locale),
    fetchQuestionsListQuizForFramework(framework, locale),
  ]);

  return {
    ogImagePageType: intl.formatMessage({
      defaultMessage: 'Frameworks or languages',
      description: 'OG image page title of framework and language page',
      id: '+XLpUw',
    }),
    ogImageTitle: intl.formatMessage(
      {
        defaultMessage: '{category} Interview Questions',
        description: 'OG image title of framework and language page',
        id: 'uEiI+F',
      },
      {
        category: 'React',
      },
    ),
    questionsCoding,
    seoDescription: intl.formatMessage(
      {
        defaultMessage:
          'Practice {questionCount}+ curated React Interview Questions in-browser, with solutions and test cases from big tech ex-interviewers',
        description: 'Description of Interview Questions page',
        id: 'muCdsx',
      },
      {
        questionCount: roundQuestionCountToNearestTen(
          questionsCoding.length + questionsQuiz.length,
        ),
      },
    ),
    seoTitle: intl.formatMessage({
      defaultMessage:
        'React Interview Questions | Solutions by Ex-FAANG interviewers',
      description: 'Title of React Interview Questions page',
      id: '4+51tF',
    }),
    socialTitle: intl.formatMessage({
      defaultMessage:
        'React Interview Questions with Solutions | GreatFrontEnd',
      description: 'Title of React Interview Questions page',
      id: '/zdDbr',
    }),
  };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = params;
  const {
    seoDescription,
    seoTitle,
    socialTitle,
    ogImagePageType,
    ogImageTitle,
  } = await processParams(params);

  return defaultMetadata({
    description: seoDescription,
    locale,
    ogImagePageType,
    ogImageTitle,
    pathname: `/questions/react-interview-questions`,
    socialTitle,
    title: seoTitle,
  });
}

export default async function Page({ params }: Props) {
  const { locale } = params;

  const [
    questionsCoding,
    questionsQuiz,
    questionCompletionCount,
    guides,
    bottomContent,
  ] = await Promise.all([
    fetchQuestionsListCodingForFramework(framework, locale),
    fetchQuestionsListQuizForFramework(framework, locale),
    fetchQuestionsCompletionCount(['user-interface']),
    readAllFrontEndInterviewGuides(locale),
    fetchInterviewListingBottomContent('framework-react'),
  ]);

  return (
    <InterviewsQuestionsCategoryFrameworkPage
      bottomContent={bottomContent}
      framework={framework}
      guides={guides}
      questionCompletionCount={questionCompletionCount}
      questions={questionsCoding}
      totalQuestionsCount={questionsCoding.length + questionsQuiz.length}
      userFacingFormat={format}
    />
  );
}
