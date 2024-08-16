import clsx from 'clsx';
import { type ChangeEvent } from 'react';
import toast from 'react-hot-toast';

import { trpc } from '~/hooks/trpc';
import useCurrentProjectSlug from '~/hooks/useCurrentProjectSlug';

import PostDetail from './PostDetail';

import type { PostExtended } from '~/types';

import { Modal, Text, Title } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';

type Props = Readonly<{
  closeModal: () => void;
  openedModal: boolean;
  selectedPost: PostExtended | null;
  setSelectedPost: (post: PostExtended | null) => void;
}>;

export default function PostDetailSection({
  selectedPost,
  setSelectedPost,
  openedModal,
  closeModal,
}: Props) {
  const utils = trpc.useUtils();
  const projectSlug = useCurrentProjectSlug();
  const isBelowDesktop = useMediaQuery('(max-width: 1023px)');
  const generateResponseMutation =
    trpc.socialPosts.generateResponse.useMutation({
      onError() {
        toast.error('Something went wrong. Try again later.');
      },
      onSuccess() {
        utils.socialPosts.getPosts.invalidate();
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
      utils.socialPosts.getPosts.invalidate();
      setSelectedPost(null);
      toast.success('You have replied to the post successfully!');
    },
  });

  async function generateResponse(
    post: PostExtended,
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

  async function replyToPost(
    post: PostExtended,
    response: string,
    redditUserId: string,
  ) {
    console.info('Replying to post:', post.title);

    await replyPostMutation.mutateAsync({
      id: post.id,
      redditUserId,
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
      replyToPost={(response: string, redditUserId: string) =>
        replyToPost(selectedPost, response, redditUserId)
      }
      users={users}
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
