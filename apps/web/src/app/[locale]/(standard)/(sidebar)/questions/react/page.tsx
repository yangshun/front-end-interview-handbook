import type { Metadata } from 'next/types';

import type { QuestionFramework } from '~/components/questions/common/QuestionsTypes';
import QuestionsFrameworkPage from '~/components/questions/listings/QuestionsFrameworkPage';

import { fetchCodingQuestionsForFramework } from '~/db/QuestionsListReader';
import { getIntlServerOnly } from '~/i18n';
import defaultMetadata from '~/seo/defaultMetadata';

const framework: QuestionFramework = 'react';

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
    pathname: `/questions/${framework}`,
    title: intl.formatMessage({
      defaultMessage: 'Practice React Interview Questions with Solutions',
      description: 'Title of React Interview Questions page',
      id: '035J/P',
    }),
  });
}

export default async function Page() {
  const questionList = await fetchCodingQuestionsForFramework(framework);

  return (
    <QuestionsFrameworkPage
      description="Top React coding interview questions to build the most commonly-asked front end UI components and applications."
      framework={framework}
      questionList={questionList}
      title="React Coding Questions"
    />
  );
}
