'use client';

import { useState } from 'react';
import { RiArrowLeftLine } from 'react-icons/ri';
import { FormattedMessage, useIntl } from 'react-intl';

import { trpc } from '~/hooks/trpc';

import ConfirmationDialog from '~/components/common/ConfirmationDialog';
import { useToast } from '~/components/global/toasts/ToastsProvider';
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
  const { showToast } = useToast();
  const router = useI18nRouter();
  const [isDeleting, setIsDeleting] = useState(false);

  const submissionId = submission.id;

  const updateSubmissionMutation = trpc.projects.submissions.update.useMutation(
    {
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
      onSuccess: () => {
        showToast({
          subtitle: intl.formatMessage({
            defaultMessage:
              'Your edits have been successfully saved. Thank you for contributing to our community!',
            description: 'Update challenge success message',
            id: 'fifBZf',
          }),
          title: intl.formatMessage({
            defaultMessage: 'Changes saved successfully!',
            description: 'Update challenge success message',
            id: 'G7d68r',
          }),
          variant: 'success',
        });
        router.push(`/projects/s/${submissionId}`);
      },
    },
  );
  const deleteSubmissionMutation = trpc.projects.submissions.delete.useMutation(
    {
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
      onSuccess: () => {
        setIsDeleting(false);
        showToast({
          subtitle: intl.formatMessage({
            defaultMessage:
              'You have deleted this submission. Returning you back to the challenges page.',
            description: 'Delete challenge success message',
            id: 'RbQJUu',
          }),
          title: intl.formatMessage({
            defaultMessage: 'Submission deleted!',
            description: 'Delete challenge success message',
            id: '3UtpZS',
          }),
          variant: 'info',
        });
        // TODO(projects): Find a better route to go to.
        router.push('/projects/challenges');
      },
    },
  );

  return (
    <div>
      <div className="flex">
        <Button
          addonPosition="start"
          className="-ms-4 -mt-2"
          href={`/projects/s/${submissionId}`}
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
      <div className="mt-9">
        <Section>
          <ProjectsChallengeSubmissionForm
            defaultValues={submission}
            mode="edit"
            onDelete={() => {
              setIsDeleting(true);
            }}
            onSubmit={(data) => {
              updateSubmissionMutation.mutate({
                submissionId,
                ...data,
              });
            }}
          />
        </Section>
        <ConfirmationDialog
          confirmButtonVariant="danger"
          isConfirming={deleteSubmissionMutation.isLoading}
          isShown={isDeleting}
          title={intl.formatMessage({
            defaultMessage: 'Confirm delete submission',
            description: 'Delete challenge submission confirmation',
            id: 'ZbtmL3',
          })}
          onCancel={() => {
            setIsDeleting(false);
          }}
          onConfirm={() => {
            deleteSubmissionMutation.mutate({
              submissionId,
            });
          }}>
          {intl.formatMessage({
            defaultMessage:
              'Once a submission has been deleted, it cannot be recovered. All upvotes, reputation, skill and component track progression due to the submission will be reverted.',
            description: 'Delete challenge submission confirmation subtitle',
            id: 'KSCxTH',
          })}
        </ConfirmationDialog>
      </div>
    </div>
  );
}
