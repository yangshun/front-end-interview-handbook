import { useState } from 'react';

import { trpc } from '~/hooks/trpc';

import { useToast } from '~/components/global/toasts/useToast';
import { FormattedMessage, useIntl } from '~/components/intl';
import ProjectsChallengeSubmissionCard from '~/components/projects/submissions/lists/ProjectsChallengeSubmissionCard';
import type { ProjectsChallengeSubmissionAugmented } from '~/components/projects/submissions/types';
import Anchor from '~/components/ui/Anchor';
import Button from '~/components/ui/Button';
import Dialog from '~/components/ui/Dialog';
import Section from '~/components/ui/Heading/HeadingContext';
import Text from '~/components/ui/Text';

type Props = Readonly<{
  isShown: boolean;
  onClose: () => void;
  pinnedSubmissions: Array<ProjectsChallengeSubmissionAugmented>;
  setPinnedSubmissionsCount: (value: number) => void;
}>;

export default function ProjectsChallengeSubmissionPinned({
  isShown,
  onClose,
  pinnedSubmissions,
  setPinnedSubmissionsCount,
}: Props) {
  const intl = useIntl();
  const trpcUtils = trpc.useUtils();
  const { showToast } = useToast();

  const [unpinnedSubmissionIds, setUnpinnedSubmissionIds] = useState<
    Array<string>
  >([]);

  const unpin = trpc.projects.submission.unpin.useMutation({
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
        title: intl.formatMessage({
          defaultMessage: 'Submission successfully unpinned!',
          description: 'Submission unpin toaster',
          id: 'LKILl5',
        }),
        variant: 'success',
      });
      setPinnedSubmissionsCount(
        pinnedSubmissions.length - unpinnedSubmissionIds.length,
      );
      onClose();
      trpcUtils.projects.submissions.listPinned.invalidate();
    },
  });

  const handleUnpin = (submissionId: string) => {
    if (unpinnedSubmissionIds.includes(submissionId)) {
      setUnpinnedSubmissionIds((prevIds) =>
        prevIds.filter((id) => submissionId !== id),
      );
    } else {
      setUnpinnedSubmissionIds((prevIds) => [...prevIds, submissionId]);
    }
  };

  return (
    <Dialog
      isShown={isShown}
      primaryButton={
        <Button
          isDisabled={unpinnedSubmissionIds.length === 0 || unpin.isLoading}
          isLoading={unpin.isLoading}
          label={intl.formatMessage({
            defaultMessage: 'Save',
            description: 'Save button label',
            id: '2y24a/',
          })}
          variant="primary"
          onClick={() => unpin.mutate({ submissionIds: unpinnedSubmissionIds })}
        />
      }
      secondaryButton={
        <Button
          label={intl.formatMessage({
            defaultMessage: 'Cancel',
            description: 'Cancel button label',
            id: '0GT0SI',
          })}
          variant="secondary"
          onClick={onClose}
        />
      }
      title={intl.formatMessage({
        defaultMessage: 'You have more than 3 pinned submissions',
        description: 'Dialog title for pinned submission',
        id: 'Pn/2xP',
      })}
      width="screen-xl"
      onClose={onClose}>
      <div className="flex flex-col gap-8">
        <Text size="body2">
          <FormattedMessage
            defaultMessage="Unpin one or more existing submissions to pin a new one."
            description="Dialog subtitle for pinned submission"
            id="rZaG+f"
          />
        </Text>
        <Section>
          <div className="grid grid-cols-1 gap-3 md:grid-cols-2 md:gap-4 lg:grid-cols-3 lg:gap-6">
            {pinnedSubmissions.map((submission) => (
              <ProjectsChallengeSubmissionCard
                key={submission.id}
                challenge={submission.challenge}
                isPinned={!unpinnedSubmissionIds.includes(submission.id)}
                showPinButton={true}
                submission={submission}
                onUnpin={() => handleUnpin(submission.id)}
              />
            ))}
          </div>
        </Section>
      </div>
    </Dialog>
  );
}
