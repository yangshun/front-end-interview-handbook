'use client';

import clsx from 'clsx';
import type { ProjectsTrackMetadata } from 'contentlayer/generated';

import { themeBorderColor } from '~/components/ui/theme';

import ProjectsTrackPageHeader from './ProjectsTrackPageHeader';
import ProjectsTrackPaywall from './ProjectsTrackPaywall';

type Props = Readonly<{
  metadata: ProjectsTrackMetadata;
  points: number;
}>;

export default function ProjectsTrackDetailsLockedPage({
  points,
  metadata,
}: Props) {
  return (
    <div className="flex flex-col gap-12">
      <ProjectsTrackPageHeader
        metadata={metadata}
        points={points}
        showProgress={false}
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
