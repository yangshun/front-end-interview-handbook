import type { Metadata } from 'next';

import { getIntlServerOnly } from '~/i18n';
import defaultProjectsMetadata from '~/seo/defaultProjectsMetadata';

import Page from './challenges/page';

type Props = Readonly<{
  params: Readonly<{
    locale: string;
  }>;
}>;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = params;

  const intl = await getIntlServerOnly(locale);

  return defaultProjectsMetadata(intl, {
    locale,
    pathname: '/projects/dashboard/progress',
    title: intl.formatMessage({
      defaultMessage: 'Progress | Dashboard',
      description: 'Title of progress section on dashboard page',
      id: '8bcHtK',
    }),
  });
}

export default Page;
