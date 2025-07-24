import { ActionIcon, Button, Tooltip } from '@mantine/core';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { RiCheckLine } from 'react-icons/ri';

import { trpc } from '~/hooks/trpc';
import useCurrentProjectSlug from '~/hooks/useCurrentProjectSlug';

import ShortcutDisplay from '~/components/common/ShortcutDisplay';
import { useOptionalPostsContext } from '~/components/posts/PostsContext';

import { ShortcutAction } from '~/config/shortcuts';
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

  // Try to get context (undefined if not in PostsProvider)
  const context = useOptionalPostsContext();
  const { markPostRelevancy: contextMarkPostRelevancy } = context || {};

  const targetRelevancy =
    relevancy === PostRelevancy.IRRELEVANT
      ? PostRelevancy.RELEVANT
      : PostRelevancy.IRRELEVANT;

  const onMarkPostRelevancy = () => {
    if (contextMarkPostRelevancy) {
      // Use context method with auto-navigation (when in post list)
      contextMarkPostRelevancy(postId, targetRelevancy);
    } else {
      // Fall back to direct mutation (when in standalone post)
      markPostRelevancyMutation.mutate(
        {
          postId,
          projectSlug,
          relevancy: targetRelevancy,
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
    }
  };

  const label =
    relevancy === PostRelevancy.IRRELEVANT
      ? 'Mark as relevant'
      : 'Mark as irrelevant';

  if (iconOnly) {
    return (
      <Tooltip
        label={
          <>
            {label} <ShortcutDisplay action={ShortcutAction.TOGGLE_RELEVANCE} />
          </>
        }
        withArrow={true}>
        <ActionIcon
          aria-label={label}
          color="blue"
          size="lg"
          variant={
            relevancy === PostRelevancy.IRRELEVANT ? 'default' : 'filled'
          }
          onClick={onMarkPostRelevancy}>
          <RiCheckLine />
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
