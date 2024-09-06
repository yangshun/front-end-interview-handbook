import type { Metadata } from 'next/types';
import type { IntlShape } from 'react-intl';

import { getFocusAreas } from '~/data/focus-areas/FocusAreas';

import type {
  QuestionDifficulty,
  QuestionList,
} from '~/components/interviews/questions/common/QuestionsTypes';
import { countQuestionsByDifficulty } from '~/components/interviews/questions/listings/filters/QuestionsProcessor';

import { fetchQuestionsBySlug } from '~/db/QuestionsListReader';
import { getIntlServerOnly } from '~/i18n';
import defaultMetadata from '~/seo/defaultMetadata';

import InterviewsFocusAreaListPage from './InterviewsFocusAreaListPage';

// TODO(interviews): disable to do A/B test.
// export const dynamic = 'force-static';

type Props = Readonly<{
  params: Readonly<{
    locale: string;
  }>;
}>;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = params;

  const intl = await getIntlServerOnly(locale);

  return defaultMetadata({
    description: intl.formatMessage({
      defaultMessage:
        'Discover focus areas tailored to your needs to help your prepare for your upcoming technical interviews.',
      description: 'Description for focus areas page',
      id: 'YAoXTu',
    }),
    locale,
    pathname: '/focus-areas',
    title: intl.formatMessage({
      defaultMessage: 'Focus areas for Front End Interviews',
      description: 'Title of focus areas page',
      id: '8wt3/b',
    }),
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

  return (
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
