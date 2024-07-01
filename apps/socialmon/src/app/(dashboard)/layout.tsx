import Navbar from '~/components/ui/Navbar';

import { getUser } from '../lib/auth';

type Props = Readonly<{
  children: React.ReactNode;
}>;

export default async function Layout({ children }: Props) {
  const user = await getUser();

  return (
    <div className="flex h-screen flex-col">
      <Navbar user={user} />
      {children}
    </div>
  );
}
