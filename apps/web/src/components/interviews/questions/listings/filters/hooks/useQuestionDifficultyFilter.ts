import { useState } from 'react';

import useSessionStorageForSets from '~/hooks/useSessionStorageForSets';

import type { QuestionDifficulty } from '~/components/interviews/questions/common/QuestionsTypes';
import { useIntl } from '~/components/intl';

import type { QuestionFilter } from '../QuestionFilterType';

type Props = Readonly<{
  namespace?: string;
}>;

export default function useQuestionDifficultyFilter({
  namespace,
}: Props): [Set<QuestionDifficulty>, QuestionFilter<QuestionDifficulty>] {
  const intl = useIntl();
  const DIFFICULTY_OPTIONS: ReadonlyArray<{
    label: string;
    value: QuestionDifficulty;
  }> = [
    {
      label: intl.formatMessage({
        defaultMessage: 'Easy',
        description: 'Easy difficulty question',
        id: 'MNgJK6',
      }),
      value: 'easy',
    },
    {
      label: intl.formatMessage({
        defaultMessage: 'Medium',
        description: 'Medium difficulty question',
        id: 'GiSp0E',
      }),
      value: 'medium',
    },
    {
      label: intl.formatMessage({
        defaultMessage: 'Hard',
        description: 'Hard difficulty question',
        id: 'mNb3b2',
      }),
      value: 'hard',
    },
  ];
  const [difficultyState, setDifficultyState] = useState(
    new Set<QuestionDifficulty>(),
  );
  const [difficultySessionStorage, setDifficultySessionStorage] =
    useSessionStorageForSets<QuestionDifficulty>(
      `gfe:${namespace}:difficulty-filter`,
      new Set(),
    );

  // Conditionally select which hook's state to use
  const difficultyFilters = namespace
    ? difficultySessionStorage
    : difficultyState;
  const setDifficultyFilters = namespace
    ? setDifficultySessionStorage
    : setDifficultyState;

  const difficultyFilterOptions: QuestionFilter<QuestionDifficulty> = {
    id: 'difficulty',
    matches: (question) =>
      difficultyFilters.size === 0 ||
      difficultyFilters.has(question.difficulty),
    name: intl.formatMessage({
      defaultMessage: 'Difficulty',
      description: 'Question difficulty',
      id: 'ULuy8I',
    }),
    onChange: (value) => {
      const newDifficulties = new Set(difficultyFilters);

      newDifficulties.has(value)
        ? newDifficulties.delete(value)
        : newDifficulties.add(value);
      setDifficultyFilters(newDifficulties);
    },
    onClear: () => {
      setDifficultyFilters(new Set());
    },
    options: DIFFICULTY_OPTIONS,
    setValues: setDifficultyFilters,
  };

  return [difficultyFilters, difficultyFilterOptions];
}
