import { Button, Text } from '@mantine/core';
import Link from 'next/link';
import { RiArrowRightUpLine } from 'react-icons/ri';

import type { Comments, PostReplyExtended } from '~/types';

import PostCommentsList from '../comments/PostCommentsList';
import { redditPermalinkToUrl } from '../utils';

type Props = Readonly<{
  comments?: Comments | null;
  isFetchingComments: boolean;
  reply: PostReplyExtended;
}>;

export default function PostResponse({
  comments,
  isFetchingComments,
  reply,
}: Props) {
  return (
    <div className="flex flex-col gap-2">
      <div>
        <Text size="sm">Replied by: {reply.user.name}</Text>
        <div className="flex justify-between gap-2">
          <Text fw={600} size="md">
            Response
          </Text>
          <Button
            component={Link}
            href={redditPermalinkToUrl(reply.permalink)}
            rightSection={<RiArrowRightUpLine />}
            target="_blank"
            variant="subtle">
            View reply
          </Button>
        </div>
      </div>
      {/* Fallback to showing the stored reply if fetching reply failed */}
      {!isFetchingComments && !comments?.data?.children?.length ? (
        <PostCommentsList
          comments={{
            data: {
              children: [
                {
                  data: {
                    author: reply.redditUser.username,
                    body: reply.content,
                    created_utc: new Date(reply.createdAt).getTime() / 1000,
                    id: reply.id,
                    replies: '',
                    ups: 0,
                  },
                },
              ],
            },
          }}
          isFetchingComments={false}
        />
      ) : (
        <PostCommentsList
          comments={comments}
          isFetchingComments={isFetchingComments}
        />
      )}
    </div>
  );
}
