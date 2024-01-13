'use client';

import { RiArrowLeftLine } from 'react-icons/ri';
import { FormattedMessage, useIntl } from 'react-intl';

import { trpc } from '~/hooks/trpc';

import Button from '~/components/ui/Button';
import Heading from '~/components/ui/Heading';
import Section from '~/components/ui/Heading/HeadingContext';

import { useI18nRouter } from '~/next-i18nostic/src';

import ProjectsChallengeSubmissionForm from '../submit/ProjectsChallengeSubmissionForm';

import type { ProjectsChallengeSubmission } from '@prisma/client';

type Props = Readonly<{
  submission: ProjectsChallengeSubmission;
}>;

export default function ProjectsChallengeSubmissionEditPage({
  submission,
}: Props) {
  const intl = useIntl();
  const router = useI18nRouter();

  const updateSubmissionMutation = trpc.projects.submissions.update.useMutation(
    {
      onSuccess: () => {
        router.push(`/projects/s/${submission.id}`);
      },
    },
  );

  return (
    <div>
      <div className="flex">
        <Button
          addonPosition="start"
          className="-ms-4 -mt-2"
          href={`/projects/s/${submission.id}`}
          icon={RiArrowLeftLine}
          label={intl.formatMessage({
            defaultMessage: 'To submission',
            description: 'Link label to go back to challenge submission',
            id: 'tdTeVR',
          })}
          variant="tertiary"
        />
      </div>
      <Heading className="mt-8" level="heading5">
        <FormattedMessage
          defaultMessage="Edit your submission"
          description="Title for the challenge submission edit page"
          id="Qc3ZiZ"
        />
      </Heading>
      <Section>
        <ProjectsChallengeSubmissionForm
          defaultValues={submission}
          mode="edit"
          onSubmit={(data) => {
            updateSubmissionMutation.mutate({
              submissionId: submission.id,
              ...data,
            });
          }}
        />
      </Section>
    </div>
  );
}
