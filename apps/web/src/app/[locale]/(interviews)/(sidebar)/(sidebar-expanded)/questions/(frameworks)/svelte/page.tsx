import type { Metadata } from 'next/types';

import InterviewsQuestionsFrameworkDefaultPage from '~/components/interviews/questions/listings/frameworks/InterviewsQuestionsFrameworkDefaultPage';

import { fetchQuestionCompletionCount } from '~/db/QuestionsCount';
import { fetchCodingQuestionsForFramework } from '~/db/QuestionsListReader';
import { getIntlServerOnly } from '~/i18n';
import defaultMetadata from '~/seo/defaultMetadata';

const framework = 'svelte';

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
        'Top Svelte front end interview coding questions to practice, with detailed solutions and explanations by ex-interviewers at FAANG.',
      description: 'Description of Svelte Interview Questions page',
      id: '03N/MG',
    }),
    locale,
    pathname: `/questions/${framework}`,
    title: intl.formatMessage({
      defaultMessage: 'Practice Svelte Interview Questions with Solutions',
      description: 'Title of Svelte Interview Questions page',
      id: 'I4lo5m',
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
    <InterviewsQuestionsFrameworkDefaultPage
      framework={framework}
      questionCompletionCount={questionCompletionCount}
      questionList={questionListForFramework}
    />
  );
}
