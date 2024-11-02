import type { Metadata } from 'next/types';

import type { QuestionBankDataType } from '~/components/interviews/marketing/InterviewsMarketingPracticeQuestionBankSection';
import { InterviewsMarketingTestimonialsDict } from '~/components/interviews/marketing/testimonials/InterviewsMarketingTestimonials';
import type {
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
  fetchQuestionsListCoding,
  fetchQuestionsListQuiz,
  fetchQuestionsListSystemDesign,
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
      defaultMessage: 'GreatFrontEnd Interviews',
      description: 'Social title of GreatFrontEnd standard page',
      id: '719/YQ',
    }),
    title: intl.formatMessage({
      defaultMessage:
        'GreatFrontEnd: The Great Way to Prepare for Front End Interviews',
      description: 'Title of GreatFrontEnd standard page',
      id: '6xnZGh',
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

function getQuestionBankSectionData(
  codingQuestions: ReadonlyArray<QuestionMetadata>,
  quizQuestions: ReadonlyArray<QuestionMetadata>,
  systemDesignQuestions: ReadonlyArray<QuestionMetadata>,
): QuestionBankDataType {
  const MAX_TO_SHOW = 4;
  const { framework, language } = categorizeQuestionsByFrameworkAndLanguage({
    codingQuestions,
  });
  const topicQuestions = categorizeQuestionsByTopic({
    codingQuestions,
    quizQuestions,
  });

  function createQuestionData(questions: ReadonlyArray<QuestionMetadata>) {
    return {
      count: questions.length,
      duration: countQuestionsTotalDurationMins(questions),
      questions: sortQuestions(questions, 'importance', false).slice(
        0,
        MAX_TO_SHOW,
      ),
    };
  }

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

  const topicQuestionsData: Record<
    QuestionTopic,
    {
      count: number;
      duration: number;
      questions: ReadonlyArray<QuestionMetadata>;
    }
  > = {
    a11y: createQuestionData(topicQuestions.a11y),
    css: createQuestionData(topicQuestions.css),
    html: createQuestionData(topicQuestions.html),
    i18n: createQuestionData(topicQuestions.i18n),
    javascript: createQuestionData(topicQuestions.javascript),
    network: createQuestionData(topicQuestions.network),
    performance: createQuestionData(topicQuestions.performance),
    security: createQuestionData(topicQuestions.security),
    testing: createQuestionData(topicQuestions.testing),
  };

  return {
    coding: createQuestionData(codingQuestions),
    framework: frameworkQuestionsData,
    language: languageQuestionsData,
    quiz: createQuestionData(quizQuestions),
    systemDesign: createQuestionData(systemDesignQuestions),
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
    { questions: codingQuestions },
    { questions: quizQuestions },
    { questions: systemDesignQuestions },
    companyGuides,
  ] = await Promise.all([
    // JS question embed
    readQuestionJavaScriptContents('flatten', locale),
    // UI question embed
    readQuestionUserInterface('todo-list', 'react', 'solution-improved'),
    readQuestionUserInterface('todo-list', 'vanilla', 'solution-template'),
    readQuestionUserInterface('todo-list', 'angular', 'solution'),
    readQuestionUserInterface('todo-list', 'vue', 'solution'),
    readQuestionUserInterface('todo-list', 'svelte', 'solution'),
    // Question list
    fetchQuestionsListCoding(locale),
    fetchQuestionsListQuiz(locale),
    fetchQuestionsListSystemDesign(locale),
    // Company guides
    fetchInterviewsStudyLists('company'),
  ]);

  const testimonials = InterviewsMarketingTestimonialsDict();

  const questionBankData = getQuestionBankSectionData(
    codingQuestions,
    quizQuestions,
    systemDesignQuestions,
  );

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
        testimonials.shoaibAhmed,
        testimonials.locChuong,
        testimonials.lunghaoLee,
        testimonials.luke,
        testimonials.ryan,
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
