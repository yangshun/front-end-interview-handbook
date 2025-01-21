import type { Metadata } from 'next/types';

import type { QuestionListTypeData } from '~/components/interviews/questions/common/QuestionsTypes';
import {
  type QuestionFramework,
  QuestionFrameworkLabels,
  type QuestionPracticeFormat,
} from '~/components/interviews/questions/common/QuestionsTypes';
import InterviewsQuestionsCategoryFrameworkPage from '~/components/interviews/questions/listings/category/InterviewsQuestionsCategoryFrameworkPage';
import { InterviewsQuestionsFrameworkGuideSlugs } from '~/components/interviews/questions/listings/category/InterviewsQuestionsCategoryGuideSlugs';

import { fetchInterviewListingBottomContent } from '~/db/contentlayer/InterviewsListingBottomContentReader';
import { readFrontEndInterviewGuides } from '~/db/guides/GuidesReader';
import { fetchQuestionsCompletionCount } from '~/db/QuestionsCount';
import { fetchQuestionsList } from '~/db/QuestionsListReader';
import { roundQuestionCountToNearestTen } from '~/db/QuestionsUtils';
import { getIntlServerOnly } from '~/i18n';
import defaultMetadata from '~/seo/defaultMetadata';

export const dynamic = 'force-static';

const framework: QuestionFramework = 'react';
const practiceFormat: QuestionPracticeFormat = 'coding';
const listType: QuestionListTypeData = {
  tab: practiceFormat,
  type: 'framework',
  value: framework,
};

type Props = Readonly<{
  params: Readonly<{
    locale: string;
  }>;
}>;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = params;
  const [intl, { questions }] = await Promise.all([
    getIntlServerOnly(locale),
    fetchQuestionsList(listType, locale),
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
        questionCount: roundQuestionCountToNearestTen(questions.length),
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

  const [intl, { questions }, questionCompletionCount, guides, bottomContent] =
    await Promise.all([
      getIntlServerOnly(locale),
      fetchQuestionsList(listType, locale),
      fetchQuestionsCompletionCount(['user-interface']),
      readFrontEndInterviewGuides({
        locale,
        slugs: InterviewsQuestionsFrameworkGuideSlugs,
      }),
      fetchInterviewListingBottomContent('react-coding-interview-questions'),
    ]);

  const category = QuestionFrameworkLabels[framework];
  const title = intl.formatMessage(
    {
      defaultMessage: '{category} Coding Interview Questions',
      description: 'Title of interview questions page',
      id: 'TbOere',
    },
    {
      category,
    },
  );

  const listTypeWithTitle = {
    ...listType,
    title,
  };

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
          questionCount: roundQuestionCountToNearestTen(questions.length),
        },
      )}
      framework={framework}
      guides={guides}
      listType={listTypeWithTitle}
      questionCompletionCount={questionCompletionCount}
      questions={questions}
      showCategoryTabs={false}
      title={title}
      totalQuestionsCount={questions.length}
    />
  );
}
