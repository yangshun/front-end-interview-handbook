'use client';

import type { ProjectsTrackItem } from '~/components/projects/tracks/ProjectsTracksData';

import useProfileWithProjectsProfile from '../../common/useProfileWithProjectsProfile';
import ProjectsTrackSection from '../../tracks/ProjectsTrackSection';

type Props = Readonly<{
  isViewerPremium: boolean;
  projectTracks: ReadonlyArray<ProjectsTrackItem>;
  userId?: string;
}>;

export default function ProjectsProfileProgressTracksTab({
  isViewerPremium,
  projectTracks,
  userId,
}: Props) {
  const { profile } = useProfileWithProjectsProfile();

  return (
    <ProjectsTrackSection
      defaultOpen={true}
      isViewerPremium={isViewerPremium}
      projectTracks={projectTracks}
      userId={userId ?? profile?.id ?? null}
    />
  );
}
