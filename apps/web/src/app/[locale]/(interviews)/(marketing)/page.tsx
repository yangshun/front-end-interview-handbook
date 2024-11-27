import type { Metadata } from 'next/types';

import type { QuestionBankDataType } from '~/components/interviews/marketing/InterviewsMarketingPracticeQuestionBankSection';
import { InterviewsMarketingTestimonialsDict } from '~/components/interviews/marketing/testimonials/InterviewsMarketingTestimonials';
import type {
  QuestionFormat,
  QuestionFramework,
  QuestionLanguage,
  QuestionMetadata,
  QuestionTopic,
} from '~/components/interviews/questions/common/QuestionsTypes';
import {
  countQuestionsTotalDurationMins,
  sortQuestions,
} from '~/components/interviews/questions/listings/filters/QuestionsProcessor';
import { QuestionCount } from '~/components/interviews/questions/listings/stats/QuestionCount';

import { fetchInterviewsStudyLists } from '~/db/contentlayer/InterviewsStudyListReader';
import {
  readQuestionJavaScriptContents,
  readQuestionUserInterface,
} from '~/db/QuestionsContentsReader';
import {
  fetchQuestionsListAlgo,
  fetchQuestionsListJavaScript,
  fetchQuestionsListQuiz,
  fetchQuestionsListSystemDesign,
  fetchQuestionsListUserInterface,
} from '~/db/QuestionsListReader';
import {
  categorizeQuestionsByFrameworkAndLanguage,
  categorizeQuestionsByTopic,
} from '~/db/QuestionsUtils';
import { getIntlServerOnly } from '~/i18n';
import defaultMetadata from '~/seo/defaultMetadata';

import InterviewsMarketingHomePage from './InterviewsMarketingHomePage';

export const dynamic = 'force-static';

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = params;

  const intl = await getIntlServerOnly(locale);

  return defaultMetadata({
    description: intl.formatMessage(
      {
        defaultMessage: `The complete prep platform for Front End interviews. Practice {questionCount}+ questions with solutions, code in-browser, and use prep plans devised by ex-interviewers.`,
        description: 'Description of GreatFrontEnd standard page',
        id: 'BQSR58',
      },
      {
        questionCount: QuestionCount,
      },
    ),
    locale,
    pathname: '/',
    socialTitle: intl.formatMessage({
      defaultMessage: 'GreatFrontEnd',
      description: 'Social title of GreatFrontEnd standard page',
      id: 'x8SJHC',
    }),
    title: intl.formatMessage({
      defaultMessage:
        'GreatFrontEnd: The great way to prepare for Front End Interviews',
      description: 'Title of GreatFrontEnd standard page',
      id: 'NbNtxn',
    }),
  });
}

type Props = Readonly<{
  params: Readonly<{ locale: string }>;
}>;

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

const MAX_TO_SHOW = 4;

function createQuestionData(questionList: ReadonlyArray<QuestionMetadata>) {
  return {
    count: questionList.length,
    duration: countQuestionsTotalDurationMins(questionList),
    questions: sortQuestions(questionList, 'importance', false).slice(
      0,
      MAX_TO_SHOW,
    ),
  };
}

