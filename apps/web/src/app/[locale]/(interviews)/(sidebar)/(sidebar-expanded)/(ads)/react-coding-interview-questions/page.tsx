import type { Metadata } from 'next/types';

import {
  type QuestionFramework,
  QuestionFrameworkLabels,
  type QuestionUserFacingFormat,
} from '~/components/interviews/questions/common/QuestionsTypes';
import InterviewsQuestionsCategoryFrameworkPage from '~/components/interviews/questions/listings/category/InterviewsQuestionsCategoryFrameworkPage';

import { fetchInterviewListingBottomContent } from '~/db/contentlayer/InterviewsListingBottomContentReader';
import { readAllFrontEndInterviewGuides } from '~/db/guides/GuidesReader';
import { fetchQuestionsCompletionCount } from '~/db/QuestionsCount';
import { fetchQuestionsListCodingForFramework } from '~/db/QuestionsListReader';
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

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = params;
  const [intl, questionsCoding] = await Promise.all([
    getIntlServerOnly(locale),
    fetchQuestionsListCodingForFramework(framework, locale),
  ]);

  return defaultMetadata({
    description: intl.formatMessage(
      {
        defaultMessage:
          'Practice {questionCount}+ React Coding Interview Questions. Learn in-browser, with high quality answers written by Big Tech Ex-interviewers',
        description: 'Description of Interview Questions page',
        id: 'dy/I2C',
      },
      {
        questionCount: roundQuestionCountToNearestTen(questionsCoding.length),
      },
    ),
    locale,
    ogImagePageType: intl.formatMessage({
      defaultMessage: 'Frameworks or languages',
      description: 'OG image page title of framework and language page',
      id: '+XLpUw',
    }),
    ogImageTitle: intl.formatMessage(
      {
        defaultMessage: '{category} Coding Interview Questions',
        description: 'Title for framework and language page',
        id: '6mw6d/',
      },
      {
        category: 'React',
      },
    ),
    pathname: `/questions/react-coding-interview-questions`,
    socialTitle: intl.formatMessage({
      defaultMessage:
        'React Coding Interview Questions with Solutions | GreatFrontEnd',
      description: 'Title of React Interview Questions page',
      id: 'gd8jkF',
    }),
    title: intl.formatMessage({
      defaultMessage:
        'React Coding Interview Questions | Solutions by Ex interviewers',
      description: 'Title of React Interview Questions page',
      id: 'Y+6HHl',
    }),
  });
}

export default async function Page({ params }: Props) {
  const { locale } = params;

  const [
    intl,
    questionsCoding,
    questionCompletionCount,
    guides,
    bottomContent,
  ] = await Promise.all([
    getIntlServerOnly(locale),
    fetchQuestionsListCodingForFramework(framework, locale),
    fetchQuestionsCompletionCount(['user-interface']),
    readAllFrontEndInterviewGuides(locale),
    fetchInterviewListingBottomContent('framework-react'),
  ]);

  const category = QuestionFrameworkLabels[framework];

  return (
    <InterviewsQuestionsCategoryFrameworkPage
      bottomContent={bottomContent}
      description={intl.formatMessage(
        {
          defaultMessage:
            '{questionCount}+ most important React Coding Interview Questions: from state management to hooks and component design.',
          description: 'Description of interview questions page',
          id: 'RClfQM',
        },
        {
          questionCount: roundQuestionCountToNearestTen(questionsCoding.length),
        },
      )}
      framework={framework}
      guides={guides}
      questionCompletionCount={questionCompletionCount}
      questions={questionsCoding}
      title={intl.formatMessage(
        {
          defaultMessage: '{category} Coding Interview Questions',
          description: 'Title of interview questions page',
          id: 'TbOere',
        },
        {
          category,
        },
      )}
      totalQuestionsCount={questionsCoding.length}
      userFacingFormat={format}
    />
  );
}
