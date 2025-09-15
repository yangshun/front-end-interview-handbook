import { InterviewsDiscussionCommentDomain } from '@prisma/client';
import { useUser } from '@supabase/auth-helpers-react';
import clsx from 'clsx';

import RelativeTimestamp from '~/components/common/datetime/RelativeTimestamp';
import { FormattedMessage } from '~/components/intl';
import Anchor from '~/components/ui/Anchor';
import Avatar from '~/components/ui/Avatar';
import RichText from '~/components/ui/RichTextEditor/RichText';
import Text from '~/components/ui/Text';
import { themeTextColor } from '~/components/ui/theme';

import type {
  InterviewsActivityExtended,
  InterviewsCommentActivity,
  InterviewsUpvoteActivity,
} from './types';

type Props = Readonly<{
  activity: InterviewsActivityExtended;
  variant?: 'full' | 'minimal';
}>;

export default function InterviewsActivityItem({
  activity,
  variant = 'full',
}: Props) {
  const { actor, createdAt, question } = activity;

  return (
    <div
      className={clsx(
        'relative flex gap-x-3',
        'px-4 py-5',
        'transition-colors',
        'hover:bg-neutral-50 dark:hover:bg-neutral-800/40',
      )}>
      <Anchor className="absolute inset-0" href={question.href} />
      <Avatar
        alt={actor.name ?? actor.username}
        size="xs"
        src={actor.avatarUrl ?? ''}
      />
      <div className="space-y-4">
        <Text color="secondary" size={variant === 'full' ? 'body2' : 'body3'}>
          {activity.category === 'DISCUSSION_UPVOTE' ? (
            <UpvoteActivityMessage activity={activity} />
          ) : (
            <CommentActivityMessage activity={activity} />
          )}
          {` • `}
          <RelativeTimestamp timestamp={createdAt} />
        </Text>
        <RichText
          className={clsx(variant === 'minimal' && 'text-xs')}
          color="body"
          size={variant === 'full' ? 'sm' : 'custom'}
          value={
            activity.category === 'DISCUSSION_UPVOTE'
              ? activity.vote.comment.body
              : activity.comment.body
          }
        />
      </div>
    </div>
  );
}

function CommentActivityMessage({
  activity,
}: Readonly<{
  activity: InterviewsCommentActivity;
}>) {
  const user = useUser();
  const { comment, question } = activity;
  const bold = (chunks: React.ReactNode) => (
    <Text size="inherit" weight="medium">
      {chunks}
    </Text>
  );
  const questionLink = (chunks: React.ReactNode) => (
    <Anchor
      className={clsx('relative', themeTextColor)}
      href={question.href}
      variant="flat">
      {chunks}
    </Anchor>
  );

  // Check if the current user is the actor of the activity
  if (user?.id === activity.actorId) {
    if (comment.parentComment != null) {
      // User commented on their own reply
      if (
        comment.parentComment.author.id === activity.actorId ||
        comment.repliedTo?.author.id === activity.actorId
      ) {
        return (
          <FormattedMessage
            defaultMessage="<bold>You</bold> replied to your comment on <questionLink>{questionTitle}</questionLink>"
            description="Activity message for commenting on own reply"
            id="GVJ/Mh"
            values={{
              bold,
              questionLink,
              questionTitle: getQuestionTitle(
                activity.question.title,
                activity.comment.domain,
              ),
            }}
          />
        );
      }

      // User commented on others reply
      return (
        <FormattedMessage
          defaultMessage="<bold>You</bold> replied to <bold>{recipientName}</bold>'s comment on <questionLink>{questionTitle}</questionLink>"
          description="Activity message for commenting on others reply"
          id="PDrcW2"
          values={{
            bold,
            questionLink,
            questionTitle: getQuestionTitle(
              activity.question.title,
              activity.comment.domain,
            ),
            recipientName: comment.repliedTo
              ? comment.repliedTo.author.name ??
                comment.repliedTo.author.username
              : comment.parentComment.author.name ??
                comment.parentComment.author.username,
          }}
        />
      );
    }

    // User left a comment
    return (
      <FormattedMessage
        defaultMessage="<bold>You</bold> left a comment on <questionLink>{questionTitle}</questionLink>"
        description="Activity message for commenting on own comment"
        id="IKmNeN"
        values={{
          bold,
          questionLink,
          questionTitle: getQuestionTitle(
            activity.question.title,
            activity.comment.domain,
          ),
        }}
      />
    );
  }

  // Other commented on user's reply
  if (comment.parentCommentId != null) {
    return (
      <FormattedMessage
        defaultMessage="<bold>{actorName}</bold> replied to your comment on <questionLink>{questionTitle}</questionLink>"
        description="Activity message for replying to someone else's reply"
        id="tRaX9t"
        values={{
          actorName: activity.actor.name ?? activity.actor.username,
          bold,
          questionLink,
          questionTitle: getQuestionTitle(
            activity.question.title,
            activity.comment.domain,
          ),
        }}
      />
    );
  }

  // Other commented on user's comment
  return (
    <FormattedMessage
      defaultMessage="<bold>{actorName}</bold> replied to your comment on <questionLink>{questionTitle}</questionLink>"
      description="Activity message for replying to someone else's comment"
      id="mO2nTD"
      values={{
        actorName: activity.actor.name ?? activity.actor.username,
        bold,
        questionLink,
        questionTitle: getQuestionTitle(
          activity.question.title,
          activity.comment.domain,
        ),
      }}
    />
  );
}

