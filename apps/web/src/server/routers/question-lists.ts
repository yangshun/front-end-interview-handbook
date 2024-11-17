import nullthrows from 'nullthrows';
import { z } from 'zod';

import type { QuestionMetadata } from '~/components/interviews/questions/common/QuestionsTypes';

import { fetchInterviewsStudyList } from '~/db/contentlayer/InterviewsStudyListReader';
import {
  fetchQuestionsByHash,
  fetchQuestionsListCoding,
  fetchQuestionsListSystemDesign,
} from '~/db/QuestionsListReader';
import { fetchStudyListsSelectorData } from '~/db/StudyListUtils';
import prisma from '~/server/prisma';

import { publicProcedure, router, userProcedure } from '../trpc';

export const questionListsRouter = router({
  getActiveSession: userProcedure
    .input(
      z.object({
        listKey: z.string(),
      }),
    )
    .query(async ({ input: { listKey }, ctx: { viewer } }) => {
      const session = await prisma.learningSession.findFirst({
        include: {
          progress: true,
        },
        where: {
          key: listKey,
          status: 'IN_PROGRESS',
          userId: viewer.id,
        },
      });

      return session;
    }),
  getActiveSessions: userProcedure.query(async ({ ctx: { viewer } }) => {
    return await prisma.learningSession.findMany({
      include: {
        _count: {
          select: {
            progress: true,
          },
        },
      },
      where: {
        status: 'IN_PROGRESS',
        userId: viewer.id,
      },
    });
  }),
  getQuestions: publicProcedure
    .input(
      z.object({
        listKey: z.string().optional(),
      }),
    )
    .query(async ({ input: { listKey } }) => {
      if (listKey == null) {
        const { questions } = await fetchQuestionsListCoding();

        return questions as ReadonlyArray<QuestionMetadata>;
      }

      const studyList_ = await fetchInterviewsStudyList(listKey);

      const studyList = nullthrows(
        studyList_,
        `Study list not found for listKey ${listKey}`,
      );

      return fetchQuestionsByHash(studyList.questionHashes);
    }),
  getRecommendedStudyList: publicProcedure
  .query(async () => {
    const blind75 = await fetchInterviewsStudyList('blind75');
    const gfe75 = await fetchInterviewsStudyList('gfe75');
    const { questions } = await fetchQuestionsListSystemDesign('en-US');

    return {
      blind75: {
        listKey: blind75?.slug ?? '',
        questionCount: blind75?.questionHashes.length ?? 0
      },
      gfe75: {
        listKey: gfe75?.slug ?? '',
        questionCount: gfe75?.questionHashes.length ?? 0
      },
      systemDesignQuestionCount: questions.length,
    }
  }),
  getSessionProgress: userProcedure
    .input(
      z.object({
        listKey: z.string(),
      }),
    )
    .query(async ({ input: { listKey }, ctx: { viewer } }) => {
      const session = await prisma.learningSession.findFirst({
        where: {
          key: listKey,
          status: 'IN_PROGRESS',
          userId: viewer.id,
        },
      });

      if (session == null) {
        return null;
      }

      return await prisma.learningSessionProgress.findMany({
        where: {
          sessionId: session.id,
        },
      });
    }),
  getStudyListsSelectorData: userProcedure.query(async () => {
    return await fetchStudyListsSelectorData();
  }),
  resetSessionProgress: userProcedure
    .input(
      z.object({
        sessionId: z.string(),
      }),
    )
    .mutation(async ({ input: { sessionId }, ctx: { viewer } }) => {
      // Make sure the session is active.
      const session = await prisma.learningSession.findFirst({
        where: {
          id: sessionId,
          status: 'IN_PROGRESS',
          userId: viewer.id,
        },
      });

      if (session == null) {
        return null;
      }

      await prisma.learningSessionProgress.deleteMany({
        where: {
          sessionId,
        },
      });
    }),
  startSession: userProcedure
    .input(
      z.object({
        listKey: z.string(),
      }),
    )
    .mutation(async ({ input: { listKey }, ctx: { viewer } }) => {
      const existingSession = await prisma.learningSession.findFirst({
        where: {
          key: listKey,
          status: 'IN_PROGRESS',
          userId: viewer.id,
        },
      });

      // There's an existing session, return it.
      if (existingSession != null) {
        return existingSession;
      }

      // No existing session, create one.
      const createData = {
        key: listKey,
        userId: viewer.id,
      };

      return await prisma.learningSession.create({
        data: createData,
      });
    }),
  stopSession: userProcedure
    .input(
      z.object({
        sessionId: z.string(),
      }),
    )
    .mutation(async ({ input: { sessionId }, ctx: { viewer } }) => {
      // Make sure the session is active.
      const session = await prisma.learningSession.findFirst({
        where: {
          id: sessionId,
          status: 'IN_PROGRESS',
          userId: viewer.id,
        },
      });

      if (session == null) {
        return null;
      }

      return await prisma.learningSession.update({
        data: {
          status: 'STOPPED',
          stoppedAt: new Date(),
        },
        where: {
          id: sessionId,
        },
      });
    }),
});
