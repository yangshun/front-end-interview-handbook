import { useSearchParams } from 'next/navigation';

import { trpc } from '~/hooks/trpc';

export default function useQuestionsListDataForType(studyListKey?: string) {
  const searchParams = useSearchParams();

  const { isLoading, data } = trpc.questionLists.getQuestions.useQuery({
    format: searchParams?.get('format'),
    framework: searchParams?.get('framework'),
    language: searchParams?.get('language'),
    studyList: studyListKey,
  });

  if (isLoading) {
    return { data: undefined, isLoading };
  }

  return { data, isLoading };
}
