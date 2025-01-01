import type { Metadata } from 'next/types';

import { QuestionLanguageLabels } from '~/data/QuestionCategories';

import InterviewsQuestionsCategoryLanguagePage from '~/components/interviews/questions/listings/category/InterviewsQuestionsCategoryLanguagePage';

import { fetchInterviewListingBottomContent } from '~/db/contentlayer/InterviewsListingBottomContentReader';
import { readAllFrontEndInterviewGuides } from '~/db/guides/GuidesReader';
import { fetchQuestionsCompletionCount } from '~/db/QuestionsCount';
import { fetchQuestionsListCodingForLanguage } from '~/db/QuestionsListReader';
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

  const [intl, questionsCoding] = await Promise.all([
    getIntlServerOnly(locale),
    fetchQuestionsListCodingForLanguage(language, locale),
  ]);

  const category = QuestionLanguageLabels[language];

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
        questionCount: roundQuestionCountToNearestTen(questionsCoding.length),
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
    pathname: `/questions/javascript-coding-interview-questions`,
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
    questionCompletionCount,
    guides,
    bottomContent,
  ] = await Promise.all([
    getIntlServerOnly(locale),
    fetchQuestionsListCodingForLanguage(language, locale),
    fetchQuestionsCompletionCount([questionFormat]),
    readAllFrontEndInterviewGuides(params.locale),
    fetchInterviewListingBottomContent('javascript-coding-interview-questions'),
  ]);

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
      showCategoryTabs={false}
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
      totalQuestionsCount={questionsCoding.length}
      userFacingFormat="coding"
    />
  );
}
