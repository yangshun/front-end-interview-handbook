import ProjectsChallengeProvidedResourceCard from '../assets/ProjectsChallengeProvidedResourceCard';
import useProjectsChallengeProvidedResourcesOptions from '../assets/useProjectsChallengeProvidedResourcesOptions';
import type { ProjectsChallengeResource } from '../types';

type Props = Readonly<{
  resources: ReadonlyArray<ProjectsChallengeResource>;
}>;

export default function ProjectsChallengeBriefProvidedResources({
  resources,
}: Props) {
  const resourceOptions = useProjectsChallengeProvidedResourcesOptions();

  return (
    <div className="flex flex-col items-stretch gap-4">
      {resources
        .map((resource) => resourceOptions[resource])
        .map(({ icon, id, label }) => (
          <ProjectsChallengeProvidedResourceCard
            key={id}
            icon={icon}
            label={label}
          />
        ))}
    </div>
  );
}
