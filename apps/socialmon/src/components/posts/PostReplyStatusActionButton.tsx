import { ActionIcon, Button, Tooltip } from '@mantine/core';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { RiReplyLine } from 'react-icons/ri';

import { trpc } from '~/hooks/trpc';
import useCurrentProjectSlug from '~/hooks/useCurrentProjectSlug';

import KeyboardChar from '~/components/common/KeyboardChar';

import { PostRepliedStatus } from '~/prisma/client';

type Props = Readonly<{
  iconOnly?: boolean;
  postId: string;
  replyStatus: PostRepliedStatus;
}>;

export default function PostReplyStatusActionButton({
  iconOnly = false,
  postId,
  replyStatus,
}: Props) {
  const projectSlug = useCurrentProjectSlug();
  const router = useRouter();
  const utils = trpc.useUtils();
  const markPostReplyStatusMutation =
    trpc.socialPosts.markPostReplyStatus.useMutation();

  const onMarkPostReplyStatus = () => {
    const newStatus =
      replyStatus === PostRepliedStatus.NOT_REPLIED
        ? PostRepliedStatus.REPLIED_MANUALLY
        : PostRepliedStatus.NOT_REPLIED;

    markPostReplyStatusMutation.mutate(
      {
        postId,
        projectSlug,
        replyStatus: newStatus,
      },
      {
        onSuccess() {
          // Fast update for posts list (badge appears immediately)
          utils.socialPosts.getPosts.invalidate();
          // Comprehensive update for everything else (button text updates)
          router.refresh();
          toast.success(
            newStatus === PostRepliedStatus.REPLIED_MANUALLY
              ? 'Marked the post as replied successfully!'
              : 'Marked the post as not replied successfully!',
          );
        },
      },
    );
  };

  // Don't show button if post was replied via app
  if (replyStatus === PostRepliedStatus.REPLIED_VIA_APP) {
    return null;
  }

  const label =
    replyStatus === PostRepliedStatus.NOT_REPLIED
      ? 'Mark as replied'
      : 'Mark as not replied';

  if (iconOnly) {
    return (
      <Tooltip
        label={
          <>
            {label} <KeyboardChar char="R" />
          </>
        }
        withArrow={true}>
        <ActionIcon
          aria-label={label}
          color="orange"
          size="lg"
          variant={
            replyStatus === PostRepliedStatus.NOT_REPLIED ? 'default' : 'filled'
          }
          onClick={onMarkPostReplyStatus}>
          <RiReplyLine />
        </ActionIcon>
      </Tooltip>
    );
  }

  return (
    <Button
      aria-label={label}
      className="shrink-0"
      disabled={markPostReplyStatusMutation.isLoading}
      loading={markPostReplyStatusMutation.isLoading}
      size="xs"
      variant="subtle"
      onClick={onMarkPostReplyStatus}>
      {label}
    </Button>
  );
}
