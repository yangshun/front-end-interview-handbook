'use client';

import { useEffect, useState } from 'react';

import { trpc } from '~/hooks/trpc';

import { type Post } from '~/models/Post';

import PostItem from './PostItem';

import '@mantine/core/styles.css';

import { Box, Text, Title } from '@mantine/core';

export default function PostList() {
  const [unrepliedPosts, setUnrepliedPosts] = useState<Array<Post>>([]);
  const { isLoading, data } =  trpc.socialPosts.getUnrepliedPosts.useQuery();
  const updatePostMutation = trpc.socialPosts.updatePost.useMutation();
  const replyPostMutation = trpc.socialPosts.replyToPost.useMutation();

  async function updatePost(postId: string, response: string | null) {
    const postToEdit = unrepliedPosts.find((post) => post.id === postId);

    if (!postToEdit) {
      // TODO: Handle error
      return;
    }

    const oldResponse = postToEdit.response;

    postToEdit.response = response;

    console.info('Updating post:', postToEdit.title);

    const success = await updatePostMutation.mutateAsync({post: postToEdit});

    console.info(success);

    if (!success) {
      // TODO: Handle error
      postToEdit.response = oldResponse;
    }
  }

  async function replyToPost(postId: string, response: string | null) {
    const postToReplyTo = unrepliedPosts.find((post) => post.id === postId);

    if (!postToReplyTo) {
      // TODO: Handle error
      return;
    }

    const oldResponse = postToReplyTo.response;

    postToReplyTo.response = response;
    postToReplyTo.replied = true;
    postToReplyTo.repliedAt = new Date();

    console.info('Replying to post:', postToReplyTo.title);

    const success = await replyPostMutation.mutateAsync({post: postToReplyTo});

    console.info(success);

    if (!success) {
      // TODO: handle error
      postToReplyTo.response = oldResponse;
      postToReplyTo.replied = false;
      postToReplyTo.repliedAt = null;
    }
  }

  function sortByPostDate(a: Post, b: Post) {
    return new Date(a.postedAt).getTime() - new Date(b.postedAt).getTime();
  }

  useEffect(() => {
    if (!data) {
      // Something went wrong(?)
      return;
    }

    const convertedPosts = data as unknown as Array<Post>;
    const sortedPosts = convertedPosts.sort(sortByPostDate);

    setUnrepliedPosts(sortedPosts);
  }, [data]);

  return (
    <Box m="lg">
      <Title mb="md" order={2}>
        Unreplied Posts for [Platform Name]
      </Title>
      <Text hidden={!isLoading} size="md">Loading...</Text>
      {unrepliedPosts.map((post) => (
        <PostItem
          key={post.id}
          editResponse={(response: string | null) =>
            updatePost(post.id, response)
          }
          post={post}
          replyToPost={(response: string | null) =>
            replyToPost(post.id, response)
          }></PostItem>
      ))}
    </Box>
  );
}
