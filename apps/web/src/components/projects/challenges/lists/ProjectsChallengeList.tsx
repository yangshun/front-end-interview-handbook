import clsx from 'clsx';

import ProjectsChallengeCardHorizontal from '~/components/projects/challenges/lists/ProjectsChallengeCardHorizontal';
import { themeBorderElementColor } from '~/components/ui/theme';

import type { ProjectsSkillKey } from '../../skills/types';
import ProjectsChallengeStatusChip from '../metadata/ProjectsChallengeStatusChip';
import type {
  ProjectsChallengeHistoricalStatuses,
  ProjectsChallengeItem,
} from '../types';

type Props = Readonly<{
  challenges: ReadonlyArray<ProjectsChallengeItem>;
  challengeStatuses?: ProjectsChallengeHistoricalStatuses;
  className?: string;
  skillRoadmapKey?: ProjectsSkillKey;
}>;

export default function ProjectsChallengeList({
  challenges,
  className,
  skillRoadmapKey,
}: Props) {
  const singleCardHeight = 100 / challenges.length;
  const dashedLineHeight = (challenges.length - 1) * singleCardHeight;
  const dashedLineTopOffset = singleCardHeight / 2;

  return (
    <div className={clsx('relative flex flex-col gap-4', className)}>
      <div
        className={clsx('absolute start-3 -translate-x-1/2', [
          'border-l border-dashed',
          themeBorderElementColor,
        ])}
        style={{
          height: `${dashedLineHeight}%`,
          top: `${dashedLineTopOffset}%`,
        }}
      />
      {challenges.map((challenge, index) => (
        <div key={challenge.metadata.slug} className="flex items-stretch gap-4">
          <div className="relative flex items-center">
            <ProjectsChallengeStatusChip
              label={index + 1}
              status={challenge.status ?? 'NOT_STARTED'}
            />
          </div>
          <ProjectsChallengeCardHorizontal
            challenge={challenge}
            skillRoadmapKey={skillRoadmapKey}
          />
        </div>
      ))}
    </div>
  );
}
