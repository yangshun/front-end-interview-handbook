import clsx from 'clsx';

import Container from '~/components/ui/Container';

import { NAVBAR_HEIGHT } from '~/constants';

import NavbarUserAvatar from './NavbarUserAvatar';

import type { User } from '~/types';

type Props = Readonly<{
  user?: User | null;
}>;

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
        <span className="text-xl font-bold tracking-tighter md:text-3xl">
          SocialMon
        </span>

        <NavbarUserAvatar user={user} />
      </Container>
    </header>
  );
}
