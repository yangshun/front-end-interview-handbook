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
          'Practice {questionCount}+ JavaScript Coding Interview Questions. Learn in-browser, with high quality answers written by Big Tech Ex-interviewers',
        description: 'Description of interviews questions page',
        id: 'RYbaoA',
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
        defaultMessage: '{category} Coding Interview Questions',
        description: 'Title for front end interview questions page',
        id: 'DifSrp',
      },
      {
        category,
      },
    ),
    pathname: `/javascript-coding-interview-questions`,
    socialTitle: intl.formatMessage(
      {
        defaultMessage: '{category} Coding Interview Questions | GreatFrontEnd',
        description: 'Social title of front end interview questions page',
        id: 'qiR/gs',
      },
      {
        category,
      },
    ),
    title: intl.formatMessage(
      {
        defaultMessage: '{category} Coding Interview Questions | With Answers',
        description: 'Title of interview questions page',
        id: 'H92G22',
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
  const category = QuestionLanguageLabels[language];

  return (
    <InterviewsQuestionsCategoryLanguagePage
      bottomContent={bottomContent}
      description={intl.formatMessage(
        {
          defaultMessage:
            '{questionCount}+ most important JavaScript coding interview questions, from data structures and algorithms to JavaScript functions and user interfaces.',
          description: 'Description of interview questions page',
          id: 'vt3b5U',
        },
        {
          questionCount: roundQuestionCountToNearestTen(questionsCoding.length),
        },
      )}
      guides={guides}
      language={language}
      questionCompletionCount={questionCompletionCount}
      questions={questionsCoding}
      title={intl.formatMessage(
        {
          defaultMessage: '{category} Coding Interview Questions',
          description: 'Title of interview questions page',
          id: 'TbOere',
        },
        {
          category,
        },
      )}
      totalQuestionsCount={totalQuestionsCount}
      userFacingFormat="coding"
    />
  );
}
