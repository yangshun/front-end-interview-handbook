import { ActionIcon, Tooltip } from '@mantine/core';
import toast from 'react-hot-toast';
import { RiRefreshLine } from 'react-icons/ri';

import { trpc } from '~/hooks/trpc';
import useCurrentProjectSlug from '~/hooks/useCurrentProjectSlug';

export default function FetchPostButton() {
  const utils = trpc.useUtils();
  const projectSlug = useCurrentProjectSlug();
  const { isFetching, refetch } =
    trpc.socialPosts.getPostsFromPlatform.useQuery(
      { projectSlug },
      {
        enabled: false,
        onError() {
          toast.error('Something went wrong. Try again later.');
        },
        onSuccess() {
          toast.success('Fetched posts from the platform successfully!');
          utils.project.get.invalidate();
          utils.socialPosts.getPosts.invalidate();
        },
      },
    );

  return (
    <Tooltip
      label="Fetch posts from reddit"
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
