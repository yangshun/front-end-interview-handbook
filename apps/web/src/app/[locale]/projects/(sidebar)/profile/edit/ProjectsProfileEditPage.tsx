'use client';

import { FormProvider, useForm } from 'react-hook-form';
import { FormattedMessage, useIntl } from 'react-intl';
import { z } from 'zod';

import useMonthYearExperienceSchema from '~/components/projects/hooks/useMonthYearExperienceSchema';
import useMotivationReasonOptions from '~/components/projects/hooks/useMotivationReasonOptions';
import useMotivationReasonSchema from '~/components/projects/hooks/useMotivationReasonSchema';
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
import Heading from '~/components/ui/Heading';

function useProjectsProfileEditSchema() {
  const intl = useIntl();
  const monthYearExperienceSchema = useMonthYearExperienceSchema();
  const motivationReasonSchema = useMotivationReasonSchema();

  const baseSchema = z.object({
    jobTitle: z.string().min(1, {
      message: intl.formatMessage({
        defaultMessage: 'Please enter your job title',
        description:
          'Error message for empty "Job title" input on Projects profile onboarding page',
        id: 'VGOH7F',
      }),
    }),
    name: z.string().min(1, {
      message: intl.formatMessage({
        defaultMessage: 'Please enter your name',
        description:
          'Error message for empty "Name" input on Projects profile onboarding page',
        id: 'yqjkfw',
      }),
    }),
    // TODO (projects): add error message for empty input
    techStackProficient: z.string(),
    // TODO (projects): add error message for empty input
    techStackToImprove: z.string(),
  });

  return z.discriminatedUnion('hasNotStartedWork', [
    baseSchema.extend({
      hasNotStartedWork: z.literal(false),
      monthYearExperience: monthYearExperienceSchema,
      motivationReasons: motivationReasonSchema,
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
                  'Error message for empty "Other" input for "Years of experience replacement status" on Projects profile onboarding page',
                id: 'KQXNDC',
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
  initialValues: ProjectsUserProfile;
}>;

export default function ProjectsProfileEditPage({ initialValues }: Props) {
  const { reasonOptions } = useMotivationReasonOptions();
  const projectsProfile = initialValues.projectsProfile[0];
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
    values: {
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
          type:
            hasPredefinedPrimaryReason && projectsProfile.primaryMotivation
              ? (projectsProfile.primaryMotivation as MotivationReasonValue)
              : null,
        },
        secondary: {
          otherValue: hasPredefinedSecondaryReason
            ? ''
            : projectsProfile.secondaryMotivation ?? '',
          type:
            hasPredefinedSecondaryReason && projectsProfile.secondaryMotivation
              ? (projectsProfile.secondaryMotivation as MotivationReasonValue)
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
  // Const {
  //   control,
  //   watch,
  //   handleSubmit,
  //   formState: { isSubmitting, isDirty, errors },
  // } = methods;

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
        <form>
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
        </form>
      </FormProvider>
    </div>
  );
}
