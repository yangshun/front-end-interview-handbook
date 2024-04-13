'use client';

import { RiArrowLeftLine } from 'react-icons/ri';
import { FormattedMessage } from 'react-intl';
import { useIntl } from 'react-intl';

import { trpc } from '~/hooks/trpc';

import { useToast } from '~/components/global/toasts/useToast';
import type {
  ProjectsChallengeItem,
  ProjectsChallengeVariantImages,
} from '~/components/projects/challenges/types';
import Button from '~/components/ui/Button';
import Heading from '~/components/ui/Heading';
import Section from '~/components/ui/Heading/HeadingContext';

import { useI18nRouter } from '~/next-i18nostic/src';

import ProjectsChallengeSubmissionForm from './ProjectsChallengeSubmissionForm';
import useProjectsChallengeSubmissionTakeScreenshotMutation from '../screenshots/useProjectsChallengeSubmissionTakeScreenshotMutation';

import type { ProjectsChallengeSession } from '@prisma/client';

type Props = Readonly<{
  challenge: ProjectsChallengeItem;
  session: ProjectsChallengeSession;
}>;

export default function ProjectsChallengeSubmitPage({
  challenge,
  session,
}: Props) {
  const intl = useIntl();
  const { showToast } = useToast();
  const router = useI18nRouter();

  const takeScreenshotMutation =
    useProjectsChallengeSubmissionTakeScreenshotMutation('form');
  const createSubmissionMutation = trpc.projects.submission.create.useMutation({
    onError: () => {
      showToast({
        title: intl.formatMessage({
          defaultMessage: 'Oops something went wrong',
          description: 'Error message',
          id: 'Nz7W/0',
        }),
        variant: 'danger',
      });
    },
    onSuccess: ({ submission, points }) => {
      takeScreenshotMutation.mutate({ submissionId: submission.id });

      showToast({
        description: intl.formatMessage(
          {
            defaultMessage: 'You have gained {points} reputation points!',
            description: 'Success message after submitting a project',
            id: 'fv5WXh',
          },
          {
            points,
          },
        ),
        title: intl.formatMessage({
          defaultMessage: 'Congratulations!',
          description: 'Success message',
          id: '5qLBww',
        }),
        variant: 'success',
      });
      router.push(submission.hrefs.detail);
    },
  });

  const { href } = challenge.metadata;

  return (
    <div>
      <div className="flex">
        <Button
          addonPosition="start"
          className="-ms-4 -mt-2"
          href={href}
          icon={RiArrowLeftLine}
          label={intl.formatMessage({
            defaultMessage: 'To challenge',
            description: 'Link label to go back to the challenge details page',
            id: 'IGlDjB',
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
      <div className="mt-9">
        <Section>
          <ProjectsChallengeSubmissionForm
            cancelButtonHref={challenge.metadata.completionHref}
            challengeDefaultSkills={challenge.metadata.skills}
            challengeDefaultSpecPageLabels={challenge.metadata.specLabels}
            challengeDefaultSpecPages={(
              challenge.metadata.specImages
                .default as ProjectsChallengeVariantImages
            ).map(({ label }) => label)}
            defaultValues={{
              roadmapSkills: session.roadmapSkills,
              techStackSkills: session.techStackSkills,
            }}
            isDisabled={createSubmissionMutation.isLoading}
            isSaving={createSubmissionMutation.isLoading}
            mode="create"
            onSubmit={(data) => {
              createSubmissionMutation.mutate({
                slug: challenge.metadata.slug,
                ...data,
              });
            }}
          />
        </Section>
      </div>
    </div>
  );
}
