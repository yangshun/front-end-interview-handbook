import type { Control } from 'react-hook-form';

import ProjectsChallengeReputationTag from '~/components/projects/challenges/metadata/ProjectsChallengeReputationTag';

import ProjectsProfileGithubInput from './ProjectsProfileGithubInput';
import ProjectsProfileLinkedInInput from './ProjectsProfileLinkedInInput';
import ProjectsProfileWebsiteInput from './ProjectsProfileWebsiteInput';
import type { ProjectsOnboardingProfileStep2FormValues } from '../../onboarding/ProjectsOnboardingProfileStep2';
import { ProjectsReputationPointsConfig } from '../../reputation/ProjectsReputationPointsConfig';
import type { ProjectsProfileEditFormValues } from '../../types';

type Values =
  | ProjectsOnboardingProfileStep2FormValues
  | ProjectsProfileEditFormValues;

type Props = Readonly<{
  control: Control<Values>;
  showReputationCountIncreaseTag?: boolean;
}>;

export default function ProjectsProfileSocialInput({
  control,
  showReputationCountIncreaseTag,
}: Props) {
  return (
    <div className="flex flex-col gap-6">
      <div className="relative">
        {showReputationCountIncreaseTag && (
          <ProjectsChallengeReputationTag
            className="absolute end-0 top-0"
            points={ProjectsReputationPointsConfig.PROFILE_FIELD}
            variant="filled"
          />
        )}
        <ProjectsProfileGithubInput control={control} />
      </div>
      <div className="relative">
        {showReputationCountIncreaseTag && (
          <ProjectsChallengeReputationTag
            className="absolute end-0 top-0"
            points={ProjectsReputationPointsConfig.PROFILE_FIELD}
            variant="filled"
          />
        )}
        <ProjectsProfileLinkedInInput control={control} />
      </div>
      <div className="relative">
        {showReputationCountIncreaseTag && (
          <ProjectsChallengeReputationTag
            className="absolute end-0 top-0"
            points={ProjectsReputationPointsConfig.PROFILE_FIELD}
            variant="filled"
          />
        )}
        <ProjectsProfileWebsiteInput control={control} />
      </div>
    </div>
  );
}
