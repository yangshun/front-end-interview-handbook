'use client';

import DOMPurify from 'dompurify';
import { type ChangeEvent } from 'react';

import RelativeTimestamp from '~/components/common/datetime/RelativeTimestamp';

import type { Post } from '~/types';

import '@mantine/core/styles.css';

import {
  Button,
  Divider,
  Flex,
  Group,
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
  replyToPost: (response: string | null) => void;
}>;

export default function PostDetail({
  generateResponse,
  post,
  replyToPost,
  isGeneratingResponse,
  isReplying,
}: Props) {
  const [response, setResponse] = useInputState<string | null>(post.response);

  const cleanHtml = DOMPurify.sanitize(post.content);

  function handleReplyToPostButton() {
    replyToPost(response);
  }

  // TODO: truncate content and add url?
  // TODO: minimise the card?
  return (
    <div>
      <Flex direction="column" gap={2} justify="space-between" mb="xs" mt="md">
        <Title order={3}>{post.title}</Title>
        <Text size="sm">
          <RelativeTimestamp timestamp={new Date(post.postedAt)} />
        </Text>
      </Flex>
      <Text size="sm">
        <span
          dangerouslySetInnerHTML={{ __html: cleanHtml }}
          className="prose"
        />
      </Text>
      <Divider my="md" />
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
          Generate Response
        </Button>
        <Button
          disabled={isReplying || !response}
          loading={isReplying}
          onClick={handleReplyToPostButton}>
          Reply
        </Button>
      </Group>
    </div>
  );
}
