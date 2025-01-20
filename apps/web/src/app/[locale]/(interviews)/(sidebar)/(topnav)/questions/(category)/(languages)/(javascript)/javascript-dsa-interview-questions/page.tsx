import type { Metadata } from 'next/types';

import type {
  QuestionFormat,
  QuestionLanguage,
  QuestionListTypeData,
} from '~/components/interviews/questions/common/QuestionsTypes';
import InterviewsQuestionsCategoryLanguagePage from '~/components/interviews/questions/listings/category/InterviewsQuestionsCategoryLanguagePage';

import { fetchInterviewListingBottomContent } from '~/db/contentlayer/InterviewsListingBottomContentReader';
import { readAllFrontEndInterviewGuides } from '~/db/guides/GuidesReader';
import { fetchQuestionsCompletionCount } from '~/db/QuestionsCount';
import { fetchQuestionsList } from '~/db/QuestionsListReader';
import { roundQuestionCountToNearestTen } from '~/db/QuestionsUtils';
import { getIntlServerOnly } from '~/i18n';
import defaultMetadata from '~/seo/defaultMetadata';

export const dynamic = 'force-static';

const language: QuestionLanguage = 'js';
const codingFormat: QuestionFormat = 'algo';
const listType: QuestionListTypeData = {
  filters: {
    formats: [codingFormat],
  },
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

  return defaultMetadata({
    description: intl.formatMessage(
      {
        defaultMessage:
          'Practice {questionCount}+ JavaScript Interview Questions on Data Structures and Algorithms. Code in-browser, with solutions and test cases from Big Tech Ex-interviewers',
        description: 'Description of interviews questions page',
        id: 'PaucmE',
      },
      {
        questionCount: roundQuestionCountToNearestTen(questions.length),
      },
    ),
    locale,
    ogImagePageType: intl.formatMessage({
      defaultMessage: 'Frameworks or languages',
      description: 'OG image page title of framework and language page',
      id: '+XLpUw',
    }),
    ogImageTitle: intl.formatMessage({
      defaultMessage: 'JavaScript Data Structures and Algorithms Questions',
      description: 'Title for front end interview questions page',
      id: 'SepyEC',
    }),
    pathname: `/questions/javascript-dsa-interview-questions`,
    socialTitle: intl.formatMessage({
      defaultMessage: 'JavaScript DSA Interview Questions | GreatFrontEnd',
      description: 'Social title of front end interview questions page',
      id: 'nk2W/s',
    }),
    title: intl.formatMessage({
      defaultMessage:
        'JavaScript Data Structures and Algorithms Interview Questions',
      description: 'Title of interview questions page',
      id: '+8ca0t',
    }),
  });
}

export default async function Page({ params }: Props) {
  const { locale } = params;

  const [intl, { questions }, questionCompletionCount, guides, bottomContent] =
    await Promise.all([
      getIntlServerOnly(locale),
      fetchQuestionsList(listType, locale),
      fetchQuestionsCompletionCount([codingFormat]),
      readAllFrontEndInterviewGuides(params.locale),
      fetchInterviewListingBottomContent('javascript-dsa-interview-questions'),
    ]);

  return (
    <InterviewsQuestionsCategoryLanguagePage
      bottomContent={bottomContent}
      description={intl.formatMessage({
        defaultMessage:
          'Coding questions on data structures and algorithms, using JavaScript.',
        description: 'Description of interview questions page',
        id: 'vpSJsc',
      })}
      guides={guides}
      language={language}
      listType={listType}
      questionCompletionCount={questionCompletionCount}
      questions={questions}
      showCategoryTabs={false}
      title={intl.formatMessage({
        defaultMessage: 'JavaScript DSA Interview Questions',
        description: 'Title of interview questions page',
        id: 'Butt5/',
      })}
      totalQuestionsCount={questions.length}
    />
  );
}
