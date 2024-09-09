import type { Metadata } from 'next/types';
import { CourseJsonLd } from 'next-seo';
import type { IntlShape } from 'react-intl';

import type { FocusAreaType } from '~/data/focus-areas/FocusAreas';
import { getFocusAreas } from '~/data/focus-areas/FocusAreas';

import type { QuestionMetadata } from '~/components/interviews/questions/common/QuestionsTypes';
import { sortQuestions } from '~/components/interviews/questions/listings/filters/QuestionsProcessor';

import { fetchInterviewListingBottomContent } from '~/db/contentlayer/InterviewsListingBottomContentReader';
import { fetchQuestionsBySlug } from '~/db/QuestionsListReader';
import { getIntlServerOnly } from '~/i18n';
import { generateStaticParamsWithLocale } from '~/next-i18nostic/src';
import defaultMetadata from '~/seo/defaultMetadata';
import { getSiteOrigin } from '~/seo/siteUrl';

import InterviewsFocusAreaPage from './InterviewsFocusAreaPage';
import { INTERVIEWS_REVAMP_BOTTOM_CONTENT } from '../../../../../../../../data/FeatureFlags';

async function getFocusAreaSEO(focusAreaType: FocusAreaType, locale: string) {
  const intl = await getIntlServerOnly(locale);
  // TODO: Remove this IntlShape typecast.
  const focusAreas = getFocusAreas(intl as IntlShape);
  const focusArea = focusAreas[focusAreaType];

  return { ...focusArea.seo, href: focusArea.href };
}

export async function generateStaticParams() {
  const focusAreas: Record<FocusAreaType, null> = {
    accessibility: null,
    'async-operations': null,
    'data-structures-algorithms': null,
    'design-system-components': null,
    'dom-manipulation': null,
    forms: null,
    'javascript-polyfills': null,
    lodash: null,
    'state-management': null,
  };

  return generateStaticParamsWithLocale(
    Object.keys(focusAreas).map((focusArea) => ({ focusArea })),
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

  const { title, description, href, socialTitle } = await getFocusAreaSEO(
    focusAreaType,
    locale,
  );

  return defaultMetadata({
    description,
    locale,
    pathname: href,
    socialTitle,
    title,
  });
}

export default async function Page({ params }: Props) {
  const { locale, focusArea: focusAreaType } = params;

  const intl = await getIntlServerOnly(locale);

  // TODO: Remove this IntlShape typecast.
  const focusAreas = getFocusAreas(intl as IntlShape);
  const focusArea = focusAreas[focusAreaType];

  const [{ title, description }, questions, bottomContent] = await Promise.all([
    getFocusAreaSEO(focusAreaType, locale),
    fetchQuestionsBySlug(focusArea.questions, locale),
    fetchInterviewListingBottomContent(`${focusAreaType}-focus-area`),
  ]);

  const codingQuestionsForPlan = [
    ...questions.javascript,
    ...questions['user-interface'],
    ...questions.algo,
  ];
  const systemDesignQuestionsForPlan = questions['system-design'];
  const quizQuestionsForPlan = questions.quiz;

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
      <InterviewsFocusAreaPage
        bottomContent={
          INTERVIEWS_REVAMP_BOTTOM_CONTENT ? bottomContent : undefined
        }
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
