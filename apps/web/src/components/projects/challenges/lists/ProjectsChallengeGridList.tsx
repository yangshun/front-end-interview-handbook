import clsx from 'clsx';

import ProjectsChallengeCard from './ProjectsChallengeCard';
import type { ProjectsChallengeItem } from '../types';

type Props = Readonly<{
  challenges: ReadonlyArray<ProjectsChallengeItem>;
  className?: string;
  isViewerPremium: boolean;
}>;

export default function ProjectsChallengeGridList({
  className,
  challenges,
  isViewerPremium,
}: Props) {
  return (
    <div
      className={clsx(
        'grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3',
        className,
      )}>
      {challenges.map((challenge) => (
        <ProjectsChallengeCard
          key={challenge.metadata.slug}
          challenge={challenge}
          isViewerPremium={isViewerPremium}
        />
      ))}
    </div>
  );
}
