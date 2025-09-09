import { z } from 'zod';

import {
  type QuestionFormat,
  zodQuestionFormats,
} from '~/components/interviews/questions/common/QuestionsTypes';

import { fetchQuestionsListByHash } from '~/db/QuestionsListReader';
import { hashQuestion } from '~/db/QuestionsUtils';
import prisma from '~/server/prisma';

import { router, userProcedure } from '../trpc';

export const questionBookmarkRouter = router({
  add: userProcedure
    .input(
      z.object({
        question: z.object({
          format: zodQuestionFormats,
          slug: z.string(),
        }),
      }),
    )
    .mutation(async ({ ctx: { viewer }, input: { question } }) => {
      const bookmarkedList = await prisma.questionBookmarkList.upsert({
        create: {
          default: true,
          name: 'Bookmarked',
          userId: viewer.id,
        },
        update: {},
        where: {
          userId_default: {
            default: true,
            userId: viewer.id,
          },
        },
      });
      const listId = bookmarkedList.id;

      const lastBookmark = await prisma.questionBookmark.findFirst({
        orderBy: {
          position: 'desc',
        },
        select: {
          position: true,
        },
        where: {
          listId,
        },
      });

      // Get the next position (highest position + 100) for new bookmarks
      const newPosition = (lastBookmark?.position ?? 0) + 100;

      return await prisma.questionBookmark.upsert({
        create: {
          format: question.format,
          listId,
          position: newPosition,
          slug: question.slug,
        },
        update: {},
        where: {
          listId_format_slug: {
            format: question.format,
            listId,
            slug: question.slug,
          },
        },
      });
    }),
  delete: userProcedure
    .input(
      z.object({
        listId: z.string().uuid(),
        question: z.object({
          format: zodQuestionFormats,
          slug: z.string(),
        }),
      }),
    )
    .mutation(async ({ input: { listId, question } }) => {
      return await prisma.questionBookmark.deleteMany({
        where: {
          format: question.format,
          listId,
          slug: question.slug,
        },
      });
    }),
  get: userProcedure
    .input(
      z.object({
        question: z.object({
          format: zodQuestionFormats,
          slug: z.string(),
        }),
      }),
    )
    .query(async ({ ctx: { viewer }, input: { question } }) => {
      const defaultBookmarkList = await prisma.questionBookmarkList.findFirst({
        where: {
          default: true,
          userId: viewer.id,
        },
      });

      if (!defaultBookmarkList) {
        return null;
      }

      const listId = defaultBookmarkList?.id;

      return await prisma.questionBookmark.findFirst({
        where: {
          format: question.format,
          listId,
          slug: question.slug,
        },
      });
    }),
  getAll: userProcedure.query(async ({ ctx: { viewer } }) => {
    const bookmarkedList = await prisma.questionBookmarkList.findFirst({
      where: {
        default: true,
        userId: viewer.id,
      },
    });

    if (!bookmarkedList) {
      return [];
    }

    const listId = bookmarkedList.id;

    const bookmarkedQuestions = await prisma.questionBookmark.findMany({
      select: {
        format: true,
        slug: true,
      },
      where: {
        listId,
      },
    });

    return bookmarkedQuestions.map((item) => ({
      format: item.format as QuestionFormat,
      slug: item.slug,
    }));
  }),
  getQuestionsWithMetadata: userProcedure.query(async ({ ctx: { viewer } }) => {
    const bookmarkedList = await prisma.questionBookmarkList.findFirst({
      where: {
        default: true,
        userId: viewer.id,
      },
    });

    if (!bookmarkedList) {
      return [];
    }

    const listId = bookmarkedList.id;
    const questionsList = await prisma.questionBookmark.findMany({
      orderBy: {
        position: 'desc',
      },
      select: {
        format: true,
        slug: true,
      },
      where: {
        listId,
      },
    });

    return await fetchQuestionsListByHash(
      questionsList.map((qn) =>
        hashQuestion({ format: qn.format as QuestionFormat, slug: qn.slug }),
      ),
    );
  }),
});
