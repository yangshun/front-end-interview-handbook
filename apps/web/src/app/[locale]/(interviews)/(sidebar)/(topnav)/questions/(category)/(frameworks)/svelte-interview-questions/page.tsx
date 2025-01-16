import type { Metadata } from 'next/types';

import type {
  QuestionFramework,
  QuestionListTypeData,
} from '~/components/interviews/questions/common/QuestionsTypes';
import InterviewsQuestionsCategoryFrameworkPage from '~/components/interviews/questions/listings/category/InterviewsQuestionsCategoryFrameworkPage';

import { fetchInterviewListingBottomContent } from '~/db/contentlayer/InterviewsListingBottomContentReader';
import { readAllFrontEndInterviewGuides } from '~/db/guides/GuidesReader';
import { fetchQuestionsCompletionCount } from '~/db/QuestionsCount';
import { fetchQuestionsList } from '~/db/QuestionsListReader';
import { roundQuestionCountToNearestTen } from '~/db/QuestionsUtils';
import { getIntlServerOnly } from '~/i18n';
import defaultMetadata from '~/seo/defaultMetadata';

export const dynamic = 'force-static';

const framework: QuestionFramework = 'svelte';
const listType: QuestionListTypeData = { type: 'framework', value: framework };

type Props = Readonly<{
  params: Readonly<{
    locale: string;
  }>;
}>;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = params;
  const [intl, { questions }] = await Promise.all([
    getIntlServerOnly(locale),
    fetchQuestionsList({ type: 'framework', value: framework }, locale),
  ]);

  return defaultMetadata({
    description: intl.formatMessage(
      {
        defaultMessage:
          'Practice {questionCount}+ curated Svelte Interview Questions in-browser, with solutions and test cases from big tech ex-interviewers',
        description: 'Description of Interview Questions page',
        id: 'LkjqcQ',
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
        defaultMessage: '{category} Interview Questions',
        description: 'OG image title of framework and language page',
        id: 'uEiI+F',
      },
      {
        category: 'Svelte',
      },
    ),
    pathname: `/questions/svelte-interview-questions`,
    socialTitle: intl.formatMessage({
      defaultMessage:
        'Svelte Interview Questions with Solutions | GreatFrontEnd',
      description: 'Title of React Interview Questions page',
      id: '83G2F2',
    }),
    title: intl.formatMessage({
      defaultMessage:
        'Svelte Interview Questions | Solutions by Ex-FAANG interviewers',
      description: 'Title of React Interview Questions page',
      id: 'uFcyu1',
    }),
  });
}

export default async function Page({ params }: Props) {
  const { locale } = params;
  const [{ questions }, questionCompletionCount, guides, bottomContent] =
    await Promise.all([
      fetchQuestionsList(listType, locale),
      fetchQuestionsCompletionCount(['user-interface']),
      readAllFrontEndInterviewGuides(locale),
      fetchInterviewListingBottomContent('framework-svelte'),
    ]);

  return (
    <InterviewsQuestionsCategoryFrameworkPage
      bottomContent={bottomContent}
      framework={framework}
      guides={guides}
      listType={listType}
      questionCompletionCount={questionCompletionCount}
      questions={questions}
      showCategoryTabs={false}
      totalQuestionsCount={questions.length}
    />
  );
}
