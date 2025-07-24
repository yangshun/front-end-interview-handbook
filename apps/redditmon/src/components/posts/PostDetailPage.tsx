'use client';

import { Button } from '@mantine/core';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import type { ChangeEvent } from 'react';
import toast from 'react-hot-toast';
import { RiArrowLeftLine } from 'react-icons/ri';

import { trpc } from '~/hooks/trpc';
import useCurrentProjectSlug from '~/hooks/useCurrentProjectSlug';

import PostDetail from '~/components/posts/PostList/PostDetail';

import type { PostExtended } from '~/types';

type Props = Readonly<{
  post: PostExtended;
  showBackButton?: boolean;
}>;

export default function PostDetailPage({ post, showBackButton = true }: Props) {
  const router = useRouter();
  const projectSlug = useCurrentProjectSlug();

  const generateResponseMutation =
    trpc.socialPosts.generateResponse.useMutation({
      onError() {
        toast.error('Something went wrong. Try again later.');
      },
      onSuccess() {
        router.refresh();
        toast.success('Response has been generated!');
      },
    });
  const { data: users } = trpc.socialUsers.getPlatformUsers.useQuery({
    projectSlug,
  });
  const replyPostMutation = trpc.socialPosts.replyToPost.useMutation({
    onError() {
      toast.error('Something went wrong. Try again later.');
    },
    onSuccess() {
      router.refresh();
      toast.success('You have replied to the post successfully!');
    },
  });

  async function generateResponse(
    setResponse: (value: ChangeEvent | string | null | undefined) => void,
  ) {
    const result = await generateResponseMutation.mutateAsync({
      post,
      projectSlug,
    });

    if (!result) {
      return;
    }

    setResponse(result.response);
  }

  async function replyToPost(response: string, redditUserId: string) {
    console.info('Replying to post:', post.title);

    await replyPostMutation.mutateAsync({
      id: post.id,
      projectSlug,
      redditUserId,
      response,
    });
  }

  return (
    <div className="flex h-full flex-col">
      {showBackButton && (
        <div className="px-4">
          <Button
            component={Link}
            href={`/projects/${projectSlug}`}
            leftSection={<RiArrowLeftLine className="size-4" />}
            ml={-10}
            size="xs"
            variant="subtle">
            Back to project
          </Button>
        </div>
      )}
      <div className="flex-1 overflow-y-auto p-4">
        <PostDetail
          generateResponse={(
            setResponse: (
              value: ChangeEvent | string | null | undefined,
            ) => void,
          ) => generateResponse(setResponse)}
          isGeneratingResponse={generateResponseMutation.isLoading}
          isReplying={replyPostMutation.isLoading}
          post={post}
          replyToPost={replyToPost}
          users={users}
        />
      </div>
    </div>
  );
}
