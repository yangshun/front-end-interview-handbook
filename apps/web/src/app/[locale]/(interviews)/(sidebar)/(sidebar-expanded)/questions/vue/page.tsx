import type { Metadata } from 'next/types';

import VueLogo from '~/components/icons/VueLogo';
import QuestionsFrameworkPage from '~/components/interviews/questions/category/QuestionsFrameworkPage';

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
          'Top Vue coding interview questions to build the most commonly-asked front end UI components and applications.',
        description: 'Description for Vue questions page',
        id: '8I4gwW',
      })}
      framework={framework}
      logo={<VueLogo className="size-16" style={{ color: '#ff3e00' }} />}
      questionCompletionCount={questionCompletionCount}
      questionList={questionList}
      title={intl.formatMessage({
        defaultMessage: 'Vue Coding Questions',
        description: 'Description for Vue questions title',
        id: 'XWWsEp',
      })}
    />
  );
}
