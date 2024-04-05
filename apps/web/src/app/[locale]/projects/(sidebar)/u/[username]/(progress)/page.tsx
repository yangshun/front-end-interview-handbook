import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { getIntlServerOnly } from '~/i18n';
import defaultMetadata from '~/seo/defaultMetadata';
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

  return defaultMetadata({
    description: userProfile!.bio ?? '',
    locale,
    pathname: `/projects/u/${username}`,
    title: intl.formatMessage(
      {
        defaultMessage:
          '{username} | Profile | GreatFrontEnd Projects - Real-world project challenges',
        description: 'Title of Projects profile page',
        id: 'tpddLF',
      },
      {
        username,
      },
    ),
  });
}

export default Page;
