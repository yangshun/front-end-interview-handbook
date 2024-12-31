import type { Metadata } from 'next/types';

import type { QuestionCodingFormat } from '~/components/interviews/questions/common/QuestionsTypes';
import { InterviewsQuestionsCategoryLanguageCodingFormatTabs } from '~/components/interviews/questions/listings/category/InterviewsQuestionsCategoryCodingFormatTabs';
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
import { generateStaticParamsWithLocale } from '~/next-i18nostic/src';
import defaultMetadata from '~/seo/defaultMetadata';

const language = 'html';
const codingFormats = InterviewsQuestionsCategoryLanguageCodingFormatTabs.html;

export const dynamic = 'force-static';

type Props = Readonly<{
  params: Readonly<{
    codingFormat: QuestionCodingFormat;
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

  const { language: languageQuestions } =
    categorizeQuestionsByFrameworkAndLanguage({
      codingQuestions: questionsCoding,
      quizQuestions: questionsQuiz,
    });

  return defaultMetadata({
    description: intl.formatMessage(
      {
        defaultMessage:
          'Practice {questionCount}+ curated HTML Interview Questions in-browser, with solutions and test cases from big tech ex-interviewers',
        description: 'Description of Interview Questions page',
        id: 'vKD8vq',
      },
      {
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
        defaultMessage: '{category} Interview Questions',
        description: 'OG image title of framework and language page',
        id: 'uEiI+F',
      },
      {
        category: 'HTML',
      },
    ),
    pathname: `/questions/${language}-interview-questions`,
    socialTitle: intl.formatMessage({
      defaultMessage: 'HTML Interview Questions with Solutions | GreatFrontEnd',
      description: 'Social title of HTML Interview Questions page',
      id: 'fq5xTR',
    }),
    title: intl.formatMessage({
      defaultMessage:
        'HTML Interview Questions | Solutions by Ex-FAANG interviewers',
      description: 'Title of HTML Interview Questions page',
      id: 'jS+FMq',
    }),
  });
}

export async function generateStaticParams() {
  return generateStaticParamsWithLocale(
    codingFormats.map((questionFormat) => ({
      format: questionFormat,
    })),
  );
}

export default async function Page({ params }: Props) {
  const { codingFormat, locale } = params;
  const [
    questionsCoding,
    questionsQuiz,
    questionCompletionCount,
    guides,
    bottomContent,
  ] = await Promise.all([
    fetchQuestionsListCodingForLanguage(language, locale),
    fetchQuestionsListQuizForLanguage(language, locale),
    fetchQuestionsCompletionCount([codingFormat]),
    readAllFrontEndInterviewGuides(params.locale),
    fetchInterviewListingBottomContent('language-html'),
  ]);

  const questionsCodingFormat = questionsCoding.filter((metadata) =>
    metadata.format.includes(codingFormat),
  );

  return (
    <InterviewsQuestionsCategoryLanguagePage
      bottomContent={bottomContent}
      codingFormat={{
        options: codingFormats,
        value: codingFormat,
      }}
      guides={guides}
      language={language}
      questionCompletionCount={questionCompletionCount}
      questions={questionsCodingFormat}
      totalQuestionsCount={questionsCoding.length + questionsQuiz.length}
      userFacingFormat="coding"
    />
  );
}
