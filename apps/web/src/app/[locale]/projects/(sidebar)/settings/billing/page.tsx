import type { Metadata } from 'next';

import ProjectsSettingsBillingPage from '~/components/projects/settings/billing/ProjectsSettingsBillingPage';

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
    pathname: '/projects/settings/billing',
    title: intl.formatMessage({
      defaultMessage: 'Billing | Settings',
      description: 'Title of billing page',
      id: 'sCpKTY',
    }),
  });
}

export default async function Page() {
  return <ProjectsSettingsBillingPage />;
}
