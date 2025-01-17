import { useState } from 'react';

import { useGreatStorageLocal } from '~/hooks/useGreatStorageLocal';

import type { QuestionImportance } from '~/components/interviews/questions/common/QuestionsTypes';
import { useIntl } from '~/components/intl';

import type { QuestionFilter } from '../QuestionFilterType';

type Props = Readonly<{
  namespace?: string;
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
  const [importanceState, setImportanceState] = useState(
    new Set<QuestionImportance>(),
  );
  const [importanceSessionStorage, setImportanceSessionStorage] =
    useGreatStorageLocal<Set<QuestionImportance>>(
      `qns:${namespace}:filter:importance`,
      new Set(),
      {
        ttl: 24 * 60 * 60,
      },
    );

  // Conditionally select which hook's state to use
  const importanceFilters = namespace
    ? importanceSessionStorage
    : importanceState;
  const setImportanceFilters = namespace
    ? setImportanceSessionStorage
    : setImportanceState;

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
    onClear: () => {
      setImportanceFilters(new Set());
    },
    options: IMPORTANCE_OPTIONS,
    setValues: setImportanceFilters,
  };

  return [importanceFilters, importanceFilterOptions];
}
