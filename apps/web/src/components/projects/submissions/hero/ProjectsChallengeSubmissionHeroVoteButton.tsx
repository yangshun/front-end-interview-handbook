import clsx from 'clsx';
import { RiThumbUpFill } from 'react-icons/ri';

import { trpc } from '~/hooks/trpc';

import FilterButton from '~/components/common/FilterButton';
import { useToast } from '~/components/global/toasts/useToast';
import { useIntl } from '~/components/intl';

import { useI18nRouter } from '~/next-i18nostic/src';

type Props = Readonly<{
  disabled?: boolean;
  submissionId: string;
  votes: number;
}>;

export default function ProjectsChallengeSubmissionHeroVoteButton({
  votes,
  submissionId,
  disabled = false,
}: Props) {
  const { showToast } = useToast();
  const intl = useIntl();
  const router = useI18nRouter();

  const { data: viewerVote, isLoading } =
    trpc.projects.submission.hasVoted.useQuery({
      submissionId,
    });

  const vote = trpc.projects.submission.vote.useMutation({
    onSuccess: () => {
      // Refresh number of votes by refetching from the server.
      router.refresh();
      showToast({
        title: intl.formatMessage({
          defaultMessage: 'Upvoted successfully!',
          description: 'Successful upvote toaster',
          id: 'mGYl8O',
        }),
        variant: 'success',
      });
    },
  });
  const unvote = trpc.projects.submission.unvote.useMutation({
    onSuccess: () => {
      // Refresh number of votes by refetching from the server.
      router.refresh();
    },
  });

  const viewerUpvoted = viewerVote != null;

  return (
    <FilterButton
      className={clsx(
        ' flex-1 md:flex-none',
        'dark:!bg-neutral-800 dark:md:!bg-neutral-900',
      )}
      icon={RiThumbUpFill}
      isDisabled={isLoading || vote.isLoading || unvote.isLoading || disabled}
      label={String(votes)}
      purpose="button"
      selected={viewerUpvoted}
      tooltip={
        viewerUpvoted
          ? intl.formatMessage({
              defaultMessage: 'You upvoted this',
              description: 'Tooltip for upvoted submission button',
              id: 'soQjY2',
            })
          : intl.formatMessage({
              defaultMessage: 'Upvote this submission',
              description: 'Tooltip for Upvote submission button',
              id: '3cNSBC',
            })
      }
      onClick={() =>
        viewerUpvoted
          ? unvote.mutate({ submissionId })
          : vote.mutate({ submissionId })
      }
    />
  );
}
