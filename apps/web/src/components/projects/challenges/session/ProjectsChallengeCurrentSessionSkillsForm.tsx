import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';

import ProjectsSkillRoadmapSelectionInput from '~/components/projects/skills/form/ProjectsSkillRoadmapSelectionInput';
import Divider from '~/components/ui/Divider';

import type { ProjectsChallengeSessionSkillsFormValues } from '../types';
import { useProjectsSkillListInputSchema } from '../../skills/form/ProjectsSkillListInputSchema';
import ProjectsSkillTechStackInput from '../../skills/form/ProjectsSkillTechStackInput';

import { zodResolver } from '@hookform/resolvers/zod';

type Props = Readonly<{
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
  defaultValues = {
    roadmapSkills: [],
    techStackSkills: [],
  },
  onSubmit,
}: Props) {
  const projectsChallengeSessionFormSchema =
    useProjectsChallengeSessionFormSchema();

  const { control, handleSubmit, getValues, formState } =
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
            errorMessage={
              formState.dirtyFields.roadmapSkills || formState.submitCount > 0
                ? formState.errors.roadmapSkills?.message
                : undefined
            }
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
            errorMessage={
              formState.dirtyFields.techStackSkills || formState.submitCount > 0
                ? formState.errors.techStackSkills?.message
                : undefined
            }
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
