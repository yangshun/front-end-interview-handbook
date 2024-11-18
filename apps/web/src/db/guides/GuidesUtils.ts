import { keyBy, mapValues, sumBy } from 'lodash-es';

import type {
  BehavioralRouteType,
  FrontEndInterviewRouteType,
  FrontEndSystemDesignRouteType,
  GuideCardMetadata,
  GuideMetadata,
} from '~/components/guides/types';

import type { GuidebookItem } from '@prisma/client';

export function hashGuide(book: GuidebookItem, slug: string) {
  return book + ':' + slug;
}

export function unhashGuide(key: string): [book: GuidebookItem, slug: string] {
  const parts = key.split(':');

  return [parts[0] as GuidebookItem, parts[1]];
}

export function hasCompletedGuide(
  completedGuides: Set<string>,
  guide: GuideMetadata,
): boolean {
  return completedGuides.has(hashGuide(guide.book, guide.slug));
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
  algorithms: 'algorithms',
  coding: 'coding',
  introduction: 'overview',
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
  cheatsheet: 'cheatsheet',
  'common-mistakes': 'common-mistakes',
  'evaluation-axes': 'evaluation-axes',
  framework: 'framework',
  introduction: 'introduction',
  'types-of-questions': 'types-of-questions',
};

export const behavioralSlugs = [
  'introduction',
  'questions',
  'self-introduction',
  'why-work-here',
  'questions-to-ask',
  'problem-solving',
  'collaboration',
  'growth-mindset',
] as const;

export const behavioralRouteToFile: Record<BehavioralRouteType, string> = {
  collaboration: 'collaboration',
  'growth-mindset': 'growth-mindset',
  introduction: 'overview',
  'problem-solving': 'problem-solving',
  questions: 'questions',
  'questions-to-ask': 'questions-to-ask',
  'self-introduction': 'self-introduction',
  'why-work-here': 'why-work-here',
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
