import { Text, Tooltip } from '@mantine/core';
import clsx from 'clsx';
import { RiChat4Fill, RiThumbUpFill } from 'react-icons/ri';

import { getRelativeTimestamp } from '~/components/common/datetime/relativeTimestampValues';

import type { PostExtended } from '~/types';

type Props = Readonly<{
  post: PostExtended;
}>;

export default function PostStats({ post }: Props) {
  const updatedTime = getRelativeTimestamp(new Date(post.statsUpdatedAt));

  return (
    <div className="flex flex-wrap items-center gap-4">
      <Tooltip label={`Upvote count updated ${updatedTime}`} withArrow={true}>
        <div className="flex items-center gap-1">
          <RiThumbUpFill className={clsx('size-4', 'text-slate-400')} />
          <Text c="dimmed" size="sm">
            {post.upvoteCount}
          </Text>
        </div>
      </Tooltip>
      <Tooltip label={`Comment count updated ${updatedTime}`} withArrow={true}>
        <div className="flex items-center gap-1">
          <RiChat4Fill className={clsx('size-4', 'text-slate-400')} />
          <Text c="dimmed" size="sm">
            {post.commentsCount}
          </Text>
        </div>
      </Tooltip>
    </div>
  );
}
