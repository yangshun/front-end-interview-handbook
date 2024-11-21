import type { Metadata } from 'next';

import InterviewsPracticeQuestionsPage from '~/components/interviews/questions/listings/practice/InterviewsPracticeQuestionsPage';
import { QuestionCount } from '~/components/interviews/questions/listings/stats/QuestionCount';

import { fetchInterviewListingBottomContent } from '~/db/contentlayer/InterviewsListingBottomContentReader';
import {
  fetchQuestionsListCoding,
  fetchQuestionsListQuiz,
  fetchQuestionsListSystemDesign,
} from '~/db/QuestionsListReader';
import { categorizeQuestionsByFrameworkAndLanguage } from '~/db/QuestionsUtils';
import { getIntlServerOnly } from '~/i18n';
import defaultMetadata from '~/seo/defaultMetadata';

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
    href: '/questions',
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

  const { title, description, socialTitle, href } = await getPageSEOMetadata({
    params,
  });

  return defaultMetadata({
    description,
    locale,
    pathname: href,
    socialTitle,
    title,
  });
}

export default async function Page({ params }: Props) {
  const { locale } = params;

  const [
    { questions: quizQuestions },
    { questions: codingQuestions },
    { questions: systemDesignQuestions },
    bottomContent,
  ] = await Promise.all([
    fetchQuestionsListQuiz(locale),
    fetchQuestionsListCoding(locale),
    fetchQuestionsListSystemDesign(locale),
    fetchInterviewListingBottomContent('all-questions'),
  ]);

  const { framework, language } = categorizeQuestionsByFrameworkAndLanguage({
    codingQuestions,
    quizQuestions,
  });

  return (
    <InterviewsPracticeQuestionsPage
      anchorSection="frameworks"
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
