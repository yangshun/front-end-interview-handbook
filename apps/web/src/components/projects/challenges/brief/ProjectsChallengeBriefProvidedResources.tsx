import ProjectsChallengeProvidedResourceCard from '../assets/ProjectsChallengeProvidedResourceCard';
import useProjectsChallengeProvidedResources from '../assets/useProjectsChallengeProvidedResources';

export default function ProjectsChallengeBriefProvidedResources() {
  const resources = useProjectsChallengeProvidedResources();

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
