import { useUser } from '@supabase/auth-helpers-react';
import clsx from 'clsx';
import { BiSolidUpvote, BiUpvote } from 'react-icons/bi';

import { trpc } from '~/hooks/trpc';

import { useIntl } from '~/components/intl';
import Button from '~/components/ui/Button';
import { themeTextColor, themeTextSecondaryColor } from '~/components/ui/theme';

import type { CodingWorkspaceDiscussionsCommentItem } from './types';

type Props = Readonly<{
  comment: CodingWorkspaceDiscussionsCommentItem;
  count: number;
}>;

export default function CodingWorkspaceDiscussionsCommentVoteButton({
  comment,
  count,
}: Props) {
  const intl = useIntl();
  const user = useUser();
  const trpcUtils = trpc.useUtils();
  const voteCommentMutation = trpc.questionComments.vote.useMutation({
    onSuccess: () => {
      trpcUtils.questionComments.list.invalidate({
        domain: comment.domain,
        entityId: comment.entityId,
      });
      trpcUtils.questionComments.liked.invalidate({ commentId: comment.id });
    },
  });
  const unvoteCommentMutation = trpc.questionComments.unvote.useMutation({
    onSuccess: () => {
      trpcUtils.questionComments.list.invalidate({
        domain: comment.domain,
        entityId: comment.entityId,
      });
      trpcUtils.questionComments.liked.invalidate({ commentId: comment.id });
    },
  });
  const { data: hasLiked } = trpc.questionComments.liked.useQuery({
    commentId: comment.id,
  });
  const isLoggedIn = user != null;
  const hasVoted = hasLiked != null;

  const actionLabel =
    isLoggedIn && hasVoted
      ? intl.formatMessage({
          defaultMessage: 'Unvote',
          description: 'Vote button label',
          id: 'pjndkX',
        })
      : intl.formatMessage({
          defaultMessage: 'Upvote',
          description: 'Vote button label',
          id: 'bj5dJV',
        });
  const Icon = hasVoted ? BiSolidUpvote : BiUpvote;

  return (
    <Button
      addonPosition="start"
      aria-label={actionLabel}
      className={clsx(themeTextSecondaryColor, !isLoggedIn && 'cursor-text')}
      icon={Icon}
      iconClassName={hasVoted ? themeTextColor : themeTextSecondaryColor}
      label={String(count)}
      size="xs"
      tooltip={actionLabel}
      variant="tertiary"
      onClick={
        isLoggedIn
          ? () => {
              hasVoted
                ? unvoteCommentMutation.mutate({
                    commentId: comment.id,
                  })
                : voteCommentMutation.mutate({
                    commentId: comment.id,
                  });
            }
          : undefined
      }
    />
  );
}
