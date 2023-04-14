import type { Metadata } from 'next/types';
import { CourseJsonLd } from 'next-seo';

import type { PreparationPlanType } from '~/components/questions/common/PreparationPlanTypes';
import { sortQuestions } from '~/components/questions/common/QuestionsProcessor';

import {
  fetchQuestionsListCoding,
  fetchQuestionsListQuiz,
  fetchQuestionsListSystemDesign,
} from '~/db/QuestionsListReader';
import { getIntlServerOnly } from '~/i18n';
import { generateStaticParamsWithLocale } from '~/next-i18nostic/src';
import defaultMetadata from '~/seo/defaultMetadata';
import { getSiteUrl } from '~/seo/siteUrl';

import PreparePlanPage from './PreparePlanPage';

async function getPreparationPlansMetadata(
  planType: PreparationPlanType,
  locale: string,
) {
  const intl = await getIntlServerOnly(locale);

  switch (planType) {
    case 'one-week':
      return {
        description: intl.formatMessage({
          defaultMessage:
            'Study and practice the exact questions and concepts you need to prepare for front end interviews within a week',
          description: 'Description of 1 Week Preparation Plan page',
          id: 'D3YhsE',
        }),
        title: intl.formatMessage({
          defaultMessage:
            'Study plan to prepare for front end interviews in 1 week',
          description: 'Title of 1 Week Preparation Plan page',
          id: 'UiHdWK',
        }),
      };
    case 'one-month':
      return {
        description: intl.formatMessage({
          defaultMessage:
            'Structured study plan developed by ex-interviewers at FAANG. Prepare holistically for front end interviews within a month',
          description: 'Description of 1 Month Preparation Plan page',
          id: 'N4F6al',
        }),
        title: intl.formatMessage({
          defaultMessage:
            'Study plan to prepare for front end interviews in 1 month',
          description: 'Title of 1 Month Preparation Plan page',
          id: 'O7MAvX',
        }),
      };
    case 'three-months':
      return {
        description: intl.formatMessage({
          defaultMessage:
            'Everything you need to study and practice for front end interviews for a complete preparation.',
          description: 'Description of 3 Months Preparation Plan page',
          id: '8UEoLG',
        }),
        title: intl.formatMessage({
          defaultMessage:
            'Study plan to prepare for front end interviews in 3 months',
          description: 'Title of 3 Months Preparation Plan page',
          id: '7Iapcq',
        }),
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
    locale: string;
    plan: PreparationPlanType;
  };
}>;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, plan: planType } = params;

  const { title, description } = await getPreparationPlansMetadata(
    planType,
    locale,
  );

  return defaultMetadata({
    description,
    locale,
    pathname: `/prepare/${planType}`,
    title,
  });
}

export default async function Page({ params }: Props) {
  const { locale, plan: planType } = params;
  const [
    { questions: quizQuestions },
    { questions: codingQuestions },
    { questions: systemDesignQuestions },
  ] = await Promise.all([
    fetchQuestionsListQuiz(locale),
    fetchQuestionsListCoding(locale),
    fetchQuestionsListSystemDesign(locale),
  ]);

  const { title, description } = await getPreparationPlansMetadata(
    planType,
    locale,
  );

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
        codingQuestions={codingQuestions}
        plan={planType}
        quizQuestions={sortQuestions(quizQuestions, 'importance', false)}
        systemDesignQuestions={systemDesignQuestions}
      />
    </>
  );
}
