import type { Metadata } from 'next/types';

import { getIntlServerOnly } from '~/i18n';
import defaultMetadata from '~/seo/defaultMetadata';

import ProjectsMarketingHomePage from './ProjectsMarketingHomePage';

export const dynamic = 'force-static';

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = params;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const intl = await getIntlServerOnly(locale);

  // TODO: Add metadata for projects page.

  return defaultMetadata({
    description: '',
    locale,
    pathname: '/',
    title: '',
  });
}

type Props = Readonly<{
  params: Readonly<{ locale: string }>;
}>;

export default async function Page() {
  return <ProjectsMarketingHomePage />;
}
