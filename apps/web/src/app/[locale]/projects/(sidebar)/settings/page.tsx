import type { Metadata } from 'next';

import ProjectsSettingsGeneralPage from '~/components/projects/settings/general/ProjectsSettingsGeneralPage';

import { getIntlServerOnly } from '~/i18n';
import defaultProjectsMetadata from '~/seo/defaultProjectsMetadata';

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
    pathname: '/projects/settings',
    title: intl.formatMessage({
      defaultMessage: 'Settings | Projects',
      description: 'Title of projects settings page',
      id: 'pN0mtf',
    }),
  });
}

export default async function Page() {
  return <ProjectsSettingsGeneralPage />;
}
