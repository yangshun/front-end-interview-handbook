'use client';

import { clsx } from 'clsx';

import { trpc } from '~/hooks/trpc';

import Container from '~/components/ui/Container';

import AddUserModal from './AddUserModal';
import UserCard from './UserCard';

import { Button, Text, Title } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';

export default function UsersList() {
  const [opened, { open, close }] = useDisclosure(false);
  const { isLoading, data } = trpc.socialUsers.getPlatformUsers.useQuery();

  return (
    <Container className={clsx('flex-1', 'p-4')}>
      <div className="flex items-center justify-between gap-2">
        <Title mb="md" order={3}>
          Reddit accounts
        </Title>
        <Button size="sm" onClick={open}>
          Add
        </Button>
      </div>
      <Text hidden={!isLoading} size="md">
        Loading...
      </Text>

      {!isLoading && data?.length === 0 && (
        <Text size="md">No accounts added yet!</Text>
      )}

      {data?.map((user) => (
        <UserCard key={user.username} username={user.username} />
      ))}

      <AddUserModal opened={opened} onClose={close} />
    </Container>
  );
}
