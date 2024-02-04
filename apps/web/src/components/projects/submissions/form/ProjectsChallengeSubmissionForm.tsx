import { FormProvider, useForm } from 'react-hook-form';
import { RiDeleteBinLine } from 'react-icons/ri';
import { useIntl } from 'react-intl';
import { z } from 'zod';

import Button from '~/components/ui/Button';
import Divider from '~/components/ui/Divider';

import ProjectsChallengeSubmissionDeploymentUrlField from './fields/ProjectsChallengeSubmissionDeploymentUrlsField';
import { useProjectsChallengeSubmissionDeploymentUrlsSchema } from './fields/ProjectsChallengeSubmissionDeploymentUrlsSchema';
import ProjectsChallengeSubmissionImplementationField from './fields/ProjectsChallengeSubmissionImplementationField';
import { useProjectsChallengeSubmissionImplementationSchema } from './fields/ProjectsChallengeSubmissionImplementationSchema';
import ProjectsChallengeSubmissionRepositoryUrlField from './fields/ProjectsChallengeSubmissionRepositoryUrlField';
import { useProjectsChallengeSubmissionRepositoryUrlSchema } from './fields/ProjectsChallengeSubmissionRepositoryUrlSchema';
import ProjectsChallengeSubmissionSummaryField from './fields/ProjectsChallengeSubmissionSummaryField';
import { useProjectsChallengeSubmissionSummarySchema } from './fields/ProjectsChallengeSubmissionSummarySchema';
import ProjectsChallengeSubmissionTechStackField from './fields/ProjectsChallengeSubmissionTechStackField';
import { useProjectsChallengeSubmissionTechStackSchema } from './fields/ProjectsChallengeSubmissionTechStackSchema';
import ProjectsChallengeSubmissionTitleField from './fields/ProjectsChallengeSubmissionTitleField';
import { useProjectsChallengeSubmissionTitleSchema } from './fields/ProjectsChallengeSubmissionTitleSchema';
import type { ProjectsChallengeSubmissionDeploymentUrls } from '../types';
import ProjectsSkillRoadmapSelectionInput from '../../skills/form/ProjectsSkillRoadmapSelectionInput';
import type { ProjectsSkillKey } from '../../skills/types';

import { zodResolver } from '@hookform/resolvers/zod';

export type ProjectsChallengeSubmissionFormValues = Readonly<{
  deploymentUrls: ProjectsChallengeSubmissionDeploymentUrls;
  implementation: string;
  repositoryUrl: string;
  skills: Array<ProjectsSkillKey>;
  summary: string;
  title: string;
}>;

function useProjectsChallengeSubmissionFormSchema() {
  const projectsChallengeSubmissionTitleSchema =
    useProjectsChallengeSubmissionTitleSchema();
  const projectsChallengeSubmissionSummarySchema =
    useProjectsChallengeSubmissionSummarySchema();
  const projectsChallengeSubmissionTechStackSchema =
    useProjectsChallengeSubmissionTechStackSchema();
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
    skills: projectsChallengeSubmissionTechStackSchema,
    summary: projectsChallengeSubmissionSummarySchema,
    title: projectsChallengeSubmissionTitleSchema,
  });
}

type Props =
  | Readonly<{
      cancelButtonHref: string;
      defaultValues?: ProjectsChallengeSubmissionFormValues;
      mode: 'create';
      onSubmit: (data: ProjectsChallengeSubmissionFormValues) => void;
    }>
  | Readonly<{
      cancelButtonHref: string;
      defaultValues?: ProjectsChallengeSubmissionFormValues;
      mode: 'edit';
      onDelete: () => void;
      onSubmit: (data: ProjectsChallengeSubmissionFormValues) => void;
    }>;

export default function ProjectsChallengeSubmissionForm({
  cancelButtonHref,
  defaultValues = {
    deploymentUrls: [{ href: '', label: 'Main' }],
    implementation: '',
    repositoryUrl: '',
    skills: [],
    summary: '',
    title: '',
  },
  onSubmit,
  ...props
}: Props) {
  const intl = useIntl();
  const projectsChallengeSubmissionFormSchema =
    useProjectsChallengeSubmissionFormSchema();

  const formMethods = useForm<ProjectsChallengeSubmissionFormValues>({
    defaultValues,
    mode: 'all',
    resolver: zodResolver(projectsChallengeSubmissionFormSchema),
  });

  const { control, handleSubmit } = formMethods;

  return (
    <FormProvider {...formMethods}>
      <form className="flex flex-col gap-12" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-10">
          <div className="grid lg:grid-cols-2 gap-6">
            <div className="flex flex-col gap-6">
              <ProjectsChallengeSubmissionTitleField control={control} />
              <ProjectsSkillRoadmapSelectionInput
                description={intl.formatMessage({
                  defaultMessage:
                    'The skills you are using in this project, which are in our skills roadmap. Helps us track your progress on skills development',
                  description:
                    'Description for skills input on project submit page',
                  id: 'pRi/7+',
                })}
                descriptionStyle="tooltip"
                label={intl.formatMessage({
                  defaultMessage: 'Skills',
                  description: 'Label for skills input on project submit page',
                  id: 'KC1Rzx',
                })}
              />
              <ProjectsChallengeSubmissionTechStackField control={control} />
              <ProjectsChallengeSubmissionRepositoryUrlField
                control={control}
              />
            </div>
            <ProjectsChallengeSubmissionDeploymentUrlField control={control} />
          </div>
          <Divider />
          <div className="flex flex-col gap-6">
            <div className="grid lg:grid-cols-2 gap-x-6">
              <ProjectsChallengeSubmissionSummaryField control={control} />
            </div>
            <ProjectsChallengeSubmissionImplementationField control={control} />
          </div>
        </div>
        <div className="flex flex-wrap sm:justify-between gap-2">
          <div className="flex gap-2">
            {/* Add disabled/loading states to the buttons. */}
            <Button
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
            <Button
              href={cancelButtonHref}
              label={intl.formatMessage({
                defaultMessage: 'Cancel',
                description: 'Cancel button label',
                id: '0GT0SI',
              })}
              size="lg"
              variant="secondary"
            />
          </div>
          {props.mode === 'edit' && (
            <Button
              addonPosition="start"
              icon={RiDeleteBinLine}
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
