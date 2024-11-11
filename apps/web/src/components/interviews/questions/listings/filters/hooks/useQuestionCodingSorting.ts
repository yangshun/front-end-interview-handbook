import { useState } from 'react';
import { useSessionStorage } from 'usehooks-ts';

import type { QuestionSortField } from '~/components/interviews/questions/common/QuestionsTypes';

type Props = Readonly<{
  defaultSortField: QuestionSortField;
  filterNamespace?: string;
}>;

export default function useQuestionCodingSorting(props?: Props) {
  const { defaultSortField, filterNamespace } = props || {
    defaultSortField: 'default',
  };
  const [isAscendingOrderState, setIsAscendingOrderState] = useState(true);
  const [sortFieldState, setSortFieldState] =
    useState<QuestionSortField>(defaultSortField);
  const [isAscendingOrderSessionStorage, setIsAscendingOrderSessionStorage] =
    useSessionStorage<boolean>(
      `gfe:${filterNamespace}:sort-isAscendingOrder`,
      true,
    );
  const [sortFieldSessionStorage, setSortFieldSessionStorage] =
    useSessionStorage<QuestionSortField>(
      `gfe:${filterNamespace}:sort-field`,
      defaultSortField,
    );

  // Conditionally select which hook's state to use
  const sortField = filterNamespace ? sortFieldSessionStorage : sortFieldState;
  const isAscendingOrder = filterNamespace
    ? isAscendingOrderSessionStorage
    : isAscendingOrderState;
  const setSortField = filterNamespace
    ? setSortFieldSessionStorage
    : setSortFieldState;
  const setIsAscendingOrder = filterNamespace
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
