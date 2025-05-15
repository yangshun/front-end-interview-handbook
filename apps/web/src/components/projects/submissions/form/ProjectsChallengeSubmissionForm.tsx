import { zodResolver } from '@hookform/resolvers/zod';
import { FormProvider, useForm } from 'react-hook-form';
import { RiDeleteBinLine } from 'react-icons/ri';
import { z } from 'zod';

import { useIntl } from '~/components/intl';
import Button from '~/components/ui/Button';
import Divider from '~/components/ui/Divider';

import { useProjectsSkillListInputSchema } from '../../skills/form/ProjectsSkillListInputSchema';
import type { ProjectsSkillKey } from '../../skills/types';
import type { ProjectsChallengeSubmissionDeploymentUrls } from '../types';
import ProjectsChallengeSubmissionDeploymentUrlsField from './fields/ProjectsChallengeSubmissionDeploymentUrlsField';
import { useProjectsChallengeSubmissionDeploymentUrlsSchema } from './fields/ProjectsChallengeSubmissionDeploymentUrlsSchema';
import ProjectsChallengeSubmissionImplementationField from './fields/ProjectsChallengeSubmissionImplementationField';
import {
  getSubmissionImplementationInitialValue,
  useProjectsChallengeSubmissionImplementationSchema,
} from './fields/ProjectsChallengeSubmissionImplementationSchema';
import ProjectsChallengeSubmissionRepositoryUrlField from './fields/ProjectsChallengeSubmissionRepositoryUrlField';
import { useProjectsChallengeSubmissionRepositoryUrlSchema } from './fields/ProjectsChallengeSubmissionRepositoryUrlSchema';
import ProjectsChallengeSubmissionRoadmapSkillsField from './fields/ProjectsChallengeSubmissionRoadmapSkillsField';
import ProjectsChallengeSubmissionSummaryField from './fields/ProjectsChallengeSubmissionSummaryField';
import { useProjectsChallengeSubmissionSummarySchema } from './fields/ProjectsChallengeSubmissionSummarySchema';
import ProjectsChallengeSubmissionTechStackField from './fields/ProjectsChallengeSubmissionTechStackField';
import ProjectsChallengeSubmissionTitleField from './fields/ProjectsChallengeSubmissionTitleField';
import { useProjectsChallengeSubmissionTitleSchema } from './fields/ProjectsChallengeSubmissionTitleSchema';

export type ProjectsChallengeSubmissionFormValues = Readonly<{
  deploymentUrls: ProjectsChallengeSubmissionDeploymentUrls;
  implementation: string;
  repositoryUrl: string;
  roadmapSkills: Array<ProjectsSkillKey>;
  summary: string;
  techStackSkills: Array<ProjectsSkillKey>;
  title: string;
}>;

function useProjectsChallengeSubmissionFormSchema() {
  const projectsChallengeSubmissionTitleSchema =
    useProjectsChallengeSubmissionTitleSchema();
  const projectsChallengeSubmissionSummarySchema =
    useProjectsChallengeSubmissionSummarySchema();
  const projectsChallengeSubmissionTechStackSchema =
    useProjectsSkillListInputSchema({ required: false });
  const projectsChallengeSubmissionRoadmapSkillsSchema =
    useProjectsSkillListInputSchema();
  const projectsChallengeSubmissionRepositoryUrlSchema =
    useProjectsChallengeSubmissionRepositoryUrlSchema();
  const projectsChallengeSubmissionDeploymentUrlsSchema =
    useProjectsChallengeSubmissionDeploymentUrlsSchema();
  const projectsChallengeSubmissionImplementationSchema =
    useProjectsChallengeSubmissionImplementationSchema();

  return z.object({
    deploymentUrls: projectsChallengeSubmissionDeploymentUrlsSchema,
    implementation: projectsChallengeSubmissionImplementationSchema,
    repositoryUrl: projectsChallengeSubmissionRepositoryUrlSchema,
    roadmapSkills: projectsChallengeSubmissionRoadmapSkillsSchema,
    summary: projectsChallengeSubmissionSummarySchema,
    techStackSkills: projectsChallengeSubmissionTechStackSchema,
    title: projectsChallengeSubmissionTitleSchema,
  });
}

