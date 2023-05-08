import { useIntl } from 'react-intl';

import useSessionStorageForSets from '~/hooks/useSessionStorageForSets';

import type { QuestionFilter } from './QuestionFilterType';
import type { QuestionUserFacingFormat } from '../common/QuestionsTypes';
type QuestionCompletionStatus = 'completed' | 'incomplete';

type Props = Readonly<{
  userFacingFormat: QuestionUserFacingFormat;
}>;

export default function useQuestionCompletionStatusFilter({
  userFacingFormat,
}: Props): [
  Set<QuestionCompletionStatus>,
  QuestionFilter<QuestionCompletionStatus>,
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
        defaultMessage: 'Not Completed',
        description: 'Incomplete status for a question',
        id: 'BNUAPJ',
      }),
      value: 'incomplete',
    },
  ];

  const [completionStatusFilters, setCompletionStatusFilters] =
    useSessionStorageForSets<QuestionCompletionStatus>(
      `gfe:${userFacingFormat}:completion-status-filter`,
      new Set(),
    );
  const completionStatusFilterOptions: QuestionFilter<QuestionCompletionStatus> =
    {
      id: 'completion',
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
      options: COMPLETION_STATUS_OPTIONS,
    };

  return [completionStatusFilters, completionStatusFilterOptions];
}
