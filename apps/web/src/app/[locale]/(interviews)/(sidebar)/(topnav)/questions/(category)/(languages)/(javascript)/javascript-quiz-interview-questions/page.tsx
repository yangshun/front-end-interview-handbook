import type { Metadata } from 'next/types';

import { QuestionLanguageLabels } from '~/data/QuestionCategories';

import type {
  QuestionLanguage,
  QuestionListTypeData,
} from '~/components/interviews/questions/common/QuestionsTypes';
import { InterviewsQuestionsQuizGuideSlugs } from '~/components/interviews/questions/listings/category/InterviewsQuestionsCategoryGuideSlugs';
import InterviewsQuestionsCategoryLanguagePage from '~/components/interviews/questions/listings/category/InterviewsQuestionsCategoryLanguagePage';

import { fetchInterviewListingBottomContent } from '~/db/contentlayer/InterviewsListingBottomContentReader';
import { readFrontEndInterviewGuides } from '~/db/guides/GuidesReader';
import { fetchQuestionsCompletionCount } from '~/db/QuestionsCount';
import { fetchQuestionsList } from '~/db/QuestionsListReader';
import { roundQuestionCountToNearestTen } from '~/db/QuestionsUtils';
import { getIntlServerOnly } from '~/i18n';
import defaultMetadata from '~/seo/defaultMetadata';

export const dynamic = 'force-static';

const language: QuestionLanguage = 'js';
const questionFormat = 'quiz';
const listType: QuestionListTypeData = {
  tab: questionFormat,
  type: 'language',
  value: language,
};

type Props = Readonly<{
  params: Readonly<{
    locale: string;
  }>;
}>;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = params;

  const [intl, { questions }] = await Promise.all([
    getIntlServerOnly(locale),
    fetchQuestionsList(listType, locale),
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
        questionCount: roundQuestionCountToNearestTen(questions.length),
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

  const [intl, { questions }, questionCompletionCount, guides, bottomContent] =
    await Promise.all([
      getIntlServerOnly(locale),
      fetchQuestionsList(listType, locale),
      fetchQuestionsCompletionCount([questionFormat]),
      readFrontEndInterviewGuides({
        locale,
        slugs: InterviewsQuestionsQuizGuideSlugs,
      }),
      fetchInterviewListingBottomContent('javascript-quiz-interview-questions'),
    ]);

  const title = intl.formatMessage({
    defaultMessage: 'JavaScript Quiz Interview Questions',
    description: 'Title of interview questions page',
    id: 'uQG7Ed',
  });

  const listTypeWithTitle = {
    ...listType,
    title,
  };

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
      listType={listTypeWithTitle}
      questionCompletionCount={questionCompletionCount}
      questions={questions}
      showCategoryTabs={false}
      title={title}
      totalQuestionsCount={questions.length}
    />
  );
}
