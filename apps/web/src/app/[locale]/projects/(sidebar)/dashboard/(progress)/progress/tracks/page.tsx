import { notFound } from 'next/navigation';

import ProjectsProfileProgressTracksTab from '~/components/projects/profile/progress/ProjectsProfileProgressTracksTab';
import readViewerProjectsProfile from '~/components/projects/utils/readViewerProjectsProfile';

import { readProjectsTrackList } from '~/db/projects/ProjectsReader';
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

  const [{ viewerProjectsProfile }, { tracks }] = await Promise.all([
    readViewerProjectsProfile(viewer),
    readProjectsTrackList(locale, viewer.id),
  ]);

  return (
    <ProjectsProfileProgressTracksTab
      isViewerPremium={viewerProjectsProfile?.premium ?? false}
      projectTracks={tracks}
      targetUserId={viewer.id}
    />
  );
}
