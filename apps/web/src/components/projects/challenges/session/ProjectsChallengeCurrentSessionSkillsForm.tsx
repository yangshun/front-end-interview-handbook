import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';

import ProjectsSkillRoadmapSelectionInput from '~/components/projects/skills/form/ProjectsSkillRoadmapSelectionInput';
import Divider from '~/components/ui/Divider';

import type { ProjectsChallengeSessionSkillsFormValues } from '../types';
import ProjectsSkillTechStackInput from '../../skills/form/ProjectsSkillTechStackInput';
import { useProjectsChallengeSubmissionRoadmapSkillsSchema } from '../../submissions/form/fields/ProjectsChallengeSubmissionRoadmapSkillsSchema';
import { useProjectsChallengeSubmissionTechStackSchema } from '../../submissions/form/fields/ProjectsChallengeSubmissionTechStackSchema';

import { zodResolver } from '@hookform/resolvers/zod';

type Props = Readonly<{
  defaultValues?: ProjectsChallengeSessionSkillsFormValues;
  onSubmit: (data: ProjectsChallengeSessionSkillsFormValues) => void;
}>;

function useProjectsChallengeSessionFormSchema() {
  const projectsChallengeSubmissionTechStackSchema =
    useProjectsChallengeSubmissionTechStackSchema({ optional: true });
  const projectsChallengeSubmissionRoadmapSkillsSchema =
    useProjectsChallengeSubmissionRoadmapSkillsSchema({ optional: true });

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

  const {
    control,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<ProjectsChallengeSessionSkillsFormValues>({
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
            errorMessage={errors.roadmapSkills?.message}
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
            errorMessage={errors.techStackSkills?.message}
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
