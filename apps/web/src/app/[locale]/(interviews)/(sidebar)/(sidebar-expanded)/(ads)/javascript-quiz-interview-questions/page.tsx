import type { Metadata } from 'next/types';

import { QuestionLanguageLabels } from '~/data/QuestionCategories';

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

export const dynamic = 'force-static';

const language = 'js';
const questionFormat = 'quiz';

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

  const category = QuestionLanguageLabels[language];

  const { language: languageQuestions } =
    categorizeQuestionsByFrameworkAndLanguage({
      codingQuestions: questionsCoding,
      quizQuestions: questionsQuiz,
    });

  return defaultMetadata({
    description: intl.formatMessage(
      {
        defaultMessage:
          'Practice {questionCount}+ Quiz-style JavaScript Interview Questions. Learn in-browser, with high quality answers written by Big Tech Ex-interviewers',
        description: 'Description of interviews questions page',
        id: 'vbWLam',
      },
      {
        category,
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
        defaultMessage: '{category} Quiz Interview Questions',
        description: 'Title for front end interview questions page',
        id: 'j8Rea3',
      },
      {
        category,
      },
    ),
    pathname: `/javascript-quiz-interview-questions`,
    socialTitle: intl.formatMessage(
      {
        defaultMessage: '{category} Quiz Interview Questions | GreatFrontEnd',
        description: 'Social title of front end interview questions page',
        id: 'BuQtA2',
      },
      {
        category,
      },
    ),
    title: intl.formatMessage(
      {
        defaultMessage: '{category} Quiz Interview Questions | With Answers',
        description: 'Title of interview questions page',
        id: 'VLBIk4',
      },
      {
        category,
      },
    ),
  });
}

export default async function Page({ params }: Props) {
  const { locale } = params;

  const [
    intl,
    questionsCoding,
    questionsQuiz,
    questionCompletionCount,
    guides,
    bottomContent,
  ] = await Promise.all([
    getIntlServerOnly(locale),
    fetchQuestionsListCodingForLanguage(language, locale),
    fetchQuestionsListQuizForLanguage(language, locale),
    fetchQuestionsCompletionCount([questionFormat]),
    readAllFrontEndInterviewGuides(params.locale),
    fetchInterviewListingBottomContent(`language-${language}`),
  ]);

  const totalQuestionsCount = questionsCoding.length + questionsQuiz.length;

  return (
    <InterviewsQuestionsCategoryLanguagePage
      bottomContent={bottomContent}
      description={intl.formatMessage({
        defaultMessage: 'Q&A Quiz-style JavaScript Interview Questions',
        description: 'Description of interview questions page',
        id: 'NeDKXb',
      })}
      features={['criticalTopics', 'answeredByExInterviewers']}
      guides={guides}
      language={language}
      questionCompletionCount={questionCompletionCount}
      questions={questionsQuiz}
      title={intl.formatMessage({
        defaultMessage: 'JavaScript Quiz Interview Questions',
        description: 'Title of interview questions page',
        id: 'uQG7Ed',
      })}
      totalQuestionsCount={totalQuestionsCount}
      userFacingFormat="quiz"
    />
  );
}
