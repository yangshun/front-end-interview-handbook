import clsx from 'clsx';
import { FormProvider, useForm } from 'react-hook-form';
import { RiDeleteBinLine, RiImageLine } from 'react-icons/ri';
import { useIntl } from 'react-intl';
import { z } from 'zod';

import Button from '~/components/ui/Button';
import Divider from '~/components/ui/Divider';
import Label from '~/components/ui/Label';
import Text from '~/components/ui/Text';
import {
  themeElementBorderColor,
  themeTextSecondaryColor,
} from '~/components/ui/theme';

import ProjectsChallengeSubmissionDeploymentUrlField from './fields/ProjectsChallengeSubmissionDeploymentUrlsField';
import { useProjectsChallengeSubmissionDeploymentUrlsSchema } from './fields/ProjectsChallengeSubmissionDeploymentUrlsSchema';
import ProjectsChallengeSubmissionImplementationField from './fields/ProjectsChallengeSubmissionImplementationField';
import { useProjectsChallengeSubmissionImplementationSchema } from './fields/ProjectsChallengeSubmissionImplementationSchema';
import ProjectsChallengeSubmissionRepositoryUrlField from './fields/ProjectsChallengeSubmissionRepositoryUrlField';
import { useProjectsChallengeSubmissionRepositoryUrlSchema } from './fields/ProjectsChallengeSubmissionRepositoryUrlSchema';
import ProjectsChallengeSubmissionSummaryField from './fields/ProjectsChallengeSubmissionSummaryField';
import { useProjectsChallengeSubmissionSummarySchema } from './fields/ProjectsChallengeSubmissionSummarySchema';
import ProjectsChallengeSubmissionTitleField from './fields/ProjectsChallengeSubmissionTitleField';
import { useProjectsChallengeSubmissionTitleSchema } from './fields/ProjectsChallengeSubmissionTitleSchema';
import ProjectsChallengeSubmitPageDeploymentDialog from './ProjectsChallengeSubmitPageDeploymentDialog';
import ProjectsOtherTechStackInput from '../skills/ProjectsOtherTechStackInput';
import ProjectsSkillInput from '../skills/ProjectsSkillInput';

import { zodResolver } from '@hookform/resolvers/zod';

export type ProjectsChallengeSubmissionFormValues = Readonly<{
  deploymentUrls: Array<Readonly<{ href: string; label: string }>>;
  implementation: string;
  repositoryUrl: string;
  summary: string;
  title: string;
}>;

function useProjectsChallengeSubmissionFormSchema() {
  const projectsChallengeSubmissionTitleSchema =
    useProjectsChallengeSubmissionTitleSchema();
  const projectsChallengeSubmissionSummarySchema =
    useProjectsChallengeSubmissionSummarySchema();
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
    summary: projectsChallengeSubmissionSummarySchema,
    title: projectsChallengeSubmissionTitleSchema,
  });
}

type Props =
  | Readonly<{
      defaultValues?: ProjectsChallengeSubmissionFormValues;
      mode: 'create';
      onSubmit: (data: ProjectsChallengeSubmissionFormValues) => void;
    }>
  | Readonly<{
      defaultValues?: ProjectsChallengeSubmissionFormValues;
      mode: 'edit';
      onDelete: () => void;
      onSubmit: (data: ProjectsChallengeSubmissionFormValues) => void;
    }>;

export default function ProjectsChallengeSubmissionForm({
  defaultValues = {
    deploymentUrls: [{ href: '', label: 'Main' }],
    implementation:
      'Lorem <strong>ipsum dolor sit amet</strong>, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
    repositoryUrl: '',
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
          <div className="grid lg:grid-cols-2 gap-x-6">
            <div className="flex flex-col">
              <ProjectsChallengeSubmissionTitleField control={control} />
              <ProjectsSkillInput
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
              <ProjectsOtherTechStackInput value={[]} onChange={() => {}} />
              <ProjectsChallengeSubmissionRepositoryUrlField
                control={control}
              />
            </div>
            <div className="flex grow flex-col gap-2">
              <Label
                description={intl.formatMessage({
                  defaultMessage:
                    'Take a screenshot of your solution, which will be used as your Submission display photo.',
                  description: 'Project submission tooltip',
                  id: 'QQPZy5',
                })}
                descriptionStyle="tooltip"
                label={intl.formatMessage({
                  defaultMessage: 'Screenshot of solution',
                  description: 'Project submission label',
                  id: 'vMmOYL',
                })}
                required={true}
              />
              <div
                className={clsx(
                  'flex grow rounded-lg items-center justify-center',
                  'p-4',
                  ['border', themeElementBorderColor, 'border-dashed'],
                )}>
                <div className="flex flex-col items-center gap-3">
                  <RiImageLine
                    aria-hidden={true}
                    className={clsx(
                      'w-10 h-10 shrink-0',
                      themeTextSecondaryColor,
                    )}
                  />
                  <Text color="secondary" display="block" size="body3">
                    WebP, PNG, JPG, GIF up to 5MB
                  </Text>
                </div>
              </div>
            </div>
          </div>
          <Divider />
          <ProjectsChallengeSubmissionDeploymentUrlField control={control} />
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
