import type { Metadata } from 'next';

import { getIntlServerOnly } from '~/i18n';
import defaultMetadata from '~/seo/defaultMetadata';

import ProjectsDashboard from './ProjectsDashboard';

type Props = Readonly<{
  params: Readonly<{
    locale: string;
  }>;
}>;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = params;

  const intl = await getIntlServerOnly(locale);

  return defaultMetadata({
    locale,
    pathname: '/projects/dashboard',
    title: intl.formatMessage({
      defaultMessage: 'Dashboard | GFE Projects',
      description: 'Title of Projects Dashboard page',
      id: 'iulVQA',
    }),
  });
}

export default async function ProfileActivityPage() {
  return <ProjectsDashboard />;
}
