import { ActionIcon, Button, Tooltip } from '@mantine/core';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { RiCheckLine, RiForbidLine } from 'react-icons/ri';

import { trpc } from '~/hooks/trpc';
import useCurrentProjectSlug from '~/hooks/useCurrentProjectSlug';

import { PostRelevancy } from '~/prisma/client';
type Props = Readonly<{
  iconOnly?: boolean;
  postId: string;
  relevancy: PostRelevancy | null;
}>;

export default function PostRelevanceActionButton({
  iconOnly = false,
  postId,
  relevancy,
}: Props) {
  const projectSlug = useCurrentProjectSlug();
  const router = useRouter();
  const utils = trpc.useUtils();
  const markPostRelevancyMutation =
    trpc.socialPosts.markPostRelevancy.useMutation();

  const onMarkPostRelevancy = () => {
    markPostRelevancyMutation.mutate(
      {
        postId,
        projectSlug,
        relevancy:
          relevancy === PostRelevancy.IRRELEVANT
            ? PostRelevancy.RELEVANT
            : PostRelevancy.IRRELEVANT,
      },
      {
        onSuccess() {
          // Fast update for posts list (badge appears immediately)
          utils.socialPosts.getPosts.invalidate();
          // Comprehensive update for everything else (button text updates)
          router.refresh();
          toast.success(
            relevancy === PostRelevancy.IRRELEVANT
              ? 'Marked the post as relevant successfully!'
              : 'Marked the post as irrelevant successfully!',
          );
        },
      },
    );
  };

  const label =
    relevancy === PostRelevancy.IRRELEVANT
      ? 'Mark as relevant'
      : 'Mark as irrelevant';

  if (iconOnly) {
    return (
      <Tooltip label={label} withArrow={true}>
        <ActionIcon
          aria-label={label}
          size="lg"
          variant="default"
          onClick={onMarkPostRelevancy}>
          {relevancy === PostRelevancy.IRRELEVANT ? (
            <RiCheckLine />
          ) : (
            <RiForbidLine />
          )}
        </ActionIcon>
      </Tooltip>
    );
  }

  return (
    <Button
      aria-label={label}
      className="shrink-0"
      disabled={markPostRelevancyMutation.isLoading}
      loading={markPostRelevancyMutation.isLoading}
      size="xs"
      variant="subtle"
      onClick={onMarkPostRelevancy}>
      {label}
    </Button>
  );
}
