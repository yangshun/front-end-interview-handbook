import type { Control } from 'react-hook-form';
import { useController } from 'react-hook-form';
import { useIntl } from 'react-intl';

import { projectsSkillsCategorized } from '~/components/projects/skills/data/ProjectsSkillProcessor';
import ProjectsSkillRoadmapSelectionInput from '~/components/projects/skills/form/ProjectsSkillRoadmapSelectionInput';

import type { ProjectsChallengeSubmissionFormValues } from '../ProjectsChallengeSubmissionForm';

type Props = Readonly<{
  control: Control<ProjectsChallengeSubmissionFormValues>;
}>;

const fieldName = 'skills';

export default function ProjectsChallengeSubmissionRoadmapSkillsField({
  control,
}: Props) {
  const intl = useIntl();
  const { field, formState } = useController({
    control,
    name: fieldName,
    rules: { required: true },
  });
  const { roadmapSkills, techStackSkills } = projectsSkillsCategorized(
    field.value,
  );

  return (
    <ProjectsSkillRoadmapSelectionInput
      errorMessage={
        roadmapSkills.length === 0
          ? formState.errors[fieldName]?.message
          : undefined
      }
      label={intl.formatMessage({
        defaultMessage: 'Skills used',
        description: 'Label for skills input on project submit page',
        id: 'fMEwXn',
      })}
      required={true}
      {...field}
      value={roadmapSkills}
      onChange={(newRoadmapSkills) => {
        field.onChange([...techStackSkills, ...(newRoadmapSkills ?? [])]);
      }}
    />
  );
}
