import type { Metadata } from 'next/types';

import ReactLogo from '~/components/icons/ReactLogo';
import QuestionsFrameworkPage from '~/components/interviews/questions/category/QuestionsFrameworkPage';
import type { QuestionFramework } from '~/components/interviews/questions/common/QuestionsTypes';

import { fetchQuestionCompletionCount } from '~/db/QuestionsCount';
import { fetchCodingQuestionsForFramework } from '~/db/QuestionsListReader';
import { getIntlServerOnly } from '~/i18n';
import defaultMetadata from '~/seo/defaultMetadata';

const framework: QuestionFramework = 'react';

// TODO(interviews): disable to do A/B test.
// export const dynamic = 'force-static';

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
        'Top React front end interview coding questions to practice, with detailed solutions and explanations by ex-interviewers at FAANG.',
      description: 'Description of React Interview Questions page',
      id: 'MkjGJD',
    }),
    locale,
    pathname: `/questions/${framework}`,
    title: intl.formatMessage({
      defaultMessage: 'Practice React Interview Questions with Solutions',
      description: 'Title of React Interview Questions page',
      id: '035J/P',
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
          'Top React coding interview questions to build the most commonly-asked front end UI components and applications.',
        description: 'Description for React questions page',
        id: 'j5W1/P',
      })}
      featuredQuestions={questionList.filter((question) => question.featured)}
      featuredSectionTitle={intl.formatMessage({
        defaultMessage: 'Try these popular React questions',
        description: 'Title for featured questions section',
        id: 'VBOVcb',
      })}
      framework={framework}
      logo={
        <ReactLogo className="size-16" style={{ fill: 'rgb(20, 158, 202)' }} />
      }
      questionCompletionCount={questionCompletionCount}
      questionList={questionList}
      title={intl.formatMessage({
        defaultMessage: 'React Coding Questions',
        description: 'Description for React questions title',
        id: 'Qf/RU+',
      })}
    />
  );
}
