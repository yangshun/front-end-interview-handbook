import type { Metadata } from 'next/types';

import { sortQuestions } from '~/components/interviews/questions/listings/filters/QuestionsProcessor';

import {
  fetchQuestionsListJavaScript,
  fetchQuestionsListQuiz,
  fetchQuestionsListSystemDesign,
  fetchQuestionsListUserInterface,
} from '~/db/QuestionsListReader';
import { getIntlServerOnly } from '~/i18n';
import defaultMetadata from '~/seo/defaultMetadata';

import InterviewsMarketingGetStartedPage from './InterviewsMarketingGetStartedPage';

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
      defaultMessage: `Kickstart your front end interview prep by exploring top resources—recommended prep plans, company guides, and a vast bank of practice questions with solutions.`,
      description: 'Description of Get Started page',
      id: 'hOA7E4',
    }),
    locale,
    pathname: '/get-started',
    socialTitle: intl.formatMessage({
      defaultMessage: 'Prepare for your Front End Interviews | Get Started',
      description: 'Social title of Get Started page',
      id: 'DsJgFx',
    }),
    title: intl.formatMessage({
      defaultMessage:
        'Get Started - One-Stop to Prepare for your Front End Interviews',
      description: 'Title of Get Started page',
      id: 'wA6yn6',
    }),
  });
}

const QUESTIONS_TO_SHOW = 6;

export default async function Page({ params }: Props) {
  const { locale } = params;

  const [
    { questions: quizQuestions },
    { questions: javaScriptQuestions },
    { questions: userInterfaceQuestions },
    { questions: systemDesignQuestions },
  ] = await Promise.all([
    fetchQuestionsListQuiz(locale),
    fetchQuestionsListJavaScript(locale),
    fetchQuestionsListUserInterface(locale),
    fetchQuestionsListSystemDesign(locale),
  ]);

  return (
    <InterviewsMarketingGetStartedPage
      javaScriptQuestions={sortQuestions(
        javaScriptQuestions.filter((question) => question.featured),
        'importance',
        false,
      ).slice(0, QUESTIONS_TO_SHOW)}
      quizQuestions={sortQuestions(
        quizQuestions.filter((question) => question.featured),
        'importance',
        false,
      ).slice(0, QUESTIONS_TO_SHOW)}
      systemDesignQuestions={sortQuestions(
        systemDesignQuestions.filter((question) => question.featured),
        'ranking',
        true,
      ).slice(0, QUESTIONS_TO_SHOW)}
      userInterfaceQuestions={sortQuestions(
        userInterfaceQuestions.filter((question) => question.featured),
        'importance',
        false,
      ).slice(0, QUESTIONS_TO_SHOW)}
    />
  );
}
