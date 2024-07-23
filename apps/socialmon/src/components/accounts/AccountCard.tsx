import toast from 'react-hot-toast';
import { RiDeleteBinLine, RiMoreLine } from 'react-icons/ri';

import { trpc } from '~/hooks/trpc';

import type { AccountType } from '~/types';

import { ActionIcon, Card, Menu, Text } from '@mantine/core';

type Props = Readonly<{
  account: AccountType;
}>;

function AccountDataItem({ label, value }: { label: string; value: string }) {
  return (
    <Text size="md">
      <span className="font-semibold">{label}: </span>
      <span className="italic">{value}</span>
    </Text>
  );
}

export default function AccountCard({ account }: Props) {
  const utils = trpc.useUtils();
  const deleteAccountMutation = trpc.socialAccounts.deleteAccount.useMutation({
    onError() {
      toast.error('Something went wrong. Try again later.');
    },
    onSuccess: () => {
      utils.socialAccounts.getAccounts.invalidate();
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
              deleteAccountMutation.mutate({ username: account.username })
            }>
            Delete
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>
      <AccountDataItem label="Username" value={account.username} />
      <AccountDataItem label="Client ID" value={account.clientId} />
    </Card>
  );
}
