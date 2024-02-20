'use client';

import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { FormattedMessage, useIntl } from 'react-intl';
import { z } from 'zod';

import { trpc } from '~/hooks/trpc';

import { useToast } from '~/components/global/toasts/ToastsProvider';
import useProjectsMonthYearExperienceSchema from '~/components/projects/hooks/useProjectsMonthYearExperienceSchema';
import useProjectsMotivationReasonSchema, {
  convertProjectsMotivationReasonToFormValue,
} from '~/components/projects/hooks/useProjectsMotivationReasonSchema';
import { yoeReplacementSchema } from '~/components/projects/misc';
import ProjectsProfileBasicInfoSection from '~/components/projects/profile/edit/ProjectsProfileBasicInfoSection';
import ProjectsProfileMotivationSection from '~/components/projects/profile/edit/ProjectsProfileMotivationSection';
import ProjectsProfileSkillSection from '~/components/projects/profile/edit/ProjectsProfileSkillSection';
import ProjectsProfileSocialSection from '~/components/projects/profile/edit/ProjectsProfileSocialSection';
import ProjectsProfileYOESection from '~/components/projects/profile/edit/ProjectsProfileYOESection';
import type { ProjectsProfileEditFormValues } from '~/components/projects/types';
import Anchor from '~/components/ui/Anchor';
import Button from '~/components/ui/Button';
import Heading from '~/components/ui/Heading';

import ProjectsProfileJobSection from './ProjectsProfileJobSection';
import { useProjectsSkillListInputSchema } from '../../skills/form/ProjectsSkillListInputSchema';

import { zodResolver } from '@hookform/resolvers/zod';
import type { Profile, ProjectsProfile } from '@prisma/client';

function useProjectsProfileEditSchema() {
  const intl = useIntl();
  const monthYearExperienceSchema = useProjectsMonthYearExperienceSchema({
    isRequired: false,
  });
  const motivationReasonSchema = useProjectsMotivationReasonSchema({
    isRequired: false,
  });
  const skillsProficientSchema = useProjectsSkillListInputSchema({
    required: false,
  });
  const skillsToGrowSchema = useProjectsSkillListInputSchema({
    required: false,
  });

  const baseSchema = z.object({
    avatarUrl: z.string().optional(),
    bio: z.string(),
    company: z.string().optional(),
    githubUsername: z
      .union([z.string().length(0), z.string().url()])
      .transform((val) => (val ? val : null))
      .nullable(),
    jobTitle: z.string(),
    linkedInUsername: z
      .union([z.string().length(0), z.string().url()])
      .transform((val) => (val ? val : null))
      .nullable(),
    motivations: motivationReasonSchema,
    name: z.string().min(2),
    skillsProficient: skillsProficientSchema,
    skillsToGrow: skillsToGrowSchema,
    username: z
      .string()
      .min(1, {
        message: intl.formatMessage({
          defaultMessage: 'Please enter your your username',
          description:
            'Error message for empty "Username" input on Projects profile onboarding page',
          id: 'TEAVc0',
        }),
      })
      .refine((value) => !/\s/.test(value), {
        message: intl.formatMessage({
          defaultMessage: 'Username should not contain spaces',
          description:
            'Error message for containing spaces in "Username" input on Projects profile onboarding page',
          id: 'SWycPl',
        }),
      }),
    website: z
      .union([z.string().length(0), z.string().url()])
      .transform((val) => (val ? val : null))
      .nullable(),
  });

  return z.discriminatedUnion('hasNotStartedWork', [
    baseSchema.extend({
      hasNotStartedWork: z.literal(false),
      monthYearExperience: monthYearExperienceSchema,
    }),
    baseSchema.extend({
      hasNotStartedWork: z.literal(true),
      monthYearExperience: monthYearExperienceSchema
        .optional()
        .transform(() => undefined),
      yoeReplacement: z
        .discriminatedUnion('option', [
          z.object({
            option: yoeReplacementSchema.extract(['others']),
            otherText: z.string().min(1, {
              message: intl.formatMessage({
                defaultMessage: 'Please enter your status',
                description:
                  'Error message for empty "Other" input for "Years of experience replacement status" on Projects profile page',
                id: '4rcZT1',
              }),
            }),
          }),
          z.object({
            option: yoeReplacementSchema.exclude(['others']),
          }),
        ])
        .transform((value) => {
          if (value.option === 'others') {
            return value.otherText;
          }

          return value.option;
        }),
    }),
  ]);
}

type ProjectsEditProfileTransformedValues = z.infer<
  ReturnType<typeof useProjectsProfileEditSchema>
>;

type Props = Readonly<{
  userProfile: Profile &
    Readonly<{
      projectsProfile: ProjectsProfile;
    }>;
}>;

