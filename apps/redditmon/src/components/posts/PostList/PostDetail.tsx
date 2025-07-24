'use client';

import {
  Anchor,
  Button,
  Divider,
  Flex,
  Group,
  Select,
  Stack,
  Text,
  Textarea,
  Title,
  Tooltip,
} from '@mantine/core';
import { useInputState } from '@mantine/hooks';
import { type ChangeEvent, useEffect, useState } from 'react';
import toast from 'react-hot-toast';

import { trpc } from '~/hooks/trpc';

import type { PostExtended } from '~/types';

import { parseMarkdown } from '../../common/ParseMarkdown';
import PostCommentsList from '../comments/PostCommentsList';
import PostRelevanceActionButton from '../PostRelevanceActionButton';
import PostReplyStatusActionButton from '../PostReplyStatusActionButton';
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

  // Find the most recent activity for each type
  const relevancyActivity = post.activities?.find(
    (a) => a.action === 'MADE_RELEVANT' || a.action === 'MADE_IRRELEVANT',
  );

  const replyActivity = post.activities?.find(
    (a) =>
      a.action === 'MARKED_AS_REPLIED' || a.action === 'MARKED_AS_NOT_REPLIED',
  );

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
    <Flex direction="column" gap="sm">
      <Flex direction="column">
        <Flex align="center" gap={4}>
          <Anchor
            className="z-1"
            href={`https://reddit.com/${post.subreddit}`}
            target="_blank"
            underline="hover">
            <Text className="text-slate-700" fw={500} size="xs">
              {post.subreddit}
            </Text>
          </Anchor>
          <Text fw="bold" size="xs">
            &middot;
          </Text>
          <Tooltip label="Post fetched at" withArrow={true}>
            <Text c="dimmed" size="xs" span={true}>
              {new Intl.DateTimeFormat(undefined, {
                day: 'numeric',
                hour: 'numeric',
                hour12: true,
                minute: '2-digit',
                month: 'long',
                weekday: 'long',
                year: 'numeric',
              }).format(post.createdAt)}
            </Text>
          </Tooltip>
        </Flex>
        <Flex direction="column" gap={4} justify="space-between">
          <Title order={2}>{post.title}</Title>
          <PostMetadata post={post} showViewPost={true} />
        </Flex>
      </Flex>
      <div
        dangerouslySetInnerHTML={{
          __html: postBody,
        }}
        className="prose prose-sm max-w-none"
      />
      {!post.reply && (
        <>
          <Divider />
          <Flex align="center" gap="md" justify="space-between">
            <Text size="sm">
              {relevancyActivity && (
                <>
                  {relevancyActivity.action === 'MADE_IRRELEVANT'
                    ? 'Marked as irrelevant'
                    : 'Marked as relevant'}{' '}
                  by{' '}
                  <span className="font-bold">
                    {relevancyActivity.user.name}
                  </span>
                </>
              )}
            </Text>
            <PostRelevanceActionButton
              key={post.relevancy}
              postId={post.id}
              relevancy={post.relevancy}
            />
          </Flex>
          <Divider />
          <Flex align="center" gap="md" justify="space-between">
            <Text size="sm">
              {replyActivity && (
                <>
                  {replyActivity.action === 'MARKED_AS_REPLIED'
                    ? 'Marked as replied'
                    : 'Marked as not replied'}{' '}
                  by{' '}
                  <span className="font-bold">{replyActivity.user.name}</span>
                </>
              )}
            </Text>
            <PostReplyStatusActionButton
              key={post.replied}
              postId={post.id}
              replyStatus={post.replied}
            />
          </Flex>
        </>
      )}
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
        <Stack bg="gray.0" p="md">
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
            minRows={2}
            placeholder="Generate or write your comment..."
            value={response === null ? '' : response}
            onChange={setResponse}
          />
          <Group justify="space-between" mb="xs" mt="md">
            <Button
              disabled={isGeneratingResponse}
              loading={isGeneratingResponse}
              size="xs"
              variant="default"
              onClick={() => generateResponse(setResponse)}>
              Generate AI response
            </Button>
            <Button
              disabled={isReplying || !response || !selectedRedditUserId}
              loading={isReplying}
              size="xs"
              onClick={handleReplyToPostButton}>
              Reply
            </Button>
          </Group>
        </Stack>
      )}
      {!hasReply && (
        <div className="mt-5 flex flex-col gap-3">
          {!!data?.comments.data.children.length && (
            <div className="flex items-center gap-1">
              <Text c="dimmed" size="sm">
                {post.commentsCount} comments
              </Text>
            </div>
          )}
          <PostCommentsList
            comments={data?.comments}
            isFetchingComments={isFetchingComments}
          />
        </div>
      )}
    </Flex>
  );
}
