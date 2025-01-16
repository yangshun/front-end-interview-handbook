import type { Metadata } from 'next';

import InterviewsQuestionsCategoryPreparePage from '~/components/interviews/questions/listings/category/InterviewsQuestionsCategoryPreparePage';
import { QuestionCountTotal } from '~/components/interviews/questions/listings/stats/QuestionCount';

import { fetchInterviewListingBottomContent } from '~/db/contentlayer/InterviewsListingBottomContentReader';
import { fetchQuestionsList } from '~/db/QuestionsListReader';
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
      defaultMessage: 'Front End Interview System Design Questions',
      description: 'Title for front end interview questions page',
      id: '0n8VZl',
    }),
    pathname: '/questions/system-design',
    socialTitle: intl.formatMessage({
      defaultMessage:
        'Front End Interview System Design Questions | GreatFrontEnd',
      description: 'Social title for practice questions page',
      id: '3hqY/T',
    }),
    title: intl.formatMessage({
      defaultMessage: 'Front End Interview System Design Questions',
      description: 'Page title for practice questions page',
      id: 'A1r7nd',
    }),
  });
}

export default async function Page({ params }: Props) {
  const { locale } = params;

  const [{ questions: systemDesignQuestions }, bottomContent] =
    await Promise.all([
      fetchQuestionsList(
        { tab: 'system-design', type: 'practice', value: 'system-design' },
        locale,
      ),
      fetchInterviewListingBottomContent('all-questions'),
    ]);

  return (
    <InterviewsQuestionsCategoryPreparePage
      bottomContent={bottomContent}
      practiceFormat="system-design"
      questions={systemDesignQuestions}
      totalQuestionCount={QuestionCountTotal}
    />
  );
}
