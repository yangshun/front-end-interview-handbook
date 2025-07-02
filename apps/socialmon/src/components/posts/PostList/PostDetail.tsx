'use client';

import {
  Button,
  Divider,
  Flex,
  Group,
  Select,
  Text,
  Textarea,
  Title,
} from '@mantine/core';
import { useInputState } from '@mantine/hooks';
import clsx from 'clsx';
import { type ChangeEvent, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { RiChat4Line } from 'react-icons/ri';

import { trpc } from '~/hooks/trpc';

import type { PostExtended } from '~/types';

import PostCommentsList from '../comments/PostCommentsList';
import { parseMarkdown } from '../markdownParser';
import PostRelevancyActionButton from '../PostRelevancyActionButton';
import PostMetadata from './PostMetadata';
import PostResponse from './PostResponse';

type Props = Readonly<{
  generateResponse: (
    setter: (value: ChangeEvent | string | null | undefined) => void,
  ) => Promise<void>;
  isGeneratingResponse: boolean;
  isReplying: boolean;
  post: PostExtended;
  replyToPost: (response: string, redditUserId: string) => void;
  users?: Array<{ id: string; username: string }>;
}>;

export default function PostDetail({
  generateResponse,
  isGeneratingResponse,
  isReplying,
  post,
  replyToPost,
  users,
}: Props) {
  const [response, setResponse] = useInputState<string | null>(post.response);
  const [selectedRedditUserId, setSelectedRedditUserId] = useState<
    string | null
  >(null);
  const [postBody, setPostBody] = useState<string>('');

  const hasReply = !!post.reply;
  const activity = post.activities?.[0];

  const updatePostMutation = trpc.socialPosts.updatePost.useMutation();
  const { data, isLoading: isFetchingComments } =
    trpc.socialPosts.getPostComments.useQuery(
      {
        permalink: hasReply ? post.reply.permalink : post.permalink, // If has reply, instead fetch the reply and its replies
      },
      {
        onError: (error) => {
          toast.error(
            error.message || 'Something went wrong. Try again later.',
          );
        },
        onSuccess: (result) => {
          // To update the post with latest data
          const { post: latestPost } = result;

          updatePostMutation.mutate({
            data: {
              commentsCount: latestPost.commentsCount,
              content: latestPost.content,
              title: latestPost.title,
              upvoteCount: latestPost.upvoteCount,
            },
            postId: post.id,
          });
        },
        refetchOnMount: false,
      },
    );

  function handleReplyToPostButton() {
    if (response && selectedRedditUserId) {
      replyToPost(response, selectedRedditUserId);
    }
  }

  useEffect(() => {
    setPostBody(parseMarkdown(post.content)); // Set the sanitized content to state
  }, [post.content]);

  return (
    <div>
      <Flex direction="column" gap={2} justify="space-between" mb="xs">
        <Title order={2}>{post.title}</Title>
        <PostMetadata post={post} showViewPost={true} />
      </Flex>
      <Text size="sm">
        <div
          dangerouslySetInnerHTML={{
            __html: postBody,
          }}
          className="prose prose-sm max-w-none"
        />
      </Text>
      {!post.reply && (
        <>
          <Divider my="md" />
          <div className="mt-5 flex items-center justify-between gap-2">
            {activity && (
              <Text size="sm">
                {activity.action === 'MADE_IRRELEVANT'
                  ? 'Marked as irrelevant'
                  : 'Marked as relevant'}{' '}
                by <span className="font-bold">{activity.user.name}</span>
              </Text>
            )}
            <PostRelevancyActionButton
              key={post.relevancy}
              postId={post.id}
              relevancy={post.relevancy}
            />
          </div>
        </>
      )}
      <Divider my="md" />
      {/* Response */}
      {post.reply ? (
        <PostResponse
          comments={data?.comments}
          isFetchingComments={isFetchingComments}
          reply={post.reply}
        />
      ) : (users ?? [])?.length === 0 ? (
        <Text>
          No users added yet! Please add a user to comment on this post.
        </Text>
      ) : (
        <div className="flex flex-col gap-4">
          <Select
            checkIconPosition="right"
            data={users?.map((user) => ({
              label: user.username,
              value: user.id,
            }))}
            label="Select a user"
            placeholder="Select a user to add comment"
            value={selectedRedditUserId}
            onChange={(value) => setSelectedRedditUserId(value ?? null)}
          />
          <Textarea
            autosize={true}
            label="Response"
            placeholder="Generate or write your comment..."
            value={response === null ? '' : response}
            onChange={setResponse}
          />
          <Group justify="space-between" mb="xs" mt="md">
            <Button
              disabled={isGeneratingResponse}
              loading={isGeneratingResponse}
              onClick={() => generateResponse(setResponse)}>
              ✨ Generate Response
            </Button>
            <Button
              disabled={isReplying || !response || !selectedRedditUserId}
              loading={isReplying}
              onClick={handleReplyToPostButton}>
              Reply
            </Button>
          </Group>
        </div>
      )}
      {!hasReply && (
        <div className="mt-5 flex flex-col gap-3">
          {!!data?.comments.data.children.length && (
            <div className="flex items-center gap-1">
              <RiChat4Line className={clsx('size-6', 'text-slate-500')} />
              <Text size="md">{post.commentsCount} comments</Text>
            </div>
          )}
          <PostCommentsList
            comments={data?.comments}
            isFetchingComments={isFetchingComments}
          />
        </div>
      )}
    </div>
  );
}
