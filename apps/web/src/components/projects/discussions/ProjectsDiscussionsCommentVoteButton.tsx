import clsx from 'clsx';
import { RiThumbUpFill } from 'react-icons/ri';
import { useIntl } from 'react-intl';

import { trpc } from '~/hooks/trpc';

import Button from '~/components/ui/Button';
import {
  themeTextBrandColor,
  themeTextSubtleColor,
} from '~/components/ui/theme';

import type { ProjectsDiscussionsCommentItem } from './types';

type Props = Readonly<{
  comment: ProjectsDiscussionsCommentItem;
  count: number;
}>;

export default function ProjectsDiscussionsCommentVoteButton({
  comment,
  count,
}: Props) {
  const { id: commentId } = comment;
  const intl = useIntl();
  const voteCommentMutation = trpc.projects.comments.vote.useMutation();
  const unvoteCommentMutation = trpc.projects.comments.unvote.useMutation();

  const { data: likedComments } = trpc.projects.comments.liked.useQuery({
    domain: comment.domain,
    entityId: comment.entityId,
  });

  const hasVoted = likedComments?.includes(commentId);
  const actionLabel = hasVoted
    ? intl.formatMessage({
        defaultMessage: 'Unvote comment',
        description: 'Vote button label',
        id: 'Oc17My',
      })
    : intl.formatMessage({
        defaultMessage: 'Upvote comment',
        description: 'Vote button label',
        id: 'Ox+G1g',
      });

  return (
    <Button
      addonPosition="start"
      aria-label={actionLabel}
      className={clsx(
        hasVoted &&
          clsx(
            themeTextBrandColor,
            'border-transparent',
            'hover:bg-neutral-100 dark:hover:bg-neutral-900',
            'active:bg-neutral-200 dark:active:bg-neutral-800',
          ),
      )}
      icon={RiThumbUpFill}
      iconClassName={hasVoted ? undefined : themeTextSubtleColor}
      label={String(count)}
      tooltip={actionLabel}
      variant={hasVoted ? 'unstyled' : 'tertiary'}
      onClick={() => {
        hasVoted
          ? unvoteCommentMutation.mutate({
              commentId,
            })
          : voteCommentMutation.mutate({
              commentId,
            });
      }}
    />
  );
}
