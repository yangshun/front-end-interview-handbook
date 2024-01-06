import { useFormContext } from 'react-hook-form';
import { FormattedMessage } from 'react-intl';

import type { ProjectsEditProfileValues } from '~/components/projects/types';
import Heading from '~/components/ui/Heading';

import ProjectsProfileTechStackProficientInput from '../ProjectsProfileTechStackProficientInput';
import ProjectsProfileTechStackToImproveInput from '../ProjectsProfileTechStackToImproveInput';

export default function ProjectsProfileSkillSection() {
  const {
    control,
    formState: { errors },
  } = useFormContext<ProjectsEditProfileValues>();

  return (
    <div className="flex flex-col gap-6">
      <Heading level="heading6">
        <FormattedMessage
          defaultMessage="Skills"
          description="Title of skills section of projects profile edit page"
          id="jMHsyQ"
        />
      </Heading>
      <div className="flex gap-6 w-full md:flex-row flex-col">
        <div className="flex-1">
          <ProjectsProfileTechStackProficientInput
            control={control}
            errors={errors}
          />
        </div>
        <div className="flex-1">
          <ProjectsProfileTechStackToImproveInput
            control={control}
            errors={errors}
          />
        </div>
      </div>
    </div>
  );
}