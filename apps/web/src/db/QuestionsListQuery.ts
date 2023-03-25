import type { QuestionMetadata } from '~/components/questions/common/QuestionsTypes';

import { useQuery } from '@tanstack/react-query';

export function useQueryQuestionListCoding() {
  return useQuery({
    queryFn: async () => {
      const res = await fetch('/api/questions/coding');
      const { questions } = await res.json();

      return questions as ReadonlyArray<QuestionMetadata>;
    },
    queryKey: ['questionsListCoding'],
  });
}
