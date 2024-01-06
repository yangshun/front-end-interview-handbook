import ProjectsProjectAssetsProvidedResourceCard from '../assets/ProjectsProjectAssetsProvidedResourceCard';
import useProjectsProvidedResources from '../assets/useProjectsProvidedResources';

export default function ProjectsProjectBriefProvidedResources() {
  const resources = useProjectsProvidedResources();

  return (
    <div className="flex flex-col items-stretch gap-4">
      {resources.map(({ id, icon, label }) => (
        <ProjectsProjectAssetsProvidedResourceCard
          key={id}
          icon={icon}
          label={label}
        />
      ))}
    </div>
  );
}
