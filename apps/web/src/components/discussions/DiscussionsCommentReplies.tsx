import clsx from 'clsx';

import DiscussionsComment from './DiscussionsComment';
import DiscussionsCommentRepliesThreadLines from './DiscussionsCommentRepliesThreadLines';
import type {
  DiscussionsCommentItem,
  DiscussionsCommentUserProfile,
} from './types';

type Props = Readonly<{
  level: number;
  replies: ReadonlyArray<DiscussionsCommentItem>;
  viewer?: DiscussionsCommentUserProfile | null;
}>;

export default function DiscussionsCommentReplies({
  level,
  replies,
  viewer,
}: Props) {
  return (
    <>
      {replies.map((comment, index) => (
        <div key={comment.id} className="relative flex w-full">
          <DiscussionsCommentRepliesThreadLines
            branchHeightClass="h-7"
            drawVerticalLine={index < replies.length - 1}
          />
          <DiscussionsComment
            className={clsx(index < replies.length - 1 && 'pb-6')}
            comment={comment}
            level={level}
            viewer={viewer}
          />
        </div>
      ))}
    </>
  );
}
