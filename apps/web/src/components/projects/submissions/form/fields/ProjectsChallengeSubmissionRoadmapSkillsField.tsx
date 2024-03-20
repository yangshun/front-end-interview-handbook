import type { Control } from 'react-hook-form';
import { useController } from 'react-hook-form';
import { useIntl } from 'react-intl';

import { getProjectsRoadmapSkillsInputAttributes } from '~/components/projects/skills/form/ProjectsSkillListInputSchema';
import ProjectsSkillRoadmapSelectionInput from '~/components/projects/skills/form/ProjectsSkillRoadmapSelectionInput';
import type { ProjectsSkillKey } from '~/components/projects/skills/types';

import type { ProjectsChallengeSubmissionFormValues } from '../ProjectsChallengeSubmissionForm';

type Props = Readonly<{
  challengeDefaultSkills?: ReadonlyArray<ProjectsSkillKey>;
  control: Control<ProjectsChallengeSubmissionFormValues>;
  required?: boolean;
}>;

const fieldName = 'roadmapSkills';

export default function ProjectsChallengeSubmissionRoadmapSkillsField({
  challengeDefaultSkills,
  control,
  required,
}: Props) {
  const intl = useIntl();
  const attrs = getProjectsRoadmapSkillsInputAttributes(intl, required);
  const { field, formState } = useController({
    control,
    name: fieldName,
    rules: { required: attrs.validation.required },
  });

  return (
    <ProjectsSkillRoadmapSelectionInput
      challengeDefaultSkills={challengeDefaultSkills}
      description={attrs.description}
      errorMessage={
        formState.dirtyFields[fieldName] || formState.submitCount > 0
          ? formState.errors[fieldName]?.message
          : undefined
      }
      label={attrs.label}
      placeholder={attrs.placeholder}
      required={attrs.validation.required}
      {...field}
    />
  );
}
