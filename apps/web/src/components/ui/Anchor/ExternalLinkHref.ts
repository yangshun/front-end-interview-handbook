import url from 'url';

import { i18nHref } from '~/next-i18nostic/src';

export function externalLinkHref({
  locale,
  url: urlParam,
}: Readonly<{
  locale?: string;
  url: string;
}>) {
  return url.format(
    i18nHref(
      {
        pathname: '/link',
        query: {
          u: encodeURIComponent(urlParam),
        },
      },
      locale,
    ),
  );
}
