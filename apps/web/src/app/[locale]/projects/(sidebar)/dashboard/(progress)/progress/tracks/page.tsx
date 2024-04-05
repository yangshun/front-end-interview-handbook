import { notFound } from 'next/navigation';

import {
  fetchProjectsTrackChallengeHistoricalStatuses,
  readProjectsTrackList,
} from '~/components/projects/tracks/data/ProjectsTrackReader';
import ProjectsTrackSection from '~/components/projects/tracks/ProjectsTrackSection';
import fetchViewerProjectsProfile from '~/components/projects/utils/fetchViewerProjectsProfile';

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
      fetchViewerProjectsProfile(viewer),
      readProjectsTrackList(locale, viewer.id),
      fetchProjectsTrackChallengeHistoricalStatuses(viewer.id),
    ]);

  return (
    <ProjectsTrackSection
      challengeHistoricalStatuses={challengeHistoricalStatuses}
      defaultOpen={true}
      isViewerPremium={viewerProjectsProfile?.premium ?? false}
      isViewingOwnProfile={true}
      projectTracks={tracks}
      userProfile={null}
    />
  );
}
