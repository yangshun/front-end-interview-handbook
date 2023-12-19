import type { Metadata } from 'next';

import { getIntlServerOnly } from '~/i18n';
import defaultMetadata from '~/seo/defaultMetadata';

import ProjectsComponentTracksPage from './ProjectsComponentTracksPage';

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
    pathname: '/projects/component-tracks',
    title: intl.formatMessage({
      defaultMessage: 'Component tracks | Projects',
      description: 'Title of Projects component tracks page',
      id: 'OLHi7N',
    }),
  });
}

export default async function Page() {
  return <ProjectsComponentTracksPage />;
}
