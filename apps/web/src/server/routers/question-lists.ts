import nullthrows from 'nullthrows';
import { z } from 'zod';

import {
  getQuestionFormatsData,
  getQuestionFrameworksData,
  getQuestionLanguagesData,
} from '~/data/QuestionCategories';

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
  fetchQuestionsListCodingForLanguage,
  fetchQuestionsListSystemDesign,
} from '~/db/QuestionsListReader';
import { fetchStudyListsSelectorData } from '~/db/StudyListUtils';
import { getIntlClientOnly } from '~/i18n/getIntlClientOnly';
import prisma from '~/server/prisma';

import { publicProcedure, router, userProcedure } from '../trpc';

export const questionListsRouter = router({
  getActiveSession: userProcedure
    .input(
      z.object({
        studyListKey: z.string(),
      }),
    )
    .query(async ({ input: { studyListKey }, ctx: { viewer } }) => {
      const session = await prisma.learningSession.findFirst({
        include: {
          progress: true,
        },
        where: {
          key: studyListKey,
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
      const intl = await getIntlClientOnly('en-US');

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
          listType: {
            type: 'study-list',
            value: studyList,
          },
          questions: studyListQuestions,
          title: studyListData.name,
        } as const;
      }

      if (framework) {
        const framework_ = framework as QuestionFramework;
        const frameworksData = getQuestionFrameworksData(intl);
        const frameworkQuestions =
          await fetchQuestionsListCodingForFramework(framework_);

        return {
          listType: {
            type: 'framework',
            value: framework_,
          },
          questions: frameworkQuestions,
          title: frameworksData[framework_].label,
        } as const;
      }

      if (format) {
        const format_ = format as QuestionFormat;
        const formatData = getQuestionFormatsData(intl);
        const { questions } = await fetchQuestionListForFormat(format_);

        return {
          listType: {
            type: 'format',
            value: format_,
          },
          questions,
          title: formatData[format_].label,
        } as const;
      }

      if (language) {
        const language_ = language as QuestionLanguage;
        const languagesData = getQuestionLanguagesData(intl);
        const languageQuestions =
          await fetchQuestionsListCodingForLanguage(language_);

        return {
          listType: {
            type: 'language',
            value: language_,
          },
          questions: languageQuestions,
          title: languagesData[language_].label,
        } as const;
      }

      const { questions: questionsCoding } = await fetchQuestionsListCoding();

      return {
        listType: {
          type: 'coding',
          value: 'all',
        },
        questions: questionsCoding,
        title: 'Coding questions',
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
        questionCount: blind75?.questionHashes.length ?? 0,
        studyListKey: blind75?.slug ?? '',
      },
      gfe75: {
        questionCount: gfe75?.questionHashes.length ?? 0,
        studyListKey: gfe75?.slug ?? '',
      },
      systemDesignQuestionCount: questions.length,
    };
  }),
  getSessionProgress: userProcedure
    .input(
      z.object({
        studyListKey: z.string(),
      }),
    )
    .query(async ({ input: { studyListKey }, ctx: { viewer } }) => {
      const session = await prisma.learningSession.findFirst({
        where: {
          key: studyListKey,
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
