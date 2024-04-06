import type { Metadata } from 'next/types';

import type { EmbedUIQuestion } from '~/components/interviews/marketing/embed/MarketingEmbedUIQuestion';
import { sortQuestions } from '~/components/interviews/questions/listings/filters/QuestionsProcessor';
import { QuestionCount } from '~/components/interviews/questions/listings/stats/QuestionCount';

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

export const dynamic = 'force-static';

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
      defaultMessage: 'The great way to prepare for Front End Interviews',
      description: 'Title of GreatFrontEnd standard page',
      id: 'aYUexA',
    }),
  });
}

// Custom skeleton example.
const FLATTEN_SKELETON_JS = `/**
 * @param {Array<*|Array>} value
 * @return {Array}
 */
export default function flatten(value) {
  // Add a return to the next line
  // to pass the tests!
  value.reduce(
    (acc, curr) => acc.concat(
      Array.isArray(curr) ?
        flatten(curr) : curr),
    [],
  );
}`;

const FLATTEN_SKELETON_TS = `type ArrayValue = any | Array<ArrayValue>;

export default function flatten(
  value: Array<ArrayValue>
): Array<any> {
  // Add a return to the next line
  // to pass the tests!
  value.reduce(
    (acc, curr) => acc.concat(
      Array.isArray(curr) ?
        flatten(curr) : curr),
    [],
  );
}
`;

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
        skeleton: {
          js: FLATTEN_SKELETON_JS,
          ts: FLATTEN_SKELETON_TS,
        },
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
      uiCodingQuestion={
        {
          frameworks: {
            // TODO(workspace): Add other supported frameworks
            react: todoListReactSolutionBundle,
            vanilla: todoListVanillaSolutionBundle,
          },
          metadata: todoListReactSolutionBundle.metadata,
        } as EmbedUIQuestion
      }
      userInterfaceQuestions={sortQuestions(
        userInterfaceQuestions.filter((question) => question.featured),
        'importance',
        false,
      ).slice(0, QUESTIONS_TO_SHOW)}
    />
  );
}
