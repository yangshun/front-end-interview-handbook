import toast from 'react-hot-toast';
import { RiRefreshLine } from 'react-icons/ri';

import { trpc } from '~/hooks/trpc';

import { ActionIcon, Tooltip } from '@mantine/core';

export default function FetchPostButton() {
  const utils = trpc.useUtils();
  const { isFetching, refetch } =
    trpc.socialPosts.getPostsFromPlatform.useQuery(undefined, {
      enabled: false,
      onError() {
        toast.error('Something went wrong. Try again later.');
      },
      onSuccess() {
        toast.success('Fetched posts from the platform successfully!');
        utils.socialPosts.getPosts.invalidate();
      },
    });

  return (
    <Tooltip
      label="Fetch posts from the platform"
      position="top-end"
      withArrow={true}>
      <ActionIcon
        loading={isFetching}
        variant="light"
        onClick={() => refetch()}>
        <RiRefreshLine />
      </ActionIcon>
    </Tooltip>
  );
}
