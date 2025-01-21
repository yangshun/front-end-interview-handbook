import type { Metadata } from 'next/types';

import type {
  QuestionFramework,
  QuestionListTypeData,
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

const framework: QuestionFramework = 'angular';
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
          'Practice {questionCount}+ curated Angular Interview Questions in-browser, with solutions and test cases from big tech ex-interviewers',
        description: 'Description of Interview Questions page',
        id: '/ZJu61',
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
        category: 'Angular',
      },
    ),
    pathname: `/questions/angular-interview-questions`,
    socialTitle: intl.formatMessage({
      defaultMessage:
        'Angular Interview Questions with Solutions | GreatFrontEnd',
      description: 'Title of React Interview Questions page',
      id: 't6SUbS',
    }),
    title: intl.formatMessage({
      defaultMessage:
        'Angular Interview Questions | Solutions by Ex-FAANG interviewers',
      description: 'Title of React Interview Questions page',
      id: 'j/tNtM',
    }),
  });
}

export default async function Page({ params }: Props) {
  const { locale } = params;

  const [{ questions }, questionCompletionCount, guides, bottomContent] =
    await Promise.all([
      fetchQuestionsList(listType, locale),
      fetchQuestionsCompletionCount(['user-interface']),
      readFrontEndInterviewGuides({
        locale,
        slugs: InterviewsQuestionsFrameworkGuideSlugs,
      }),
      fetchInterviewListingBottomContent('framework-angular'),
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
