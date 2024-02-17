import type { Control } from 'react-hook-form';
import { useController } from 'react-hook-form';
import { useIntl } from 'react-intl';

import { getProjectsSkillListInputAttributes } from '~/components/projects/skills/form/ProjectsSkillListInputSchema';
import ProjectsSkillRoadmapSelectionInput from '~/components/projects/skills/form/ProjectsSkillRoadmapSelectionInput';
import type { ProjectsSkillKey } from '~/components/projects/skills/types';

import type { ProjectsChallengeSubmissionFilterValues } from './ProjectsChallengeSubmissionFilterContext';

type Props = Readonly<{
  control: Control<ProjectsChallengeSubmissionFilterValues>;
  onChange: (value: Array<ProjectsSkillKey>) => void;
  required?: boolean;
}>;

const fieldName = 'roadmapSkills';

export default function ProjectsChallengeSubmissionFilterRoadmapField({
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
    <ProjectsSkillRoadmapSelectionInput
      {...field}
      description={intl.formatMessage({
        defaultMessage:
          'The skills you are using in this project, which are in our skills roadmap. Helps us track your progress on skills development',
        description: 'Label for "Skills used" text input',
        id: '0QHr9k',
      })}
      errorMessage={formState.errors[fieldName]?.message}
      label={intl.formatMessage({
        defaultMessage: 'Skills used',
        description: 'Label for "Skills used" text input',
        id: 'Od0Qjl',
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
