import 'server-only';

import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';
import url from 'node:url';

import { authConfig } from '~/app/lib/auth';

export async function redirectToLoginPageIfNotLoggedIn(next: string) {
  const session = await getServerSession(authConfig);

  if (session) {
    return;
  }

  return redirect(
    url.format({
      pathname: '/login',
      query: {
        next,
      },
    }),
  );
}
