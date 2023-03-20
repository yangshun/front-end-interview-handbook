import { useState } from 'react';

import type { QuestionFilter } from './QuestionFilterType';

type QuestionCompletionStatus = 'completed' | 'incomplete';

const COMPLETION_STATUS_OPTIONS: ReadonlyArray<{
  label: string;
  value: QuestionCompletionStatus;
}> = [
  { label: 'Completed', value: 'completed' },
  { label: 'Not Completed', value: 'incomplete' },
];

export default function useQuestionCompletionStatusFilter(): [
  Set<QuestionCompletionStatus>,
  QuestionFilter<QuestionCompletionStatus>,
] {
  const [completionStatusFilters, setCompletionStatusFilters] = useState<
    Set<QuestionCompletionStatus>
  >(new Set());

  const completionStatusFilterOptions: QuestionFilter<QuestionCompletionStatus> =
    {
      id: 'completion',
      name: 'Status',
      onChange: (value) => {
        const newCompletion = new Set(completionStatusFilters);

        newCompletion.has(value)
          ? newCompletion.delete(value)
          : newCompletion.add(value);
        setCompletionStatusFilters(newCompletion);
      },
      options: COMPLETION_STATUS_OPTIONS,
    };

  return [completionStatusFilters, completionStatusFilterOptions];
}
