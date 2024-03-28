import clsx from 'clsx';

import ProjectsChallengeCardHorizontal from '~/components/projects/challenges/lists/ProjectsChallengeCardHorizontal';
import { themeBorderElementColor } from '~/components/ui/theme';

import ProjectsChallengeStatusChip from '../metadata/ProjectsChallengeStatusChip';
import type {
  ProjectsChallengeHistoricalStatuses,
  ProjectsChallengeItem,
} from '../types';
import { projectsChallengeDetermineStatus_DEPRECATED } from '../utils/ProjectsChallengeUtils';

type Props = Readonly<{
  challengeStatuses?: ProjectsChallengeHistoricalStatuses;
  challenges: ReadonlyArray<ProjectsChallengeItem>;
  className?: string;
}>;

export default function ProjectsChallengeList({
  challengeStatuses = {},
  className,
  challenges,
}: Props) {
  return (
    <div className={clsx('relative flex flex-col gap-4', className)}>
      <div
        className={clsx(
          'absolute start-3 -translate-x-1/2 translate-y-[100px]',
          ['border-l border-dashed', themeBorderElementColor],
        )}
        style={{
          height: `${((challenges.length - 1) / challenges.length) * 100}%`,
        }}
      />
      {challenges.map((challenge, index) => (
        <div key={challenge.metadata.slug} className="flex items-stretch gap-4">
          <div className="relative flex items-center">
            <ProjectsChallengeStatusChip
              label={index + 1}
              status={projectsChallengeDetermineStatus_DEPRECATED(
                challengeStatuses,
                challenge.metadata.slug,
              )}
            />
          </div>
          <ProjectsChallengeCardHorizontal challenge={challenge} />
        </div>
      ))}
    </div>
  );
}
