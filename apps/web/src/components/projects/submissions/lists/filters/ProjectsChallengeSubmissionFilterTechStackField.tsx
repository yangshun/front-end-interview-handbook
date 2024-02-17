import type { Control } from 'react-hook-form';
import { useController } from 'react-hook-form';
import { useIntl } from 'react-intl';

import { getProjectsSkillListInputAttributes } from '~/components/projects/skills/form/ProjectsSkillListInputSchema';
import ProjectsSkillTechStackInput from '~/components/projects/skills/form/ProjectsSkillTechStackInput';
import type { ProjectsSkillKey } from '~/components/projects/skills/types';

import type { ProjectsChallengeSubmissionFilterValues } from './ProjectsChallengeSubmissionFilterContext';

type Props = Readonly<{
  control: Control<ProjectsChallengeSubmissionFilterValues>;
  onChange: (value: Array<ProjectsSkillKey>) => void;
  required?: boolean;
}>;

const fieldName = 'techStackSkills';

export default function ProjectsChallengeSubmissionFilterTechStackField({
  control,
  required,
  onChange,
}: Props) {
  const intl = useIntl();
  const attrs = getProjectsSkillListInputAttributes(intl, required);
  const { field, formState } = useController({
    control,
    name: fieldName,
    rules: { required: attrs.validation.required },
  });

  return (
    <ProjectsSkillTechStackInput
      {...field}
      description={intl.formatMessage({
        defaultMessage: 'Tech stack which the submissions are using',
        description: 'Label for "Tech stack used" text input',
        id: 'e6llht',
      })}
      errorMessage={formState.errors[fieldName]?.message}
      label={intl.formatMessage({
        defaultMessage: 'Tech stack used',
        description: 'Label for "Tech stack used" text input',
        id: 'n2GSsV',
      })}
      required={false}
      onChange={(value) => {
        field.onChange(value);

        const newValue = [...(value ?? [])];

        onChange(newValue);
      }}
    />
  );
}
