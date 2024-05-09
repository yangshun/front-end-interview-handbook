import type { Control } from 'react-hook-form';

import ProjectsChallengeReputationTag from '~/components/projects/challenges/metadata/ProjectsChallengeReputationTag';

import ProjectsProfileGithubInput from './ProjectsProfileGithubInput';
import ProjectsProfileLinkedInInput from './ProjectsProfileLinkedInInput';
import ProjectsProfileWebsiteInput from './ProjectsProfileWebsiteInput';
import { ProjectsReputationPointsConfig } from '../../reputation/ProjectsReputationPointsConfig';
import type { ProjectsProfileEditFormValues } from '../../types';

type Values = ProjectsProfileEditFormValues;

type Props = Readonly<{
  control: Control<Values>;
}>;

export default function ProjectsProfileSocialInput({ control }: Props) {
  return (
    <div className="flex flex-col gap-6">
      <div className="relative">
        <ProjectsChallengeReputationTag
          className="absolute -top-0.5 end-0"
          points={ProjectsReputationPointsConfig.PROFILE_FIELD_PER_OPTIONAL}
          variant="filled"
        />
        <ProjectsProfileGithubInput control={control} />
      </div>
      <div className="relative">
        <ProjectsChallengeReputationTag
          className="absolute -top-0.5 end-0"
          points={ProjectsReputationPointsConfig.PROFILE_FIELD_PER_OPTIONAL}
          variant="filled"
        />
        <ProjectsProfileLinkedInInput control={control} />
      </div>
      <div className="relative">
        <ProjectsChallengeReputationTag
          className="absolute -top-0.5 end-0"
          points={ProjectsReputationPointsConfig.PROFILE_FIELD_PER_OPTIONAL}
          variant="filled"
        />
        <ProjectsProfileWebsiteInput control={control} />
      </div>
    </div>
  );
}
