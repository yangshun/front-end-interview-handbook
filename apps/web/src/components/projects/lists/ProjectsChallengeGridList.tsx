import clsx from 'clsx';

import ProjectsChallengeCard from './ProjectsChallengeCard';
import type { ProjectsChallengeItem } from '../details/types';

type Props = Readonly<{
  className?: string;
  projects: ReadonlyArray<ProjectsChallengeItem>;
}>;

export default function ProjectsChallengeGridList({
  className,
  projects,
}: Props) {
  return (
    <div
      className={clsx(
        'grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3',
        className,
      )}>
      {projects.map((project) => (
        <ProjectsChallengeCard key={project.metadata.slug} project={project} />
      ))}
    </div>
  );
}
