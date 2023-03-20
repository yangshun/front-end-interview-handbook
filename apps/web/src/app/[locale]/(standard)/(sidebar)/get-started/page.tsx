import type { Metadata } from 'next/types';

import { sortQuestions } from '~/components/questions/common/QuestionsProcessor';
import { QuestionCount } from '~/components/questions/listings/QuestionCount';

import {
  fetchQuestionsListJavaScript,
  fetchQuestionsListQuiz,
  fetchQuestionsListSystemDesign,
  fetchQuestionsListUserInterface,
} from '~/db/QuestionsListReader';
import defaultMetadata from '~/seo/defaultMetadata';

import GetStartedPage from './GetStartedPage';

export async function generateMetadata(): Promise<Metadata> {
  return defaultMetadata({
    description: `Get started with GreatFrontEnd's study plans or practice over ${QuestionCount} questions across all front end interview formats`,
    pathname: '/get-started',
    title: 'Get Started',
  });
}

const QUESTIONS_TO_SHOW = 6;

export default async function Page() {
  const [
    quizQuestions,
    javaScriptQuestions,
    userInterfaceQuestions,
    systemDesignQuestions,
  ] = await Promise.all([
    fetchQuestionsListQuiz(),
    fetchQuestionsListJavaScript(),
    fetchQuestionsListUserInterface(),
    fetchQuestionsListSystemDesign(),
  ]);

  return (
    <GetStartedPage
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
