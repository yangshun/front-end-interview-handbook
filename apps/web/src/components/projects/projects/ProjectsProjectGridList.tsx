import clsx from 'clsx';

import ProjectsProjectCard from './ProjectsProjectCard';
import type { ProjectsProjectMetadata } from './types';

type Props = Readonly<{
  className?: string;
  projects: ReadonlyArray<ProjectsProjectMetadata>;
}>;

export default function ProjectsProjectGridList({
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
        <ProjectsProjectCard key={project.slug} project={project} />
      ))}
    </div>
  );
}
