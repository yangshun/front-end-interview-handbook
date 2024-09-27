import { useState } from 'react';
import { Controller, FormProvider, useForm } from 'react-hook-form';
import { RiArrowRightLine } from 'react-icons/ri';
import { FormattedMessage, useIntl } from 'react-intl';
import { z } from 'zod';

import { trpc } from '~/hooks/trpc';

import { useProfileUsernameSchema } from '~/components/profile/fields/ProfileUsernameSchema';
import useProjectsProfileExperienceValueInitializer from '~/components/projects/hooks/useProjectsProfileExperienceValueInitializer';
import ProjectsProfileEditAvatar from '~/components/projects/profile/edit/ProjectsProfileEditAvatar';
import ProjectsProfileJobSection from '~/components/projects/profile/edit/ProjectsProfileJobSection';
import ProjectsProfileUsernameInput from '~/components/projects/profile/edit/ProjectsProfileUsernameInput';
import {
  useProjectsJobNotStartedSchema,
  useProjectsJobStartedSchema,
} from '~/components/projects/profile/fields/ProjectsProfileJobSchema';
import Button from '~/components/ui/Button';
import Heading from '~/components/ui/Heading';
import TextInput from '~/components/ui/TextInput';

import logEvent from '~/logging/logEvent';

import { zodResolver } from '@hookform/resolvers/zod';

export type ProjectsProfileOnboardingStep1FormValues = {
  avatarUrl?: string | undefined;
  company: string;
  hasStartedWork: boolean;
  jobTitle: string;
  monthYearExperience: string | undefined;
  name: string;
  title: string;
  username: string;
  yoeReplacement: {
    option: string | undefined;
    otherText: string | undefined;
  };
};

function useOnboardingProfileStep1Schema() {
  const intl = useIntl();
  const usernameSchema = useProfileUsernameSchema();
  const jobNotStartedSchema = useProjectsJobNotStartedSchema();
  const jobStartedSchema = useProjectsJobStartedSchema();

  const baseSchema = z.object({
    avatarUrl: z.string().optional(),
    name: z.string().min(1, {
      message: intl.formatMessage({
        defaultMessage: 'Please enter your name',
        description:
          'Error message for empty "Name" input on Projects profile onboarding page',
        id: 'yqjkfw',
      }),
    }),
    username: usernameSchema,
  });

  return z.discriminatedUnion('hasStartedWork', [
    baseSchema.extend(jobStartedSchema),
    baseSchema.extend(jobNotStartedSchema),
  ]);
}

type OnboardingProfileStep1TransformedValues = z.infer<
  ReturnType<typeof useOnboardingProfileStep1Schema>
>;

type Props = Readonly<{
  onFinish: () => void;
}>;

export default function ProjectsOnboardingProfileStep1({ onFinish }: Props) {
  const intl = useIntl();
  const trpcUtils = trpc.useUtils();
  const onboardingProfileStep1Schema = useOnboardingProfileStep1Schema();
  const { data: initialValues } = trpc.projects.profile.viewer.useQuery();
  const onboardingStep1UpdateMutation =
    trpc.projects.profile.onboardingStep1Update.useMutation({
      onMutate: () => {
        logEvent('projects.onboarding.submit', {
          namespace: 'projects',
        });
      },
      onSuccess: (data) => {
        trpcUtils.projects.profile.viewer.setData(undefined, data);
      },
    });
  const [usernameExistsError, setUsernameExistsError] = useState(false);

  const experienceInitialValues = useProjectsProfileExperienceValueInitializer({
    company: initialValues?.company,
    currentStatus: initialValues?.currentStatus,
    startWorkDate: initialValues?.startWorkDate,
    title: initialValues?.title,
  });

  const methods = useForm<
    ProjectsProfileOnboardingStep1FormValues,
    unknown,
    OnboardingProfileStep1TransformedValues
  >({
    mode: 'onTouched',
    resolver: zodResolver(onboardingProfileStep1Schema),
    values: {
      avatarUrl: initialValues?.avatarUrl ?? '',
      name: initialValues?.name ?? '',
      username: initialValues?.username ?? '',
      ...experienceInitialValues,
    },
  });
  const { control, handleSubmit, formState } = methods;

  return (
    <FormProvider {...methods}>
      <form
        className="flex flex-col gap-y-8"
        onSubmit={handleSubmit(
          async (data: OnboardingProfileStep1TransformedValues) => {
            await onboardingStep1UpdateMutation.mutateAsync({
              avatarUrl: data.avatarUrl,
              company: data.company,
              currentStatus: data.yoeReplacement,
              name: data.name,
              startWorkDate: data.monthYearExperience,
              title: data.hasStartedWork ? data.jobTitle : data.title,
              username: data.username,
            });
            onFinish();
          },
        )}>
        <section className="flex flex-col gap-y-6">
          <div className="flex justify-between gap-2">
            <Heading level="heading6">
              <FormattedMessage
                defaultMessage="Basic details"
                description="Section title for user onboarding form"
                id="nNCpzS"
              />
            </Heading>
          </div>
          <div className="flex flex-col items-start gap-x-16 gap-y-6 sm:flex-row">
            <Controller
              control={control}
              name="avatarUrl"
              render={({ field }) => (
                <ProjectsProfileEditAvatar
                  src={field.value ?? ''}
                  onChange={(imageUrl) => {
                    field.onChange(imageUrl);
                  }}
                />
              )}
            />
            <div className="flex flex-1 flex-col gap-6 self-stretch sm:self-auto">
              <Controller
                control={control}
                name="name"
                render={({ field }) => (
                  <TextInput
                    errorMessage={
                      formState.dirtyFields.name || formState.submitCount > 0
                        ? formState.errors.name?.message
                        : undefined
                    }
                    label={intl.formatMessage({
                      defaultMessage: 'Name',
                      description:
                        'Label for "Name" input on Projects profile onboarding page',
                      id: 'AVk8pE',
                    })}
                    placeholder={intl.formatMessage({
                      defaultMessage: 'Jane Smith',
                      description:
                        'Placeholder for "Name" input on Projects profile onboarding page',
                      id: 'Ihutcw',
                    })}
                    {...field}
                  />
                )}
              />
              <Controller
                control={control}
                name="username"
                render={({ field }) => (
                  <ProjectsProfileUsernameInput
                    errorMessage={
                      formState.dirtyFields.username ||
                      formState.submitCount > 0
                        ? formState.errors.username?.message
                        : undefined
                    }
                    field={field}
                    setUsernameExistsError={setUsernameExistsError}
                  />
                )}
              />
            </div>
          </div>
        </section>
        <ProjectsProfileJobSection />
        <Button
          className="self-end"
          icon={RiArrowRightLine}
          isDisabled={formState.isSubmitting || usernameExistsError}
          isLoading={formState.isSubmitting}
          label={intl.formatMessage({
            defaultMessage: 'Next',
            description:
              'Label for Next button on Projects profile onboarding page',
            id: 'ghssuE',
          })}
          size="lg"
          type="submit"
          variant="secondary"
        />
      </form>
    </FormProvider>
  );
}
