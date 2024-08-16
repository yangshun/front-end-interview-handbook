import clsx from 'clsx';

import Container from '~/components/ui/Container';
import Navbar from '~/components/ui/Navbar';
import NavbarUserAvatar from '~/components/ui/Navbar/NavbarUserAvatar';

import { NAVBAR_HEIGHT } from '~/constants';

import { getUser } from '../lib/auth';

type Props = Readonly<{
  children: React.ReactNode;
}>;

export default async function Layout({ children }: Props) {
  const user = await getUser();

  const navUser = <NavbarUserAvatar user={user} />;

  return (
    <div className="flex h-screen flex-col">
      <Navbar navUser={navUser} />
      <Container
        className={clsx('flex-1', 'p-4', 'flex')}
        style={{ height: `calc(100vh - ${NAVBAR_HEIGHT}px)` }}>
        {children}
      </Container>
    </div>
  );
}
