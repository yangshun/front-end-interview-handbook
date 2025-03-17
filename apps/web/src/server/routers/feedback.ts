import { z } from 'zod';

import prisma from '../prisma';
import { adminProcedure, publicProcedure, router } from '../trpc';

import type { Prisma } from '@prisma/client';
import { FeedbackMessageCategory } from '@prisma/client';

export const feedbackRouter = router({
  getFeedbacks: adminProcedure
    .input(
      z.object({
        filter: z.object({
          category: z.nativeEnum(FeedbackMessageCategory).optional(),
          query: z.string().nullable(),
          status: z.array(z.enum(['RESOLVED', 'UNRESOLVED'])).optional(),
        }),
        pagination: z.object({
          limit: z
            .number()
            .int()
            .positive()
            .transform((val) => Math.min(30, val)),
          page: z.number().int().positive(),
        }),
        sort: z.object({
          field: z.enum(['createdAt', 'email']),
          isAscendingOrder: z.boolean(),
        }),
      }),
    )
    .query(async ({ input: { pagination, filter, sort } }) => {
      const { limit, page } = pagination;
      const { query, status, category } = filter;

      const orderBy = {
        [sort.field]: sort.isAscendingOrder ? 'asc' : 'desc',
      } as const;

      const where: Prisma.FeedbackMessageWhereInput = {
        email: {
          contains: query ?? '',
          mode: 'insensitive', // Case-insensitive search
        },
        resolved:
          status?.length === 1
            ? { equals: status[0] === 'RESOLVED' } // Only resolved or only unresolved
            : undefined, // If both or empty, don't filter by resolved
        ...(category !== undefined ? { category } : {}),
      };

      const [totalCount, feedbacks] = await Promise.all([
        prisma.feedbackMessage.count({ where }),
        prisma.feedbackMessage.findMany({
          orderBy,
          skip: (page - 1) * limit,
          take: limit,
          where,
        }),
      ]);

      return {
        feedbacks,
        totalCount,
      };
    }),
  markFeedbackStatus: adminProcedure
    .input(
      z.object({
        feedbackId: z.string(),
        resolved: z.boolean(),
      }),
    )
    .mutation(async ({ input: { feedbackId, resolved } }) => {
      await prisma.feedbackMessage.update({
        data: { resolved },
        where: { id: feedbackId },
      });
    }),
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
