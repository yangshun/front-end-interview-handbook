'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { FormProvider, useForm } from 'react-hook-form';
import { RiArrowRightLine } from 'react-icons/ri';
import { z } from 'zod';

import { FormattedMessage, useIntl } from '~/components/intl';
import useProjectsMotivationReasonSchema from '~/components/projects/hooks/useProjectsMotivationReasonSchema';
import type { ProjectsMotivationReasonFormValues } from '~/components/projects/types';
import Button from '~/components/ui/Button';
import Container from '~/components/ui/Container';
import Heading from '~/components/ui/Heading';
import Section from '~/components/ui/Heading/HeadingContext';
import Text from '~/components/ui/Text';

import ProjectsProfileMotivationsField from '../profile/edit/ProjectsProfileMotivationsField';

type OnboardingProfileFormTransformedValues = {
  motivations: z.infer<ReturnType<typeof useProjectsMotivationReasonSchema>>;
};

type Props = Readonly<{
  onSubmit: (motivations: ReadonlyArray<string>) => void;
}>;

export default function ProjectsOnboardingMotivationsForm({ onSubmit }: Props) {
  const intl = useIntl();
  const onboardingReasonSchema = useProjectsMotivationReasonSchema({
    isRequired: true,
  });

  const methods = useForm<
    ProjectsMotivationReasonFormValues,
    unknown,
    OnboardingProfileFormTransformedValues
  >({
    defaultValues: {
      motivations: [],
    },
    mode: 'onTouched',
    resolver: zodResolver(
      z.object({
        motivations: onboardingReasonSchema,
      }),
    ),
  });
  const { handleSubmit } = methods;

  return (
    <FormProvider {...methods}>
      <Container
        className="flex flex-col items-center gap-12 pb-24 pt-16"
        width="6xl">
        <div className="flex flex-col items-center gap-4">
          <Text
            className="text-pretty block text-center"
            color="active"
            size="body2"
            weight="medium">
            <FormattedMessage
              defaultMessage="User onboarding"
              description="Title for Projects onboarding page"
              id="GJbSo1"
            />
          </Text>
          <Heading className="text-center" level="heading5">
            <FormattedMessage
              defaultMessage="Welcome to GreatFrontEnd Projects!"
              description="Title for Projects onboarding page"
              id="GPp0wf"
            />
          </Heading>
          <Text className="text-center" color="secondary" size="body1">
            <FormattedMessage
              defaultMessage="Choose up to 2 reasons why you are here so that we can improve your experience"
              description="Subtitle for Projects onboarding page"
              id="PAq50+"
            />
          </Text>
        </div>
        <Section>
          <form
            className="flex w-full flex-col gap-8"
            onSubmit={handleSubmit(({ motivations }) => {
              onSubmit(
                motivations.flatMap((motivation) =>
                  motivation != null ? [motivation] : [],
                ),
              );
            })}>
            <ProjectsProfileMotivationsField view="onboarding" />
            <div className="flex flex-row-reverse flex-wrap items-center justify-between">
              <Button
                icon={RiArrowRightLine}
                label={intl.formatMessage({
                  defaultMessage: 'Next',
                  description: 'Next button label',
                  id: 'pz1v44',
                })}
                size="lg"
                type="submit"
                variant="secondary"
              />
            </div>
          </form>
        </Section>
      </Container>
    </FormProvider>
  );
}