function getQuestionBankSectionData(
  questions: Record<QuestionFormat, ReadonlyArray<QuestionMetadata>>,
): QuestionBankDataType {
  const {
    javascript: javaScriptQuestions,
    algo: algoQuestions,
    'system-design': systemDesignQuestions,
    quiz: quizQuestions,
    'user-interface': userInterfaceQuestions,
  } = questions;

  const codingQuestions = [
    ...javaScriptQuestions,
    ...algoQuestions,
    ...userInterfaceQuestions,
  ];
  const { framework, language } = categorizeQuestionsByFrameworkAndLanguage({
    codingQuestions,
  });
  const topicQuestions = categorizeQuestionsByTopic({
    codingQuestions,
    quizQuestions,
  });

  const frameworkQuestionsData: Record<
    QuestionFramework,
    {
      count: number;
      duration: number;
      questions: ReadonlyArray<QuestionMetadata>;
    }
  > = {
    angular: createQuestionData(framework.angular),
    react: createQuestionData(framework.react),
    svelte: createQuestionData(framework.svelte),
    vanilla: createQuestionData(framework.vanilla),
    vue: createQuestionData(framework.vue),
  };
  const languageQuestionsData: Record<
    QuestionLanguage,
    {
      count: number;
      duration: number;
      questions: ReadonlyArray<QuestionMetadata>;
    }
  > = {
    css: createQuestionData(language.css),
    html: createQuestionData(language.html),
    js: createQuestionData(language.js),
    ts: createQuestionData(language.ts),
  };

  const topicQuestionsData: Partial<
    Record<
      QuestionTopic,
      {
        count: number;
        duration: number;
        questions: ReadonlyArray<QuestionMetadata>;
      }
    >
  > = {
    a11y: createQuestionData(topicQuestions.a11y),
    async: createQuestionData(topicQuestions.async),
    closure: createQuestionData(topicQuestions.closure),
    css: createQuestionData(topicQuestions.css),
    html: createQuestionData(topicQuestions.html),
    i18n: createQuestionData(topicQuestions.i18n),
    javascript: createQuestionData(topicQuestions.javascript),
    networking: createQuestionData(topicQuestions.networking),
    oop: createQuestionData(topicQuestions.oop),
    performance: createQuestionData(topicQuestions.performance),
    security: createQuestionData(topicQuestions.security),
    'web-api': createQuestionData(topicQuestions['web-api']),
  };

  const formatQuestionsData: Record<
    QuestionFormat,
    {
      count: number;
      duration: number;
      questions: ReadonlyArray<QuestionMetadata>;
    }
  > = {
    algo: createQuestionData(algoQuestions),
    javascript: createQuestionData(javaScriptQuestions),
    quiz: createQuestionData(quizQuestions),
    'system-design': createQuestionData(systemDesignQuestions),
    'user-interface': createQuestionData(userInterfaceQuestions),
  };

  return {
    format: formatQuestionsData,
    framework: frameworkQuestionsData,
    language: languageQuestionsData,
    topic: topicQuestionsData,
  };
}

export default async function Page({ params }: Props) {
  const { locale } = params;

  const [
    { question: javaScriptEmbedExample },
    todoListReactSolutionBundle,
    todoListVanillaSolutionBundle,
    todoListAngularSolutionBundle,
    todoListVueSolutionBundle,
    todoListSvelteSolutionBundle,
    { questions: javaScriptQuestions },
    { questions: algoQuestions },
    { questions: userInterfaceQuestions },
    { questions: quizQuestions },
    { questions: systemDesignQuestions },
    companyGuides,
  ] = await Promise.all([
    // JS question embed
    readQuestionJavaScriptContents('flatten', false, locale),
    // UI question embed
    readQuestionUserInterface('todo-list', false, 'react', 'solution-improved'),
    readQuestionUserInterface(
      'todo-list',
      false,
      'vanilla',
      'solution-template',
    ),
    readQuestionUserInterface('todo-list', false, 'angular', 'solution'),
    readQuestionUserInterface('todo-list', false, 'vue', 'solution'),
    readQuestionUserInterface('todo-list', false, 'svelte', 'solution'),
    // Question list
    fetchQuestionsListJavaScript(locale),
    fetchQuestionsListAlgo(locale),
    fetchQuestionsListUserInterface(locale),
    fetchQuestionsListQuiz(locale),
    fetchQuestionsListSystemDesign(locale),
    // Company guides
    fetchInterviewsStudyLists('company'),
  ]);

  const testimonials = InterviewsMarketingTestimonialsDict();

  const questionBankData = getQuestionBankSectionData({
    algo: algoQuestions,
    javascript: javaScriptQuestions,
    quiz: quizQuestions,
    'system-design': systemDesignQuestions,
    'user-interface': userInterfaceQuestions,
  });

  const sortedGuides = companyGuides
    .slice()
    .sort((a, b) => a.ranking - b.ranking);

  return (
    <InterviewsMarketingHomePage
      companyGuides={sortedGuides}
      javaScriptEmbedExample={{
        ...javaScriptEmbedExample,
        skeleton: {
          js: FLATTEN_SKELETON_JS,
          ts: FLATTEN_SKELETON_TS,
        },
      }}
      questions={questionBankData}
      testimonials={[
        testimonials.locChuong,
        testimonials.deannaTran,
        testimonials.yugantJoshi,
        testimonials.chenweiZhang,
        testimonials.edWang,
      ]}
      uiCodingQuestion={{
        frameworks: {
          angular: todoListAngularSolutionBundle,
          react: todoListReactSolutionBundle,
          svelte: todoListSvelteSolutionBundle,
          vanilla: todoListVanillaSolutionBundle,
          vue: todoListVueSolutionBundle,
        },
        metadata: todoListReactSolutionBundle.metadata,
      }}
    />
  );
}
