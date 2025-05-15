import { PrismaAdapter } from '@next-auth/prisma-adapter';
import type { GetServerSidePropsContext } from 'next';
import { getServerSession, type NextAuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

import type { PrismaClient } from '~/../prisma/generated/client';
import prisma from '~/server/prisma';

const ADMIN_EMAILS = ['yangshun@greatfrontend.com', 'gina@greatfrontend.com'];

export const authConfig: NextAuthOptions = {
  adapter: PrismaAdapter(prisma as unknown as PrismaClient),
  callbacks: {
    session: async ({ session, user }) => {
      if (session?.user) {
        session.user.id = user.id;
      }
      if (ADMIN_EMAILS.includes(user.email)) {
        session.user.isAdmin = true;
      }

      return session;
    },
    async signIn({ profile }) {
      if ((profile?.email ?? '').includes('@greatfrontend.com')) {
        return true;
      }

      return '/unauthorized'; // Redirect URL on failure
    },
  },
  providers: [
    GoogleProvider({
      allowDangerousEmailAccountLinking: true,
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
