import clsx from 'clsx';
import Link from 'next/link';
import type { ReactNode } from 'react';

import Container from '~/components/ui/Container';

import { NAVBAR_HEIGHT } from '~/constants';

type Props = Readonly<{
  navItems?: ReactNode;
  navUser?: ReactNode;
}>;

export default function Navbar({ navItems, navUser }: Props) {
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
          {navItems}
        </div>

        {navUser}
      </Container>
    </header>
  );
}
