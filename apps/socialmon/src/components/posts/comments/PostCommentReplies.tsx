import clsx from 'clsx';

import type { Comments } from '~/types';

import CommentRepliesThreadLines from './CommentRepliesThreadLines';
import PostComments from './PostComment';

type Props = Readonly<{
  level: number;
  replies: Comments;
}>;

export default function PostCommentReplies({ level, replies }: Props) {
  return (
    <>
      {replies.data.children.map((comment, index) => (
        <div key={comment.data.id} className="relative flex w-full">
          <CommentRepliesThreadLines
            branchHeightClass="h-7"
            drawVerticalLine={index < replies.data.children.length - 1}
          />
          <PostComments
            className={clsx(index < replies.data.children.length - 1 && 'pb-6')}
            comment={comment.data}
            level={level}
          />
        </div>
      ))}
    </>
  );
}
