import { useUser } from '@supabase/auth-helpers-react';

import NavbarItem from '~/components/ui/Navbar/NavbarItem';

import useAuthNavItems from './useAuthNavItems';

export default function NavbarAuthLink() {
  const { login } = useAuthNavItems();
  const user = useUser();
  const isLoggedIn = user != null;

  if (isLoggedIn) {
    return null;
  }

  return <NavbarItem key={login.id} {...login} />;
}
