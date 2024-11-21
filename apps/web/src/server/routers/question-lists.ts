import nullthrows from 'nullthrows';
import { z } from 'zod';

import type {
  QuestionFormat,
  QuestionFramework,
  QuestionLanguage,
} from '~/components/interviews/questions/common/QuestionsTypes';

import { fetchInterviewsStudyList } from '~/db/contentlayer/InterviewsStudyListReader';
import {
  fetchQuestionListForFormat,
  fetchQuestionsByHash,
  fetchQuestionsListCoding,
  fetchQuestionsListCodingForFramework,
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
        format: z.string().nullable().optional(),
        framework: z.string().nullable().optional(),
        language: z.string().nullable().optional(),
        studyList: z.string().nullable().optional(),
      }),
    )
    .query(async ({ input: { format, framework, language, studyList } }) => {
      if (studyList != null) {
        const studyListData_ = await fetchInterviewsStudyList(studyList);

        const studyListData = nullthrows(
          studyListData_,
          `Study list not found for key ${studyList}`,
        );

        const studyListQuestions = await fetchQuestionsByHash(
          studyListData.questionHashes,
        );

        return {
          filterNamespace: `study-list:${studyList}`,
          questions: studyListQuestions,
          title: studyListData.name,
          type: 'study-list',
          value: studyList,
        } as const;
      }

      if (framework) {
        const framework_ = framework as QuestionFramework;
        const frameworkQuestions =
          await fetchQuestionsListCodingForFramework(framework_);

        return {
          questions: frameworkQuestions,
          title: 'Framework',
          type: 'framework',
          value: framework_,
        } as const;
      }

      if (format) {
        const format_ = format as QuestionFormat;
        const { questions } = await fetchQuestionListForFormat(format_);

        return {
          questions,
          title: 'Format',
          type: 'format',
          value: format_,
        } as const;
      }

      const { questions: questionsCoding } = await fetchQuestionsListCoding();

      if (language) {
        const language_ = language as QuestionLanguage;
        const languageQuestions = questionsCoding.filter((metadata) =>
          metadata.languages.includes(language_),
        );

        return {
          questions: languageQuestions,
          title: 'Language',
          type: 'language',
          value: language_,
        } as const;
      }

      return {
        questions: questionsCoding,
        title: 'Coding questions',
        type: 'coding',
        value: 'all',
      } as const;
    }),
  getRecommendedStudyList: publicProcedure.query(async () => {
    const [blind75, gfe75, { questions }] = await Promise.all([
      fetchInterviewsStudyList('blind75'),
      fetchInterviewsStudyList('gfe75'),
      fetchQuestionsListSystemDesign('en-US'),
    ]);

    return {
      blind75: {
        listKey: blind75?.slug ?? '',
        questionCount: blind75?.questionHashes.length ?? 0,
      },
      gfe75: {
        listKey: gfe75?.slug ?? '',
        questionCount: gfe75?.questionHashes.length ?? 0,
      },
      systemDesignQuestionCount: questions.length,
    };
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
  getStudyListsSelectorData: publicProcedure.query(async () => {
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
        studyListKey: z.string(),
      }),
    )
    .mutation(async ({ input: { studyListKey }, ctx: { viewer } }) => {
      const existingSession = await prisma.learningSession.findFirst({
        where: {
          key: studyListKey,
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
        key: studyListKey,
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
