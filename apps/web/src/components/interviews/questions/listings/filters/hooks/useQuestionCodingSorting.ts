import { useState } from 'react';
import { useSessionStorage } from 'usehooks-ts';

import type { QuestionSortField } from '~/components/interviews/questions/common/QuestionsTypes';

type Props = Readonly<{
  namespace?: string;
}>;

export default function useQuestionCodingSorting(props?: Props) {
  const { namespace } = props || {};
  const [isAscendingOrderState, setIsAscendingOrderState] = useState(true);
  const [sortFieldState, setSortFieldState] =
    useState<QuestionSortField>('difficulty');
  const [isAscendingOrderSessionStorage, setIsAscendingOrderSessionStorage] =
    useSessionStorage<boolean>(`gfe:${namespace}:sort-isAscendingOrder`, true);
  const [sortFieldSessionStorage, setSortFieldSessionStorage] =
    useSessionStorage<QuestionSortField>(
      `gfe:${namespace}:sort-field`,
      'difficulty',
    );

  // Conditionally select which hook's state to use
  const sortField = namespace ? sortFieldSessionStorage : sortFieldState;
  const isAscendingOrder = namespace
    ? isAscendingOrderSessionStorage
    : isAscendingOrderState;
  const setSortField = namespace
    ? setSortFieldSessionStorage
    : setSortFieldState;
  const setIsAscendingOrder = namespace
    ? setIsAscendingOrderSessionStorage
    : setIsAscendingOrderState;
  const defaultSortFields: ReadonlyArray<{
    field: QuestionSortField;
    isAscendingOrder: boolean;
  }> = [
    { field: 'ranking', isAscendingOrder: true },
    { field: sortField, isAscendingOrder },
  ];
  const premiumSortFields: ReadonlyArray<{
    field: QuestionSortField;
    isAscendingOrder: boolean;
  }> = [{ field: 'premium', isAscendingOrder: true }];

  return {
    defaultSortFields,
    isAscendingOrder,
    premiumSortFields,
    setIsAscendingOrder,
    setSortField,
    sortField,
  };
}
