import ProjectsChallengeProvidedResourceCard from '../assets/ProjectsChallengeProvidedResourceCard';
import useProjectsProvidedResources from '../assets/useProjectsProvidedResources';

export default function ProjectsChallengeBriefProvidedResources() {
  const resources = useProjectsProvidedResources();

  return (
    <div className="flex flex-col items-stretch gap-4">
      {resources.map(({ id, icon, label }) => (
        <ProjectsChallengeProvidedResourceCard
          key={id}
          icon={icon}
          label={label}
        />
      ))}
    </div>
  );
}
