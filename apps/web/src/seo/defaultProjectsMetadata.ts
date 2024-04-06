import defaultMetadata from './defaultMetadata';

import type { IntlShape } from '@formatjs/intl';

export default function defaultProjectsMetadata(
  intl: IntlShape<string>,
  params: Parameters<typeof defaultMetadata>[0],
) {
  return defaultMetadata({
    imageUrl: '/img/seo/og-projects.jpg',
    siteName: intl.formatMessage({
      defaultMessage: 'GreatFrontEnd Projects',
      description: 'Title of Projects product',
      id: 'ctbPZV',
    }),
    template: intl.formatMessage({
      defaultMessage:
        '%s | GreatFrontEnd Projects - Real-world project challenges',
      description: 'SEO title with placeholder, please leave the %s untouched',
      id: 'IWsI3H',
    }),
    ...params,
  });
}
