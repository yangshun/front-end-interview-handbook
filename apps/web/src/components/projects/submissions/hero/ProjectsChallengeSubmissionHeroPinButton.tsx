import { useState } from 'react';
import { RiPushpinLine, RiUnpinLine } from 'react-icons/ri';
import { FormattedMessage, useIntl } from 'react-intl';

import { trpc } from '~/hooks/trpc';

import { useToast } from '~/components/global/toasts/ToastsProvider';
import type { ProjectsChallengeSubmissionAuthor } from '~/components/projects/submissions/types';
import Anchor from '~/components/ui/Anchor';
import Button from '~/components/ui/Button';

import ProjectsChallengeSubmissionPinned from './ProjectsChallengeSubmissionPinned';

import type { ProjectsProfile } from '@prisma/client';

export default function ProjectsChallengeSubmissionHeroPinButton({
  submissionId,
  projectsProfile,
}: {
  projectsProfile:
    | (ProjectsProfile & {
        userProfile?: ProjectsChallengeSubmissionAuthor | null | undefined;
      })
    | null
    | undefined;
  submissionId: string;
}) {
  const intl = useIntl();
  const { showToast } = useToast();
  const [hasPinned, setHasPinned] = useState(false);
  const [pinnedSubmissionsCount, setPinnedSubmissionsCount] = useState(0);
  const [showPinnedSubmission, setShowPinnedSubmission] = useState(false);

  const has3Pinned = pinnedSubmissionsCount >= 3;

  const { isLoading, data: pinnedSubmissions } =
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
          defaultMessage: 'Submission successfully unpin!',
          description: 'Submission unpin toaster',
          id: '5wzYep',
        }),
        variant: 'success',
      });
    },
  });

  return (
    <>
      <Button
        addonPosition="end"
        className=""
        icon={hasPinned ? RiUnpinLine : RiPushpinLine}
        isDisabled={
          isLoading || unpinSubmission.isLoading || pinSubmission.isLoading
        }
        isLoading={unpinSubmission.isLoading || pinSubmission.isLoading}
        label={
          hasPinned
            ? intl.formatMessage({
                defaultMessage: 'Unpin submission',
                description: 'Label for unpin submission button',
                id: 'lWREsY',
              })
            : intl.formatMessage({
                defaultMessage: 'Pin submission',
                description: 'Label for pin submission button',
                id: 'sm2d2y',
              })
        }
        size="sm"
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
