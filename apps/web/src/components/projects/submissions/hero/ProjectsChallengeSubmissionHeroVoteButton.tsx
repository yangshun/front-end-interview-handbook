import clsx from 'clsx';
import { useState } from 'react';
import { RiThumbUpFill } from 'react-icons/ri';
import { useIntl } from 'react-intl';

import { trpc } from '~/hooks/trpc';

import { useToast } from '~/components/global/toasts/ToastsProvider';
import Text from '~/components/ui/Text';
import {
  themeBackgroundLayerEmphasized,
  themeElementBorderColor,
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
  const [currentVotes, setCurrentVotes] = useState(votes);
  const [hasVoted, setHasVoted] = useState(false);

  const { isLoading } = trpc.projects.submissions.hasVoted.useQuery(
    {
      submissionId,
    },
    {
      onSuccess: (data) => {
        setHasVoted(!!data);
      },
    },
  );

  // Optimistic update
  const vote = trpc.projects.submissions.vote.useMutation({
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

  return (
    <button
      className={clsx(
        'flex items-center justify-center gap-1 py-2 px-3 rounded-2xl border md:w-auto w-full',
        themeBackgroundLayerEmphasized,
        themeElementBorderColor,
      )}
      disabled={isLoading || hasVoted}
      type="button"
      onClick={() => vote.mutate({ submissionId })}>
      <RiThumbUpFill
        className={clsx(
          'h-4 w-4',
          !hasVoted && themeTextColor,
          hasVoted && themeTextBrandColor,
        )}
      />
      <Text size="body3">{currentVotes}</Text>
    </button>
  );
}
