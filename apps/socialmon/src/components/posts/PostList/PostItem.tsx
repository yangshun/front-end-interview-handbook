'use client';

import { type Post } from '~/models/Post';

import '@mantine/core/styles.css';

import {
  Button,
  Card,
  Divider,
  Group,
  Text,
  TextInput,
  Title,
} from '@mantine/core';
import { useInputState } from '@mantine/hooks';

type Props = Readonly<{
  editResponse: (response: string | null) => void;
  post: Post;
  replyToPost: (response: string | null) => void;
}>;

export default function PostItem({ editResponse, post, replyToPost }: Props) {
  const [response, setResponse] = useInputState<string | null>(post.response);

  function handleUpdateResponseButton() {
    editResponse(response);
  }

  function handleReplyToPostButton() {
    replyToPost(response);
  }

  // TODO: truncate content and add url
  // TODO: minimise the card?
  // TODO: grey out the button if replied is true
  // TODO: if response is null, call the AIProvider to generate a response
  return (
    <Card mb="md" padding="lg" radius="md" shadow="sm" withBorder={true}>
      <Group justify="space-between" mb="xs" mt="md">
        <Title order={3}>Title: {post.title}</Title>
        <Text size="sm">Date: {post.postedAt.toString()}</Text>
      </Group>
      <Text size="sm">{post.content}</Text>
      <Divider my="md" />
      <TextInput
        label="Response"
        value={response === null ? '' : response}
        onChange={setResponse}
      />
      <Group justify="space-between" mb="xs" mt="md">
        <Button onClick={handleUpdateResponseButton}>Update Response</Button>
        <Button onClick={handleReplyToPostButton}>Reply</Button>
      </Group>
    </Card>
  );
}
