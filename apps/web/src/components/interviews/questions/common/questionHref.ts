import { getSiteOrigin } from '~/seo/siteUrl';

import type {
  QuestionFormat,
  QuestionFramework,
  QuestionLanguage,
} from './QuestionsTypes';

const origin = getSiteOrigin();

export type QuestionListTypeData =
  | Readonly<{ type: 'coding'; value: 'all' }>
  | Readonly<{ type: 'format'; value: QuestionFormat }>
  | Readonly<{ type: 'framework'; value: QuestionFramework }>
  | Readonly<{ type: 'language'; value: QuestionLanguage }>
  | Readonly<{ type: 'study-list'; value: string }>;

export function questionListFilterNamespace(
  listType?: QuestionListTypeData,
): string {
  if (listType == null || listType.type === 'coding') {
    return 'coding';
  }

  return `${listType.type}:${listType.value}`;
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

  if (listType.type !== 'coding') {
    urlObject.searchParams.set(listType.type, listType.value);
  }

  return urlObject.pathname + urlObject.search + urlObject.hash;
}
