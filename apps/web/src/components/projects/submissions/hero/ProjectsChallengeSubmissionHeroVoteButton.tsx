import { useState } from 'react';
import { RiThumbUpFill } from 'react-icons/ri';
import { useIntl } from 'react-intl';

import { trpc } from '~/hooks/trpc';

import FilterButton from '~/components/common/FilterButton';
import { useToast } from '~/components/global/toasts/useToast';

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

  const { isLoading } = trpc.projects.submission.hasVoted.useQuery(
    {
      submissionId,
    },
    {
      onSuccess: (data) => {
        setHasVoted(!!data);
      },
    },
  );

  const [currentVotes, setCurrentVotes] = useState(votes);
  const [hasVoted, setHasVoted] = useState(false);

  // TODO(projects): refetch submission instead of maintaining local state.
  const vote = trpc.projects.submission.vote.useMutation({
    onError: () => {
      setCurrentVotes((prevVotes) => prevVotes - 1);
      setHasVoted(false);
    },
    onMutate: () => {
      setCurrentVotes((prevVotes) => prevVotes + 1);
      setHasVoted(true);
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
    onError: () => {
      setCurrentVotes((prevVotes) => prevVotes + 1);
      setHasVoted(true);
    },
    onMutate: () => {
      setCurrentVotes((prevVotes) => prevVotes - 1);
      setHasVoted(false);
    },
  });

  return (
    <FilterButton
      icon={RiThumbUpFill}
      isDisabled={isLoading || vote.isLoading || unvote.isLoading}
      label={String(currentVotes)}
      purpose="button"
      selected={hasVoted}
      onClick={() =>
        hasVoted
          ? unvote.mutate({ submissionId })
          : vote.mutate({ submissionId })
      }
    />
  );
}
