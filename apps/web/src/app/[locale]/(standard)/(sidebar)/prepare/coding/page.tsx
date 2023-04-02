import type { Metadata } from 'next/types';

import { fetchQuestionsListCoding } from '~/db/QuestionsListReader';
import { getIntlServerOnly } from '~/i18n';
import defaultMetadata from '~/seo/defaultMetadata';

import PrepareCodingPage from './PrepareCodingPage';

export const dynamic = 'force-static';

type Props = Readonly<{
  params: Readonly<{
    locale: string;
  }>;
}>;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = params;

  const [intl, { questions }] = await Promise.all([
    getIntlServerOnly(locale),
    fetchQuestionsListCoding(locale),
  ]);

  return defaultMetadata({
    description: intl.formatMessage(
      {
        defaultMessage:
          'Top {questionCount} front end interview coding questions to practice, with detailed solutions and explanations by ex-interviewers at FAANG.',
        description: 'Description of Interview Preparation Coding page',
        id: 'x8+4jJ',
      },
      {
        questionCount: questions.length,
      },
    ),
    locale,
    pathname: '/prepare/coding',
    title: intl.formatMessage({
      defaultMessage:
        'Practice UI and JavaScript Interview Questions with Solutions',
      description: 'Title of Interview Preparation Coding page',
      id: 'M2rIUU',
    }),
  });
}

export default async function Page({ params }: Props) {
  const { locale } = params;
  const { questions: codingQuestions } = await fetchQuestionsListCoding(locale);

  return <PrepareCodingPage questions={codingQuestions} />;
}
