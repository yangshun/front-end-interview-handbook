import clsx from 'clsx';
import Link from 'next/link';
import type { ReactNode } from 'react';

import Container from '~/components/ui/Container';

import { NAVBAR_HEIGHT } from '~/constants';

import NavbarUserAvatar from './NavbarUserAvatar';

import type { User } from '~/types';

type Props = Readonly<{
  user?: User | null;
}>;

function NavItem({ children, href }: { children: ReactNode; href: string }) {
  return (
    <Link className={clsx('px-3 py-2', 'text-sm')} href={href}>
      {children}
    </Link>
  );
}

export default function Navbar({ user }: Props) {
  return (
    <header
      className={clsx(
        'z-fixed sticky top-0',
        'bg-white',
        'flex items-center',
        'border-b',
      )}
      style={{ height: `${NAVBAR_HEIGHT}px` }}>
      <Container
        className={clsx('px-4', 'flex items-center justify-between gap-2')}>
        <div className="flex items-center gap-6">
          <Link href="/">
            <span className="text-xl font-bold tracking-tighter md:text-3xl">
              SocialMon
            </span>
          </Link>
          <div className="hidden gap-2 md:flex">
            <NavItem href="/">Dashboard</NavItem>
            <NavItem href="/users">Users</NavItem>
          </div>
        </div>

        <NavbarUserAvatar user={user} />
      </Container>
    </header>
  );
}
