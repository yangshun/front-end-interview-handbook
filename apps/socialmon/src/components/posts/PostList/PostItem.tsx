import clsx from 'clsx';

import RelativeTimestamp from '~/components/common/datetime/RelativeTimestamp';

import type { Post } from '~/types';

import '@mantine/core/styles.css';

import { Text, Title } from '@mantine/core';

type Props = Readonly<{
  onClick: () => void;
  post: Post;
}>;

export default function PostItem({ post, onClick }: Props) {
  return (
    <div
      className={clsx(
        'p-2',
        'rounded',
        'hover:bg-slate-200',
        'transition-all duration-200',
        'cursor-pointer',
        'flex flex-col gap-2',
      )}
      onClick={onClick}>
      <Title order={5}>{post.title}</Title>
      <Text size="sm">
        <RelativeTimestamp timestamp={new Date(post.postedAt)} />
      </Text>
    </div>
  );
}
