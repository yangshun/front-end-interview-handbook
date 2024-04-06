import type { Metadata } from 'next';

import {
  fetchProjectsTrackChallengeHistoricalStatuses,
  readProjectsTrackList,
} from '~/components/projects/tracks/data/ProjectsTrackReader';
import ProjectsTracksListPage from '~/components/projects/tracks/ProjectsTracksListPage';
import fetchViewerProjectsProfile from '~/components/projects/utils/fetchViewerProjectsProfile';

import { getIntlServerOnly } from '~/i18n';
import defaultProjectsMetadata from '~/seo/defaultProjectsMetadata';
import { readViewerFromToken } from '~/supabase/SupabaseServerGFE';

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
        'Build entire component libraries or design systems from scratch for your portfolio or as a toolkit for future projects.',
      description: 'Description of Projects component tracks page',
      id: 'tK6m9g',
    }),
    locale,
    pathname: '/projects/tracks',
    title: intl.formatMessage({
      defaultMessage: 'Component tracks',
      description: 'Title of Projects component tracks page',
      id: 'fg9e1P',
    }),
  });
}

export default async function Page({ params }: Props) {
  const { locale } = params;

  const viewer = await readViewerFromToken();
  const [{ viewerProjectsProfile }, { tracks }, challengeHistoricalStatuses] =
    await Promise.all([
      fetchViewerProjectsProfile(viewer),
      readProjectsTrackList(locale, viewer?.id),
      fetchProjectsTrackChallengeHistoricalStatuses(viewer?.id),
    ]);

  return (
    <ProjectsTracksListPage
      challengeHistoricalStatuses={challengeHistoricalStatuses}
      isViewerPremium={viewerProjectsProfile?.premium ?? false}
      isViewingOwnProfile={viewer != null}
      projectTracks={tracks}
    />
  );
}
