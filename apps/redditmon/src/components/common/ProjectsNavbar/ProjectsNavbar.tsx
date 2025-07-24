'use client';

import clsx from 'clsx';
import Link from 'next/link';
import type { ReactNode } from 'react';
import {
  RiAccountBoxLine,
  RiHistoryLine,
  RiHomeLine,
  RiSpaceShipLine,
} from 'react-icons/ri';

import useCurrentProjectSlug from '~/hooks/useCurrentProjectSlug';

import SelectProductDropdown from '~/components/project/SelectProductDropdown';
import Navbar from '~/components/ui/Navbar';
import NavbarUserAvatar from '~/components/ui/Navbar/NavbarUserAvatar';

import type { User } from '~/types';

function NavItem({ children, href }: { children: ReactNode; href: string }) {
  return (
    <Link className={clsx('px-3 py-2', 'text-sm')} href={href}>
      {children}
    </Link>
  );
}

type Props = Readonly<{
  user?: User | null;
}>;

export default function ProjectsNavbar({ user }: Props) {
  const projectSlug = useCurrentProjectSlug();

  const items = [
    {
      href: `/`,
      icon: <RiSpaceShipLine />,
      label: 'Projects',
    },
    {
      href: `/projects/${projectSlug}`,
      icon: <RiHomeLine />,
      label: 'Posts',
    },
    {
      href: `/projects/${projectSlug}/users`,
      icon: <RiAccountBoxLine />,
      label: 'Users',
    },
    {
      href: `/projects/${projectSlug}/activity`,
      icon: <RiHistoryLine />,
      label: 'Activity',
    },
  ];

  const navItems = (
    <div className="flex gap-2">
      <SelectProductDropdown />
      <div className="hidden gap-2 md:flex">
        {items.map((item) => (
          <NavItem key={item.href} href={item.href}>
            {item.label}
          </NavItem>
        ))}
      </div>
    </div>
  );

  const navUser = <NavbarUserAvatar menuItems={items} user={user} />;

  return <Navbar navItems={navItems} navUser={navUser} />;
}
