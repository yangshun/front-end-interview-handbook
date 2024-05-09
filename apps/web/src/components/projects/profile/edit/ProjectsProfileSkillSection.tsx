import { useFormContext } from 'react-hook-form';
import { FormattedMessage } from 'react-intl';

import type { ProjectsProfileEditFormValues } from '~/components/projects/types';
import Heading from '~/components/ui/Heading';

import ProjectsProfileSkillsProficientInput from './ProjectsProfileSkillsProficientInput';
import ProjectsProfileSkillsToImproveInput from './ProjectsProfileSkillsToImproveInput';
import ProjectsChallengeReputationTag from '../../challenges/metadata/ProjectsChallengeReputationTag';
import { ProjectsReputationPointsConfig } from '../../reputation/ProjectsReputationPointsConfig';

type Values = ProjectsProfileEditFormValues;

export default function ProjectsProfileSkillSection() {
  const { control } = useFormContext<Values>();

  return (
    <div className="flex flex-col gap-6">
      <Heading level="heading6">
        <FormattedMessage
          defaultMessage="Skills"
          description="Title of skills section of projects profile edit page"
          id="jMHsyQ"
        />
      </Heading>
      <div className="flex w-full flex-col gap-6 md:flex-row">
        <div className="relative flex-1">
          <ProjectsChallengeReputationTag
            className="absolute -top-0.5 end-0"
            points={ProjectsReputationPointsConfig.PROFILE_FIELD_PER_OPTIONAL}
            variant="filled"
          />
          <ProjectsProfileSkillsProficientInput control={control} />
        </div>
        <div className="relative flex-1">
          <ProjectsChallengeReputationTag
            className="absolute -top-0.5 end-0"
            points={ProjectsReputationPointsConfig.PROFILE_FIELD_PER_OPTIONAL}
            variant="filled"
          />
          <ProjectsProfileSkillsToImproveInput control={control} />
        </div>
      </div>
    </div>
  );
}
