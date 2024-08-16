import clsx from 'clsx';

import { redirectToLoginPageIfNotLoggedIn } from '~/components/auth/redirectToLoginPageIfNotLoggedIn';
import Container from '~/components/ui/Container';
import Navbar from '~/components/ui/Navbar';
import NavbarUserAvatar from '~/components/ui/Navbar/NavbarUserAvatar';

import { getUser } from '../lib/auth';

type Props = Readonly<{
  children: React.ReactNode;
}>;

export default async function Layout({ children }: Props) {
  await redirectToLoginPageIfNotLoggedIn('/');

  const user = await getUser();

  const navUser = <NavbarUserAvatar user={user} />;

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar navUser={navUser} />
      <Container className={clsx('flex-1', 'p-4', 'flex')}>
        {children}
      </Container>
    </div>
  );
}
