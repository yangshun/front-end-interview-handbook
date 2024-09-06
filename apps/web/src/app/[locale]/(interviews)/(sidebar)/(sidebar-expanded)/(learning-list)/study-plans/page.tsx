import type { Metadata } from 'next/types';
import type { IntlShape } from 'react-intl';

import type { PreparationPlan } from '~/data/plans/PreparationPlans';

import type { QuestionDifficulty } from '~/components/interviews/questions/common/QuestionsTypes';
import { countQuestionsByDifficulty } from '~/components/interviews/questions/listings/filters/QuestionsProcessor';

import { fetchPreparationPlans } from '~/db/PreparationPlansReader';
import { fetchQuestionsBySlug } from '~/db/QuestionsListReader';
import { getIntlServerOnly } from '~/i18n';
import defaultMetadata from '~/seo/defaultMetadata';

import InterviewsStudyPlansPage from './InterviewsStudyPlansPage';

// TODO(interviews): disable to do A/B test.
// export const dynamic = 'force-static';

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
        'Discover study plans tailored to your needs to help your prepare for your upcoming technical interviews.',
      description: 'Description for study plans page',
      id: '2vDjTb',
    }),
    locale,
    pathname: '/study-plans',
    title: intl.formatMessage({
      defaultMessage: 'Study plans for Front End Interviews',
      description: 'Title of study plans page',
      id: '6A9LIb',
    }),
  });
}

async function getDifficultySummaryForPlan(
  plan: PreparationPlan,
  locale: string,
): Promise<Record<QuestionDifficulty, number>> {
  const questions = await fetchQuestionsBySlug(plan.questions, locale);

  return countQuestionsByDifficulty([
    ...questions.javascript,
    ...questions['user-interface'],
    ...questions['system-design'],
  ]);
}

export default async function Page({ params }: Props) {
  const { locale } = params;

  const intl = await getIntlServerOnly(locale);
  const preparationPlans = await fetchPreparationPlans(intl as IntlShape);
  const [
    difficultySummaryOneWeek,
    difficultySummaryOneMonth,
    difficultySummaryThreeMonths,
    difficultySummaryGFE75,
    difficultySummaryBlind75,
  ] = await Promise.all([
    getDifficultySummaryForPlan(preparationPlans['one-week'], locale),
    getDifficultySummaryForPlan(preparationPlans['one-month'], locale),
    getDifficultySummaryForPlan(preparationPlans['three-months'], locale),
    getDifficultySummaryForPlan(preparationPlans.greatfrontend75, locale),
    getDifficultySummaryForPlan(preparationPlans.blind75, locale),
  ]);

  return (
    <InterviewsStudyPlansPage
      plansDifficultySummary={{
        blind75: difficultySummaryBlind75,
        greatfrontend75: difficultySummaryGFE75,
        'one-month': difficultySummaryOneMonth,
        'one-week': difficultySummaryOneWeek,
        'three-months': difficultySummaryThreeMonths,
      }}
      preparationPlans={preparationPlans}
    />
  );
}
