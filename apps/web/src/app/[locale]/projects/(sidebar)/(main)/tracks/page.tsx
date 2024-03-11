import type { Metadata } from 'next';

import ProjectsTracksListPage from '~/components/projects/tracks/ProjectsTracksListPage';
import readViewerProjectsProfile from '~/components/projects/utils/readViewerProjectsProfile';

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
    pathname: '/projects/tracks',
    title: intl.formatMessage({
      defaultMessage: 'Component tracks | Projects',
      description: 'Title of Projects component tracks page',
      id: 'OLHi7N',
    }),
  });
}

export default async function Page({ params }: Props) {
  const { locale } = params;
  const [{ userId, isViewerPremium }, { tracks }] = await Promise.all([
    readViewerProjectsProfile(),
    readProjectsTrackList(locale),
  ]);

  return (
    <ProjectsTracksListPage
      isViewerPremium={isViewerPremium}
      projectTracks={tracks}
      userId={userId}
    />
  );
}
