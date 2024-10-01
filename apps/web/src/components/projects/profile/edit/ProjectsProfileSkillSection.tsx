import { useFormContext } from 'react-hook-form';

import { FormattedMessage } from '~/components/intl';
import type { ProjectsProfileEditFormValues } from '~/components/projects/types';
import Heading from '~/components/ui/Heading';

import ProjectsProfileSkillsProficientInput from './ProjectsProfileSkillsProficientInput';
import ProjectsProfileSkillsToImproveInput from './ProjectsProfileSkillsToImproveInput';

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
        <div className="flex-1">
          <ProjectsProfileSkillsProficientInput control={control} />
        </div>
        <div className="flex-1">
          <ProjectsProfileSkillsToImproveInput control={control} />
        </div>
      </div>
    </div>
  );
}
