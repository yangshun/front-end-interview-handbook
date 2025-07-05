import { Button } from '@mantine/core';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

import { trpc } from '~/hooks/trpc';
import useCurrentProjectSlug from '~/hooks/useCurrentProjectSlug';

import { PostRepliedStatus } from '~/prisma/client';

type Props = Readonly<{
  postId: string;
  replyStatus: PostRepliedStatus;
}>;

export default function PostReplyStatusActionButton({
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

  return (
    <Button
      className="shrink-0"
      disabled={markPostReplyStatusMutation.isLoading}
      loading={markPostReplyStatusMutation.isLoading}
      size="xs"
      variant="default"
      onClick={onMarkPostReplyStatus}>
      {replyStatus === PostRepliedStatus.NOT_REPLIED
        ? 'Mark as replied'
        : 'Mark as not replied'}
    </Button>
  );
}
