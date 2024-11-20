import { getSiteOrigin } from '~/seo/siteUrl';

import type {
  QuestionFormat,
  QuestionFramework,
  QuestionLanguage,
} from './QuestionsTypes';

const origin = getSiteOrigin();

export type QuestionListData =
  | Readonly<{ format: QuestionFormat }>
  | Readonly<{ framework: QuestionFramework }>
  | Readonly<{ language: QuestionLanguage }>
  | Readonly<{ studyList: string }>;

export function questionHrefWithList(
  href: string,
  list?: QuestionListData,
): string {
  if (list == null) {
    return href;
  }

  const urlObject = new URL(href, origin);

  if ('studyList' in list) {
    return (
      `/interviews/study/${list.studyList}` +
      urlObject.pathname +
      urlObject.search +
      urlObject.hash
    );
  }

  if ('format' in list) {
    urlObject.searchParams.set('format', list.format);
  }
  if ('framework' in list) {
    urlObject.searchParams.set('framework', list.framework);
  }
  if ('language' in list) {
    urlObject.searchParams.set('language', list.language);
  }

  return urlObject.pathname + urlObject.search + urlObject.hash;
}
