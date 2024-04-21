'use client';

import clsx from 'clsx';

import { themeBorderColor } from '~/components/ui/theme';

import type { ProjectsTrackItem } from './data/ProjectsTracksData';
import ProjectsTrackPageHeader from './ProjectsTrackPageHeader';
import ProjectsTrackPaywall from './ProjectsTrackPaywall';

type Props = Readonly<{
  points: number;
  track: ProjectsTrackItem;
}>;

export default function ProjectsTrackDetailsLockedPage({
  points,
  track,
}: Props) {
  return (
    <div className="flex flex-col gap-12">
      <ProjectsTrackPageHeader
        isViewerPremium={false}
        points={points}
        showProgress={false}
        track={track}
      />
      <div
        className={clsx(
          'flex items-center justify-center',
          'min-h-96 rounded-lg',
          ['border', themeBorderColor],
        )}>
        <ProjectsTrackPaywall />
      </div>
    </div>
  );
}
