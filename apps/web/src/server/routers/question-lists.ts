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
  fetchQuestionsListQuizForCompany,
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
        practice: z.string().nullable().optional(),
        studyList: z.string().nullable().optional(),
        tab: z.string().nullable().optional(),
      }),
    )
    .query(
      async ({
        input: {
          practice,
          format,
          framework,
          language,
          studyList,
          tab: tabInput,
        },
      }) => {
        const intl = await getIntlClientOnly('en-US');
        const tab =
          tabInput != null ? (tabInput as QuestionPracticeFormat) : undefined;

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
                tab: undefined,
                type: 'study-list',
                value: studyList,
              },
              questions: studyListQuestions,
              title: studyListData.name,
            } as const;
          }

          const studyListQuestions = await fetchQuestionsListByHash(
            studyListData?.questionHashes ?? [],
          );

          return {
            listType: {
              tab,
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
          const { questions, tabs } = await fetchQuestionsList({
            tab,
            type: 'framework',
            value: framework_,
          });

          return {
            listType: {
              tab,
              type: 'framework',
              value: framework_,
            },
            questions,
            tabs,
            title: frameworksData[framework_].label,
          } as const;
        }

        if (format) {
          const format_ = format as QuestionFormatForList;
          const formatData = getQuestionFormatsData(intl);
          const { questions, tabs } = await fetchQuestionsList({
            type: 'format',
            value: format_,
          });
          const codingLabel = intl.formatMessage({
            defaultMessage: 'Coding',
            description: 'Question format',
            id: 'eJU0PN',
          });

          return {
            listType: {
              tab,
              type: 'format',
              value: format_,
            },
            questions,
            tabs,
            title:
              format_ === 'coding' ? codingLabel : formatData[format_].label,
          } as const;
        }

        if (language) {
          const language_ = language as QuestionLanguage;
          const languagesData = getQuestionLanguagesData(intl);
          const { questions, tabs } = await fetchQuestionsList({
            tab,
            type: 'language',
            value: language_,
          });

          return {
            listType: {
              tab,
              type: 'language',
              value: language_,
            },
            questions,
            tabs,
            title: languagesData[language_].label,
          } as const;
        }

        const allPracticeQuestionsLabel = intl.formatMessage({
          defaultMessage: 'All practice questions',
          description: 'Question list',
          id: 'AbV98R',
        });

        if (practice) {
          const { questions, tabs } = await fetchQuestionsList({
            tab,
            type: 'practice',
            value: 'practice',
          });

          return {
            listType: {
              tab,
              type: 'practice',
              value: 'practice',
            },
            questions,
            tabs,
            title: allPracticeQuestionsLabel,
          } as const;
        }

        const { questions: questionsCoding, tabs } = await fetchQuestionsList({
          tab: 'coding',
          type: 'practice',
          value: 'practice',
        });

        return {
          listType: QuestionListTypeDefault,
          questions: questionsCoding,
          tabs,
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
