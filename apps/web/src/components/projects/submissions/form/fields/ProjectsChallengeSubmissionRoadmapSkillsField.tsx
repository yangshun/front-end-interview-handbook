import type { Control } from 'react-hook-form';
import { useController } from 'react-hook-form';
import { useIntl } from 'react-intl';

import ProjectsSkillRoadmapSelectionInput from '~/components/projects/skills/form/ProjectsSkillRoadmapSelectionInput';

import { getProjectsChallengeSubmissionRoadmapSkillsAttributes } from './ProjectsChallengeSubmissionRoadmapSkillsSchema';
import type { ProjectsChallengeSubmissionFormValues } from '../ProjectsChallengeSubmissionForm';

type Props = Readonly<{
  control: Control<ProjectsChallengeSubmissionFormValues>;
}>;

const fieldName = 'roadmapSkills';

export default function ProjectsChallengeSubmissionRoadmapSkillsField({
  control,
}: Props) {
  const intl = useIntl();
  const attrs = getProjectsChallengeSubmissionRoadmapSkillsAttributes(intl);
  const { field, formState } = useController({
    control,
    name: fieldName,
    rules: { required: attrs.validation.required },
  });

  return (
    <ProjectsSkillRoadmapSelectionInput
      errorMessage={formState.errors[fieldName]?.message}
      label={intl.formatMessage({
        defaultMessage: 'Skills used',
        description: 'Label for skills input on project submit page',
        id: 'fMEwXn',
      })}
      required={attrs.validation.required}
      {...field}
    />
  );
}
