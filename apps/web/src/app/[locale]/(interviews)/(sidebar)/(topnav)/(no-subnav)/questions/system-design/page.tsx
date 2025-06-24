import type { Metadata } from 'next';

import type { QuestionListTypeData } from '~/components/interviews/questions/common/QuestionsTypes';
import InterviewsQuestionsCategoryPreparePage from '~/components/interviews/questions/listings/category/InterviewsQuestionsCategoryPreparePage';

import { fetchInterviewListingBottomContent } from '~/db/contentlayer/InterviewsListingBottomContentReader';
import { fetchQuestionsCompletionCount } from '~/db/QuestionsCount';
import { fetchQuestionsList } from '~/db/QuestionsListReader';
import { roundQuestionCountToNearestTen } from '~/db/QuestionsUtils';
import { getIntlServerOnly } from '~/i18n';
import defaultMetadata from '~/seo/defaultMetadata';

export const dynamic = 'force-static';

const listType: QuestionListTypeData = {
  tab: 'system-design',
  type: 'practice',
  value: 'practice',
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
  const questionCount = roundQuestionCountToNearestTen(questions.length);

  return defaultMetadata({
    description: intl.formatMessage(
      {
        defaultMessage:
          'Practice {questionCount}+ front end system design interview questions on the architecture of components, apps, games. Reference answers by big tech ex-interviewers.',
        description: 'Page description for interview questions listing',
        id: 'dCKqPL',
      },
      { questionCount },
    ),
    locale,
    ogImageTitle: intl.formatMessage({
      defaultMessage: 'Front End Interview Practice Questions - System Design',
      description: 'Title for front end interview questions page',
      id: 'WGhcfY',
    }),
    pathname: '/questions/system-design',
    socialTitle: intl.formatMessage({
      defaultMessage:
        'Front End Interview Practice Questions - System Design | GreatFrontEnd',
      description: 'Social title for practice questions page',
      id: 'SHXV1e',
    }),
    title: intl.formatMessage(
      {
        defaultMessage:
          '{questionCount}+ Front End System Design Interview Questions',
        description: 'Page title for practice questions page',
        id: 'Z2eqSt',
      },
      { questionCount },
    ),
  });
}

export default async function Page({ params }: Props) {
  const { locale } = params;

  const [
    { questions: systemDesignQuestions },
    questionCompletionCount,
    bottomContent,
  ] = await Promise.all([
    fetchQuestionsList(listType, locale),
    fetchQuestionsCompletionCount(['system-design']),
    fetchInterviewListingBottomContent('questions-system-design'),
  ]);

  return (
    <InterviewsQuestionsCategoryPreparePage
      bottomContent={bottomContent}
      listType={listType}
      questionCompletionCount={questionCompletionCount}
      questions={systemDesignQuestions}
    />
  );
}
