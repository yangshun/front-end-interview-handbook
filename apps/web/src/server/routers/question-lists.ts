import nullthrows from 'nullthrows';
import { z } from 'zod';

import {
  getQuestionFormatsData,
  getQuestionFrameworksData,
  getQuestionLanguagesData,
} from '~/data/QuestionCategories';

import type { QuestionFormatForList } from '~/components/interviews/questions/common/QuestionHrefUtils';
import { QuestionListTypeDefault } from '~/components/interviews/questions/common/QuestionHrefUtils';
import type { QuestionCompany } from '~/components/interviews/questions/common/QuestionsTypes';
import {
  QuestionCompanies,
  type QuestionFramework,
  type QuestionLanguage,
} from '~/components/interviews/questions/common/QuestionsTypes';

import { fetchInterviewsStudyList } from '~/db/contentlayer/InterviewsStudyListReader';
import {
  fetchQuestionListForFormat,
  fetchQuestionsByHash,
  fetchQuestionsListCoding,
  fetchQuestionsListCodingForFramework,
  fetchQuestionsListCodingForLanguage,
  fetchQuestionsListQuizForCompany,
  fetchQuestionsListSystemDesign,
} from '~/db/QuestionsListReader';
import { fetchQuestionLists } from '~/db/QuestionsListUtils';
import { getIntlClientOnly } from '~/i18n/getIntlClientOnly';

import { publicProcedure, router } from '../trpc';

export const questionListsRouter = router({
  get: publicProcedure.query(async () => {
    const intl = await getIntlClientOnly('en-US');

    return await fetchQuestionLists(intl);
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

        if (QuestionCompanies.includes(studyList as QuestionCompany)) {
          const studyListQuestions = await fetchQuestionsListQuizForCompany(
            studyList as QuestionCompany,
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

        const studyListQuestions = await fetchQuestionsByHash(
          studyListData?.questionHashes ?? [],
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
        const format_ = format as QuestionFormatForList;
        const formatData = getQuestionFormatsData(intl);
        const { questions } = await fetchQuestionListForFormat(format_);

        return {
          listType: {
            type: 'format',
            value: format_,
          },
          questions,
          title:
            format_ === 'coding'
              ? intl.formatMessage({
                  defaultMessage: 'Coding',
                  description: 'Question format',
                  id: 'eJU0PN',
                })
              : formatData[format_].label,
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
        listType: QuestionListTypeDefault,
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
        questionCount: (blind75?.questionHashes ?? []).length ?? 0,
        studyListKey: blind75?.slug ?? '',
      },
      gfe75: {
        questionCount: (gfe75?.questionHashes ?? []).length ?? 0,
        studyListKey: gfe75?.slug ?? '',
      },
      systemDesignQuestionCount: questions.length,
    };
  }),
});
