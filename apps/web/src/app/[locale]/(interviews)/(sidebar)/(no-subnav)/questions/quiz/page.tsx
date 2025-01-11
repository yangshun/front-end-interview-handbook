import type { Metadata } from 'next';

import InterviewsQuestionsCategoryPreparePage from '~/components/interviews/questions/listings/category/InterviewsQuestionsCategoryPreparePage';
import { QuestionCountTotal } from '~/components/interviews/questions/listings/stats/QuestionCount';

import { fetchInterviewListingBottomContent } from '~/db/contentlayer/InterviewsListingBottomContentReader';
import { fetchQuestionsListQuiz } from '~/db/QuestionsListReader';
import { getIntlServerOnly } from '~/i18n';
import defaultMetadata from '~/seo/defaultMetadata';

export const dynamic = 'force-static';

type Props = Readonly<{
  params: Readonly<{
    locale: string;
  }>;
}>;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = params;
  const intl = await getIntlServerOnly(locale);

  return defaultMetadata({
    description: intl.formatMessage({
      defaultMessage:
        'Prepare for front end interviews with a vast question bank covering every format and popular frameworks/languages. Includes solutions and tests from ex-interviewers.',
      description: 'Page description for interview questions listing',
      id: 'GJuETM',
    }),
    locale,
    ogImageTitle: intl.formatMessage({
      defaultMessage: 'Front End Interview Quiz Questions',
      description: 'Title for front end interview questions page',
      id: '2CIsYV',
    }),
    pathname: '/questions/quiz',
    socialTitle: intl.formatMessage({
      defaultMessage: 'Front End Interview Quiz Questions | GreatFrontEnd',
      description: 'Social title for practice questions page',
      id: 'Z1KO72',
    }),
    title: intl.formatMessage({
      defaultMessage: 'Front End Interview Quiz Questions',
      description: 'Page title for practice questions page',
      id: 'v9OyMJ',
    }),
  });
}

export default async function Page({ params }: Props) {
  const { locale } = params;

  const [{ questions: quizQuestions }, bottomContent] = await Promise.all([
    fetchQuestionsListQuiz(locale),
    fetchInterviewListingBottomContent('all-questions'),
  ]);

  return (
    <InterviewsQuestionsCategoryPreparePage
      bottomContent={bottomContent}
      questions={quizQuestions}
      totalQuestionCount={QuestionCountTotal}
      userFacingFormat="quiz"
    />
  );
}
