import type { Metadata } from 'next/types';
import type { IntlShape } from 'react-intl';

import { INTERVIEWS_REVAMP_2024 } from '~/data/FeatureFlags';
import type { PreparationPlan } from '~/data/plans/PreparationPlans';

import type { QuestionDifficulty } from '~/components/interviews/questions/common/QuestionsTypes';
import { countQuestionsByDifficulty } from '~/components/interviews/questions/listings/filters/QuestionsProcessor';

import { fetchInterviewListingBottomContent } from '~/db/contentlayer/InterviewsListingBottomContentReader';
import { fetchPreparationPlans } from '~/db/PreparationPlansReader';
import { fetchQuestionsBySlug } from '~/db/QuestionsListReader';
import { getIntlServerOnly } from '~/i18n';
import defaultMetadata from '~/seo/defaultMetadata';

import InterviewsRevampStudyPlansPage from './InteriewsRevampStudyPlansPage';
import InterviewsStudyPlansPage from './InterviewsStudyPlansPage';

// TODO(interviews): disable to do A/B test.
// export const dynamic = 'force-static';

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
        'Explore study plans that help you prepare for your front end interviews regardless of time left. Efficiently focus on topics that give you the most mileage for time.',
      description: 'Page description for study plans listing',
      id: 's7lhuQ',
    }),
    href: '/study-plans',
    socialTitle: intl.formatMessage({
      defaultMessage: 'Study Plans | GreatFrontEnd',
      description: 'Social title for study plans listing',
      id: 'ZOdYqa',
    }),
    title: intl.formatMessage({
      defaultMessage: 'Study Plans for Front End Interviews',
      description: 'Page title for study plans listing',
      id: 'vNdh9I',
    }),
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
    bottomContent,
  ] = await Promise.all([
    getDifficultySummaryForPlan(preparationPlans['one-week'], locale),
    getDifficultySummaryForPlan(preparationPlans['one-month'], locale),
    getDifficultySummaryForPlan(preparationPlans['three-months'], locale),
    fetchInterviewListingBottomContent('study-plans'),
  ]);

  return INTERVIEWS_REVAMP_2024 ? (
    <InterviewsRevampStudyPlansPage
      bottomContent={bottomContent}
      preparationPlans={preparationPlans}
    />
  ) : (
    <InterviewsStudyPlansPage
      plansDifficultySummary={{
        blind75: difficultySummaryOneMonth,
        greatfrontend75: difficultySummaryOneMonth,
        'one-month': difficultySummaryOneMonth,
        'one-week': difficultySummaryOneWeek,
        'three-months': difficultySummaryThreeMonths,
      }}
      preparationPlans={preparationPlans}
    />
  );
}
