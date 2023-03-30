import { useState } from 'react';
import { useIntl } from 'react-intl';

import type { QuestionFilter } from './QuestionFilterType';
import type { QuestionDifficulty } from '../common/QuestionsTypes';

export default function useQuestionDifficultyFilter(): [
  Set<QuestionDifficulty>,
  QuestionFilter<QuestionDifficulty>,
] {
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
  const [difficultyFilters, setDifficultyFilters] = useState<
    Set<QuestionDifficulty>
  >(new Set());
  const difficultyFilterOptions: QuestionFilter<QuestionDifficulty> = {
    id: 'difficulty',
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
    options: DIFFICULTY_OPTIONS,
  };

  return [difficultyFilters, difficultyFilterOptions];
}
