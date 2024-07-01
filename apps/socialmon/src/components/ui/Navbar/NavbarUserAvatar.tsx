'use client';

import { signOut } from 'next-auth/react';
import { RiLogoutBoxLine } from 'react-icons/ri';

import type { User } from '~/types';

import { Avatar, Menu } from '@mantine/core';

type Props = Readonly<{
  user?: User | null;
}>;

export default function NavbarUserAvatar({ user }: Props) {
  if (!user) {
    return null;
  }

  const displayName = user?.name ?? user?.email ?? '';

  return (
    <Menu shadow="md" width={200}>
      <Menu.Target>
        <Avatar
          alt={displayName}
          color="initials"
          component="button"
          name={displayName}
          src={user?.image}
        />
      </Menu.Target>

      <Menu.Dropdown>
        <Menu.Label>{displayName}</Menu.Label>

        <Menu.Divider />
        <Menu.Item leftSection={<RiLogoutBoxLine />} onClick={() => signOut()}>
          Sign out
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
}
