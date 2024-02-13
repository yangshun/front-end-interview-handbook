import clsx from 'clsx';
import { useState } from 'react';
import { RiThumbUpFill } from 'react-icons/ri';
import { useIntl } from 'react-intl';

import { trpc } from '~/hooks/trpc';

import { useToast } from '~/components/global/toasts/ToastsProvider';
import Text from '~/components/ui/Text';
import {
  themeBackgroundLayerEmphasized,
  themeBorderElementColor,
  themeTextBrandColor,
  themeTextColor,
} from '~/components/ui/theme';

export default function ProjectsChallengeSubmissionHeroVoteButton({
  votes,
  submissionId,
}: {
  submissionId: string;
  votes: number;
}) {
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
    <button
      className={clsx(
        'flex items-center justify-center gap-1 py-2 px-3 rounded-2xl md:w-auto w-full',
        themeBackgroundLayerEmphasized,
        'border',
        hasVoted
          ? 'border-brand-dark dark:border-brand'
          : themeBorderElementColor,
      )}
      disabled={isLoading || vote.isLoading || unvote.isLoading}
      type="button"
      onClick={() =>
        hasVoted
          ? unvote.mutate({ submissionId })
          : vote.mutate({ submissionId })
      }>
      <RiThumbUpFill
        className={clsx(
          'size-4',
          'shrink-0',
          hasVoted ? themeTextBrandColor : themeTextColor,
        )}
      />
      <Text size="body3">{currentVotes}</Text>
    </button>
  );
}
