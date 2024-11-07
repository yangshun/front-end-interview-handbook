import type { Metadata } from 'next/types';

import SvelteLogo from '~/components/icons/SvelteLogo';
import QuestionsFrameworkPage from '~/components/interviews/questions/category/QuestionsFrameworkPage';

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

export default async function Page({ params }: Props) {
  const { locale } = params;
  const [questionList, intl, questionCompletionCount] = await Promise.all([
    fetchCodingQuestionsForFramework(framework),
    getIntlServerOnly(locale),
    fetchQuestionCompletionCount(['user-interface']),
  ]);

  return (
    <QuestionsFrameworkPage
      description={intl.formatMessage({
        defaultMessage:
          'Top Svelte coding interview questions to build the most commonly-asked front end UI components and applications.',
        description: 'Description for Svelte questions page',
        id: 'puirr6',
      })}
      framework={framework}
      logo={<SvelteLogo className="size-16" style={{ color: '#ff3e00' }} />}
      questionCompletionCount={questionCompletionCount}
      questionList={questionList}
      title={intl.formatMessage({
        defaultMessage: 'Svelte Coding Questions',
        description: 'Description for Svelte questions title',
        id: 'belvJ0',
      })}
    />
  );
}
