import type { Metadata } from 'next/types';

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
const codingFormat = 'algo';

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

  const questionsCodingFormat = questionsCoding.filter((metadata) =>
    metadata.format.includes(codingFormat),
  );

  return defaultMetadata({
    description: intl.formatMessage(
      {
        defaultMessage:
          'Practice {questionCount}+ JavaScript Interview Questions on Data Structures and Algorithms. Code in-browser, with solutions and test cases from Big Tech Ex-interviewers',
        description: 'Description of interviews questions page',
        id: 'PaucmE',
      },
      {
        questionCount: roundQuestionCountToNearestTen(
          questionsCodingFormat.length,
        ),
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
    pathname: `/javascript-dsa-interview-questions`,
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

  const [
    intl,
    questionsCoding,
    questionCompletionCount,
    guides,
    bottomContent,
  ] = await Promise.all([
    getIntlServerOnly(locale),
    fetchQuestionsListCodingForLanguage(language, locale),
    fetchQuestionsCompletionCount([codingFormat]),
    readAllFrontEndInterviewGuides(params.locale),
    fetchInterviewListingBottomContent('javascript-dsa-interview-questions'),
  ]);

  const questionsCodingFormat = questionsCoding.filter((metadata) =>
    metadata.format.includes(codingFormat),
  );

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
      questionCompletionCount={questionCompletionCount}
      questions={questionsCodingFormat}
      showCategoryTabs={false}
      title={intl.formatMessage({
        defaultMessage: 'JavaScript DSA Interview Questions',
        description: 'Title of interview questions page',
        id: 'Butt5/',
      })}
      totalQuestionsCount={questionsCodingFormat.length}
      userFacingFormat="coding"
    />
  );
}
