import { keyBy, mapValues, sumBy } from 'lodash-es';

import type {
  FrontEndInterviewRouteType,
  FrontEndSystemDesignRouteType,
  GuideCardMetadata,
  GuideMetadata,
} from '~/components/guides/types';

export function hashGuide(type: string, slug: string) {
  return type + ':' + slug;
}

export function hasCompletedGuide(
  completedGuides: Set<string>,
  guide: GuideMetadata,
): boolean {
  return completedGuides.has(hashGuide(guide.category, guide.slug));
}

export const frontendInterviewSlugs = [
  'introduction',
  'javascript',
  'algorithms',
  'user-interface',
  'user-interface-questions-cheatsheet',
  'user-interface-components-api-design-principles',
  'quiz',
  'system-design',
  'resume',
  'coding',
] as const;

export const frontEndInterviewsRouteToFile: Record<
  FrontEndInterviewRouteType,
  string
> = {
  '': 'overview',
  algorithms: 'algorithms',
  coding: 'coding',
  javascript: 'javascript',
  quiz: 'quiz',
  resume: 'resume',
  'system-design': 'system-design',
  'user-interface': 'user-interface',
  'user-interface-components-api-design-principles':
    'user-interface-components-api-design-principles',
  'user-interface-questions-cheatsheet': 'user-interface-questions-cheatsheet',
};

export const frontendSystemDesignSlugs = [
  'introduction',
  'types-of-questions',
  'framework',
  'evaluation-axes',
  'common-mistakes',
  'cheatsheet',
] as const;

export const frontendSystemDesignRouteToFile: Record<
  FrontEndSystemDesignRouteType,
  string
> = {
  '': 'introduction',
  cheatsheet: 'cheatsheet',
  'common-mistakes': 'common-mistakes',
  'evaluation-axes': 'evaluation-axes',
  framework: 'framework',
  'types-of-questions': 'types-of-questions',
};

export function categorizeGuides<
  T extends string,
  R extends string,
  Q extends GuideCardMetadata,
>({
  guides,
  categorizedSlugs,
}: {
  categorizedSlugs: Record<T, ReadonlyArray<R>>;
  guides: ReadonlyArray<Q>;
}): Record<T, { articles: Array<Q>; totalReadingTime: number }> {
  // Create a map of guides based on their slug for quick lookup
  const guideMap = keyBy(guides, 'slug');

  // Iterate through each category in categorizedSlugs
  return mapValues(categorizedSlugs, (slugs) => {
    const articles = slugs.map((slug) => guideMap[slug]).filter(Boolean); // Filter out undefined (in case a route doesn't match any guide)

    const totalReadingTime = sumBy(articles, 'readingTime');

    return { articles, totalReadingTime };
  });
}
