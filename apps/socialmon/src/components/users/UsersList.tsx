'use client';

import { Button, Text, Title } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { clsx } from 'clsx';

import { trpc } from '~/hooks/trpc';
import useCurrentProjectSlug from '~/hooks/useCurrentProjectSlug';

import Container from '~/components/ui/Container';

import AddUserModal from './AddUserModal';
import UserCard from './UserCard';

export default function UsersList() {
  const projectSlug = useCurrentProjectSlug();

  const [opened, { open, close }] = useDisclosure(false);
  const { isLoading, data } = trpc.socialUsers.getPlatformUsers.useQuery({
    projectSlug: projectSlug ?? '',
  });

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

      {!isLoading && (data?.length === 0 || !data) && (
        <Text size="md">No users added yet!</Text>
      )}

      {data?.map((user) => <UserCard key={user.username} user={user} />)}

      <AddUserModal opened={opened} onClose={close} />
    </Container>
  );
}
