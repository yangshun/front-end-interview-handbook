import type { Metadata } from 'next/types';

import AngularLogo from '~/components/icons/AngularLogo';
import QuestionsFrameworkPage from '~/components/interviews/questions/category/QuestionsFrameworkPage';

import { fetchQuestionCompletionCount } from '~/db/QuestionsCount';
import { fetchCodingQuestionsForFramework } from '~/db/QuestionsListReader';
import { getIntlServerOnly } from '~/i18n';
import defaultMetadata from '~/seo/defaultMetadata';

const framework = 'angular';

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
        'Top Angular front end interview coding questions to practice, with detailed solutions and explanations by ex-interviewers at FAANG.',
      description: 'Description of Angular Interview Questions page',
      id: 'gTFqs7',
    }),
    locale,
    pathname: `/questions/${framework}`,
    title: intl.formatMessage({
      defaultMessage: 'Practice Angular Interview Questions with Solutions',
      description: 'Title of Angular Interview Questions page',
      id: 'ez5OLq',
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
          'Top Angular coding interview questions to build the most commonly-asked front end UI components and applications.',
        description: 'Description for Angular questions page',
        id: 'MjpQ2L',
      })}
      featuredQuestions={questionList.filter((question) => question.featured)}
      featuredSectionTitle={intl.formatMessage({
        defaultMessage: 'Try these popular Angular questions',
        description: 'Title for featured questions section',
        id: 'JxbpKs',
      })}
      framework={framework}
      logo={<AngularLogo className="size-16" />}
      questionCompletionCount={questionCompletionCount}
      questionList={questionList}
      title={intl.formatMessage({
        defaultMessage: 'Angular Coding Questions',
        description: 'Description for Angular questions title',
        id: '86Oken',
      })}
    />
  );
}
