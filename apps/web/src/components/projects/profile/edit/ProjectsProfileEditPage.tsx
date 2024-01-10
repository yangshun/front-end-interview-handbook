'use client';

import { FormProvider, useForm } from 'react-hook-form';
import { FormattedMessage, useIntl } from 'react-intl';
import { z } from 'zod';

import { trpc } from '~/hooks/trpc';

import { useToast } from '~/components/global/toasts/ToastsProvider';
import useProjectsMonthYearExperienceSchema from '~/components/projects/hooks/useProjectsMonthYearExperienceSchema';
import useProjectsMotivationReasonOptions from '~/components/projects/hooks/useProjectsMotivationReasonOptions';
import useProjectsMotivationReasonSchema from '~/components/projects/hooks/useProjectsMotivationReasonSchema';
import { yoeReplacementSchema } from '~/components/projects/misc';
import ProjectsProfileBasicInfoSection from '~/components/projects/profile/edit/ProjectsProfileBasicInfoSection';
import ProjectsProfileMotivationSection from '~/components/projects/profile/edit/ProjectsProfileMotivationSection';
import ProjectsProfileSkillSection from '~/components/projects/profile/edit/ProjectsProfileSkillSection';
import ProjectsProfileSocialSection from '~/components/projects/profile/edit/ProjectsProfileSocialSection';
import ProjectsProfileYOESection from '~/components/projects/profile/edit/ProjectsProfileYOESection';
import type { ProjectsUserProfile } from '~/components/projects/profile/types';
import type {
  MotivationReasonValue,
  ProjectsEditProfileValues,
} from '~/components/projects/types';
import Anchor from '~/components/ui/Anchor';
import Button from '~/components/ui/Button';
import Heading from '~/components/ui/Heading';

import { zodResolver } from '@hookform/resolvers/zod';

function useProjectsProfileEditSchema() {
  const intl = useIntl();
  const monthYearExperienceSchema = useProjectsMonthYearExperienceSchema({
    isRequired: false,
  });
  const motivationReasonSchema = useProjectsMotivationReasonSchema({
    isRequired: false,
  });

  const baseSchema = z.object({
    bio: z.string(),
    jobTitle: z.string(),
    motivationReasons: motivationReasonSchema,

    name: z.string(),

    // TODO (projects): add error message for empty input
    techStackProficient: z.string(),
    // TODO (projects): add error message for empty input
    techStackToImprove: z.string(),
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
  profile: ProjectsUserProfile;
}>;

export default function ProjectsProfileEditPage({ profile }: Props) {
  const intl = useIntl();
  const { showToast } = useToast();
  const projectsProfileUpdateMutation =
    trpc.projects.profile.projectsProfileUpdate.useMutation();
  const { data: initialValues } =
    trpc.projects.profile.projectsProfileGet.useQuery(undefined, {
      initialData: profile,
      refetchOnMount: false,
      refetchOnReconnect: false,
    });

  const { reasonOptions } = useProjectsMotivationReasonOptions();
  const projectsProfileEditSchema = useProjectsProfileEditSchema();
  const projectsProfile = initialValues?.projectsProfile[0] || {
    primaryMotivation: null,
    secondaryMotivation: null,
  };
  const hasPredefinedPrimaryReason = reasonOptions.find(
    (reason) => reason.id === projectsProfile.primaryMotivation,
  );
  const hasPredefinedSecondaryReason = reasonOptions.find(
    (reason) => reason.id === projectsProfile.secondaryMotivation,
  );

  const methods = useForm<
    ProjectsEditProfileValues,
    undefined,
    ProjectsEditProfileTransformedValues
  >({
    resolver: zodResolver(projectsProfileEditSchema),
    values: {
      avatarUrl: initialValues?.avatarUrl ?? '',
      bio: initialValues?.bio ?? '',
      githubUsername: initialValues?.githubUsername ?? '',
      hasNotStartedWork: initialValues?.currentStatus !== null,
      jobTitle: initialValues?.title ?? '',
      linkedInUsername: initialValues?.linkedInUsername ?? '',
      monthYearExperience: initialValues?.startWorkDate
        ? `${
            initialValues.startWorkDate.getMonth() + 1
          }/${initialValues.startWorkDate.getFullYear()}`
        : undefined,
      motivationReasons: {
        primary: {
          otherValue: hasPredefinedPrimaryReason
            ? ''
            : projectsProfile.primaryMotivation ?? '',
          type: projectsProfile.primaryMotivation
            ? hasPredefinedPrimaryReason
              ? (projectsProfile.primaryMotivation as MotivationReasonValue)
              : 'other'
            : null,
        },
        secondary: {
          otherValue: hasPredefinedSecondaryReason
            ? ''
            : projectsProfile.secondaryMotivation ?? '',
          type: projectsProfile.secondaryMotivation
            ? hasPredefinedSecondaryReason
              ? (projectsProfile.secondaryMotivation as MotivationReasonValue)
              : 'other'
            : null,
        },
      },
      name: initialValues?.name ?? '',
      techStackProficient: '',
      techStackToImprove: '',
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

  const onSave = async (data: ProjectsEditProfileTransformedValues) => {
    await projectsProfileUpdateMutation.mutateAsync(
      {
        bio: data.bio,
        currentStatus: data.hasNotStartedWork ? data.yoeReplacement : undefined,
        motivationReasons: {
          primaryMotivation: data.motivationReasons.primary,
          secondaryMotivation: data.motivationReasons.secondary,
        },
        name: data.name,
        startWorkDate: data.monthYearExperience,
        title: data.jobTitle,
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
            <div className="flex flex-col md:gap-20 gap-14">
              <ProjectsProfileBasicInfoSection />
              <ProjectsProfileMotivationSection />
              <ProjectsProfileSkillSection />
              <div className="flex gap-6 md:flex-row flex-col">
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
                isDisabled={!isDirty || isSubmitting}
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
