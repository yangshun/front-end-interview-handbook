import clsx from 'clsx';

import ProjectsChallengeCardHorizontal from '~/components/projects/challenges/lists/ProjectsChallengeCardHorizontal';

import type { ProjectsChallengeItem } from '../types';

type Props = Readonly<{
  challenges: ReadonlyArray<ProjectsChallengeItem>;
  className?: string;
}>;

export default function ProjectsChallengeList({
  className,
  challenges,
}: Props) {
  return (
    <div className={clsx('flex flex-col gap-4', className)}>
      {challenges.map((challenge) => (
        <ProjectsChallengeCardHorizontal
          key={challenge.metadata.slug}
          challenge={challenge}
        />
      ))}
    </div>
  );
}
