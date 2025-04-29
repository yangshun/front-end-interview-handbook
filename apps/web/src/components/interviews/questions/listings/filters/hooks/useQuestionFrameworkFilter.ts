import { useState } from 'react';

import { useGreatStorageLocal } from '~/hooks/useGreatStorageLocal';

import type { QuestionFramework } from '~/components/interviews/questions/common/QuestionsTypes';
import { QuestionFrameworkLabels } from '~/components/interviews/questions/common/QuestionsTypes';
import { useIntl } from '~/components/intl';

import type { QuestionFilter } from '../QuestionFilterType';

export const FRAMEWORK_OPTIONS: ReadonlyArray<QuestionFramework> = [
  'react',
  'vanilla',
  'angular',
  'svelte',
  'vue',
];

type Props = Readonly<{
  initialValue?: ReadonlyArray<QuestionFramework>;
  namespace?: string;
}>;

export default function useQuestionFrameworkFilter(
  props?: Props,
): [Set<QuestionFramework>, QuestionFilter<QuestionFramework>] {
  const { initialValue, namespace } = props || {};
  const intl = useIntl();
  const [frameworkState, setFrameworkState] = useState(
    new Set<QuestionFramework>(initialValue),
  );
  const [frameworkSessionStorage, setFrameworkSessionStorage] =
    useGreatStorageLocal<Set<QuestionFramework>>(
      `qns:${namespace}:filter:framework`,
      new Set(initialValue),
      {
        ttl: 24 * 60 * 60,
      },
    );

  // Conditionally select which hook's state to use
  const frameworkFilters = namespace ? frameworkSessionStorage : frameworkState;
  const setFrameworkFilters = namespace
    ? setFrameworkSessionStorage
    : setFrameworkState;

  const frameworkFilterOptions: QuestionFilter<QuestionFramework> = {
    id: 'framework',
    matches: (question) =>
      frameworkFilters.size === 0 ||
      question.metadata.frameworks.some((frameworkItem) =>
        frameworkFilters.has(frameworkItem.framework),
      ),
    name: intl.formatMessage({
      defaultMessage: 'Framework',
      description: 'Question framework',
      id: 'xbmWBx',
    }),
    onChange: (value) => {
      const newFrameworks = new Set(frameworkFilters);

      newFrameworks.has(value)
        ? newFrameworks.delete(value)
        : newFrameworks.add(value);
      setFrameworkFilters(newFrameworks);
    },
    onClear: () => {
      setFrameworkFilters(new Set());
    },
    options: FRAMEWORK_OPTIONS.map((value) => ({
      label: QuestionFrameworkLabels[value],
      value,
    })),
    setValues: setFrameworkFilters,
  };

  return [frameworkFilters, frameworkFilterOptions];
}
