import { getSiteOrigin } from '~/seo/siteUrl';

import type {
  QuestionFramework,
  QuestionListTypeData,
  QuestionMetadata,
} from './QuestionsTypes';

const origin = getSiteOrigin();

export const QuestionListTypeDefault: QuestionListTypeData = {
  type: 'practice',
  value: 'coding',
};

export function questionListFilterNamespace(
  listType: QuestionListTypeData = QuestionListTypeDefault,
): string {
  return `${listType.type}:${listType.value}`;
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
