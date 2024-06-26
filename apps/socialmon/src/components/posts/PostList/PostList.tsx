'use client';

import { type ChangeEvent } from 'react';

import { trpc } from '~/hooks/trpc';

import PostItem from './PostItem';

import type { Post } from '~/types';

import '@mantine/core/styles.css';

import { Box, Text, Title } from '@mantine/core';

export default function PostList() {
  const { isLoading, data } = trpc.socialPosts.getUnrepliedPosts.useQuery();
  const generateResponseMutation =
    trpc.socialPosts.generateResponse.useMutation();
  const replyPostMutation = trpc.socialPosts.replyToPost.useMutation();

  async function generateResponse(
    post: Post,
    setResponse: (value: ChangeEvent | string | null | undefined) => void,
  ) {
    const result = await generateResponseMutation.mutateAsync({
      post,
    });

    if (!result) {
      // TODO: Handle error
      return;
    }

    setResponse(result.response);
  }

  async function replyToPost(post: Post, response: string | null) {
    console.info('Replying to post:', post.title);

    await replyPostMutation.mutateAsync({
      post: {
        ...post,
        replied: true,
        repliedAt: new Date(),
        response,
      },
    });
  }

  // TODO: tab for replied posts
  return (
    <Box m="lg">
      <Title mb="md" order={2}>
        Unreplied Posts for [Platform Name]
      </Title>
      <Text hidden={!isLoading} size="md">
        Loading...
      </Text>
      {data?.map((post) => (
        <PostItem
          key={post.id}
          generateResponse={(
            setResponse: (
              value: ChangeEvent | string | null | undefined,
            ) => void,
          ) => generateResponse(post, setResponse)}
          post={post}
          replyToPost={(response: string | null) => replyToPost(post, response)}
        />
      ))}
    </Box>
  );
}
