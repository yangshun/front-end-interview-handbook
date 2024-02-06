import { useState } from 'react';
import { RiArrowRightLine, RiPushpinLine } from 'react-icons/ri';
import { FormattedMessage, useIntl } from 'react-intl';

import { trpc } from '~/hooks/trpc';

import { useToast } from '~/components/global/toasts/ToastsProvider';
import type { ProjectsChallengeSubmissionAuthor } from '~/components/projects/submissions/types';
import Anchor from '~/components/ui/Anchor';
import Button from '~/components/ui/Button';
import Text from '~/components/ui/Text';

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
  const [has3Pinned, setHas3Pinned] = useState(false);

  const { isLoading } = trpc.projects.submissions.listPinned.useQuery(
    { projectsProfileId: projectsProfile?.id ?? '' },
    {
      onSuccess: (data) => {
        data.forEach((pinItem) => {
          if (pinItem.id === submissionId) {
            setHasPinned(true);
          }
        });
        if (data.length === 3) {
          setHas3Pinned(true);
        }
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

  const pin = trpc.projects.submissions.pin.useMutation({
    onError: () => {
      showErrorToast();
    },
    onSuccess: () => {
      setHasPinned(true);
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
  const unpin = trpc.projects.submissions.unpin.useMutation({
    onError: () => {
      showErrorToast();
    },
    onSuccess: () => {
      setHasPinned(false);
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

  return has3Pinned ? (
    <div>
      <Text size="body3" weight="medium">
        <FormattedMessage
          defaultMessage="Unpin some submissions to pin, <link>Manage</link>"
          description="Manage pin submission message"
          id="ih3LXL"
          values={{
            link: (chunks) => (
              <Anchor
                className="inline-flex gap-0.5 items-center"
                href={`/projects/u/${projectsProfile?.userProfile?.username}`}>
                {chunks}
                <RiArrowRightLine />
              </Anchor>
            ),
          }}
        />
      </Text>
    </div>
  ) : (
    <Button
      addonPosition="end"
      className=""
      icon={hasPinned ? undefined : RiPushpinLine}
      isDisabled={isLoading || unpin.isLoading || pin.isLoading}
      isLoading={unpin.isLoading || pin.isLoading}
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
      size="md"
      variant="secondary"
      onClick={() =>
        hasPinned
          ? unpin.mutate({ submissionId })
          : pin.mutate({ submissionId })
      }
    />
  );
}
