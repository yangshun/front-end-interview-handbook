import type { Metadata } from 'next';

import { getIntlServerOnly } from '~/i18n';
import defaultProjectsMetadata from '~/seo/defaultProjectsMetadata';

import Page from './progress/page';

type Props = Readonly<{
  params: Readonly<{
    locale: string;
  }>;
}>;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = params;

  const intl = await getIntlServerOnly(locale);

  return defaultProjectsMetadata(intl, {
    description: intl.formatMessage({
      defaultMessage:
        'Track your personal milestones, view achievement stats, and see all your project and community activities in one place.',
      description: 'Description of Projects Dashboard page',
      id: 'tEZPfW',
    }),
    locale,
    pathname: '/projects/dashboard',
    title: intl.formatMessage({
      defaultMessage: 'Dashboard',
      description: 'Title of Projects Dashboard page',
      id: 'wwf4o6',
    }),
  });
}

export default Page;
