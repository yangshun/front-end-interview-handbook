import { Text, Tooltip } from '@mantine/core';
import clsx from 'clsx';
import { PiArrowFatDownBold, PiArrowFatUpBold } from 'react-icons/pi';

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
        <div
          className={clsx(
            'flex items-center gap-1',
            'px-2 py-1',
            'rounded-full',
            'bg-slate-200',
          )}>
          <PiArrowFatUpBold className={clsx('size-4', 'text-slate-600')} />
          <Text className="text-slate-600" fw={600} size="xs">
            {post.upvoteCount}
          </Text>
          <PiArrowFatDownBold className={clsx('size-4', 'text-slate-600')} />
        </div>
      </Tooltip>
      <Tooltip label={`Comment count updated ${updatedTime}`} withArrow={true}>
        <div className="flex items-center gap-1">
          <Text c="dimmed" size="xs">
            {post.commentsCount}{' '}
            {post.commentsCount === 1 ? 'comment' : 'comments'}
          </Text>
        </div>
      </Tooltip>
    </div>
  );
}
