import type { Metadata } from 'next/types';

import InterviewsQuestionsCategoryFrameworkPage from '~/components/interviews/questions/listings/category/InterviewsQuestionsCategoryFrameworkPage';

import { fetchQuestionCompletionCount } from '~/db/QuestionsCount';
import { fetchCodingQuestionsForFramework } from '~/db/QuestionsListReader';
import { getIntlServerOnly } from '~/i18n';
import defaultMetadata from '~/seo/defaultMetadata';

const framework = 'vue';

export const dynamic = 'force-static';

type Props = Readonly<{
  params: Readonly<{
    locale: string;
  }>;
}>;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = params;

  const intl = await getIntlServerOnly(locale);

  return defaultMetadata({
    description: intl.formatMessage({
      defaultMessage:
        'Top Vue front end interview coding questions to practice, with detailed solutions and explanations by ex-interviewers at FAANG.',
      description: 'Description of Vue Interview Questions page',
      id: 'zkcMQT',
    }),
    locale,
    pathname: `/questions/${framework}`,
    title: intl.formatMessage({
      defaultMessage: 'Practice Vue Interview Questions with Solutions',
      description: 'Title of Vue Interview Questions page',
      id: 'gWoDz/',
    }),
  });
}

export default async function Page() {
  const [questionList, questionCompletionCount] = await Promise.all([
    fetchCodingQuestionsForFramework(framework),
    fetchQuestionCompletionCount(['user-interface']),
  ]);

  const questionListForFramework = questionList.filter((metadata) =>
    metadata.frameworks.some(
      ({ framework: frameworkValue }) => frameworkValue === framework,
    ),
  );

  return (
    <InterviewsQuestionsCategoryFrameworkPage
      framework={framework}
      questionCompletionCount={questionCompletionCount}
      questionList={questionListForFramework}
    />
  );
}
