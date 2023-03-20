import type { QuestionMetadata } from '~/components/questions/common/QuestionsTypes';

import { useQuery } from '@tanstack/react-query';

export function useQueryQuestionListCoding() {
  return useQuery({
    queryFn: async () => {
      const res = await fetch('/api/questions/coding');

      return (await res.json()) as ReadonlyArray<QuestionMetadata>;
    },
    queryKey: ['questionsListCoding'],
  });
}
