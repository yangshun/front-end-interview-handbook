import { allInterviewsListingBottomContents } from 'contentlayer/generated';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next/types';
import { CourseJsonLd } from 'next-seo';
import type { IntlShape } from 'react-intl';

import { INTERVIEWS_REVAMP_2024 } from '~/data/FeatureFlags';
import type { PreparationPlanType } from '~/data/plans/PreparationPlans';
import { getPreparationPlan } from '~/data/plans/PreparationPlans';

import type { QuestionMetadata } from '~/components/interviews/questions/common/QuestionsTypes';
import { sortQuestions } from '~/components/interviews/questions/listings/filters/QuestionsProcessor';

import { fetchPreparationPlans } from '~/db/PreparationPlansReader';
import { fetchQuestionsBySlug } from '~/db/QuestionsListReader';
import { getIntlServerOnly } from '~/i18n';
import defaultMetadata from '~/seo/defaultMetadata';
import { getSiteOrigin } from '~/seo/siteUrl';

import InterviewsGFE75Page from './InterviewsBlind75Page';

async function getPreparationPlansSEO(
  planType: PreparationPlanType,
  locale: string,
) {
  const intl = await getIntlServerOnly(locale);
  // TODO: Remove this IntlShape typecast.
  const plan = getPreparationPlan(planType, intl as IntlShape);

  return { ...plan.seo, href: plan.href };
}

type Props = Readonly<{
  params: {
    locale: string;
  };
}>;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = params;

  const { title, description, href, socialTitle } =
    await getPreparationPlansSEO('blind75', locale);

  return defaultMetadata({
    description,
    locale,
    pathname: href,
    socialTitle,
    title,
  });
}

export default async function Page({ params }: Props) {
  if (!INTERVIEWS_REVAMP_2024) {
    return notFound();
  }

  const { locale } = params;

  const intl = await getIntlServerOnly(locale);
  // TODO: Remove this IntlShape typecast.
  const preparationPlans = await fetchPreparationPlans(intl as IntlShape);
  const preparationPlan = preparationPlans.blind75;

  const { title, description, socialTitle, href } =
    await getPreparationPlansSEO('blind75', locale);

  const questions = await fetchQuestionsBySlug(
    preparationPlan.questions,
    locale,
  );
  const codingQuestionsForPlan = questions.javascript.concat(
    questions['user-interface'],
  );
  const systemDesignQuestionsForPlan = questions['system-design'];
  const quizQuestionsForPlan =
    questions.quiz as ReadonlyArray<QuestionMetadata>;

  const bottomContent = allInterviewsListingBottomContents.find(
    (content) => content.slug === 'blind75',
  );

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
      <InterviewsGFE75Page
        bottomContent={bottomContent}
        codingQuestions={codingQuestionsForPlan}
        metadata={{
          description,
          href,
          title: socialTitle || title,
        }}
        plan={preparationPlan}
        quizQuestions={sortQuestions(quizQuestionsForPlan, 'importance', false)}
        systemDesignQuestions={systemDesignQuestionsForPlan}
      />
    </>
  );
}
