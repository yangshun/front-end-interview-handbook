import { Text } from '@mantine/core';

import type { Comments } from '~/types';

import PostComment from './PostComment';

type Props = Readonly<{
  comments?: Comments | null;
  isFetchingComments: boolean;
}>;

const MAX_COMMENTS = 50;

export default function PostCommentsList({
  comments,
  isFetchingComments,
}: Props) {
  if (isFetchingComments) {
    return (
      <div className="w-full text-center">
        <Text size="md">Loading comments...</Text>
      </div>
    );
  }
  if (!comments || comments.data.children.length === 0) {
    return null;
  }

  return (
    <div className="flex flex-col gap-2">
      {comments.data.children.slice(0, MAX_COMMENTS).map((comment) => (
        <PostComment key={comment.data.id} comment={comment.data} level={1} />
      ))}
    </div>
  );
}
