import type { Metadata } from 'next/types';

import {
  QuestionLanguageLabels,
  QuestionLanguageSEOToRawMapping,
} from '~/data/QuestionCategories';

import type {
  QuestionFormat,
  QuestionLanguageSEO,
  QuestionListTypeData,
} from '~/components/interviews/questions/common/QuestionsTypes';
import { InterviewsQuestionsQuizGuideSlugs } from '~/components/interviews/questions/listings/category/InterviewsQuestionsCategoryGuideSlugs';
import InterviewsQuestionsCategoryLanguagePage from '~/components/interviews/questions/listings/category/InterviewsQuestionsCategoryLanguagePage';

import { fetchInterviewListingBottomContent } from '~/db/contentlayer/InterviewsListingBottomContentReader';
import { readFrontEndInterviewPlaybookGuides } from '~/db/guides/GuidesReader';
import { fetchQuestionsCompletionCount } from '~/db/QuestionsCount';
import { fetchQuestionsList } from '~/db/QuestionsListReader';
import { roundQuestionCountToNearestTen } from '~/db/QuestionsUtils';
import { getIntlServerOnly } from '~/i18n';
import defaultMetadata from '~/seo/defaultMetadata';

const questionFormat: QuestionFormat = 'quiz';

export const dynamic = 'force-static';

type Props = Readonly<{
  params: Readonly<{
    locale: string;
    slug: QuestionLanguageSEO;
  }>;
}>;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = params;
  const language = QuestionLanguageSEOToRawMapping[slug];

  const [intl, { questions }] = await Promise.all([
    getIntlServerOnly(locale),
    fetchQuestionsList({ type: 'language', value: language }, locale),
  ]);

  const languageLabel = QuestionLanguageLabels[language];

  return defaultMetadata({
    description: intl.formatMessage(
      {
        defaultMessage:
          'Practice {questionCount}+ curated {languageLabel} Interview Questions in-browser, with solutions and test cases from big tech ex-interviewers',
        description: 'Description of interviews questions page',
        id: 'hY6aRS',
      },
      {
        languageLabel,
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
        defaultMessage: '{languageLabel} Interview Questions',
        description: 'Title for front end interview questions page',
        id: 'NsU/ae',
      },
      {
        languageLabel,
      },
    ),
    pathname: `/questions/${slug}`,
    socialTitle: intl.formatMessage(
      {
        defaultMessage:
          '{languageLabel} Interview Questions with Solutions | GreatFrontEnd',
        description: 'Social title of front end interview questions page',
        id: 'YfhHA3',
      },
      {
        languageLabel,
      },
    ),
    title: intl.formatMessage(
      {
        defaultMessage:
          '{languageLabel} Interview Questions | Solutions by Ex-FAANG interviewers',
        description: 'Title of interview questions page',
        id: '0I3ugE',
      },
      {
        languageLabel,
      },
    ),
  });
}

export default async function Page({ params }: Props) {
  const { locale, slug } = params;
  const language = QuestionLanguageSEOToRawMapping[slug];
  const listType: QuestionListTypeData = {
    tab: 'quiz',
    type: 'language',
    value: language,
  };

  const [
    { questions: questionsQuiz },
    { questions: questionsAll },
    questionCompletionCount,
    guides,
    bottomContent,
  ] = await Promise.all([
    fetchQuestionsList(listType, locale),
    fetchQuestionsList({ type: 'language', value: language }, locale),
    fetchQuestionsCompletionCount([questionFormat]),
    readFrontEndInterviewPlaybookGuides({
      locale,
      slugs: InterviewsQuestionsQuizGuideSlugs,
    }),
    fetchInterviewListingBottomContent(`language/${language}`, locale),
  ]);

  return (
    <InterviewsQuestionsCategoryLanguagePage
      bottomContent={bottomContent}
      guides={guides}
      language={language}
      listType={listType}
      questionCompletionCount={questionCompletionCount}
      questions={questionsQuiz}
      totalQuestionsCount={questionsAll.length}
    />
  );
}
