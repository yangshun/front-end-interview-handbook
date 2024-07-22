'use client';

import Link from 'next/link';
import { signOut } from 'next-auth/react';
import { RiAccountBoxLine, RiLogoutBoxLine } from 'react-icons/ri';

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
        <Link href="/accounts">
          <Menu.Item leftSection={<RiAccountBoxLine />}>Accounts</Menu.Item>
        </Link>
        <Menu.Item leftSection={<RiLogoutBoxLine />} onClick={() => signOut()}>
          Sign out
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
}