function UpvoteActivityMessage({
  activity,
}: Readonly<{ activity: InterviewsUpvoteActivity }>) {
  const user = useUser();
  const { question, vote } = activity;
  const { comment } = vote;
  const bold = (chunks: React.ReactNode) => (
    <Text size="inherit" weight="medium">
      {chunks}
    </Text>
  );
  const questionLink = (chunks: React.ReactNode) => (
    <Anchor className={themeTextColor} href={question.href} variant="flat">
      {chunks}
    </Anchor>
  );

  // Check if the current user is the actor of the activity
  if (user?.id === activity.actorId) {
    if (comment.parentCommentId != null) {
      // User upvoted their own reply
      if (comment.author.id === activity.actorId) {
        return (
          <FormattedMessage
            defaultMessage="<bold>You</bold> upvoted your reply on <questionLink>{questionTitle}</questionLink>"
            description="Activity message for upvoting own reply"
            id="1Gm4Mr"
            values={{
              bold,
              questionLink,
              questionTitle: getQuestionTitle(
                activity.question.title,
                activity.vote.comment.domain,
              ),
            }}
          />
        );
      }

      // User upvoted to others reply
      return (
        <FormattedMessage
          defaultMessage="<bold>You</bold> upvoted <bold>{recipientName}</bold>'s reply on <questionLink>{questionTitle}</questionLink>"
          description="Activity message for upvoting others reply"
          id="ZvWM/t"
          values={{
            bold,
            questionLink,
            questionTitle: getQuestionTitle(
              activity.question.title,
              activity.vote.comment.domain,
            ),
            recipientName: comment.author.name ?? comment.author.username,
          }}
        />
      );
    }

    // User upvoted their own comment
    if (comment.author.id === activity.actorId) {
      return (
        <FormattedMessage
          defaultMessage="<bold>You</bold> upvoted your comment on <questionLink>{questionTitle}</questionLink>"
          description="Activity message for upvoting own comment"
          id="CxKzGg"
          values={{
            bold,
            questionLink,
            questionTitle: getQuestionTitle(
              activity.question.title,
              activity.vote.comment.domain,
            ),
          }}
        />
      );
    }

    return (
      <FormattedMessage
        defaultMessage="<bold>You</bold> upvoted <bold>{recipientName}</bold>'s comment on <questionLink>{questionTitle}</questionLink>"
        description="Activity message for upvoting others comment"
        id="ulVzMu"
        values={{
          bold,
          questionLink,
          questionTitle: getQuestionTitle(
            activity.question.title,
            activity.vote.comment.domain,
          ),
          recipientName: comment.author.name ?? comment.author.username,
        }}
      />
    );
  }
  // Other upvoted user's reply
  if (activity.vote.comment.parentCommentId != null) {
    return (
      <FormattedMessage
        defaultMessage="<bold>{actorName}</bold> upvoted your reply on <questionLink>{questionTitle}</questionLink>"
        description="Activity message for upvoting someone else's reply"
        id="bErRk/"
        values={{
          actorName: activity.actor.name ?? activity.actor.username,
          bold,
          questionLink,
          questionTitle: getQuestionTitle(
            activity.question.title,
            activity.vote.comment.domain,
          ),
        }}
      />
    );
  }

  // Other upvoted user's comment
  return (
    <FormattedMessage
      defaultMessage="<bold>{actorName}</bold> upvoted your comment on <questionLink>{questionTitle}</questionLink>"
      description="Activity message for upvoting someone else's comment"
      id="QfATOE"
      values={{
        actorName: activity.actor.name ?? activity.actor.username,
        bold,
        questionLink,
        questionTitle: getQuestionTitle(
          activity.question.title,
          activity.vote.comment.domain,
        ),
      }}
    />
  );
}

function getQuestionTitle(
  title: string,
  domain: InterviewsDiscussionCommentDomain,
) {
  if (domain === InterviewsDiscussionCommentDomain.OFFICIAL_SOLUTION) {
    return `${title} (Official solution)`;
  }

  return title;
}
