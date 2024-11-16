import type { Metadata } from 'next/types';

import type { QuestionFramework } from '~/components/interviews/questions/common/QuestionsTypes';
import InterviewsQuestionsCategoryFrameworkPage from '~/components/interviews/questions/listings/category/InterviewsQuestionsCategoryFrameworkPage';

import { readAllFrontEndInterviewGuides } from '~/db/guides/GuidesReader';
import { fetchQuestionCompletionCount } from '~/db/QuestionsCount';
import { fetchCodingQuestionsForFramework } from '~/db/QuestionsListReader';
import { roundQuestionCountToNearestTen } from '~/db/QuestionsUtils';
import { getIntlServerOnly } from '~/i18n';
import defaultMetadata from '~/seo/defaultMetadata';

export const dynamic = 'force-static';

const framework: QuestionFramework = 'vanilla';

type Props = Readonly<{
  params: Readonly<{
    locale: string;
  }>;
}>;

async function processParams(params: Props['params']) {
  const { locale } = params;
  const [intl, questionList] = await Promise.all([
    getIntlServerOnly(locale),
    fetchCodingQuestionsForFramework(framework),
  ]);
  const questionListForFramework = questionList.filter((metadata) =>
    metadata.frameworks.some(
      ({ framework: frameworkValue }) => frameworkValue === framework,
    ),
  );

  return {
    questionListForFramework,
    seoDescription: intl.formatMessage(
      {
        defaultMessage:
          'Practice {questionCount}+ curated Vanilla JavaScript UI Interview Questions in-browser, with solutions and test cases from big tech ex-interviewers',
        description: 'Description of Interview Questions page',
        id: '+5hnxx',
      },
      {
        questionCount: roundQuestionCountToNearestTen(
          questionListForFramework.length,
        ),
      },
    ),
    seoTitle: intl.formatMessage({
      defaultMessage:
        'Vanilla JavaScript UI Interview Questions | Solutions by Ex-FAANG interviewers',
      description: 'Title of React Interview Questions page',
      id: 'bJcVtt',
    }),
    socialTitle: intl.formatMessage({
      defaultMessage:
        'Vanilla JavaScript UI Interview Questions with Solutions | GreatFrontEnd',
      description: 'Title of React Interview Questions page',
      id: 'CbIPy4',
    }),
  };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = params;

  const { seoTitle, seoDescription, socialTitle } = await processParams(params);

  return defaultMetadata({
    description: seoDescription,
    locale,
    pathname: `/questions/${framework}`,
    socialTitle,
    title: seoTitle,
  });
}

export default async function Page({ params }: Props) {
  const [{ questionListForFramework }, questionCompletionCount, guides] =
    await Promise.all([
      processParams(params),
      fetchQuestionCompletionCount(['user-interface']),
      readAllFrontEndInterviewGuides(params.locale),
    ]);

  return (
    <InterviewsQuestionsCategoryFrameworkPage
      framework={framework}
      guides={guides}
      questionCompletionCount={questionCompletionCount}
      questionList={questionListForFramework}
    />
  );
}
