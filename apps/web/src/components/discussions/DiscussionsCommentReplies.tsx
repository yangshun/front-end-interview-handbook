import clsx from 'clsx';

import { themeElementBorderColor } from '~/components/ui/theme';

import DiscussionsComment from './DiscussionsComment';
import DiscussionsCommentRepliesThreadLines from './DiscussionsCommentRepliesThreadLines';
import type { DiscussionsCommentItem } from './types';

type Props = Readonly<{
  replies: ReadonlyArray<DiscussionsCommentItem>;
  viewer?: Readonly<{
    avatarUrl: string | null;
    id: string;
    name: string | null;
    title: string | null;
    username: string;
  }> | null;
}>;

export default function DiscussionsCommentReplies({ replies, viewer }: Props) {
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
            viewer={viewer}
          />
        </div>
      ))}
    </>
  );
}
