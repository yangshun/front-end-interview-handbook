import { z } from 'zod';

import prisma from '../prisma';
import { publicProcedure, router } from '../trpc';

import { FeedbackMessageCategory } from '@prisma/client';

export const feedbackRouter = router({
  submitFeedback: publicProcedure
    .input(
      z.object({
        category: z.nativeEnum(FeedbackMessageCategory).optional(),
        email: z.string().email('Email is invalid').optional(),
        message: z
          .string()
          .min(10, 'Message must contain at least 10 characters.'),
      }),
    )
    .mutation(
      async ({ input: { category, message, email }, ctx: { viewer, req } }) => {
        const feedbackMessage = await prisma.feedbackMessage.create({
          data: {
            category,
            email,
            message,
            metadata: {
              country: req.cookies.country,
              referer: req.headers.referer ?? null,
            },
            userEmail: viewer?.email,
          },
        });

        return feedbackMessage.id;
      },
    ),
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
