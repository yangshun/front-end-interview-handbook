import type { Metadata } from 'next/types';
import { CourseJsonLd } from 'next-seo';
import type { IntlShape } from 'react-intl';

import type { FocusAreaType } from '~/data/focus-areas/FocusAreas';
import { getFocusAreas } from '~/data/focus-areas/FocusAreas';

import type { QuestionMetadata } from '~/components/interviews/questions/common/QuestionsTypes';
import { sortQuestions } from '~/components/interviews/questions/listings/filters/QuestionsProcessor';

import { fetchQuestionsBySlug } from '~/db/QuestionsListReader';
import { getIntlServerOnly } from '~/i18n';
import { generateStaticParamsWithLocale } from '~/next-i18nostic/src';
import defaultMetadata from '~/seo/defaultMetadata';
import { getSiteUrl } from '~/seo/siteUrl';

import InterviewsFocusAreaPage from './InterviewsFocusAreaPage';

async function getFocusAreaSEO(focusAreaType: FocusAreaType, locale: string) {
  const intl = await getIntlServerOnly(locale);
  // TODO: Remove this IntlShape typecast.
  const focusAreas = getFocusAreas(intl as IntlShape);
  const focusArea = focusAreas[focusAreaType];

  return { ...focusArea.seo, href: focusArea.href };
}

export async function generateStaticParams() {
  const focusAreas: ReadonlyArray<FocusAreaType> = [
    'async-operations',
    'data-structures-algorithms',
    'design-system-components',
    'javascript-polyfills',
    'lodash',
    'accessibility',
    'forms',
    'dom-manipulation',
  ];

  return generateStaticParamsWithLocale(
    focusAreas.map((focusArea) => ({ focusArea })),
  );
}

type Props = Readonly<{
  params: {
    focusArea: FocusAreaType;
    locale: string;
  };
}>;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, focusArea: focusAreaType } = params;

  const { title, description, href } = await getFocusAreaSEO(
    focusAreaType,
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
  const { locale, focusArea: focusAreaType } = params;

  const intl = await getIntlServerOnly(locale);

  // TODO: Remove this IntlShape typecast.
  const focusAreas = getFocusAreas(intl as IntlShape);
  const focusArea = focusAreas[focusAreaType];

  const { title, description } = await getFocusAreaSEO(focusAreaType, locale);

  const questions = await fetchQuestionsBySlug(focusArea.questions, locale);
  const codingQuestionsForPlan = questions.javascript.concat(
    questions['user-interface'],
  );
  const systemDesignQuestionsForPlan = questions['system-design'];
  const quizQuestionsForPlan = questions.quiz;

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
      <InterviewsFocusAreaPage
        codingQuestions={codingQuestionsForPlan}
        focusArea={focusArea}
        quizQuestions={sortQuestions(
          quizQuestionsForPlan as ReadonlyArray<QuestionMetadata>,
          'importance',
          false,
        )}
        systemDesignQuestions={systemDesignQuestionsForPlan}
      />
    </>
  );
}
