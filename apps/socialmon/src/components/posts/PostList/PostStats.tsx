import clsx from 'clsx';
import { RiChat4Fill, RiThumbUpFill } from 'react-icons/ri';

import { getRelativeTimestamp } from '~/components/common/datetime/relativeTimestampValues';

import type { PostExtended } from '~/types';

import { Text, Tooltip } from '@mantine/core';

type Props = Readonly<{
  post: PostExtended;
}>;

export default function PostStats({ post }: Props) {
  const updatedTime = getRelativeTimestamp(new Date(post.statsUpdatedAt));

  return (
    <div className="flex flex-wrap items-center gap-2">
      <Tooltip label={`Upvote count updated ${updatedTime}`} withArrow={true}>
        <div className="flex items-center gap-1">
          <RiThumbUpFill className={clsx('size-4', 'text-slate-500')} />
          <Text size="sm">{post.upvoteCount}</Text>
        </div>
      </Tooltip>

      <div className="h-1 w-1 rounded-full bg-slate-600" />

      <Tooltip label={`Comment count updated ${updatedTime}`} withArrow={true}>
        <div className="flex items-center gap-1">
          <RiChat4Fill className={clsx('size-4', 'text-slate-500')} />
          <Text size="sm">{post.commentsCount}</Text>
        </div>
      </Tooltip>
    </div>
  );
}
