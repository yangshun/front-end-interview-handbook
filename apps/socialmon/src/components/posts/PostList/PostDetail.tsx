'use client';

import clsx from 'clsx';
import DOMPurify from 'dompurify';
import { type ChangeEvent, useState } from 'react';

import PostMetadata from './PostMetadata';

import type { Post, SocialUser } from '~/types';

import '@mantine/core/styles.css';

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

type Props = Readonly<{
  generateResponse: (
    setter: (value: ChangeEvent | string | null | undefined) => void,
  ) => Promise<void>;
  isGeneratingResponse: boolean;
  isReplying: boolean;
  post: Post;
  replyToPost: (response: string, accountUsername: string) => void;
  users?: Array<SocialUser>;
}>;

export default function PostDetail({
  generateResponse,
  post,
  replyToPost,
  isGeneratingResponse,
  isReplying,
  users,
}: Props) {
  const [response, setResponse] = useInputState<string | null>(post.response);
  const [selectedAccountUsername, setSelectedAccountUsername] = useState<
    string | null
  >(null);

  const cleanHtml = DOMPurify.sanitize(post.content);
  const cleanResponse = DOMPurify.sanitize(post?.response ?? '');

  function handleReplyToPostButton() {
    if (response && selectedAccountUsername) {
      replyToPost(response, selectedAccountUsername);
    }
  }

  return (
    <div>
      <Flex direction="column" gap={2} justify="space-between" mb="xs" mt="md">
        <Title order={3}>{post.title}</Title>
        <PostMetadata post={post} showViewPost={true} />
      </Flex>
      <Text size="sm">
        <span
          dangerouslySetInnerHTML={{ __html: cleanHtml }}
          className="prose"
        />
      </Text>
      <Divider my="md" />

      {/* Response */}
      {post.replied ? (
        <div className="flex flex-col gap-2">
          <Text fw={600} size="md">
            Your Response
          </Text>
          <div className={clsx('rounded border p-2')}>
            <span
              dangerouslySetInnerHTML={{ __html: cleanResponse }}
              className="prose"
            />
          </div>
        </div>
      ) : (users ?? [])?.length === 0 ? (
        <Text>
          No users added yet! Please add a user to comment on this post.
        </Text>
      ) : (
        <div className="flex flex-col gap-4">
          <Select
            checkIconPosition="right"
            data={users?.map((user) => user.username)}
            label="Select a user"
            placeholder="Select a user to add comment"
            value={selectedAccountUsername}
            onChange={(value) => setSelectedAccountUsername(value ?? null)}
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
              disabled={isReplying || !response || !selectedAccountUsername}
              loading={isReplying}
              onClick={handleReplyToPostButton}>
              Reply
            </Button>
          </Group>
        </div>
      )}
    </div>
  );
}
