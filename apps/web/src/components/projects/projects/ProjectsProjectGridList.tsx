import ProjectsProjectCard from './ProjectsProjectCard';
import type { ProjectsProject } from './types';

type Props = Readonly<{
  projects: Array<ProjectsProject>;
}>;

export default function ProjectsProjectGridList({ projects }: Props) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {projects.map((project) => (
        <ProjectsProjectCard key={project.key} project={project} />
      ))}
    </div>
  );
}
