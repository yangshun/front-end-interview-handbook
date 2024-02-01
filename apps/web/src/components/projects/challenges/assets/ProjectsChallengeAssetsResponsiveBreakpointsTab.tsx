import clsx from 'clsx';
import { useState } from 'react';

import Text from '~/components/ui/Text';
import { themeBorderElementColor } from '~/components/ui/theme';

import type { ProjectsChallengeItem } from '../types';
import ProjectsImageBreakpointButtonGroup from '../../common/ProjectsImageBreakpointButtonGroup';
import {
  type ProjectsImageBreakpointCategory,
  ProjectsImageBreakpointDimensions,
} from '../../common/ProjectsImageBreakpoints';

type Props = Readonly<{
  challenge: ProjectsChallengeItem;
}>;

export default function ProjectsChallengeAssetsResponsiveBreakpointsTab({
  challenge,
}: Props) {
  const [selectedBreakpoint, setSelectedBreakpoint] =
    useState<ProjectsImageBreakpointCategory>('desktop');
  const { width, height } =
    ProjectsImageBreakpointDimensions[selectedBreakpoint];

  return (
    <div className="flex flex-col items-stretch gap-6">
      <div className="flex gap-6 justify-between">
        <ProjectsImageBreakpointButtonGroup
          breakpoint={selectedBreakpoint}
          setBreakpoint={setSelectedBreakpoint}
        />
        <div
          className={clsx(
            'flex items-center justify-center rounded-md border p-2',
            themeBorderElementColor,
          )}>
          <Text color="secondary" size="body3" weight="medium">
            {width}px &times; {height}px
          </Text>
        </div>
      </div>
      <img
        alt={challenge.metadata.title}
        className={clsx('aspect-[4/3] w-full rounded-lg')}
        src={challenge.metadata.imageUrl}
      />
    </div>
  );
}
