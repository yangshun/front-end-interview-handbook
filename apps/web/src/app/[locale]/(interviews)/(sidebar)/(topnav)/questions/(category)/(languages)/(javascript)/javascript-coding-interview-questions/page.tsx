import type { Metadata } from 'next/types';

import { QuestionLanguageLabels } from '~/data/QuestionCategories';

import type {
  QuestionLanguage,
  QuestionListTypeData,
  QuestionPracticeFormat,
} from '~/components/interviews/questions/common/QuestionsTypes';
import { InterviewsQuestionsLanguageJavaScriptGuideSlugs } from '~/components/interviews/questions/listings/category/InterviewsQuestionsCategoryGuideSlugs';
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
const practiceFormat: QuestionPracticeFormat = 'coding';
const listType: QuestionListTypeData = {
  tab: practiceFormat,
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
          'Practice {questionCount}+ JavaScript Coding Interview Questions. Learn in-browser, with high quality answers written by Big Tech Ex-interviewers',
        description: 'Description of interviews questions page',
        id: 'RYbaoA',
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

  const [intl, { questions }, questionCompletionCount, guides, bottomContent] =
    await Promise.all([
      getIntlServerOnly(locale),
      fetchQuestionsList(listType, locale),
      fetchQuestionsCompletionCount(['algo', 'javascript', 'user-interface']),
      readFrontEndInterviewGuides({
        locale,
        slugs: InterviewsQuestionsLanguageJavaScriptGuideSlugs,
      }),
      fetchInterviewListingBottomContent(
        'javascript-coding-interview-questions',
      ),
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
          questionCount: roundQuestionCountToNearestTen(questions.length),
        },
      )}
      guides={guides}
      language={language}
      listType={listType}
      questionCompletionCount={questionCompletionCount}
      questions={questions}
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
      totalQuestionsCount={questions.length}
    />
  );
}
