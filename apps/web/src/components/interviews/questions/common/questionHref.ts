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

  // TODO(interviews): remove `list` searchParam when progress reads from URL pathname.
  urlObject.searchParams.append('list', listKey);

  return (
    `/interviews/study/${listKey}` +
    urlObject.pathname +
    urlObject.search +
    urlObject.hash
  );
}
