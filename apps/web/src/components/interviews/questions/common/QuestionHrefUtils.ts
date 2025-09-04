import url from 'url';

import {
  QuestionFrameworkRawToSEOMapping,
  QuestionLanguageRawToSEOMapping,
} from '~/data/QuestionCategories';

import { getSiteOrigin } from '~/seo/siteUrl';

import type {
  QuestionFramework,
  QuestionListTypeData,
  QuestionMetadata,
} from './QuestionsTypes';

const origin = getSiteOrigin();

export const QuestionListTypeDefault: QuestionListTypeData = {
  tab: 'coding',
  type: 'practice',
  value: 'practice',
};

export function questionListFilterNamespace(
  listType: QuestionListTypeData = QuestionListTypeDefault,
  level: 'list' | 'tab' = 'list',
): string {
  switch (level) {
    case 'list':
      return [listType.type, listType.value].join(':');
    case 'tab':
      return [listType.type, listType.value, listType.tab]
        .filter(Boolean)
        .join(':');
  }
}

function questionHrefFrameworkSpecific(
  questionMetadata: QuestionMetadata,
  listType?: QuestionListTypeData | null,
  framework?: QuestionFramework,
): string {
  const frameworkListHref =
    listType?.type === 'framework'
      ? questionMetadata.frameworks.find(
          ({ framework: frameworkValue }) => frameworkValue === listType?.value,
        )?.href
      : null;

  const frameworkParamHref = questionMetadata.frameworks.find(
    ({ framework: frameworkValue }) => frameworkValue === framework,
  )?.href;

  // Redirect to framework-specific page if a framework list or framework prop
  // is provided, with framework list having higher priority
  return frameworkListHref ?? frameworkParamHref ?? questionMetadata.href;
}

export function questionHrefWithListType(
  href: string,
  listType?: QuestionListTypeData | null,
  questionMetadata?: QuestionMetadata,
  currentPathname?: string | null, // We need this prop and cannot use window.location instead because Next.js doesn't update location when we do the navigation
): string {
  if (listType == null) {
    return href;
  }

  const urlObject = new URL(href, origin);

  if (listType.type === 'study-list') {
    return (
      `/interviews/study/${listType.value}` +
      urlObject.pathname +
      urlObject.search +
      urlObject.hash
    );
  }

  urlObject.searchParams.set(listType.type, listType.value);

  if (listType.tab) {
    urlObject.searchParams.set('tab', listType.tab);
  }

  if ('filters' in listType && listType.filters != null) {
    urlObject.searchParams.set('filters', JSON.stringify(listType.filters));
  }

  if ('title' in listType && listType.title) {
    urlObject.searchParams.set('title', listType.title);
  }

  // Special URLs for quiz questions that support scrolling mode
  if (questionMetadata?.format === 'quiz') {
    switch (listType.type) {
      case 'framework': {
        switch (listType.value) {
          case 'react':
            return getQuizQuestionUrl(
              `/questions/quiz/${QuestionFrameworkRawToSEOMapping.react}`,
              questionMetadata.slug,
              urlObject,
              currentPathname,
            );
        }
        break;
      }
      case 'language': {
        switch (listType.value) {
          case 'js': {
            return getQuizQuestionUrl(
              `/questions/quiz/${QuestionLanguageRawToSEOMapping.js}`,
              questionMetadata.slug,
              urlObject,
              currentPathname,
            );
          }
          case 'html':
            return getQuizQuestionUrl(
              `/questions/quiz/${QuestionLanguageRawToSEOMapping.html}`,
              questionMetadata.slug,
              urlObject,
              currentPathname,
            );
          case 'css':
            return getQuizQuestionUrl(
              `/questions/quiz/${QuestionLanguageRawToSEOMapping.css}`,
              questionMetadata.slug,
              urlObject,
              currentPathname,
            );
        }
      }
    }
  }

  return urlObject.pathname + urlObject.search + urlObject.hash;
}

export function questionHrefFrameworkSpecificAndListType(
  questionMetadata: QuestionMetadata,
  listType?: QuestionListTypeData | null,
  framework?: QuestionFramework,
  currentPathname?: string | null,
): string {
  const hrefWithMaybeFramework = questionHrefFrameworkSpecific(
    questionMetadata,
    listType,
    framework,
  );

  const hrefWithListType = questionHrefWithListType(
    hrefWithMaybeFramework,
    listType,
    questionMetadata,
    currentPathname,
  );

  return questionHrefStripSamePathnameAndSearch(
    hrefWithListType,
    currentPathname,
  );
}

function questionHrefStripSamePathnameAndSearch(
  href: string,
  currentPathname?: string | null,
): string {
  if (typeof window === 'undefined') {
    return href;
  }

  const urlObj = url.parse(href);

  // Leave only the hash if the current URL is the same as the href
  // Next.js has problems pushing to the same URL with a hash
  if (
    currentPathname === urlObj.pathname &&
    window.location.search === urlObj.search
  ) {
    return urlObj.hash || '#';
  }

  return href;
}

function getQuizQuestionUrl(
  base: string,
  slug: string,
  urlObject: URL,
  currentPathname?: string | null,
) {
  const scrollModeUrls = [
    `/questions/quiz/${QuestionFrameworkRawToSEOMapping.react}`,
    `/questions/quiz/${QuestionLanguageRawToSEOMapping.js}`,
    `/questions/quiz/${QuestionLanguageRawToSEOMapping.html}`,
    `/questions/quiz/${QuestionLanguageRawToSEOMapping.css}`,
  ];
  const scrollModeUrl = base + urlObject.search + `#${slug}`;

  if (typeof window === 'undefined') {
    return scrollModeUrl;
  }

  const isQuizPage = currentPathname?.includes('/questions/quiz');
  // Check if the current URL is scroll mode url type
  const isScrollMode = scrollModeUrls.includes(currentPathname ?? '');

  if (!isQuizPage || isScrollMode) {
    return scrollModeUrl;
  }

  // Return quiz page by page url if the current page is page by page mode
  return `/questions/quiz/${slug}` + urlObject.search;
}
