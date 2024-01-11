import type { Metadata } from 'next';

import ProjectsTracksListPage from '~/components/projects/tracks/ProjectsTracksListPage';

import { readProjectsTrackList } from '~/db/projects/ProjectsReader';
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
    pathname: '/projects/submissions/learn',
    title: intl.formatMessage({
      defaultMessage: 'Learn from others | Projects',
      description: 'Page title of projects learn from others page',
      id: 'My2yxp',
    }),
  });
}

export default async function Page({ params }: Props) {
  return <div>Hihi</div>;
}
