import type { Metadata } from 'next/types';

import { sortQuestions } from '~/components/questions/common/QuestionsProcessor';
import { QuestionCount } from '~/components/questions/listings/QuestionCount';

import {
  readQuestionJavaScriptContents,
  readQuestionUserInterface,
} from '~/db/QuestionsContentsReader';
import {
  fetchQuestionsListJavaScript,
  fetchQuestionsListQuiz,
  fetchQuestionsListSystemDesign,
  fetchQuestionsListUserInterface,
} from '~/db/QuestionsListReader';
import { getIntlServerOnly } from '~/i18n';
import defaultMetadata from '~/seo/defaultMetadata';

import MarketingHomePage from './MarketingHomePage';

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = params;

  const intl = await getIntlServerOnly(locale);

  return defaultMetadata({
    description: intl.formatMessage(
      {
        defaultMessage: `The complete preparation platform for front end interviews. {questionCount}+ practice questions (with answers) across system design, UI and more. By ex-FAANG interviewers.`,
        description: 'Description of GreatFrontEnd standard page',
        id: 'WJ/3Qn',
      },
      {
        questionCount: QuestionCount,
      },
    ),
    locale,
    pathname: '/',
    title: intl.formatMessage({
      defaultMessage: 'The best way to prepare for Front End Interviews',
      description: 'Title of GreatFrontEnd standard page',
      id: 'M7x/vv',
    }),
  });
}

// Custom skeleton example.
const FLATTEN_SKELETON = `/**
 * @param {Array<*|Array>} value
 * @return {Array}
 */
export default function flatten(array) {
  // Return the next line to pass the tests!
  array.reduce(
    (acc, curr) => acc.concat(Array.isArray(curr) ? flatten(curr) : curr),
    [],
  );
}`;

const QUESTIONS_TO_SHOW = 6;

type Props = Readonly<{
  params: Readonly<{ locale: string }>;
}>;

export default async function Page({ params }: Props) {
  const { locale } = params;
  const [
    { question: javaScriptEmbedExample },
    todoListReactSolutionBundle,
    todoListVanillaSolutionBundle,
  ] = await Promise.all([
    readQuestionJavaScriptContents('flatten', locale),
    readQuestionUserInterface('todo-list', 'react', 'solution-improved'),
    readQuestionUserInterface('todo-list', 'vanilla', 'solution-template'),
  ]);

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
    <MarketingHomePage
      javaScriptEmbedExample={{
        ...javaScriptEmbedExample,
        skeleton: FLATTEN_SKELETON,
      }}
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
      uiCodingQuestion={{
        metadata: todoListReactSolutionBundle.metadata,
        react: {
          skeleton: {
            sandpack: todoListReactSolutionBundle.skeletonSetup!,
            writeup: todoListReactSolutionBundle.description,
          },
          solution: {
            sandpack: todoListReactSolutionBundle.solutionSetup!,
            writeup: todoListReactSolutionBundle.solution,
          },
        },
        vanilla: {
          skeleton: {
            sandpack: todoListVanillaSolutionBundle.skeletonSetup!,
            writeup: todoListVanillaSolutionBundle.description,
          },
          solution: {
            sandpack: todoListVanillaSolutionBundle.solutionSetup!,
            writeup: todoListVanillaSolutionBundle.solution,
          },
        },
      }}
      userInterfaceQuestions={sortQuestions(
        userInterfaceQuestions.filter((question) => question.featured),
        'importance',
        false,
      ).slice(0, QUESTIONS_TO_SHOW)}
    />
  );
}
