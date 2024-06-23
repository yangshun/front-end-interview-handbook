'use client';

import DOMPurify from 'dompurify';
import { type ChangeEvent } from 'react';

import RelativeTimestamp from '~/components/common/datetime/RelativeTimestamp';

import { type Post } from '~/models/Post';

import '@mantine/core/styles.css';

import {
  Button,
  Card,
  Divider,
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
  post: Post;
  replyToPost: (response: string | null) => void;
}>;

export default function PostItem({
  generateResponse,
  post,
  replyToPost,
}: Props) {
  const [response, setResponse] = useInputState<string | null>(post.response);

  const cleanHtml = DOMPurify.sanitize(post.content);

  function handleReplyToPostButton() {
    replyToPost(response);
  }

  // TODO: truncate content and add url?
  // TODO: minimise the card?
  return (
    <Card mb="md" padding="lg" radius="md" shadow="sm" withBorder={true}>
      <Group justify="space-between" mb="xs" mt="md">
        <Title order={3}>{post.title}</Title>
        <Text size="sm">
          <RelativeTimestamp timestamp={new Date(post.postedAt)} />
        </Text>
      </Group>
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
        value={response === null ? '' : response}
        onChange={setResponse}
      />
      <Group justify="space-between" mb="xs" mt="md">
        <Button onClick={() => generateResponse(setResponse)}>
          Generate Response
        </Button>
        <Button onClick={handleReplyToPostButton}>Reply</Button>
      </Group>
    </Card>
  );
}
