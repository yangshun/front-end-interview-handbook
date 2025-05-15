import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { Controller, FormProvider, useForm } from 'react-hook-form';
import { RiArrowLeftLine, RiArrowRightLine } from 'react-icons/ri';
import { z } from 'zod';

import { trpc } from '~/hooks/trpc';

import { FormattedMessage, useIntl } from '~/components/intl';
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
import Container from '~/components/ui/Container';
import Heading from '~/components/ui/Heading';
import Section from '~/components/ui/Heading/HeadingContext';
import Text from '~/components/ui/Text';
import TextInput from '~/components/ui/TextInput';

import logEvent from '~/logging/logEvent';

function useOnboardingProfileStepSchema() {
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

type OnboardingProfileStepTransformedValues = z.output<
  ReturnType<typeof useOnboardingProfileStepSchema>
>;

export type ProjectsProfileOnboardingStepFormValues = z.input<
  ReturnType<typeof useOnboardingProfileStepSchema>
>;

type Props = Readonly<{
  motivations: Array<string>;
  onFinish: () => void;
  onPrev: () => void;
}>;

export default function ProjectsOnboardingProfileForm({
  motivations,
  onFinish,
  onPrev,
}: Props) {
  const intl = useIntl();

  const trpcUtils = trpc.useUtils();
  const onboardingProfileStepSchema = useOnboardingProfileStepSchema();
  const { data: initialValues } = trpc.profile.viewer.useQuery();
  const profileOnboardMutation = trpc.projects.profile.onboard.useMutation({
    onMutate: () => {
      logEvent('projects.onboarding.submit', {
        namespace: 'projects',
      });
    },
    onSuccess: (data) => {
      trpcUtils.projects.profile.viewer.setData({}, data);
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
    ProjectsProfileOnboardingStepFormValues,
    unknown,
    OnboardingProfileStepTransformedValues
  >({
    mode: 'onTouched',
    resolver: zodResolver(onboardingProfileStepSchema),
    values: {
      avatarUrl: initialValues?.avatarUrl ?? '',
      name: initialValues?.name ?? '',
      username: initialValues?.username ?? '',
      ...experienceInitialValues,
    },
  });
  const { control, handleSubmit, formState } = methods;

  return (
    <Container
      className="flex flex-col items-stretch gap-12 pb-24 pt-16"
      width="2xl">
      <div className="flex flex-col items-center gap-4">
        <Heading className="text-center" level="heading5">
          <FormattedMessage
            defaultMessage="Welcome to GreatFrontEnd Projects!"
            description="Title for Projects onboarding page"
            id="GPp0wf"
          />
        </Heading>
        <Text
          className="text-pretty max-w-lg text-center"
          color="secondary"
          size="body1">
          <FormattedMessage
            defaultMessage="First, set up your public profile to help the community know you better (and assist you better!)"
            description="Subtitle for Projects profile onboarding page"
            id="n2GZsD"
          />
        </Text>
      </div>
      <Section>
        <FormProvider {...methods}>
          <form
            className="flex flex-col gap-y-8"
            onSubmit={handleSubmit(
              async (data: OnboardingProfileStepTransformedValues) => {
                await profileOnboardMutation.mutateAsync({
                  avatarUrl: data.avatarUrl,
                  company: data.company,
                  currentStatus: data.yoeReplacement,
                  motivations,
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
                          formState.dirtyFields.name ||
                          formState.submitCount > 0
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
            <div className="flex justify-between">
              <Button
                addonPosition="start"
                icon={RiArrowLeftLine}
                isDisabled={formState.isSubmitting || usernameExistsError}
                isLoading={formState.isSubmitting}
                label={intl.formatMessage({
                  defaultMessage: 'Prev',
                  description: 'Previous label',
                  id: '+s7kuS',
                })}
                size="lg"
                type="button"
                variant="secondary"
                onClick={onPrev}
              />
              <Button
                icon={RiArrowRightLine}
                isDisabled={formState.isSubmitting || usernameExistsError}
                isLoading={formState.isSubmitting}
                label={intl.formatMessage({
                  defaultMessage: 'Create',
                  description: 'Create label',
                  id: '8lMwo1',
                })}
                size="lg"
                type="submit"
                variant="success"
              />
            </div>
          </form>
        </FormProvider>
      </Section>
    </Container>
  );
}
