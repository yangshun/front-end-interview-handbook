import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { getIntlServerOnly } from '~/i18n';
import defaultProjectsMetadata from '~/seo/defaultProjectsMetadata';
import prisma from '~/server/prisma';

import Page from './challenges/page';

type Props = Readonly<{
  params: Readonly<{
    locale: string;
    username: string;
  }>;
}>;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, username } = params;

  const [intl, userProfile] = await Promise.all([
    getIntlServerOnly(locale),
    prisma.profile.findUnique({
      where: {
        username: params.username,
      },
    }),
  ]);

  if (!userProfile) {
    return notFound();
  }

  return defaultProjectsMetadata(intl, {
    locale,
    pathname: `/projects/u/${username}/progress`,
    title: intl.formatMessage(
      {
        defaultMessage: `Progress | {name}`,
        description: 'Title of user profile progress page',
        id: 'nAvA8M',
      },
      {
        name: userProfile.name || userProfile.username,
      },
    ),
  });
}

export default Page;