export default function ProjectsProfileEditPage({ userProfile }: Props) {
  const intl = useIntl();
  const { showToast } = useToast();
  const projectsProfileUpdateMutation =
    trpc.projects.profile.update.useMutation();
  const { data: initialValues } = trpc.projects.profile.get.useQuery(
    undefined,
    {
      initialData: userProfile,
      refetchOnMount: false,
      refetchOnReconnect: false,
    },
  );

  const projectsProfileEditSchema = useProjectsProfileEditSchema();

  const methods = useForm<
    ProjectsProfileEditFormValues,
    undefined,
    ProjectsEditProfileTransformedValues
  >({
    resolver: zodResolver(projectsProfileEditSchema),
    values: {
      avatarUrl: initialValues?.avatarUrl ?? '',
      bio: initialValues?.bio ?? '',
      company: initialValues?.company ?? '',
      githubUsername: initialValues?.githubUsername ?? '',
      hasNotStartedWork: initialValues?.currentStatus !== null,
      jobTitle: initialValues?.title ?? '',
      linkedInUsername: initialValues?.linkedInUsername ?? '',
      monthYearExperience: initialValues?.startWorkDate
        ? `${
            initialValues.startWorkDate.getMonth() + 1
          }/${initialValues.startWorkDate.getFullYear()}`
        : undefined,
      motivations: convertProjectsMotivationReasonToFormValue(
        initialValues?.projectsProfile?.motivations ?? [],
      ),
      name: initialValues?.name ?? '',
      skillsProficient: initialValues?.projectsProfile?.skillsProficient ?? [],
      skillsToGrow: initialValues?.projectsProfile?.skillsToGrow ?? [],
      username: initialValues?.username ?? '',
      website: initialValues?.website ?? '',
      yoeReplacement: {
        option: yoeReplacementSchema
          .catch(() => 'others' as const)
          .parse(initialValues?.currentStatus),
        otherText: !yoeReplacementSchema.safeParse(initialValues?.currentStatus)
          .success
          ? initialValues?.currentStatus ?? undefined
          : undefined,
      },
    },
  });
  const {
    handleSubmit,
    reset,
    formState: { isSubmitting, isDirty },
  } = methods;
  const [usernameExistsError, setUsernameExistsError] = useState(false);

  const onSave = async (data: ProjectsEditProfileTransformedValues) => {
    await projectsProfileUpdateMutation.mutateAsync(
      {
        avatarUrl: data.avatarUrl,
        bio: data.bio,
        company: data.company,
        currentStatus: data.hasNotStartedWork ? data.yoeReplacement : undefined,
        githubUsername: data.githubUsername,
        linkedInUsername: data.linkedInUsername,
        motivations: data.motivations.flatMap((motivation) =>
          motivation != null ? [motivation] : [],
        ),
        name: data.name,
        skillsProficient: data.skillsProficient,
        skillsToGrow: data.skillsToGrow,
        startWorkDate: data.monthYearExperience,
        title: data.jobTitle,
        username: data.username,
        website: data.website,
      },
      {
        onError: () => {
          showToast({
            title: (
              <FormattedMessage
                defaultMessage="Something went wrong. Try again later or contact <link>support@greatfrontend.com</link>!"
                description="Error toast for project"
                id="5Gjt4J"
                values={{
                  link: (chunks) => (
                    <Anchor href="mailto:support@greatfrontend.com">
                      {chunks}
                    </Anchor>
                  ),
                }}
              />
            ),
            variant: 'danger',
          });
        },
        onSuccess: () => {
          showToast({
            title: (
              <FormattedMessage
                defaultMessage="Profile saved!"
                description="Toast for project profile saved"
                id="fjj5BL"
              />
            ),
            variant: 'success',
          });
        },
      },
    );
  };

  return (
    <div className="flex flex-col gap-8">
      <Heading level="heading5">
        <FormattedMessage
          defaultMessage="Edit Profile"
          description="Title of projects profile edit page"
          id="v2g4rl"
        />
      </Heading>
      <FormProvider {...methods}>
        <form
          onSubmit={handleSubmit(
            async (data: ProjectsEditProfileTransformedValues) =>
              await onSave(data),
          )}>
          <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-14 md:gap-20">
              <ProjectsProfileBasicInfoSection
                setUsernameExistsError={setUsernameExistsError}
              />
              <ProjectsProfileJobSection />
              <ProjectsProfileMotivationSection />
              <ProjectsProfileSkillSection />
              <div className="flex flex-col gap-6 md:flex-row">
                <div className="flex-1">
                  <ProjectsProfileYOESection />
                </div>
                <div className="flex-1">
                  <ProjectsProfileSocialSection />
                </div>
              </div>
            </div>
            <div className="flex justify-end gap-4">
              {isDirty && (
                <Button
                  isDisabled={isSubmitting}
                  label={intl.formatMessage({
                    defaultMessage: 'Cancel',
                    description:
                      'Label for cancel button for projects profile edit page',
                    id: 'nepkqj',
                  })}
                  variant="secondary"
                  onClick={() => reset()}
                />
              )}
              <Button
                isDisabled={!isDirty || isSubmitting || usernameExistsError}
                isLoading={isSubmitting}
                label={intl.formatMessage({
                  defaultMessage: 'Save changes',
                  description:
                    'Label for save changes button for projects profile edit page',
                  id: 'Kne0pQ',
                })}
                type="submit"
                variant="primary"
              />
            </div>
          </div>
        </form>
      </FormProvider>
    </div>
  );
}
