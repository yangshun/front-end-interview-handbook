import { useIntl } from 'react-intl';

import useSessionStorageForSets from '~/hooks/useSessionStorageForSets';

import type {
  QuestionCompletionStatus,
  QuestionMetadataWithCompletedStatus,
} from '~/components/interviews/questions/common/QuestionsTypes';

import type { QuestionFilter } from '../QuestionFilterType';

type Props = Readonly<{
  namespace: string;
}>;

export default function useQuestionCompletionStatusFilter({
  namespace,
}: Props): [
  Set<QuestionCompletionStatus>,
  QuestionFilter<QuestionCompletionStatus, QuestionMetadataWithCompletedStatus>,
] {
  const intl = useIntl();
  const COMPLETION_STATUS_OPTIONS: ReadonlyArray<{
    label: string;
    value: QuestionCompletionStatus;
  }> = [
    {
      label: intl.formatMessage({
        defaultMessage: 'Completed',
        description: 'Completed status for a question',
        id: 'ZN/wJM',
      }),
      value: 'completed',
    },
    {
      label: intl.formatMessage({
        defaultMessage: 'Not completed',
        description: 'Incomplete status for a question',
        id: 'I872jM',
      }),
      value: 'incomplete',
    },
  ];

  const [completionStatusFilters, setCompletionStatusFilters] =
    useSessionStorageForSets<QuestionCompletionStatus>(
      `gfe:${namespace}:completion-status-filter`,
      new Set(),
    );

  const completionStatusFilterOptions: QuestionFilter<
    QuestionCompletionStatus,
    QuestionMetadataWithCompletedStatus
  > = {
    id: 'completion',
    matches: (question) =>
      completionStatusFilters.size === 0 ||
      (completionStatusFilters.has('completed') && question.isCompleted) ||
      (completionStatusFilters.has('incomplete') && !question.isCompleted),
    name: intl.formatMessage({
      defaultMessage: 'Progress',
      description: 'Completion status',
      id: '7kN2mI',
    }),
    onChange: (value) => {
      const newCompletion = new Set(completionStatusFilters);

      newCompletion.has(value)
        ? newCompletion.delete(value)
        : newCompletion.add(value);
      setCompletionStatusFilters(newCompletion);
    },
    onClear: () => {
      setCompletionStatusFilters(new Set());
    },
    options: COMPLETION_STATUS_OPTIONS,
  };

  return [completionStatusFilters, completionStatusFilterOptions];
}
