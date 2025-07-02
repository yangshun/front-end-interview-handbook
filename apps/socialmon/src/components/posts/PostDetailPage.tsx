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
}>;

export default function PostDetailPage({ post }: Props) {
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
    <div className="flex flex-col gap-2">
      <div>
        <Button
          component={Link}
          href={`/projects/${projectSlug}`}
          leftSection={<RiArrowLeftLine />}
          size="xs"
          variant="light">
          Back
        </Button>
      </div>
      <PostDetail
        generateResponse={(
          setResponse: (value: ChangeEvent | string | null | undefined) => void,
        ) => generateResponse(setResponse)}
        isGeneratingResponse={generateResponseMutation.isLoading}
        isReplying={replyPostMutation.isLoading}
        post={post}
        replyToPost={replyToPost}
        users={users}
      />
    </div>
  );
}
