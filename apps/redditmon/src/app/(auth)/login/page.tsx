import clsx from 'clsx';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';

import LoginForm from '~/components/auth/LoginForm';

import { authConfig } from '~/app/lib/auth';

export default async function Page() {
  const session = await getServerSession(authConfig);

  if (session) {
    return redirect('/');
  }

  return (
    <div className={clsx('w-full flex-1', 'flex items-center justify-center')}>
      <LoginForm />
    </div>
  );
}
