import clsx from 'clsx';
import { RiThumbUpFill } from 'react-icons/ri';

import { trpc } from '~/hooks/trpc';

import { useIntl } from '~/components/intl';
import Button from '~/components/ui/Button';
import {
  themeTextBrandColor,
  themeTextSubtleColor,
} from '~/components/ui/theme';

import { useProjectsOnboardingContext } from '../onboarding/ProjectsOnboardingContext';
import type { ProjectsDiscussionsCommentItem } from './types';

type Props = Readonly<{
  comment: ProjectsDiscussionsCommentItem;
  count: number;
}>;

export default function ProjectsDiscussionsCommentVoteButton({
  comment,
  count,
}: Props) {
  const intl = useIntl();
  const trpcUtils = trpc.useUtils();
  const { id: commentId } = comment;
  const { handleActionRequiringLogin } = useProjectsOnboardingContext();

  const voteCommentMutation = trpc.projects.comments.vote.useMutation({
    onSuccess: () => {
      trpcUtils.projects.comments.invalidate();
    },
  });
  const unvoteCommentMutation = trpc.projects.comments.unvote.useMutation({
    onSuccess: () => {
      trpcUtils.projects.comments.invalidate();
    },
  });

  const { data: likedComments } = trpc.projects.comments.liked.useQuery({
    domain: comment.domain,
    entityId: comment.entityId,
  });

  const hasVoted = likedComments?.includes(commentId);
  const actionLabel = hasVoted
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
        handleActionRequiringLogin({
          fn: () => {
            hasVoted
              ? unvoteCommentMutation.mutate({
                  commentId,
                })
              : voteCommentMutation.mutate({
                  commentId,
                });
          },
        });
      }}
    />
  );
}
