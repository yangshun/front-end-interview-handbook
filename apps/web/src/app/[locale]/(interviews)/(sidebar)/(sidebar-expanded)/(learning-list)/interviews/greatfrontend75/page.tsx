import { notFound } from 'next/navigation';
import type { Metadata } from 'next/types';
import { CourseJsonLd } from 'next-seo';
import type { IntlShape } from 'react-intl';

import {
  INTERVIEWS_REVAMP_2024,
  INTERVIEWS_REVAMP_BOTTOM_CONTENT,
} from '~/data/FeatureFlags';
import type { PreparationPlanType } from '~/data/plans/PreparationPlans';
import { getPreparationPlan } from '~/data/plans/PreparationPlans';

import type { QuestionMetadata } from '~/components/interviews/questions/common/QuestionsTypes';
import { sortQuestions } from '~/components/interviews/questions/listings/filters/QuestionsProcessor';

import { fetchInterviewListingBottomContent } from '~/db/contentlayer/InterviewsListingBottomContentReader';
import { fetchPreparationPlans } from '~/db/PreparationPlansReader';
import { fetchQuestionsBySlug } from '~/db/QuestionsListReader';
import { getIntlServerOnly } from '~/i18n';
import defaultMetadata from '~/seo/defaultMetadata';
import { getSiteOrigin } from '~/seo/siteUrl';

import InterviewsGFE75Page from './InterviewsGFE75Page';

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
    await getPreparationPlansSEO('greatfrontend75', locale);

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
  const [
    preparationPlans,
    { title, description, socialTitle, href },
    bottomContent,
  ] = await Promise.all([
    // TODO: Remove this IntlShape typecast.
    fetchPreparationPlans(intl as IntlShape),
    getPreparationPlansSEO('greatfrontend75', locale),
    fetchInterviewListingBottomContent('greatfrontend75'),
  ]);

  const preparationPlan = preparationPlans.greatfrontend75;
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
        bottomContent={
          INTERVIEWS_REVAMP_BOTTOM_CONTENT ? bottomContent : undefined
        }
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
