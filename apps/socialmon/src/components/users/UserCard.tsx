import toast from 'react-hot-toast';
import { RiDeleteBinLine, RiMoreLine } from 'react-icons/ri';

import { trpc } from '~/hooks/trpc';

import type { SocialUser } from '~/types';

import { ActionIcon, Card, Menu, Text } from '@mantine/core';

type Props = Readonly<{
  user: SocialUser;
}>;

function UserDataItem({ label, value }: { label: string; value: string }) {
  return (
    <Text size="md">
      <span className="font-semibold">{label}: </span>
      <span className="italic">{value}</span>
    </Text>
  );
}

export default function UserCard({ user }: Props) {
  const utils = trpc.useUtils();
  const deleteUserMutation = trpc.socialUsers.deletePlatformUser.useMutation({
    onError() {
      toast.error('Something went wrong. Try again later.');
    },
    onSuccess: () => {
      utils.socialUsers.getPlatformUsers.invalidate();
      toast.success('Account deleted successfully!');
    },
  });

  return (
    <Card
      className="relative flex flex-col gap-2"
      mb="md"
      padding="lg"
      radius="md"
      shadow="sm"
      withBorder={true}>
      <Menu position="bottom-end" shadow="sm" withinPortal={true}>
        <Menu.Target>
          <div className="absolute right-1 top-1">
            <ActionIcon variant="subtle">
              <RiMoreLine className="size-4 " />
            </ActionIcon>
          </div>
        </Menu.Target>

        <Menu.Dropdown>
          <Menu.Item
            color="red"
            leftSection={<RiDeleteBinLine />}
            onClick={() =>
              deleteUserMutation.mutate({ username: user.username })
            }>
            Delete
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>
      <UserDataItem label="Username" value={user.username} />
      <UserDataItem label="Password" value={user.password} />
    </Card>
  );
}
