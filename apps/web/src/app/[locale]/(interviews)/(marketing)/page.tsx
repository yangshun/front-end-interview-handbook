import type { Metadata } from 'next/types';

import { InterviewsMarketingDisplayTopics } from '~/components/interviews/marketing/InterviewsMarketingDisplayTopics';
import type { QuestionBankDataType } from '~/components/interviews/marketing/InterviewsMarketingPracticeQuestionBankSection';
import type {
  InterviewsQuestionItemMinimal,
  QuestionFormat,
  QuestionFramework,
  QuestionLanguage,
  QuestionTopic,
} from '~/components/interviews/questions/common/QuestionsTypes';
import {
  countQuestionsTotalDurationMins,
  sortQuestions,
} from '~/components/interviews/questions/listings/filters/QuestionsProcessor';
import { QuestionCountTotal } from '~/components/interviews/questions/listings/stats/QuestionCount';

import { fetchInterviewsStudyLists } from '~/db/contentlayer/InterviewsStudyListReader';
import {
  readQuestionJavaScriptContents,
  readQuestionUserInterface,
} from '~/db/QuestionsContentsReader';
import { fetchQuestionsList } from '~/db/QuestionsListReader';
import {
  categorizeQuestionsByCompany,
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
        questionCount: QuestionCountTotal,
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

function createQuestionData(
  questionList: ReadonlyArray<InterviewsQuestionItemMinimal>,
) {
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
  questions: Record<
    QuestionFormat,
    ReadonlyArray<InterviewsQuestionItemMinimal>
  >,
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
      questions: ReadonlyArray<InterviewsQuestionItemMinimal>;
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
      questions: ReadonlyArray<InterviewsQuestionItemMinimal>;
    }
  > = {
    css: createQuestionData(language.css),
    html: createQuestionData(language.html),
    js: createQuestionData(language.js),
    ts: createQuestionData(language.ts),
  };

  const topicQuestionsData: Partial<
    Record<QuestionTopic, ReturnType<typeof createQuestionData>>
  > = {};

  const topics: ReadonlyArray<QuestionTopic> = InterviewsMarketingDisplayTopics;

  topics.forEach((topic) => {
    if (topicQuestions[topic]) {
      topicQuestionsData[topic] = createQuestionData(topicQuestions[topic]);
    }
  });

  const formatQuestionsData: Record<
    QuestionFormat,
    {
      count: number;
      duration: number;
      questions: ReadonlyArray<InterviewsQuestionItemMinimal>;
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
    readQuestionUserInterface({
      codeId: 'solution-improved',
      frameworkParam: 'react',
      isViewerPremium: false,
      requestedLocale: locale,
      slug: 'todo-list',
    }),
    readQuestionUserInterface({
      codeId: 'solution-template',
      frameworkParam: 'vanilla',
      isViewerPremium: false,
      requestedLocale: locale,
      slug: 'todo-list',
    }),
    readQuestionUserInterface({
      codeId: 'solution',
      frameworkParam: 'angular',
      isViewerPremium: false,
      requestedLocale: locale,
      slug: 'todo-list',
    }),
    readQuestionUserInterface({
      codeId: 'solution',
      frameworkParam: 'vue',
      isViewerPremium: false,
      requestedLocale: locale,
      slug: 'todo-list',
    }),
    readQuestionUserInterface({
      codeId: 'solution',
      frameworkParam: 'svelte',
      isViewerPremium: false,
      requestedLocale: locale,
      slug: 'todo-list',
    }),
    // Question list
    fetchQuestionsList({ type: 'format', value: 'javascript' }, locale),
    fetchQuestionsList({ type: 'format', value: 'algo' }, locale),
    fetchQuestionsList({ type: 'format', value: 'user-interface' }, locale),
    fetchQuestionsList({ type: 'format', value: 'quiz' }, locale),
    fetchQuestionsList({ type: 'format', value: 'system-design' }, locale),
    // Company guides
    fetchInterviewsStudyLists('company', locale),
  ]);

  const questionBankData = getQuestionBankSectionData({
    algo: algoQuestions,
    javascript: javaScriptQuestions,
    quiz: quizQuestions,
    'system-design': systemDesignQuestions,
    'user-interface': userInterfaceQuestions,
  });
  const categorizedCompanyQuestions = categorizeQuestionsByCompany({
    codingQuestions: [
      ...algoQuestions,
      ...javaScriptQuestions,
      ...userInterfaceQuestions,
    ],
    quizQuestions,
    systemDesignQuestions,
  });
  const companyQuestionsCount = Object.fromEntries(
    Object.entries(categorizedCompanyQuestions).map(([key, questions]) => [
      key,
      questions.length,
    ]),
  );

  const sortedGuides = companyGuides
    .slice()
    .sort((a, b) => a.ranking - b.ranking)
    .map((company) => ({
      ...company,
      questionCount: companyQuestionsCount[company.slug],
    }));

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
      uiCodingQuestion={{
        frameworks: {
          angular: todoListAngularSolutionBundle,
          react: todoListReactSolutionBundle,
          svelte: todoListSvelteSolutionBundle,
          vanilla: todoListVanillaSolutionBundle,
          vue: todoListVueSolutionBundle,
        },
        info: todoListReactSolutionBundle.info,
        metadata: todoListReactSolutionBundle.metadata,
      }}
    />
  );
}
