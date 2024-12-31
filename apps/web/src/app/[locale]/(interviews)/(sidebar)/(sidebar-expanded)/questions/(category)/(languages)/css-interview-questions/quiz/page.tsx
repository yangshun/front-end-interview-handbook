import type { Metadata } from 'next/types';

import InterviewsQuestionsCategoryLanguagePage from '~/components/interviews/questions/listings/category/InterviewsQuestionsCategoryLanguagePage';

import { fetchInterviewListingBottomContent } from '~/db/contentlayer/InterviewsListingBottomContentReader';
import { readAllFrontEndInterviewGuides } from '~/db/guides/GuidesReader';
import { fetchQuestionsCompletionCount } from '~/db/QuestionsCount';
import {
  fetchQuestionsListCoding,
  fetchQuestionsListCodingForLanguage,
  fetchQuestionsListQuiz,
  fetchQuestionsListQuizForLanguage,
} from '~/db/QuestionsListReader';
import {
  categorizeQuestionsByFrameworkAndLanguage,
  roundQuestionCountToNearestTen,
} from '~/db/QuestionsUtils';
import { getIntlServerOnly } from '~/i18n';
import defaultMetadata from '~/seo/defaultMetadata';

const language = 'css';
const questionFormat = 'quiz';

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
          'Practice {questionCount}+ curated CSS Interview Questions in-browser, with solutions and test cases from big tech ex-interviewers',
        description: 'Description of CSS Interview Questions page',
        id: 'S349rn',
      },
      {
        questionCount: roundQuestionCountToNearestTen(
          languageQuestions[language].length,
        ),
      },
    ),
    locale,
    ogImagePageType: intl.formatMessage({
      defaultMessage: 'Frameworks or languages',
      description: 'OG image page title of framework and language page',
      id: '+XLpUw',
    }),
    ogImageTitle: intl.formatMessage(
      {
        defaultMessage: '{category} Interview Questions',
        description: 'OG image title of framework and language page',
        id: 'uEiI+F',
      },
      {
        category: 'CSS',
      },
    ),
    pathname: `/questions/${language}-interview-questions`,
    socialTitle: intl.formatMessage({
      defaultMessage: 'CSS Interview Questions with Solutions | GreatFrontEnd',
      description: 'Social title of CSS interview Questions page',
      id: '5Kx8ZQ',
    }),
    title: intl.formatMessage({
      defaultMessage:
        'CSS Interview Questions | Solutions by Ex-FAANG interviewers',
      description: 'Title of CSS interview Questions page',
      id: '31BVI1',
    }),
  });
}

export default async function Page({ params }: Props) {
  const { locale } = params;
  const [
    questionsCoding,
    questionsQuiz,
    questionCompletionCount,
    guides,
    bottomContent,
  ] = await Promise.all([
    fetchQuestionsListCodingForLanguage(language, locale),
    fetchQuestionsListQuizForLanguage(language, locale),
    fetchQuestionsCompletionCount([questionFormat]),
    readAllFrontEndInterviewGuides(locale),
    fetchInterviewListingBottomContent('language-css'),
  ]);

  const questionsQuizCSS = questionsQuiz.filter((metadata) =>
    metadata.topics.includes(language),
  );

  return (
    <InterviewsQuestionsCategoryLanguagePage
      bottomContent={bottomContent}
      guides={guides}
      language={language}
      questionCompletionCount={questionCompletionCount}
      questions={questionsQuizCSS}
      totalQuestionsCount={questionsCoding.length + questionsQuiz.length}
      userFacingFormat={questionFormat}
    />
  );
}
