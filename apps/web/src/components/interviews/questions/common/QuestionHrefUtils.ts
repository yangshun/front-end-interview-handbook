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

  return urlObject.pathname + urlObject.search + urlObject.hash;
}

export function questionHrefFrameworkSpecificAndListType(
  questionMetadata: QuestionMetadata,
  listType?: QuestionListTypeData | null,
  framework?: QuestionFramework,
): string {
  const maybeFrameworkHref = questionHrefFrameworkSpecific(
    questionMetadata,
    listType,
    framework,
  );

  return questionHrefWithListType(maybeFrameworkHref, listType);
}
