import clsx from 'clsx';

import ProjectsChallengeCard from './ProjectsChallengeCard';
import type { ProjectsChallengeItem } from '../types';

type Props = Readonly<{
  challenges: ReadonlyArray<ProjectsChallengeItem>;
  className?: string;
}>;

export default function ProjectsChallengeGridList({
  className,
  challenges,
}: Props) {
  return (
    <div
      className={clsx(
        'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6',
        className,
      )}>
      {challenges.map((challenge) => (
        <ProjectsChallengeCard
          key={challenge.metadata.slug}
          challenge={challenge}
        />
      ))}
    </div>
  );
}
