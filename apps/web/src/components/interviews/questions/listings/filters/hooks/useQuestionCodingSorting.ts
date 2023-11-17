import { useState } from 'react';

import type { QuestionSortField } from '../../../common/QuestionsTypes';

export default function useQuestionCodingSorting() {
  const [isAscendingOrder, setIsAscendingOrder] = useState(true);
  const [sortField, setSortField] = useState<QuestionSortField>('difficulty');
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
