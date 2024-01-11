'use client';

import clsx from 'clsx';
import { FormProvider, useForm } from 'react-hook-form';
import { RiArrowLeftLine, RiImageLine } from 'react-icons/ri';
import { FormattedMessage } from 'react-intl';
import { useIntl } from 'react-intl';
import { z } from 'zod';

import { trpc } from '~/hooks/trpc';

import type { ProjectsChallengeItem } from '~/components/projects/details/types';
import ProjectsOtherTechStackInput from '~/components/projects/skills/ProjectsOtherTechStackInput';
import ProjectsSkillInput from '~/components/projects/skills/ProjectsSkillInput';
import Button from '~/components/ui/Button';
import Divider from '~/components/ui/Divider';
import Heading from '~/components/ui/Heading';
import Section from '~/components/ui/Heading/HeadingContext';
import Label from '~/components/ui/Label';
import Text from '~/components/ui/Text';
import {
  themeElementBorderColor,
  themeTextSecondaryColor,
} from '~/components/ui/theme';

import ProjectsChallengeDeploymentUrlField from './fields/ProjectsChallengeSubmissionDeploymentUrlField';
import { useProjectsChallengeSubmissionDeploymentUrlSchema } from './fields/ProjectsChallengeSubmissionDeploymentUrlSchema';
import ProjectsChallengeSubmissionImplementationField from './fields/ProjectsChallengeSubmissionImplementationField';
import { useProjectsChallengeSubmissionImplementationSchema } from './fields/ProjectsChallengeSubmissionImplementationSchema';
import ProjectsChallengeRepositoryUrlField from './fields/ProjectsChallengeSubmissionRepositoryUrlField';
import { useProjectsChallengeSubmissionRepositoryUrlSchema } from './fields/ProjectsChallengeSubmissionRepositoryUrlSchema';
import ProjectsChallengeSubmissionSummaryField from './fields/ProjectsChallengeSubmissionSummaryField';
import { useProjectsChallengeSubmissionSummarySchema } from './fields/ProjectsChallengeSubmissionSummarySchema';
import ProjectsChallengeSubmissionTitleField from './fields/ProjectsChallengeSubmissionTitleField';
import { useProjectsChallengeSubmissionTitleSchema } from './fields/ProjectsChallengeSubmissionTitleSchema';
import ProjectsChallengeSubmitPageDeploymentDialog from './ProjectsChallengeSubmitPageDeploymentDialog';

import { zodResolver } from '@hookform/resolvers/zod';

type Props = Readonly<{
  project: ProjectsChallengeItem;
}>;

export type ProjectsChallengeSubmissionFormValues = Readonly<{
  deploymentUrl: string;
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
  const projectsChallengeSubmissionDeploymentUrlSchema =
    useProjectsChallengeSubmissionDeploymentUrlSchema();
  const projectsChallengeSubmissionImplementationSchema =
    useProjectsChallengeSubmissionImplementationSchema();

  return z.object({
    deploymentUrl: projectsChallengeSubmissionDeploymentUrlSchema,
    implementation: projectsChallengeSubmissionImplementationSchema,
    repositoryUrl: projectsChallengeSubmissionRepositoryUrlSchema,
    summary: projectsChallengeSubmissionSummarySchema,
    title: projectsChallengeSubmissionTitleSchema,
  });
}

export default function ProjectsChallengeSubmitPage({ project }: Props) {
  const { href } = project.metadata;
  const intl = useIntl();
  const projectsChallengeSubmissionFormSchema =
    useProjectsChallengeSubmissionFormSchema();
  const createSubmissionMutation =
    trpc.projects.submissions.create.useMutation();

  const formMethods = useForm<ProjectsChallengeSubmissionFormValues>({
    defaultValues: {
      deploymentUrl: '',
      implementation:
        'Lorem <strong>ipsum dolor sit amet</strong>, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
      repositoryUrl: '',
      summary: '',
      title: '',
    },
    mode: 'all',
    resolver: zodResolver(projectsChallengeSubmissionFormSchema),
  });

  const {
    control,
    formState: { isSubmitting },
    handleSubmit,
  } = formMethods;

  return (
    <div>
      <div className="flex">
        <Button
          addonPosition="start"
          className="-ms-4 -mt-2"
          href={href}
          icon={RiArrowLeftLine}
          label={intl.formatMessage({
            defaultMessage: 'To project',
            description: 'Label of To Project button on project submit page',
            id: 'R8BLW9',
          })}
          variant="tertiary"
        />
      </div>
      <Heading className="mt-8" level="heading5">
        <FormattedMessage
          defaultMessage="Project submission"
          description="Title for the project submission checklist section"
          id="VuGzvG"
        />
      </Heading>
      <Section>
        <FormProvider {...formMethods}>
          <form
            onSubmit={handleSubmit((data) => {
              createSubmissionMutation.mutate({
                slug: project.metadata.slug,
                ...data,
              });
            })}>
            <div className="flex flex-col gap-10 mt-9">
              <div className="grid lg:grid-cols-2 gap-x-6">
                <div className="flex flex-col">
                  <ProjectsChallengeSubmissionTitleField control={control} />
                  <ProjectsSkillInput
                    description={intl.formatMessage({
                      defaultMessage:
                        'The Skills you are using in this project, which are in our skills tree. Helps us track your progress on skills development',
                      description:
                        'Description for skills input on project submit page',
                      id: 'gVRtnm',
                    })}
                    descriptionStyle="tooltip"
                    label={intl.formatMessage({
                      defaultMessage: 'Skills',
                      description:
                        'Label for skills input on project submit page',
                      id: 'KC1Rzx',
                    })}
                  />
                  <ProjectsOtherTechStackInput value={[]} onChange={() => {}} />
                  <ProjectsChallengeRepositoryUrlField control={control} />
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
              <div className="grid lg:grid-cols-2 gap-x-6">
                <div className="flex flex-col gap-2">
                  <ProjectsChallengeDeploymentUrlField control={control} />
                  <ProjectsChallengeSubmitPageDeploymentDialog />
                </div>
              </div>
              <Divider />
              <div className="flex flex-col gap-6">
                <div className="grid lg:grid-cols-2 gap-x-6">
                  <ProjectsChallengeSubmissionSummaryField control={control} />
                </div>
                <ProjectsChallengeSubmissionImplementationField
                  control={control}
                />
              </div>
            </div>
            <div className="flex gap-2 mt-6">
              <Button
                isDisabled={isSubmitting}
                isLoading={isSubmitting}
                label={intl.formatMessage({
                  defaultMessage: 'Submit',
                  description: 'Label for submit button on project submit page',
                  id: 'uqV/yJ',
                })}
                size="lg"
                type="submit"
                variant="primary"
              />
              <Button
                label={intl.formatMessage({
                  defaultMessage: 'Cancel',
                  description: 'Label for cancel button on project submit page',
                  id: 'WsLzW7',
                })}
                size="lg"
                variant="secondary"
              />
            </div>
          </form>
        </FormProvider>
      </Section>
    </div>
  );
}
