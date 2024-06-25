'use client';

import { type ChangeEvent } from 'react';

import { trpc } from '~/hooks/trpc';

import PostItem from './PostItem';

import '@mantine/core/styles.css';

import { Box, Text, Title } from '@mantine/core';

export default function PostList() {
  const { isLoading, data } = trpc.socialPosts.getUnrepliedPosts.useQuery();
  const generateResponseMutation =
    trpc.socialPosts.generateResponse.useMutation();
  const replyPostMutation = trpc.socialPosts.replyToPost.useMutation();

  async function generateResponse(
    postId: string,
    setResponse: (value: ChangeEvent | string | null | undefined) => void,
  ) {
    const postToGenerateResponseFor = data?.find((post) => post.id === postId);

    if (!postToGenerateResponseFor) {
      // TODO: Handle error
      return;
    }

    const response = await generateResponseMutation.mutateAsync({
      post: postToGenerateResponseFor,
    });

    if (!response) {
      // TODO: Handle error
      return;
    }

    postToGenerateResponseFor.response = response;
    setResponse(response);
  }

  async function replyToPost(postId: string, response: string | null) {
    const postToReplyTo = data?.find((post) => post.id === postId);

    if (!postToReplyTo) {
      // TODO: Handle error
      return;
    }

    console.info('Replying to post:', postToReplyTo.title);

    await replyPostMutation.mutateAsync({
      post: {
        ...postToReplyTo,
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
          ) => generateResponse(post.id, setResponse)}
          post={post}
          replyToPost={(response: string | null) =>
            replyToPost(post.id, response)
          }></PostItem>
      ))}
    </Box>
  );
}
