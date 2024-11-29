import { subHours } from 'date-fns';
import { z } from 'zod';

import prisma from '~/server/prisma';

import { publicProcedure, router } from '../trpc';

import { Axiom } from '@axiomhq/js';
import { Prisma } from '@prisma/client';

const TIME_DIFF_IN_HOURS = 2;

const axiom = new Axiom({
  token: process.env.AXIOM_TOKEN!,
});

export const marketingRouter = router({
  getOnlineUsers: publicProcedure.query(async () => {
    const aplQuery = "['events'] | summarize dcount(['user.fingerprint'])";

    const res = await axiom.query(aplQuery, {
      endTime: new Date().toISOString(),
      startTime: subHours(new Date(), TIME_DIFF_IN_HOURS).toISOString(),
    });

    const onlineUsers: number =
      res.buckets?.totals?.[0].aggregations?.[0].value;

    return onlineUsers ?? 0;
  }),
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
      } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
          // Unique constraint error, which is fine for us as
          // it'll be a no-op.
          if (error.code === 'P2002') {
            return 'Subscribed successfully!';
          }

          return error.message;
        }

        throw error;
      }

      return 'Subscribed successfully!';
    }),
});
