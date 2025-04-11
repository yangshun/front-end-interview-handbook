import type { InterviewsStudyList } from 'contentlayer/generated';

import { allInterviewsStudyLists } from '~/../.contentlayer/generated/InterviewsStudyList/_index.mjs';

export async function fetchInterviewsStudyList(
  slug: string,
  locale = 'en-US',
): Promise<InterviewsStudyList | undefined> {
  const studyLists = (
    allInterviewsStudyLists as ReadonlyArray<InterviewsStudyList>
  ).filter((content) => content.slug === slug);

  return (
    studyLists.find((content) => content.locale === locale) ??
    studyLists.find((content) => content.locale === 'en-US')!
  );
}

export async function fetchInterviewsStudyLists(
  categoryParam: InterviewsStudyList['category'],
  locale = 'en-US',
): Promise<ReadonlyArray<InterviewsStudyList>> {
  const studyLists =
    allInterviewsStudyLists as ReadonlyArray<InterviewsStudyList>;
  const fallbackLocaleItems = studyLists.filter(
    ({ category, locale: locale_ }) =>
      categoryParam === category && locale_ === 'en-US',
  );

  if (locale === 'en-US') {
    return fallbackLocaleItems;
  }

  // Load items with fallback locale
  const requestedLocaleItems = studyLists.filter(
    ({ category, locale: locale_ }) =>
      categoryParam === category && locale_ === locale,
  );

  const requestedLocaleItemsMap: Record<string, InterviewsStudyList> = {};

  requestedLocaleItems.forEach((item) => {
    requestedLocaleItemsMap[item.slug] = item;
  });

  return fallbackLocaleItems.map((item) =>
    item.slug in requestedLocaleItemsMap
      ? requestedLocaleItemsMap[item.slug]
      : item,
  );
}

export async function fetchInterviewsAllStudyLists(locale = 'en-US') {
  const [focusAreas, studyPlans, companies] = await Promise.all([
    fetchInterviewsStudyLists('focus-area', locale),
    fetchInterviewsStudyLists('study-plan', locale),
    fetchInterviewsStudyLists('company', locale),
  ]);

  return { companies, focusAreas, studyPlans };
}
