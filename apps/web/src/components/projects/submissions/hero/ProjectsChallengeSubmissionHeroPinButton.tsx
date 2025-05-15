import type { ProjectsProfile } from '@prisma/client';
import { useState } from 'react';
import { RiPushpinLine, RiUnpinLine } from 'react-icons/ri';

import { trpc } from '~/hooks/trpc';

import { useToast } from '~/components/global/toasts/useToast';
import { FormattedMessage, useIntl } from '~/components/intl';
import type { ProjectsChallengeSubmissionAuthor } from '~/components/projects/submissions/types';
import Anchor from '~/components/ui/Anchor';
import Button from '~/components/ui/Button';

import ProjectsChallengeSubmissionPinned from './ProjectsChallengeSubmissionPinned';

type Props = Readonly<{
  projectsProfile:
    | (ProjectsProfile & {
        userProfile?: ProjectsChallengeSubmissionAuthor | null | undefined;
      })
    | null
    | undefined;
  submissionId: string;
}>;

export default function ProjectsChallengeSubmissionHeroPinButton({
  projectsProfile,
  submissionId,
}: Props) {
  const trpcUtils = trpc.useUtils();
  const intl = useIntl();
  const { showToast } = useToast();
  const [hasPinned, setHasPinned] = useState(false);
  const [pinnedSubmissionsCount, setPinnedSubmissionsCount] = useState(0);
  const [showPinnedSubmission, setShowPinnedSubmission] = useState(false);

  const has3Pinned = pinnedSubmissionsCount >= 3;

  const { data: pinnedSubmissions, isLoading } =
    trpc.projects.submissions.listPinned.useQuery(
      { projectsProfileId: projectsProfile?.id ?? '' },
      {
        onSuccess: (data) => {
          setHasPinned(data.some((pinItem) => pinItem.id === submissionId));
          setPinnedSubmissionsCount(data.length);
        },
      },
    );

  const showErrorToast = () => {
    showToast({
      title: (
        <FormattedMessage
          defaultMessage="Something went wrong. Try again later or contact <link>support@greatfrontend.com</link>!"
          description="Error toast for project"
          id="5Gjt4J"
          values={{
            link: (chunks) => (
              <Anchor href="mailto:support@greatfrontend.com">{chunks}</Anchor>
            ),
          }}
        />
      ),
      variant: 'danger',
    });
  };

  const pinSubmission = trpc.projects.submission.pin.useMutation({
    onError: () => {
      showErrorToast();
    },
    onSuccess: () => {
      setHasPinned(true);
      setPinnedSubmissionsCount((prevCount) => prevCount + 1);
      showToast({
        title: intl.formatMessage({
          defaultMessage: 'Submission pinned!',
          description: 'Submission pin toaster',
          id: 'ST/oVm',
        }),
        variant: 'success',
      });

      trpcUtils.projects.submissions.listPinned.invalidate();
    },
  });
  const unpinSubmission = trpc.projects.submission.unpin.useMutation({
    onError: () => {
      showErrorToast();
    },
    onSuccess: () => {
      setHasPinned(false);
      setPinnedSubmissionsCount((prevCount) => prevCount - 1);
      showToast({
        title: intl.formatMessage({
          defaultMessage: 'Submission successfully unpinned!',
          description: 'Submission unpin toaster',
          id: 'LKILl5',
        }),
        variant: 'success',
      });

      trpcUtils.projects.submissions.listPinned.invalidate();
    },
  });

  return (
    <>
      <Button
        addonPosition="end"
        icon={hasPinned ? RiUnpinLine : RiPushpinLine}
        isDisabled={
          isLoading || unpinSubmission.isLoading || pinSubmission.isLoading
        }
        isLoading={unpinSubmission.isLoading || pinSubmission.isLoading}
        label={
          hasPinned
            ? intl.formatMessage({
                defaultMessage: 'Unpin',
                description: 'Label for unpin submission button',
                id: 'RCdUk4',
              })
            : intl.formatMessage({
                defaultMessage: 'Pin',
                description: 'Label for pin submission button',
                id: '1NRSGb',
              })
        }
        size="sm"
        tooltip={
          hasPinned
            ? intl.formatMessage({
                defaultMessage: 'Unpin this submission',
                description: 'Tooltip for unpin submission button',
                id: '7ObNmA',
              })
            : intl.formatMessage({
                defaultMessage: 'Pin this submission',
                description: 'Tooltip for pin submission button',
                id: 'fO4Txx',
              })
        }
        variant={hasPinned ? 'danger' : 'secondary'}
        onClick={() =>
          hasPinned
            ? unpinSubmission.mutate({ submissionIds: [submissionId] })
            : has3Pinned
              ? setShowPinnedSubmission(true)
              : pinSubmission.mutate({ submissionId })
        }
      />
      {showPinnedSubmission && (
        <ProjectsChallengeSubmissionPinned
          isShown={showPinnedSubmission}
          pinnedSubmissions={pinnedSubmissions ?? []}
          setPinnedSubmissionsCount={setPinnedSubmissionsCount}
          onClose={() => setShowPinnedSubmission(false)}
        />
      )}
    </>
  );
}
