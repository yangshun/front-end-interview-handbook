import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

import { trpc } from '~/hooks/trpc';
import useCurrentProjectSlug from '~/hooks/useCurrentProjectSlug';

import { PostRelevancy } from '~/prisma/client';

import { Button } from '@mantine/core';
type Props = Readonly<{
  postId: string;
  relevancy: PostRelevancy | null;
}>;

export default function PostRelevancyActionButton({
  postId,
  relevancy,
}: Props) {
  const projectSlug = useCurrentProjectSlug();
  const router = useRouter();
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

  return (
    <Button
      className="shrink-0"
      disabled={markPostRelevancyMutation.isLoading}
      loading={markPostRelevancyMutation.isLoading}
      size="xs"
      onClick={onMarkPostRelevancy}>
      {relevancy === PostRelevancy.IRRELEVANT
        ? 'Mark as relevant'
        : 'Mark as irrelevant'}
    </Button>
  );
}
