'use client';

import { useState } from 'react';
import { RiArrowLeftLine } from 'react-icons/ri';

import { trpc } from '~/hooks/trpc';

import ConfirmationDialog from '~/components/common/ConfirmationDialog';
import { useToast } from '~/components/global/toasts/useToast';
import { FormattedMessage, useIntl } from '~/components/intl';
import Button from '~/components/ui/Button';
import Heading from '~/components/ui/Heading';
import Section from '~/components/ui/Heading/HeadingContext';

import { useI18nRouter } from '~/next-i18nostic/src';

import ProjectsChallengeSubmissionForm from './ProjectsChallengeSubmissionForm';
import useProjectsChallengeSubmissionTakeScreenshotMutation from '../screenshots/useProjectsChallengeSubmissionTakeScreenshotMutation';
import type { ProjectsChallengeSubmissionExtended } from '../types';
import type {
  ProjectsChallengeItem,
  ProjectsChallengeVariantImages,
} from '../../challenges/types';

type Props = Readonly<{
  challenge: ProjectsChallengeItem;
  submission: NonNullable<ProjectsChallengeSubmissionExtended>;
}>;

export default function ProjectsChallengeSubmissionEditPage({
  challenge,
  submission,
}: Props) {
  const trpcUtils = trpc.useUtils();
  const intl = useIntl();
  const { showToast } = useToast();
  const router = useI18nRouter();
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);

  const submissionId = submission.id;
  const takeScreenshotMutation =
    useProjectsChallengeSubmissionTakeScreenshotMutation('form');

  const updateSubmissionMutation = trpc.projects.submission.update.useMutation({
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
    onSuccess: ({ submission: submission_ }) => {
      showToast({
        description: intl.formatMessage({
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

      takeScreenshotMutation.mutate({ submissionId: submission_.id });
      router.push(submission_.hrefs.detail);

      trpcUtils.projects.submissions.invalidate();
      // Refetch latest dashboard page data.
      router.refresh();
    },
  });
  const deleteSubmissionMutation = trpc.projects.submission.delete.useMutation({
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
      setShowDeleteConfirmation(false);
      showToast({
        description: intl.formatMessage({
          defaultMessage:
            'You have deleted this submission. Returning you back to the dashboard page.',
          description: 'Delete challenge success message',
          id: 'T64+TQ',
        }),
        title: intl.formatMessage({
          defaultMessage: 'Submission deleted!',
          description: 'Delete challenge success message',
          id: '3UtpZS',
        }),
        variant: 'info',
      });
      router.push('/projects/dashboard/progress/challenges');

      trpcUtils.projects.submissions.invalidate();
      // Refetch latest profile page data.
      router.refresh();
    },
  });

  return (
    <div>
      <div className="flex">
        <Button
          addonPosition="start"
          className="-ms-4 -mt-2"
          href={submission.hrefs.detail}
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
            cancelButtonHref={submission.hrefs.detail}
            challengeDefaultSkills={challenge.metadata.skills}
            challengeDefaultSpecPageLabels={challenge.info.specLabels}
            challengeDefaultSpecPages={(
              challenge.metadata.specImages
                .default as ProjectsChallengeVariantImages
            ).map(({ label }) => label)}
            defaultValues={submission}
            isDeleting={deleteSubmissionMutation.isLoading}
            isDisabled={
              updateSubmissionMutation.isLoading ||
              deleteSubmissionMutation.isLoading
            }
            isSaving={updateSubmissionMutation.isLoading}
            mode="edit"
            onDelete={() => {
              setShowDeleteConfirmation(true);
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
          isDisabled={deleteSubmissionMutation.isLoading}
          isLoading={deleteSubmissionMutation.isLoading}
          isShown={showDeleteConfirmation}
          title={intl.formatMessage({
            defaultMessage: 'Confirm delete submission?',
            description: 'Delete challenge submission confirmation',
            id: 'bfmJR5',
          })}
          onCancel={() => {
            setShowDeleteConfirmation(false);
          }}
          onConfirm={() => {
            deleteSubmissionMutation.mutate({
              submissionId,
            });
          }}>
          {intl.formatMessage({
            defaultMessage:
              'Once a submission has been deleted, it cannot be recovered. All upvotes, reputation, skills and component track progression due to the submission will be reversed',
            description: 'Delete challenge submission confirmation subtitle',
            id: 'W1liAZ',
          })}
        </ConfirmationDialog>
      </div>
    </div>
  );
}
