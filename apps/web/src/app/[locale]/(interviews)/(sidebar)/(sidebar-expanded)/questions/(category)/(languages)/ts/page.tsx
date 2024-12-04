import type { Metadata } from 'next/types';

import InterviewsQuestionsCategoryLanguagePage from '~/components/interviews/questions/listings/category/InterviewsQuestionsCategoryLanguagePage';

import { readAllFrontEndInterviewGuides } from '~/db/guides/GuidesReader';
import { fetchQuestionsCompletionCount } from '~/db/QuestionsCount';
import {
  fetchQuestionsListCoding,
  fetchQuestionsListCodingForLanguage,
  fetchQuestionsListQuiz,
} from '~/db/QuestionsListReader';
import {
  categorizeQuestionsByFrameworkAndLanguage,
  roundQuestionCountToNearestTen,
} from '~/db/QuestionsUtils';
import { getIntlServerOnly } from '~/i18n';
import defaultMetadata from '~/seo/defaultMetadata';

const language = 'ts';

export const dynamic = 'force-static';

type Props = Readonly<{
  params: Readonly<{
    locale: string;
  }>;
}>;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = params;

  const [intl, { questions: questionsCoding }, { questions: questionsQuiz }] =
    await Promise.all([
      getIntlServerOnly(locale),
      fetchQuestionsListCoding(locale),
      fetchQuestionsListQuiz(locale),
    ]);

  const { language: languageQuestions } =
    categorizeQuestionsByFrameworkAndLanguage({
      codingQuestions: questionsCoding,
      quizQuestions: questionsQuiz,
    });

  return defaultMetadata({
    description: intl.formatMessage(
      {
        defaultMessage:
          'Practice {questionCount}+ curated TypeScript Interview Questions in-browser, with solutions and test cases from big tech ex-interviewers',
        description: 'Description of Interview Questions page',
        id: 'icPBtm',
      },
      {
        questionCount: roundQuestionCountToNearestTen(
          languageQuestions.ts.length,
        ),
      },
    ),
    locale,
    ogImagePageType: intl.formatMessage({
      defaultMessage: 'Framework or languages',
      description: 'OG image page title of framework and language page',
      id: 'bUmduv',
    }),
    ogImageTitle: intl.formatMessage(
      {
        defaultMessage: '{category} Interview Questions',
        description: 'OG image title of framework and language page',
        id: 'uEiI+F',
      },
      {
        category: 'TypeScript',
      },
    ),
    pathname: `/questions/${language}`,
    socialTitle: intl.formatMessage({
      defaultMessage:
        'TypeScript Interview Questions with Solutions | GreatFrontEnd',
      description: 'Title of TypeScript Interview Questions page',
      id: '/+I2B/',
    }),
    title: intl.formatMessage({
      defaultMessage:
        'TypeScript Interview Questions | Solutions by Ex-FAANG interviewers',
      description: 'Title of TypeScript Interview Questions page',
      id: 'anKB4B',
    }),
  });
}

export default async function Page({ params }: Props) {
  const { locale } = params;
  const [
    questionsCodingTS,
    { questions: questionsQuiz },
    questionCompletionCount,
    guides,
  ] = await Promise.all([
    fetchQuestionsListCodingForLanguage(language, locale),
    fetchQuestionsListQuiz(locale),
    fetchQuestionsCompletionCount(['javascript']),
    readAllFrontEndInterviewGuides(params.locale),
  ]);

  const questionsQuizTS = questionsQuiz.filter((metadata) =>
    metadata.topics.includes('javascript'),
  );

  return (
    <InterviewsQuestionsCategoryLanguagePage
      guides={guides}
      language={language}
      questionCompletionCount={questionCompletionCount}
      questionsCoding={questionsCodingTS}
      questionsQuiz={questionsQuizTS}
    />
  );
}
