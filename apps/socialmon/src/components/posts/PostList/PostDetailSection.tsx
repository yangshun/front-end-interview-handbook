import clsx from 'clsx';
import { type ChangeEvent } from 'react';

import { trpc } from '~/hooks/trpc';

import PostDetail from './PostDetail';

import type { Post } from '~/types';

import { Modal, Text, Title } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';

type Props = Readonly<{
  closeModal: () => void;
  openedModal: boolean;
  selectedPost: Post | null;
  setSelectedPost: (post: Post | null) => void;
}>;

export default function PostDetailSection({
  selectedPost,
  setSelectedPost,
  openedModal,
  closeModal,
}: Props) {
  const utils = trpc.useUtils();
  const isBelowDesktop = useMediaQuery('(max-width: 1023px)');
  const generateResponseMutation =
    trpc.socialPosts.generateResponse.useMutation({
      onSuccess() {
        utils.socialPosts.invalidate();
      },
    });
  const replyPostMutation = trpc.socialPosts.replyToPost.useMutation({
    onSuccess() {
      utils.socialPosts.invalidate();
      setSelectedPost(null);
    },
  });

  async function generateResponse(
    post: Post,
    setResponse: (value: ChangeEvent | string | null | undefined) => void,
  ) {
    const result = await generateResponseMutation.mutateAsync({
      post,
    });

    if (!result) {
      // TODO(socialmon): show toast
      return;
    }

    setResponse(result.response);
  }

  async function replyToPost(post: Post, response: string) {
    console.info('Replying to post:', post.title);

    await replyPostMutation.mutateAsync({
      postId: post.id,
      response,
    });
  }

  const postDetail = selectedPost && (
    <PostDetail
      key={selectedPost.id}
      generateResponse={(
        setResponse: (value: ChangeEvent | string | null | undefined) => void,
      ) => generateResponse(selectedPost, setResponse)}
      isGeneratingResponse={generateResponseMutation.isLoading}
      isReplying={replyPostMutation.isLoading}
      post={selectedPost}
      replyToPost={(response: string) => replyToPost(selectedPost, response)}
    />
  );

  return (
    <>
      <div
        className={clsx(
          'sticky top-0',
          'overflow-y-auto',
          'hidden lg:block lg:w-2/5',
          'p-6',
        )}>
        {!selectedPost && (
          <>
            <Title order={4}>Post Details</Title>
            <Text>Select a post to view details</Text>
          </>
        )}
        {postDetail}
      </div>

      {isBelowDesktop && selectedPost && (
        <Modal
          fullScreen={true}
          opened={openedModal}
          radius={0}
          title="Post Details"
          transitionProps={{ duration: 200, transition: 'fade' }}
          onClose={closeModal}>
          {postDetail}
        </Modal>
      )}
    </>
  );
}
