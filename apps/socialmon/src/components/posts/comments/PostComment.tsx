import { ActionIcon, Anchor, Avatar, Button, Text } from '@mantine/core';
import clsx from 'clsx';
import { useState } from 'react';
import {
  RiAddCircleLine,
  RiIndeterminateCircleLine,
  RiThumbUpFill,
} from 'react-icons/ri';

import RelativeTimestamp from '~/components/common/datetime/RelativeTimestamp';

import type { Comment } from '~/types';

import { parseMarkdown } from '../markdownParser';
import { isRedditComments } from '../utils';
import CommentRepliesThreadLines from './CommentRepliesThreadLines';
import PostCommentReplies from './PostCommentReplies';

type Props = Readonly<{
  className?: string;
  comment: Comment;
  level: number;
}>;

export default function PostComment({ className, comment, level }: Props) {
  const {
    author,
    body,
    created_utc,
    id: commentId,
    replies,
    ups: upvoteCount,
  } = comment;
  const replyCount = isRedditComments(replies)
    ? replies.data.children.length
    : 0;
  const hasReplies = replyCount > 0;

  const [showReplies, setShowReplies] = useState(false);

  const content = parseMarkdown(body);

  return (
    <div className={clsx('flex grow flex-col', className)} id={commentId}>
      <div className="flex items-start gap-4">
        <div className="relative flex flex-col items-center self-stretch">
          <Avatar radius="xl" size="md" />
          {hasReplies && (
            <div
              className={clsx(
                'h-full w-px flex-1 border-l',
                'border-neutral-300',
              )}
            />
          )}
          {showReplies && hasReplies && (
            <>
              <div className={clsx('absolute bottom-8 h-4 w-4', 'bg-white')} />
              <div className="absolute bottom-6 self-center">
                <ActionIcon
                  aria-label="Label for hide replies"
                  radius="xl"
                  variant="transparent"
                  onClick={() => {
                    setShowReplies(false);
                  }}>
                  <RiIndeterminateCircleLine />
                </ActionIcon>
              </div>
            </>
          )}
        </div>
        <div
          className={clsx(
            'flex flex-1 flex-col items-start gap-3',
            'mt-2.5',
            hasReplies && 'pb-6',
          )}>
          <div className="flex gap-3">
            <Text size="sm">
              <Anchor
                fw={500}
                href={`https://www.reddit.com/user/${author}`}
                rel="noopener noreferrer"
                target="_blank">
                {author}
              </Anchor>
              {' · '}
              <RelativeTimestamp timestamp={new Date(created_utc * 1000)} />
            </Text>
          </div>
          <Text size="sm">
            <span
              dangerouslySetInnerHTML={{ __html: content }}
              className="prose prose-sm"
            />
          </Text>
          <div>
            <div className="flex items-center gap-1">
              <RiThumbUpFill className={clsx('size-4', 'text-slate-500')} />
              <Text size="sm">{upvoteCount}</Text>
            </div>
          </div>
        </div>
      </div>

      {hasReplies &&
        (showReplies && isRedditComments(replies) ? (
          <PostCommentReplies level={level + 1} replies={replies} />
        ) : (
          <div className="flex">
            <CommentRepliesThreadLines branchHeightClass="h-5 -translate-y-1" />
            <Button
              className="-ms-3.5 -mt-3"
              leftSection={<RiAddCircleLine />}
              radius="lg"
              size="sm"
              variant="transparent"
              onClick={() => {
                setShowReplies(true);
              }}>
              Show replies
            </Button>
          </div>
        ))}
    </div>
  );
}
