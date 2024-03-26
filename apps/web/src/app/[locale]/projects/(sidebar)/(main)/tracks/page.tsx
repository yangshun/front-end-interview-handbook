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
    description: intl.formatMessage({
      defaultMessage:
        'Build entire component libraries or design systems from scratch for your portfolio or as a toolkit for future projects.',
      description: 'Description of Projects component tracks page',
      id: 'tK6m9g',
    }),
    locale,
    pathname: '/projects/tracks',
    title: intl.formatMessage({
      defaultMessage:
        'Component tracks | GreatFrontEnd Projects - Real-world project challenges',
      description: 'Title of Projects component tracks page',
      id: 'XuTNeQ',
    }),
  });
}

export default async function Page({ params }: Props) {
  const { locale } = params;
  const [{ viewerId, viewerProjectsProfile }, { tracks }] = await Promise.all([
    readViewerProjectsProfile(),
    readProjectsTrackList(locale),
  ]);

  return (
    <ProjectsTracksListPage
      isViewerPremium={viewerProjectsProfile?.premium ?? false}
      projectTracks={tracks}
      viewerId={viewerId}
    />
  );
}
