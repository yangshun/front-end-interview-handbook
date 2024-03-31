import { notFound } from 'next/navigation';

import ProjectsProfileProgressTracksTab from '~/components/projects/profile/progress/ProjectsProfileProgressTracksTab';
import {
  fetchProjectsTrackChallengeHistoricalStatuses,
  readProjectsTrackList,
} from '~/components/projects/tracks/data/ProjectsTrackReader';
import readViewerProjectsProfile from '~/components/projects/utils/readViewerProjectsProfile';

import { readViewerFromToken } from '~/supabase/SupabaseServerGFE';

type Props = Readonly<{
  params: Readonly<{
    locale: string;
  }>;
}>;

export default async function Page({ params }: Props) {
  const { locale } = params;
  const viewer = await readViewerFromToken();

  if (viewer?.id == null) {
    return notFound();
  }

  const [{ viewerProjectsProfile }, { tracks }, challengeHistoricalStatuses] =
    await Promise.all([
      readViewerProjectsProfile(viewer),
      readProjectsTrackList(locale, viewer.id),
      fetchProjectsTrackChallengeHistoricalStatuses(viewer.id),
    ]);

  return (
    <ProjectsProfileProgressTracksTab
      challengeHistoricalStatuses={challengeHistoricalStatuses}
      isViewerPremium={viewerProjectsProfile?.premium ?? false}
      projectTracks={tracks}
      userProfile={null}
    />
  );
}
