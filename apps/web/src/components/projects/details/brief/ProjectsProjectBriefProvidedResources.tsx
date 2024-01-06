import ProjectsProjectProvidedResourceCard from '../assets/ProjectsProjectProvidedResourceCard';
import useProjectsProvidedResources from '../assets/useProjectsProvidedResources';

export default function ProjectsProjectBriefProvidedResources() {
  const resources = useProjectsProvidedResources();

  return (
    <div className="flex flex-col items-stretch gap-4">
      {resources.map(({ id, icon, label }) => (
        <ProjectsProjectProvidedResourceCard
          key={id}
          icon={icon}
          label={label}
        />
      ))}
    </div>
  );
}
