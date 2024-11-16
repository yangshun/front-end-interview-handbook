import type { Metadata } from 'next/types';

import InterviewsQuestionsCategoryFrameworkPage from '~/components/interviews/questions/listings/category/InterviewsQuestionsCategoryFrameworkPage';

import { readAllFrontEndInterviewGuides } from '~/db/guides/GuidesReader';
import { fetchQuestionCompletionCount } from '~/db/QuestionsCount';
import { fetchCodingQuestionsForFramework } from '~/db/QuestionsListReader';
import { roundQuestionCountToNearestTen } from '~/db/QuestionsUtils';
import { getIntlServerOnly } from '~/i18n';
import defaultMetadata from '~/seo/defaultMetadata';

const framework = 'vue';

export const dynamic = 'force-static';

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
          'Practice {questionCount}+ curated Vue Interview Questions in-browser, with solutions and test cases from big tech ex-interviewers',
        description: 'Description of Interview Questions page',
        id: 'ih/GUI',
      },
      {
        questionCount: roundQuestionCountToNearestTen(
          questionListForFramework.length,
        ),
      },
    ),
    seoTitle: intl.formatMessage({
      defaultMessage:
        'Vue Interview Questions | Solutions by Ex-FAANG interviewers',
      description: 'Title of React Interview Questions page',
      id: '4AAKga',
    }),
    socialTitle: intl.formatMessage({
      defaultMessage: 'Vue Interview Questions with Solutions | GreatFrontEnd',
      description: 'Title of React Interview Questions page',
      id: '0+Zgu8',
    }),
  };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = params;

  const { socialTitle, seoDescription, seoTitle } = await processParams(params);

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
