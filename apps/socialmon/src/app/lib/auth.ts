import type { GetServerSidePropsContext } from 'next';
import { getServerSession, type NextAuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

import prisma from '~/server/prisma';

import { PrismaAdapter } from '@next-auth/prisma-adapter';
import type { PrismaClient } from '@prisma/client';

export const AUTHORIZED_EMAILS = [
  'yangshun@greatfrontend.com',
  'gina@greatfrontend.com',
  'nitesh@greatfrontend.com',
  'nikki@greatfrontend.com',
];

export const authConfig: NextAuthOptions = {
  adapter: PrismaAdapter(prisma as unknown as PrismaClient),
  callbacks: {
    async signIn({ profile }) {
      if (AUTHORIZED_EMAILS.includes(profile?.email ?? '')) {
        return true;
      }

      return '/unauthorized'; // Redirect URL on failure
    },
  },
  providers: [
    GoogleProvider({
      clientId: process.env.AUTH_GOOGLE_ID as string,
      clientSecret: process.env.AUTH_GOOGLE_SECRET as string,
    }),
  ],
};

export const getServerAuthSession = (ctx: {
  req: GetServerSidePropsContext['req'];
  res: GetServerSidePropsContext['res'];
}) => {
  return getServerSession(ctx.req, ctx.res, authConfig);
};

export const getUser = async () => {
  const session = await getServerSession(authConfig);

  return session?.user;
};
