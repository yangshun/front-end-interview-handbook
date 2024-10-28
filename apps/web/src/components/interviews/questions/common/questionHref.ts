import { getSiteOrigin } from '~/seo/siteUrl';

const origin = getSiteOrigin();

export function questionHrefWithList(
  href: string,
  listKey: string | undefined,
): string {
  if (listKey == null) {
    return href;
  }

  const urlObject = new URL(href, origin);

  return (
    `/interviews/study/${listKey}` +
    urlObject.pathname +
    urlObject.search +
    urlObject.hash
  );
}
