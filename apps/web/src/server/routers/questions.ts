import type { QuestionMetadata } from '~/components/interviews/questions/common/QuestionsTypes';

import { fetchQuestionsListCoding } from '~/db/QuestionsListReader';

import { publicProcedure, router } from '../trpc';

export const questionsRouter = router({
  coding: publicProcedure.query(async () => {
    const { questions } = await fetchQuestionsListCoding();

    return questions as ReadonlyArray<QuestionMetadata>;
  }),
});
