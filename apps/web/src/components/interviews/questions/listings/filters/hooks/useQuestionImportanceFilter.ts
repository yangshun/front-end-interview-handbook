import { useIntl } from 'react-intl';

import useSessionStorageForSets from '~/hooks/useSessionStorageForSets';

import type { QuestionImportance } from '~/components/interviews/questions/common/QuestionsTypes';

import type { QuestionFilter } from '../QuestionFilterType';

type Props = Readonly<{
  namespace: string;
}>;

export default function useQuestionImportanceFilter({
  namespace,
}: Props): [Set<QuestionImportance>, QuestionFilter<QuestionImportance>] {
  const intl = useIntl();
  const IMPORTANCE_OPTIONS: ReadonlyArray<{
    label: string;
    value: QuestionImportance;
  }> = [
    {
      label: intl.formatMessage({
        defaultMessage: 'Low',
        description: 'Low importance question',
        id: 'ANSxyW',
      }),
      value: 'low',
    },
    {
      label: intl.formatMessage({
        defaultMessage: 'Medium',
        description: 'Medium importance question',
        id: 'ayZIpd',
      }),
      value: 'medium',
    },
    {
      label: intl.formatMessage({
        defaultMessage: 'High',
        description: 'High importance question',
        id: 'AkAu0m',
      }),
      value: 'high',
    },
  ];
  const [importanceFilters, setImportanceFilters] =
    useSessionStorageForSets<QuestionImportance>(
      `gfe:${namespace}:importance-filter`,
      new Set(),
    );
  const importanceFilterOptions: QuestionFilter<QuestionImportance> = {
    id: 'importance',
    matches: (question) =>
      importanceFilters.size === 0 ||
      importanceFilters.has(question.importance),
    name: intl.formatMessage({
      defaultMessage: 'Importance',
      description: 'Question importance',
      id: 'CQ3Vef',
    }),
    onChange: (value) => {
      const newImportance = new Set(importanceFilters);

      newImportance.has(value)
        ? newImportance.delete(value)
        : newImportance.add(value);
      setImportanceFilters(newImportance);
    },
    options: IMPORTANCE_OPTIONS,
  };

  return [importanceFilters, importanceFilterOptions];
}
