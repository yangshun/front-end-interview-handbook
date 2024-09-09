import type { Metadata } from 'next/types';
import type { IntlShape } from 'react-intl';

import { INTERVIEWS_REVAMP_2024 } from '~/data/FeatureFlags';
import { getFocusAreas } from '~/data/focus-areas/FocusAreas';

import type {
  QuestionDifficulty,
  QuestionList,
} from '~/components/interviews/questions/common/QuestionsTypes';
import { countQuestionsByDifficulty } from '~/components/interviews/questions/listings/filters/QuestionsProcessor';

import { fetchInterviewListingBottomContent } from '~/db/contentlayer/InterviewsListingBottomContentReader';
import { fetchQuestionsBySlug } from '~/db/QuestionsListReader';
import { getIntlServerOnly } from '~/i18n';
import defaultMetadata from '~/seo/defaultMetadata';

import InterviewsFocusAreaListPage from './InterviewsFocusAreaListPage';
import InterviewsRevampFocusAreaListPage from './InterviewsRevampFocusAreaListPage';

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
  const focusAreas = getFocusAreas(intl as IntlShape);

  return {
    description: intl.formatMessage(
      {
        defaultMessage:
          'Explore {topicsCount} critical topics for front end interviews. Master them with targeted practice questions—each with detailed solutions and tests to learn from.',
        description: 'Page description for focus areas listing',
        id: 'UISwUX',
      },
      {
        topicsCount: Object.keys(focusAreas).length,
      },
    ),
    href: '/focus-areas',
    socialTitle: intl.formatMessage({
      defaultMessage: 'Practice Questions by Focus Area | GreatFrontEnd',
      description: 'Social title for focus areas listing',
      id: 'DUKB3u',
    }),
    title: intl.formatMessage({
      defaultMessage:
        'Front End Interview Focus Areas—Accessibility, Forms and more',
      description: 'Page title for focus areas listing',
      id: 'UET3FT',
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

async function getDifficultySummaryForList(
  list: QuestionList,
  locale: string,
): Promise<Record<QuestionDifficulty, number>> {
  const questions = await fetchQuestionsBySlug(list.questions, locale);

  return countQuestionsByDifficulty([
    ...questions.javascript,
    ...questions['user-interface'],
    ...questions['system-design'],
  ]);
}

export default async function Page({ params }: Props) {
  const { locale } = params;

  const intl = await getIntlServerOnly(locale);
  // TODO: Remove this IntlShape typecast.
  const focusAreas = getFocusAreas(intl as IntlShape);

  const [
    difficultySummaryA11y,
    difficultySummaryAsync,
    difficultySummaryDSA,
    difficultySummaryDSC,
    difficultySummaryDOM,
    difficultySummaryForms,
    difficultySummaryLodash,
    difficultySummaryJavaScriptPolyfills,
    difficultySummaryStateManagement,
  ] = await Promise.all(
    [
      focusAreas.accessibility,
      focusAreas['async-operations'],
      focusAreas['data-structures-algorithms'],
      focusAreas['design-system-components'],
      focusAreas['dom-manipulation'],
      focusAreas.forms,
      focusAreas.lodash,
      focusAreas['javascript-polyfills'],
      focusAreas['state-management'],
    ].map((area) => getDifficultySummaryForList(area, locale)),
  );
  const bottomContent = await fetchInterviewListingBottomContent('focus-areas');

  return INTERVIEWS_REVAMP_2024 ? (
    <InterviewsRevampFocusAreaListPage
      bottomContent={bottomContent}
      focusAreas={focusAreas}
    />
  ) : (
    <InterviewsFocusAreaListPage
      difficultySummary={{
        accessibility: difficultySummaryA11y,
        'async-operations': difficultySummaryAsync,
        'data-structures-algorithms': difficultySummaryDSA,
        'design-system-components': difficultySummaryDSC,
        'dom-manipulation': difficultySummaryDOM,
        forms: difficultySummaryForms,
        'javascript-polyfills': difficultySummaryJavaScriptPolyfills,
        lodash: difficultySummaryLodash,
        'state-management': difficultySummaryStateManagement,
      }}
      focusAreas={focusAreas}
    />
  );
}
