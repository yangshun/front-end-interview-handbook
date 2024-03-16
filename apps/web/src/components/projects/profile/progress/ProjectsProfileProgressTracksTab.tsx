'use client';

import type { ProjectsTrackItem } from '~/components/projects/tracks/ProjectsTracksData';

import ProjectsTrackSection from '../../tracks/ProjectsTrackSection';

type Props = Readonly<{
  isViewerPremium: boolean;
  projectTracks: ReadonlyArray<ProjectsTrackItem>;
  userId: string | null;
}>;

export default function ProjectsProfileProgressTracksTab({
  isViewerPremium,
  projectTracks,
  userId,
}: Props) {
  return (
    <ProjectsTrackSection
      defaultOpen={true}
      isViewerPremium={isViewerPremium}
      projectTracks={projectTracks}
      userId={userId ?? null}
    />
  );
}
