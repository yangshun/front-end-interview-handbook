import { z } from 'zod';

import { publicProcedure, router } from '../trpc';

import { Prisma, PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const marketingRouter = router({
  signUpWithEmail: publicProcedure
    .input(
      z.object({
        email: z.string().email('Email is invalid'),
      }),
    )
    .mutation(async ({ input: { email } }) => {
      try {
        await prisma.emailSubscriber.create({
          data: {
            email,
          },
        });
      } catch (err) {
        if (err instanceof Prisma.PrismaClientKnownRequestError) {
          // Unique constraint error, which is fine for us as
          // it'll be a no-op.
          if (err.code === 'P2002') {
            return 'Subscribed successfully!';
          }

          return 'An error occurred';
        }
      }

      return 'Subscribed successfully!';
    }),
});
