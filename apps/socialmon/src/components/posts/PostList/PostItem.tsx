'use client';

import { type ChangeEvent } from 'react';

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
  editResponse: (response: string | null) => void;
  generateResponse: (setter: (value: ChangeEvent | string | null | undefined) => void) => Promise<void>;
  post: Post;
  replyToPost: (response: string | null) => void;
}>;

export default function PostItem({ editResponse, generateResponse, post, replyToPost }: Props) {
  const [response, setResponse] = useInputState<string | null>(post.response);

  function handleUpdateResponseButton() {
    editResponse(response);
  }

  function handleReplyToPostButton() {
    replyToPost(response);
  }

  // TODO: truncate content and add url?
  // TODO: minimise the card?
  // TODO: if response is null, call the AIProvider to generate a response
  return (
    <Card mb="md" padding="lg" radius="md" shadow="sm" withBorder={true}>
      <Group justify="space-between" mb="xs" mt="md">
        <Title order={3}>Title: {post.title}</Title>
        <Text size="sm">Date: {post.postedAt.toString()}</Text>
      </Group>
      <Text size="sm">{post.content}</Text>
      <Divider my="md" />
      <Textarea
        autosize={true}
        label="Response"
        value={response === null ? '' : response}
        onChange={setResponse}
      />
      <Group justify="space-between" mb="xs" mt="md">
        <Button onClick={() => generateResponse(setResponse)}>Generate Response</Button>
      </Group>
      <Group justify="space-between" mb="xs" mt="md">
        <Button onClick={handleUpdateResponseButton}>Update Response</Button>
        <Button onClick={handleReplyToPostButton}>Reply</Button>
      </Group>
    </Card>
  );
}
