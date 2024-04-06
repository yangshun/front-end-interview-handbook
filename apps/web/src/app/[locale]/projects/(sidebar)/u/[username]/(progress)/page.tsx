import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { getIntlServerOnly } from '~/i18n';
import defaultProjectsMetadata from '~/seo/defaultProjectsMetadata';
import prisma from '~/server/prisma';

import Page from './progress/page';

type Props = Readonly<{
  params: Readonly<{ locale: string; username: string }>;
}>;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, username } = params;

  const [intl, userProfile] = await Promise.all([
    getIntlServerOnly(locale),
    prisma.profile.findUnique({
      where: {
        username,
      },
    }),
  ]);

  // If no such user.
  if (userProfile == null) {
    return notFound();
  }

  return defaultProjectsMetadata(intl, {
    description: userProfile!.bio ?? '',
    locale,
    pathname: `/projects/u/${username}`,
    title: intl.formatMessage(
      {
        defaultMessage: '{name} | Profile',
        description: 'Title of a user profile page',
        id: 'KUKb7F',
      },
      {
        name: userProfile.name || userProfile.username,
      },
    ),
  });
}

export default Page;
