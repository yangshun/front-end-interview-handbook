import { redirect } from 'next/navigation';
import type { Metadata } from 'next/types';
import url from 'node:url';
import type { ReactNode } from 'react';

import ProfileShell from '~/components/profile/ProfileShell';

import { getIntlServerOnly } from '~/i18n';
import defaultMetadata from '~/seo/defaultMetadata';
import { fetchUser_DO_NOT_USE_IF_ONLY_USER_ID_OR_EMAIL_NEEDED } from '~/supabase/SupabaseServerGFE';

type Props = Readonly<{
  children: ReactNode;
  params: Readonly<{
    locale: string;
  }>;
}>;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = params;

  const intl = await getIntlServerOnly(locale);
  const title = intl.formatMessage({
    defaultMessage: 'Profile',
    description: 'Title of Profile page',
    id: '5hTR16',
  });

  return defaultMetadata({
    locale,
    ogImageTitle: title,
    pathname: '/profile',
    title,
  });
}

export default async function ProfileLayout({ children }: Props) {
  const user = await fetchUser_DO_NOT_USE_IF_ONLY_USER_ID_OR_EMAIL_NEEDED();

  if (user == null) {
    return redirect(
      url.format({
        pathname: '/login',
        query: {
          next: '/profile',
        },
      }),
    );
  }

  return <ProfileShell user={user}>{children}</ProfileShell>;
}
