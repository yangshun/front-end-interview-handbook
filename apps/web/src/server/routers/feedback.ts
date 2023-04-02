import cookie from 'cookie';
import { z } from 'zod';

import { publicProcedure, router } from '../trpc';

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const feedbackRouter = router({
  submitFeedback: publicProcedure
    .input(
      z.object({
        message: z
          .string()
          .min(10, 'Message must contain at least 10 characters.'),
      }),
    )
    .mutation(async ({ input: { message }, ctx: { user, req } }) => {
      const cookies = cookie.parse(req.headers.cookie ?? '');

      const feedbackMessage = await prisma.feedbackMessage.create({
        data: {
          message,
          metadata: {
            country: cookies.country,
            referer: req.headers.referer ?? null,
          },
          userEmail: user?.email,
        },
      });

      return feedbackMessage.id;
    }),
  updateFeedback: publicProcedure
    .input(
      z.object({
        email: z.string().email('Email is invalid'),
        feedbackId: z.string(),
      }),
    )
    .mutation(async ({ input: { email, feedbackId } }) => {
      await prisma.feedbackMessage.update({
        data: {
          email,
        },
        where: {
          id: feedbackId,
        },
      });

      return 'Message updated with email!';
    }),
});
