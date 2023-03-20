import type { Metadata } from 'next/types';
import { generateStaticParamsWithLocale } from 'next-i18nostic';
import { CourseJsonLd } from 'next-seo';

import type { PreparationPlanType } from '~/components/questions/common/PreparationPlanTypes';
import { sortQuestions } from '~/components/questions/common/QuestionsProcessor';

import {
  fetchQuestionsListCoding,
  fetchQuestionsListQuiz,
  fetchQuestionsListSystemDesign,
} from '~/db/QuestionsListReader';
import defaultMetadata from '~/seo/defaultMetadata';

import PreparePlanPage from './PreparePlanPage';

function preparationPlansMetadata(planType: PreparationPlanType) {
  switch (planType) {
    case 'one-week':
      return {
        description:
          'Study and practice the exact questions and concepts you need to prepare for front end interviews within a week',
        title: 'Study plan to prepare for front end interviews in 1 week',
      };
    case 'one-month':
      return {
        description:
          'Structured study plan developed by ex-interviewers at FAANG. Prepare holistically for front end interviews within a month',
        title: 'Study plan to prepare for front end interviews in 1 month',
      };
    case 'three-months':
      return {
        description:
          'Everything you need to study and practice for front end interviews for a complete preparation.',
        title: 'Study plan to prepare for front end interviews in 3 months',
      };
  }
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
    plan: PreparationPlanType;
  };
}>;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const planType = params.plan;
  const { title, description } = preparationPlansMetadata(planType);

  return defaultMetadata({
    description,
    pathname: `/prepare/${planType}`,
    title,
  });
}

export default async function Page({ params }: Props) {
  const planType = params.plan as PreparationPlanType;
  const [quizQuestions, codingQuestions, systemDesignQuestions] =
    await Promise.all([
      fetchQuestionsListQuiz(),
      fetchQuestionsListCoding(),
      fetchQuestionsListSystemDesign(),
    ]);
  const { title, description } = preparationPlansMetadata(planType);

  return (
    <>
      <CourseJsonLd
        courseName={title}
        description={description}
        provider={{
          name: 'GreatFrontEnd',
          url: 'https://www.greatfrontend.com',
        }}
        useAppDir={true}
      />
      <PreparePlanPage
        codingQuestions={codingQuestions}
        plan={planType}
        quizQuestions={sortQuestions(quizQuestions, 'importance', false)}
        systemDesignQuestions={systemDesignQuestions}
      />
    </>
  );
}
