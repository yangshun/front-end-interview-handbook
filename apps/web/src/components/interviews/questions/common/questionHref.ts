const dummyOrigin = 'https://blahblahblah.com';

export function questionHrefWithList(
  href: string,
  listKey: string | undefined,
): string {
  if (listKey == null) {
    return href;
  }

  // Just to get this to be a full URL.
  const url = new URL(dummyOrigin + href);

  url.searchParams.append('list', listKey);

  return url.href.replace(dummyOrigin, '');
}
