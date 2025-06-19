import nullthrows from 'nullthrows';
import { z } from 'zod';

import {
  getQuestionFormatsData,
  getQuestionFrameworksData,
  getQuestionLanguagesData,
} from '~/data/QuestionCategories';

import { QuestionListTypeDefault } from '~/components/interviews/questions/common/QuestionHrefUtils';
import type {
  QuestionCompany,
  QuestionFormatForList,
  QuestionListTypeData,
  QuestionListTypeDataFilters,
  QuestionPracticeFormat,
} from '~/components/interviews/questions/common/QuestionsTypes';
import {
  QuestionCompanies,
  type QuestionFramework,
  type QuestionLanguage,
} from '~/components/interviews/questions/common/QuestionsTypes';

import { fetchInterviewsStudyList } from '~/db/contentlayer/InterviewsStudyListReader';
import {
  fetchQuestionsList,
  fetchQuestionsListByHash,
  fetchQuestionsListForCompany,
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
        filters: z
          .object({
            formats: z.array(z.string()).optional(),
          })
          .nullable()
          .optional(),
        format: z.string().nullable().optional(),
        framework: z.string().nullable().optional(),
        language: z.string().nullable().optional(),
        practice: z.string().nullable().optional(),
        studyList: z.string().nullable().optional(),
        tab: z.string().nullable().optional(),
        title: z.string().nullable().optional(),
      }),
    )
    .query(
      async ({
        input: {
          filters: filtersInput,
          format,
          framework,
          language,
          practice,
          studyList,
          tab: tabInput,
          title,
        },
      }) => {
        const intl = await getIntlClientOnly('en-US');
        const tab =
          tabInput != null ? (tabInput as QuestionPracticeFormat) : undefined;
        const filters =
          filtersInput != null
            ? (filtersInput as QuestionListTypeDataFilters)
            : undefined;

        if (studyList != null) {
          const studyListData_ = await fetchInterviewsStudyList(studyList);

          const studyListData = nullthrows(
            studyListData_,
            `Study list not found for key ${studyList}`,
          );

          const listType: QuestionListTypeData = {
            type: 'study-list',
            value: studyList,
          } as const;

          if (QuestionCompanies.includes(studyList as QuestionCompany)) {
            const studyListQuestions = await fetchQuestionsListForCompany(
              studyList as QuestionCompany,
            );

            return {
              listType,
              questions: studyListQuestions,
              title: studyListData.name,
            } as const;
          }

          const studyListQuestions = await fetchQuestionsListByHash(
            studyListData?.questionHashes ?? [],
          );

          return {
            listType,
            questions: studyListQuestions,
            title: studyListData.name,
          } as const;
        }

        if (framework) {
          const framework_ = framework as QuestionFramework;
          const frameworksData = getQuestionFrameworksData(intl);
          const listType: QuestionListTypeData = {
            filters,
            tab,
            title: title ?? undefined,
            type: 'framework',
            value: framework_,
          } as const;
          const { questions } = await fetchQuestionsList(listType);

          return {
            listType,
            questions,
            title: frameworksData[framework_].label,
          } as const;
        }

        if (format) {
          const format_ = format as QuestionFormatForList;
          const formatData = getQuestionFormatsData(intl);
          const listType: QuestionListTypeData = {
            type: 'format',
            value: format_,
          } as const;

          const { questions } = await fetchQuestionsList(listType);
          const codingLabel = intl.formatMessage({
            defaultMessage: 'Coding',
            description: 'Question format',
            id: 'eJU0PN',
          });

          return {
            listType,
            questions,
            title:
              format_ === 'coding' ? codingLabel : formatData[format_].label,
          } as const;
        }

        if (language) {
          const language_ = language as QuestionLanguage;
          const languagesData = getQuestionLanguagesData(intl);
          const listType: QuestionListTypeData = {
            filters,
            tab,
            title: title ?? undefined,
            type: 'language',
            value: language_,
          } as const;
          const { questions } = await fetchQuestionsList(listType);

          return {
            listType,
            questions,
            title: languagesData[language_].label,
          } as const;
        }

        const allPracticeQuestionsLabel = intl.formatMessage({
          defaultMessage: 'All practice questions',
          description: 'Question list',
          id: 'AbV98R',
        });

        if (practice) {
          const listType: QuestionListTypeData = {
            tab,
            type: 'practice',
            value: 'practice',
          } as const;
          const { questions } = await fetchQuestionsList(listType);

          return {
            listType,
            questions,
            title: allPracticeQuestionsLabel,
          } as const;
        }

        const { questions: questionsCoding } = await fetchQuestionsList(
          QuestionListTypeDefault,
        );

        return {
          listType: QuestionListTypeDefault,
          questions: questionsCoding,
          title: allPracticeQuestionsLabel,
        } as const;
      },
    ),
  getRecommendedStudyList: publicProcedure.query(async () => {
    const [blind75, gfe75, { questions }] = await Promise.all([
      fetchInterviewsStudyList('blind75'),
      fetchInterviewsStudyList('gfe75'),
      fetchQuestionsList({ type: 'format', value: 'system-design' }, 'en-US'),
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
