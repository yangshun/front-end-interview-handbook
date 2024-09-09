import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { INTERVIEWS_REVAMP_2024 } from '~/data/FeatureFlags';

import { QuestionCount } from '~/components/interviews/questions/listings/stats/QuestionCount';

import { fetchInterviewListingBottomContent } from '~/db/contentlayer/InterviewsListingBottomContentReader';
import {
  categorizeQuestionsByFrameworkAndLanguage,
  fetchQuestionsListCoding,
  fetchQuestionsListQuiz,
  fetchQuestionsListSystemDesign,
} from '~/db/QuestionsListReader';
import { getIntlServerOnly } from '~/i18n';
import defaultMetadata from '~/seo/defaultMetadata';

import InterviewsAllPracticeQuestionsPage from './InterviewsAllPracticeQuestionsPage';

type Props = Readonly<{
  params: Readonly<{
    locale: string;
  }>;
}>;

async function getPageSEOMetadata({ params }: Props) {
  const { locale } = params;
  const intl = await getIntlServerOnly(locale);

  return {
    description: intl.formatMessage({
      defaultMessage:
        'Prepare for front end interviews with a vast question bank covering every format and popular frameworks/languages. Includes solutions and tests from ex-interviewers.',
      description: 'Page description for focus areas listing',
      id: 'cNg7I1',
    }),
    socialTitle: intl.formatMessage({
      defaultMessage: 'Front End Interview Practice Questions | GreatFrontEnd',
      description: 'Social title for focus areas listing',
      id: '17Ty2c',
    }),
    title: intl.formatMessage(
      {
        defaultMessage:
          '{questionCount}+ Front End Interview Practice Questions',
        description: 'Page title for all practice questions page',
        id: 'tV+VAr',
      },
      {
        questionCount: QuestionCount,
      },
    ),
  };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = params;

  const { title, description, socialTitle } = await getPageSEOMetadata({
    params,
  });

  return defaultMetadata({
    description,
    locale,
    pathname: '/interviews/questions',
    socialTitle,
    title,
  });
}

export default async function Page({ params }: Props) {
  if (!INTERVIEWS_REVAMP_2024) {
    return notFound();
  }

  const { locale } = params;

  const [
    { questions: quizQuestions },
    { questions: codingQuestions },
    { questions: systemDesignQuestions },
    { framework, language },
    bottomContent,
  ] = await Promise.all([
    fetchQuestionsListQuiz(locale),
    fetchQuestionsListCoding(locale),
    fetchQuestionsListSystemDesign(locale),
    categorizeQuestionsByFrameworkAndLanguage(locale),
    fetchInterviewListingBottomContent('all-questions'),
  ]);

  return (
    <InterviewsAllPracticeQuestionsPage
      bottomContent={bottomContent}
      questions={{
        codingQuestions,
        frameworkQuestions: framework,
        languageQuestions: language,
        quizQuestions,
        systemDesignQuestions,
      }}
    />
  );
}
