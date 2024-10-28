import type { Metadata } from 'next/types';
import { CourseJsonLd } from 'next-seo';
import type { IntlShape } from 'react-intl';

import { INTERVIEWS_REVAMP_BOTTOM_CONTENT } from '~/data/FeatureFlags';
import type { PreparationPlanType } from '~/data/plans/PreparationPlans';
import { getPreparationPlan } from '~/data/plans/PreparationPlans';

import type { QuestionMetadata } from '~/components/interviews/questions/common/QuestionsTypes';
import { sortQuestions } from '~/components/interviews/questions/listings/filters/QuestionsProcessor';

import { fetchInterviewListingBottomContent } from '~/db/contentlayer/InterviewsListingBottomContentReader';
import { fetchPreparationPlans } from '~/db/PreparationPlansReader';
import { fetchQuestionsBySlug } from '~/db/QuestionsListReader';
import { getIntlServerOnly } from '~/i18n';
import { generateStaticParamsWithLocale } from '~/next-i18nostic/src';
import defaultMetadata from '~/seo/defaultMetadata';
import { getSiteOrigin } from '~/seo/siteUrl';

import InterviewsStudyPlanPage from './InterviewsStudyPlanPage';

async function getPreparationPlansSEO(
  planType: PreparationPlanType,
  locale: string,
) {
  const intl = await getIntlServerOnly(locale);
  // TODO: Remove this IntlShape typecast.
  const plan = getPreparationPlan(planType, intl as IntlShape);

  return { ...plan.seo, href: plan.href };
}

export async function generateStaticParams() {
  const plans: ReadonlyArray<PreparationPlanType> = [
    'one-week',
    'one-month',
    'three-months',
  ];

  return generateStaticParamsWithLocale(plans.map((plan) => ({ plan })));
}

type Props = Readonly<{
  params: {
    locale: string;
    plan: PreparationPlanType;
  };
}>;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, plan: planType } = params;

  const { title, description, href, socialTitle } =
    await getPreparationPlansSEO(planType, locale);

  return defaultMetadata({
    description,
    locale,
    pathname: href,
    socialTitle,
    title,
  });
}

export default async function Page({ params }: Props) {
  const { locale, plan: planType } = params;

  const intl = await getIntlServerOnly(locale);
  const [preparationPlans, { title, description }, bottomContent] =
    await Promise.all([
      // TODO: Remove this IntlShape typecast.
      fetchPreparationPlans(intl as IntlShape),
      getPreparationPlansSEO(planType, locale),
      fetchInterviewListingBottomContent(`${planType}-study-plan`),
    ]);
  const preparationPlan = preparationPlans[planType];

  const questions = await fetchQuestionsBySlug(
    preparationPlan.questions,
    locale,
  );
  const codingQuestionsForPlan = [
    ...questions.javascript,
    ...questions['user-interface'],
    ...questions.algo,
  ];
  const systemDesignQuestionsForPlan = questions['system-design'];
  const quizQuestionsForPlan =
    questions.quiz as ReadonlyArray<QuestionMetadata>;

  return (
    <>
      <CourseJsonLd
        courseName={title}
        description={description}
        provider={{
          name: 'GreatFrontEnd',
          url: getSiteOrigin(),
        }}
        useAppDir={true}
      />
      <InterviewsStudyPlanPage
        bottomContent={
          INTERVIEWS_REVAMP_BOTTOM_CONTENT ? bottomContent : undefined
        }
        codingQuestions={codingQuestionsForPlan}
        plan={preparationPlan}
        quizQuestions={sortQuestions(quizQuestionsForPlan, 'importance', false)}
        systemDesignQuestions={systemDesignQuestionsForPlan}
      />
    </>
  );
}
