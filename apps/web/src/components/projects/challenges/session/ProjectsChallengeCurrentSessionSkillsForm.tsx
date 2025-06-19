import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';

import { useIntl } from '~/components/intl';
import ProjectsSkillRoadmapSelectionInput from '~/components/projects/skills/form/ProjectsSkillRoadmapSelectionInput';
import Divider from '~/components/ui/Divider';

import {
  getProjectsRoadmapSkillsInputAttributes,
  getProjectsTechStackInputAttributes,
  useProjectsSkillListInputSchema,
} from '../../skills/form/ProjectsSkillListInputSchema';
import ProjectsSkillTechStackInput from '../../skills/form/ProjectsSkillTechStackInput';
import type { ProjectsSkillKey } from '../../skills/types';
import type { ProjectsChallengeSessionSkillsFormValues } from '../types';

type Props = Readonly<{
  challengeDefaultSkills: ReadonlyArray<ProjectsSkillKey>;
  defaultValues?: ProjectsChallengeSessionSkillsFormValues;
  onSubmit: (data: ProjectsChallengeSessionSkillsFormValues) => void;
}>;

function useProjectsChallengeSessionFormSchema() {
  const projectsChallengeSubmissionTechStackSchema =
    useProjectsSkillListInputSchema({ required: false });
  const projectsChallengeSubmissionRoadmapSkillsSchema =
    useProjectsSkillListInputSchema({ required: false });

  return z.object({
    roadmapSkills: projectsChallengeSubmissionRoadmapSkillsSchema,
    techStackSkills: projectsChallengeSubmissionTechStackSchema,
  });
}

export default function ProjectsChallengeCurrentSessionSkillsForm({
  challengeDefaultSkills,
  defaultValues = {
    roadmapSkills: [],
    techStackSkills: [],
  },
  onSubmit,
}: Props) {
  const projectsChallengeSessionFormSchema =
    useProjectsChallengeSessionFormSchema();
  const intl = useIntl();
  const roadmapSkillsAttrs = getProjectsRoadmapSkillsInputAttributes(
    intl,
    false,
  );
  const techStackSkillsAttrs = getProjectsTechStackInputAttributes(intl, false);

  const { control, formState, getValues, handleSubmit } =
    useForm<ProjectsChallengeSessionSkillsFormValues>({
      defaultValues,
      mode: 'all',
      resolver: zodResolver(projectsChallengeSessionFormSchema),
    });

  return (
    <form className="flex flex-col gap-y-6" onSubmit={handleSubmit(onSubmit)}>
      <Controller
        control={control}
        name="roadmapSkills"
        render={({ field }) => (
          <ProjectsSkillRoadmapSelectionInput
            challengeDefaultSkills={challengeDefaultSkills}
            description={roadmapSkillsAttrs.description}
            errorMessage={
              formState.dirtyFields.roadmapSkills || formState.submitCount > 0
                ? formState.errors.roadmapSkills?.message
                : undefined
            }
            label={roadmapSkillsAttrs.label}
            placeholder={roadmapSkillsAttrs.placeholder}
            {...field}
            onChange={(newValue) => {
              // Save on every change.
              field.onChange(newValue);
              onSubmit(getValues());
            }}
          />
        )}
      />
      <Divider />
      <Controller
        control={control}
        name="techStackSkills"
        render={({ field }) => (
          <ProjectsSkillTechStackInput
            description={techStackSkillsAttrs.description}
            errorMessage={
              formState.dirtyFields.techStackSkills || formState.submitCount > 0
                ? formState.errors.techStackSkills?.message
                : undefined
            }
            label={techStackSkillsAttrs.label}
            placeholder={techStackSkillsAttrs.placeholder}
            {...field}
            onBlur={() => {
              // Save when user stops changing.
              field.onBlur();
              onSubmit(getValues());
            }}
          />
        )}
      />
    </form>
  );
}
