import type { Metadata } from 'next/types';
import { CourseJsonLd } from 'next-seo';
import type { IntlShape } from 'react-intl';

import type { PreparationPlanType } from '~/data/plans/PreparationPlans';
import { getPreparationPlans } from '~/data/plans/PreparationPlans';

import { sortQuestions } from '~/components/questions/common/QuestionsProcessor';

import {
  fetchQuestionsBySlug,
  fetchQuestionsListQuiz,
} from '~/db/QuestionsListReader';
import { getIntlServerOnly } from '~/i18n';
import { generateStaticParamsWithLocale } from '~/next-i18nostic/src';
import defaultMetadata from '~/seo/defaultMetadata';
import { getSiteUrl } from '~/seo/siteUrl';

import PreparePlanPage from './PreparePlanPage';

async function getPreparationPlansSEO(
  planType: PreparationPlanType,
  locale: string,
) {
  const intl = await getIntlServerOnly(locale);
  // TODO: Remove this IntlShape typecast.
  const plans = getPreparationPlans(intl as IntlShape);
  const plan = plans[planType];

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

  const { title, description, href } = await getPreparationPlansSEO(
    planType,
    locale,
  );

  return defaultMetadata({
    description,
    locale,
    pathname: href,
    title,
  });
}

export default async function Page({ params }: Props) {
  const { locale, plan: planType } = params;

  const intl = await getIntlServerOnly(locale);

  const [{ questions: quizQuestions }] = await Promise.all([
    fetchQuestionsListQuiz(locale),
  ]);
  // TODO: Remove this IntlShape typecast.
  const preparationPlans = getPreparationPlans(intl as IntlShape);
  const preparationPlan = preparationPlans[planType];

  const quizQuestionsForPlan = quizQuestions.filter(({ importance }) => {
    switch (preparationPlan.type) {
      case 'one-week':
        return importance === 'high';
      case 'one-month':
        return importance === 'high' || importance === 'mid';
      case 'three-months':
        return true;
    }
  });

  // Quiz questions are dynamically populated based on the following.
  preparationPlan.questions.quiz = quizQuestionsForPlan.map(
    (metadata) => metadata.slug,
  );

  const { title, description } = await getPreparationPlansSEO(planType, locale);

  const questions = await fetchQuestionsBySlug(
    preparationPlan.questions,
    locale,
  );
  const codingQuestionsForPlan = questions.javascript.concat(
    questions['user-interface'],
  );
  const systemDesignQuestionsForPlan = questions['system-design'];

  return (
    <>
      <CourseJsonLd
        courseName={title}
        description={description}
        provider={{
          name: 'GreatFrontEnd',
          url: getSiteUrl(),
        }}
        useAppDir={true}
      />
      <PreparePlanPage
        codingQuestions={codingQuestionsForPlan}
        plan={preparationPlan}
        quizQuestions={sortQuestions(quizQuestionsForPlan, 'importance', false)}
        systemDesignQuestions={systemDesignQuestionsForPlan}
      />
    </>
  );
}
