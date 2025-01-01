import type { Metadata } from 'next/types';

import { QuestionLanguageLabels } from '~/data/QuestionCategories';

import InterviewsQuestionsCategoryLanguagePage from '~/components/interviews/questions/listings/category/InterviewsQuestionsCategoryLanguagePage';

import { fetchInterviewListingBottomContent } from '~/db/contentlayer/InterviewsListingBottomContentReader';
import { readAllFrontEndInterviewGuides } from '~/db/guides/GuidesReader';
import { fetchQuestionsCompletionCount } from '~/db/QuestionsCount';
import { fetchQuestionsListQuizForLanguage } from '~/db/QuestionsListReader';
import { roundQuestionCountToNearestTen } from '~/db/QuestionsUtils';
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

  const [intl, questionsQuiz] = await Promise.all([
    getIntlServerOnly(locale),
    fetchQuestionsListQuizForLanguage(language, locale),
  ]);

  const category = QuestionLanguageLabels[language];

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
        questionCount: roundQuestionCountToNearestTen(questionsQuiz.length),
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
    pathname: `/questions/javascript-quiz-interview-questions`,
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

  const [intl, questionsQuiz, questionCompletionCount, guides, bottomContent] =
    await Promise.all([
      getIntlServerOnly(locale),
      fetchQuestionsListQuizForLanguage(language, locale),
      fetchQuestionsCompletionCount([questionFormat]),
      readAllFrontEndInterviewGuides(params.locale),
      fetchInterviewListingBottomContent('javascript-quiz-interview-questions'),
    ]);

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
      showCategoryTabs={false}
      title={intl.formatMessage({
        defaultMessage: 'JavaScript Quiz Interview Questions',
        description: 'Title of interview questions page',
        id: 'uQG7Ed',
      })}
      totalQuestionsCount={questionsQuiz.length}
      userFacingFormat="quiz"
    />
  );
}
