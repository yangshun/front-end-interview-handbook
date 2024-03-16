'use client';

import type { ProjectsTrackItem } from '~/components/projects/tracks/ProjectsTracksData';

import ProjectsTrackSection from '../../tracks/ProjectsTrackSection';

type Props = Readonly<{
  isViewerPremium: boolean;
  projectTracks: ReadonlyArray<ProjectsTrackItem>;
  targetUserId: string;
}>;

export default function ProjectsProfileProgressTracksTab({
  isViewerPremium,
  projectTracks,
  targetUserId,
}: Props) {
  return (
    <ProjectsTrackSection
      defaultOpen={true}
      isViewerPremium={isViewerPremium}
      projectTracks={projectTracks}
      targetUserId={targetUserId}
    />
  );
}
