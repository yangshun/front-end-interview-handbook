import { redirect } from 'next/navigation';
import type { Metadata } from 'next/types';
import url from 'node:url';
import type { ReactNode } from 'react';

import ProjectsSettingsLayout from '~/components/projects/settings/ProjectsSettingsLayout';

import { getIntlServerOnly } from '~/i18n';
import defaultMetadata from '~/seo/defaultMetadata';
import { readUserFromToken } from '~/supabase/SupabaseServerGFE';

type Props = Readonly<{
  children: ReactNode;
  params: Readonly<{
    locale: string;
  }>;
}>;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = params;

  const intl = await getIntlServerOnly(locale);

  return defaultMetadata({
    locale,
    pathname: '/projects/settings',
    title: intl.formatMessage({
      defaultMessage: 'Settings',
      description: 'Title of settings page',
      id: 'iq1rXh',
    }),
  });
}

export default async function Layout({ children }: Props) {
  const user = await readUserFromToken();

  if (user == null) {
    return redirect(
      url.format({
        pathname: '/login',
        query: {
          next: '/projects/settings',
        },
      }),
    );
  }

  return <ProjectsSettingsLayout>{children}</ProjectsSettingsLayout>;
}
