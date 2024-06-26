import clsx from 'clsx';

import PostMetadata from './PostMetadata';

import type { Post } from '~/types';

import '@mantine/core/styles.css';

import { Title } from '@mantine/core';

type Props = Readonly<{
  onClick: () => void;
  post: Post;
  selected?: boolean;
  showRepliedBadge?: boolean;
}>;

export default function PostItem({
  post,
  onClick,
  selected,
  showRepliedBadge,
}: Props) {
  return (
    <div
      className={clsx(
        'p-2',
        'rounded',
        'hover:bg-slate-100',
        'transition-all duration-200',
        'cursor-pointer',
        'flex flex-col gap-2',
        selected && 'bg-slate-200',
      )}
      onClick={onClick}>
      <Title order={5}>{post.title}</Title>
      <PostMetadata post={post} showRepliedBadge={showRepliedBadge} />
    </div>
  );
}
