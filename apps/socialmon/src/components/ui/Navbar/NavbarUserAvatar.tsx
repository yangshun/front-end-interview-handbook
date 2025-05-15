'use client';

import { Avatar, Menu } from '@mantine/core';
import { signOut } from 'next-auth/react';
import Link from 'next/link';
import type { ReactNode } from 'react';
import { RiLogoutBoxLine } from 'react-icons/ri';

import type { User } from '~/types';

type Props = Readonly<{
  menuItems?: Array<{
    href: string;
    icon: ReactNode;
    label: string;
  }>;
  user?: User | null;
}>;

export default function NavbarUserAvatar({ user, menuItems }: Props) {
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
        {menuItems?.map(({ href, label, icon }) => (
          <Link key={href} href={href}>
            <Menu.Item leftSection={icon}>{label}</Menu.Item>
          </Link>
        ))}
        <Menu.Item leftSection={<RiLogoutBoxLine />} onClick={() => signOut()}>
          Sign out
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
}
