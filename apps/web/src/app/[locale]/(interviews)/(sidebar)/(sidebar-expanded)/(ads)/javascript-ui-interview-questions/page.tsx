import type { Metadata } from 'next/types';

import { QuestionLanguageLabels } from '~/data/QuestionCategories';

import InterviewsQuestionsCategoryLanguagePage from '~/components/interviews/questions/listings/category/InterviewsQuestionsCategoryLanguagePage';

import { fetchInterviewListingBottomContent } from '~/db/contentlayer/InterviewsListingBottomContentReader';
import { readAllFrontEndInterviewGuides } from '~/db/guides/GuidesReader';
import { fetchQuestionsCompletionCount } from '~/db/QuestionsCount';
import {
  fetchQuestionsListCoding,
  fetchQuestionsListCodingForLanguage,
} from '~/db/QuestionsListReader';
import { roundQuestionCountToNearestTen } from '~/db/QuestionsUtils';
import { getIntlServerOnly } from '~/i18n';
import defaultMetadata from '~/seo/defaultMetadata';

export const dynamic = 'force-static';

const language = 'js';
const codingFormat = 'user-interface';

type Props = Readonly<{
  params: Readonly<{
    locale: string;
  }>;
}>;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = params;

  const [intl, { questions: questionsCoding }] = await Promise.all([
    getIntlServerOnly(locale),
    fetchQuestionsListCoding(locale),
  ]);

  const questionsCodingFormat = questionsCoding.filter((metadata) =>
    metadata.format.includes(codingFormat),
  );

  const category = QuestionLanguageLabels[language];

  return defaultMetadata({
    description: intl.formatMessage(
      {
        defaultMessage:
          'Practice {questionCount}+ JavaScript Interview Questions on User Interfaces (UI). Code in-browser, with quality solutions and test cases from Big Tech Ex-interviewers',
        description: 'Description of interviews questions page',
        id: 'XKRfBZ',
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
    ogImageTitle: intl.formatMessage(
      {
        defaultMessage: '{category} User Interface Interview Questions',
        description: 'Title for front end interview questions page',
        id: 'ucUZT7',
      },
      {
        category,
      },
    ),
    pathname: `/javascript-ui-interview-questions`,
    socialTitle: intl.formatMessage(
      {
        defaultMessage:
          '{category} User Interface Interview Questions | GreatFrontEnd',
        description: 'Social title of front end interview questions page',
        id: 'X6bc93',
      },
      {
        category,
      },
    ),
    title: intl.formatMessage(
      {
        defaultMessage: '{category} UI Interview Questions | With Answers',
        description: 'Title of interview questions page',
        id: 'kmXWNc',
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
    fetchQuestionsCompletionCount([codingFormat]),
    readAllFrontEndInterviewGuides(params.locale),
    fetchInterviewListingBottomContent(`language-${language}`),
  ]);

  const questionsCodingFormat = questionsCoding.filter((metadata) =>
    metadata.format.includes(codingFormat),
  );

  return (
    <InterviewsQuestionsCategoryLanguagePage
      bottomContent={bottomContent}
      description={intl.formatMessage({
        defaultMessage:
          'Coding questions that use JavaScript to build user interfaces, including components, applications, and games.',
        description: 'Description of interview questions page',
        id: 'uWgMQQ',
      })}
      guides={guides}
      language={language}
      questionCompletionCount={questionCompletionCount}
      questions={questionsCodingFormat}
      showCategoryTabs={false}
      title={intl.formatMessage({
        defaultMessage: 'JavaScript User Interface Interview Questions',
        description: 'Title of interview questions page',
        id: 'mOd6tW',
      })}
      totalQuestionsCount={questionsCodingFormat.length}
      userFacingFormat="coding"
    />
  );
}
