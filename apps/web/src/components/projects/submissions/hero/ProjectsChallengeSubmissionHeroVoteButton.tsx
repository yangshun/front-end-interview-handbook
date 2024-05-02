import { RiThumbUpFill } from 'react-icons/ri';
import { useIntl } from 'react-intl';

import { trpc } from '~/hooks/trpc';

import FilterButton from '~/components/common/FilterButton';
import { useToast } from '~/components/global/toasts/useToast';

import { useI18nRouter } from '~/next-i18nostic/src';

type Props = Readonly<{
  submissionId: string;
  votes: number;
}>;

export default function ProjectsChallengeSubmissionHeroVoteButton({
  votes,
  submissionId,
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
      className="flex-1 md:flex-none"
      icon={RiThumbUpFill}
      isDisabled={isLoading || vote.isLoading || unvote.isLoading}
      label={String(votes)}
      purpose="button"
      selected={viewerUpvoted}
      tooltip={
        viewerUpvoted
          ? intl.formatMessage({
              defaultMessage: 'Unvote this submission',
              description: 'Tooltip for Like submission button',
              id: 'uBy1d5',
            })
          : intl.formatMessage({
              defaultMessage: 'Upvote this submission',
              description: 'Tooltip for Like submission button',
              id: 'F2XjBS',
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