type BaseProps = Readonly<{
  cancelButtonHref: string;
  challengeDefaultSkills: ReadonlyArray<ProjectsSkillKey>;
  challengeDefaultSpecPageLabels: Record<string, string>;
  challengeDefaultSpecPages: ReadonlyArray<string>;
  defaultValues?: Partial<ProjectsChallengeSubmissionFormValues>;
  isDisabled: boolean;
  isSaving: boolean;
  onSubmit: (data: ProjectsChallengeSubmissionFormValues) => void;
}>;

type Props =
  | (BaseProps &
      Readonly<{
        isDeleting: boolean;
        mode: 'edit';
        onDelete: () => void;
      }>)
  | (BaseProps &
      Readonly<{
        mode: 'create';
      }>);

const defaultValuesEmpty = Object.freeze({
  deploymentUrls: [],
  implementation: getSubmissionImplementationInitialValue(),
  repositoryUrl: '',
  roadmapSkills: [],
  summary: '',
  techStackSkills: [],
  title: '',
});

function getDefaultValues(challengeDefaultPages: ReadonlyArray<string>) {
  return {
    ...defaultValuesEmpty,
    deploymentUrls: challengeDefaultPages.map((label) => ({ href: '', label })),
  };
}

export default function ProjectsChallengeSubmissionForm({
  cancelButtonHref,
  challengeDefaultSkills,
  challengeDefaultSpecPageLabels,
  challengeDefaultSpecPages,
  defaultValues: defaultValuesParam,
  isDisabled,
  isSaving,
  onSubmit,
  ...props
}: Props) {
  const defaultValues = {
    ...getDefaultValues(challengeDefaultSpecPages),
    ...defaultValuesParam,
  };

  const intl = useIntl();
  const projectsChallengeSubmissionFormSchema =
    useProjectsChallengeSubmissionFormSchema();

  const formMethods = useForm<ProjectsChallengeSubmissionFormValues>({
    defaultValues,
    mode: 'onTouched',
    resolver: zodResolver(projectsChallengeSubmissionFormSchema),
  });

  const { control, handleSubmit } = formMethods;

  return (
    <FormProvider {...formMethods}>
      <form className="flex flex-col gap-12" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-10">
          <div className="grid gap-6 md:grid-cols-2">
            <ProjectsChallengeSubmissionTitleField control={control} />
            <ProjectsChallengeSubmissionRepositoryUrlField control={control} />
            <ProjectsChallengeSubmissionRoadmapSkillsField
              challengeDefaultSkills={challengeDefaultSkills}
              control={control}
            />
            <ProjectsChallengeSubmissionTechStackField
              control={control}
              required={false}
            />
          </div>
          <Divider />
          <ProjectsChallengeSubmissionDeploymentUrlsField
            challengeDefaultSpecPageLabels={challengeDefaultSpecPageLabels}
            challengeDefaultSpecPages={challengeDefaultSpecPages}
            control={control}
          />
          <Divider />
          <div className="grid gap-6 md:grid-cols-2">
            <ProjectsChallengeSubmissionSummaryField control={control} />
            <ProjectsChallengeSubmissionImplementationField control={control} />
          </div>
        </div>
        <div className="flex flex-row-reverse flex-wrap justify-between gap-2">
          <div className="flex gap-2">
            <Button
              href={cancelButtonHref}
              isDisabled={isDisabled}
              label={intl.formatMessage({
                defaultMessage: 'Cancel',
                description: 'Cancel button label',
                id: '0GT0SI',
              })}
              size="lg"
              variant="secondary"
            />
            <Button
              isDisabled={isDisabled}
              isLoading={isSaving}
              label={
                props.mode === 'create'
                  ? intl.formatMessage({
                      defaultMessage: 'Submit',
                      description: 'Submit button label',
                      id: 'WQaRlF',
                    })
                  : intl.formatMessage({
                      defaultMessage: 'Save',
                      description: 'Save button label',
                      id: '2y24a/',
                    })
              }
              size="lg"
              type="submit"
              variant="primary"
            />
          </div>
          {props.mode === 'edit' && (
            <Button
              addonPosition="start"
              icon={RiDeleteBinLine}
              isDisabled={isDisabled}
              isLoading={props.isDeleting}
              label={intl.formatMessage({
                defaultMessage: 'Delete submission',
                description: 'Delete challenge submission',
                id: 'kfKz/1',
              })}
              size="lg"
              variant="danger"
              onClick={() => {
                props.onDelete();
              }}
            />
          )}
        </div>
      </form>
    </FormProvider>
  );
}
