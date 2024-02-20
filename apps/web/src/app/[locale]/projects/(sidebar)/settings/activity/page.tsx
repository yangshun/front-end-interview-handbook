import type { Metadata } from 'next';

import ProjectsSettingsActivityPage from '~/components/projects/settings/ProjectsSettingsActivityPage';

import { getIntlServerOnly } from '~/i18n';
import defaultMetadata from '~/seo/defaultMetadata';

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
    pathname: '/projects/settings/activity',
    title: intl.formatMessage({
      defaultMessage: 'Activity | Settings | Projects',
      description: 'Title of activities page for projects',
      id: 'pEnyIr',
    }),
  });
}

export default async function Page() {
  return <ProjectsSettingsActivityPage />;
}
