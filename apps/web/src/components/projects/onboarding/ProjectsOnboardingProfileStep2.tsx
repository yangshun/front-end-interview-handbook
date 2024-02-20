import { useSearchParams } from 'next/navigation';
import { Controller, useForm } from 'react-hook-form';
import { RiArrowRightLine } from 'react-icons/ri';
import { FormattedMessage, useIntl } from 'react-intl';
import { z } from 'zod';

import { trpc } from '~/hooks/trpc';

import ProjectsChallengeReputationTag from '~/components/projects/challenges/metadata/ProjectsChallengeReputationTag';
import ProjectsProfileSocialInput from '~/components/projects/profile/ProjectsProfileSocialInput';
import Button from '~/components/ui/Button';
import Heading from '~/components/ui/Heading';
import TextArea from '~/components/ui/TextArea';

import { useI18nRouter } from '~/next-i18nostic/src';

import ProjectsProfileTechStackProficientInput from '../profile/ProjectsProfileTechStackProficientInput';
import ProjectsProfileTechStackToImproveInput from '../profile/ProjectsProfileTechStackToImproveInput';
import { useProjectsSkillListInputSchema } from '../skills/form/ProjectsSkillListInputSchema';
import type { ProjectsSkillKey } from '../skills/types';

import { zodResolver } from '@hookform/resolvers/zod';

export type ProjectsOnboardingProfileStep2FormValues = Readonly<{
  bio: string;
  githubUsername: string;
  linkedInUsername: string;
  skillsProficient: Array<ProjectsSkillKey>;
  skillsToGrow: Array<ProjectsSkillKey>;
  website: string;
}>;

function useOnboardingProfileStep2Schema() {
  const skillsProficientSchema = useProjectsSkillListInputSchema({
    required: false,
  });
  const skillsToGrowSchema = useProjectsSkillListInputSchema({
    required: false,
  });

  return z.object({
    bio: z.string(),
    githubUsername: z.string(),
    linkedInUsername: z.string(),
    skillsProficient: skillsProficientSchema,
    skillsToGrow: skillsToGrowSchema,
    website: z.string(),
  });
}

export default function ProjectsOnboardingProfileStep2() {
  const searchParams = useSearchParams();
  const router = useI18nRouter();
  const intl = useIntl();
  const onboardingProfileStep2Schema = useOnboardingProfileStep2Schema();
  const { data: initialValues } =
    trpc.projects.profile.onboardingStep2.useQuery();

  const nextPathname = searchParams?.get('next') || '/projects/challenges';
  const onboardingStep2UpdateMutation =
    trpc.projects.profile.onboardingStep2Update.useMutation({
      onSuccess: () => {
        router.push(nextPathname);
      },
    });

  const {
    control,
    handleSubmit,
    formState: { isDirty, isSubmitting },
  } = useForm<ProjectsOnboardingProfileStep2FormValues>({
    resolver: zodResolver(onboardingProfileStep2Schema),
    values: {
      bio: initialValues?.bio ?? '',
      githubUsername: initialValues?.githubUsername ?? '',
      linkedInUsername: initialValues?.linkedInUsername ?? '',
      skillsProficient: initialValues?.projectsProfile?.skillsProficient ?? [],
      skillsToGrow: initialValues?.projectsProfile?.skillsToGrow ?? [],
      website: initialValues?.website ?? '',
    },
  });

  return (
    <form
      className="flex flex-col gap-y-8"
      onSubmit={handleSubmit(async (data) => {
        await onboardingStep2UpdateMutation.mutateAsync(data);
      })}>
      <section className="flex flex-col gap-y-6">
        <Heading level="heading6">
          <FormattedMessage
            defaultMessage="Skills"
            description="Section title for user onboarding form"
            id="EyErSi"
          />
        </Heading>
        <ProjectsProfileTechStackProficientInput control={control} />
        <ProjectsProfileTechStackToImproveInput control={control} />
      </section>
      <section className="flex flex-col gap-y-6">
        <Heading level="heading6">
          <FormattedMessage
            defaultMessage="Bio & social links"
            description="Label for Social Links section of Projects profile onboarding page"
            id="YgydxS"
          />
        </Heading>
        <div className="relative">
          <ProjectsChallengeReputationTag
            className="absolute end-0 top-0"
            points={25}
            variant="filled"
          />
          <Controller
            control={control}
            name="bio"
            render={({ field }) => (
              <TextArea
                description={intl.formatMessage({
                  defaultMessage:
                    'Tell the community about yourself - your background, skills, aspirations and skills and tools you hope to pick up!',
                  description:
                    'Description for Biography input on Projects profile onboarding page',
                  id: 'I60bQN',
                })}
                descriptionStyle="tooltip"
                label={intl.formatMessage({
                  defaultMessage: 'Bio',
                  description:
                    'Label for Biography input on Projects profile onboarding page',
                  id: 'ZNPYCk',
                })}
                placeholder={intl.formatMessage({
                  defaultMessage:
                    'Tell us anything - about your journey as a front end developer, your goals and next steps, or how you want to connect with others',
                  description:
                    'Placeholder for Biography input on Projects profile onboarding page',
                  id: 'jeX0Hi',
                })}
                rows={5}
                {...field}
              />
            )}
          />
        </div>
        <ProjectsProfileSocialInput
          control={control}
          showReputationCountIncreaseTag={true}
        />
      </section>
      <div className="flex flex-row-reverse gap-4">
        <Button
          className="self-end"
          icon={RiArrowRightLine}
          isDisabled={!isDirty || isSubmitting}
          isLoading={isSubmitting}
          label={intl.formatMessage({
            defaultMessage: 'Get started',
            description:
              'Label for Get Started button on Projects profile onboarding page',
            id: 'iBfH9v',
          })}
          size="lg"
          type="submit"
          variant="primary"
        />
        <Button
          href={nextPathname}
          label={intl.formatMessage({
            defaultMessage: 'Skip for now',
            description:
              'Label for "Skip for now" button on Projects profile onboarding page',
            id: 'fs9YFE',
          })}
          size="lg"
          variant="tertiary"
        />
      </div>
    </form>
  );
}
