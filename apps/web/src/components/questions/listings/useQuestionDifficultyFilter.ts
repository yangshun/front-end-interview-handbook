import { useState } from 'react';

import type { QuestionFilter } from './QuestionFilterType';
import type { QuestionDifficulty } from '../common/QuestionsTypes';

const DIFFICULTY_OPTIONS: ReadonlyArray<{
  label: string;
  value: QuestionDifficulty;
}> = [
  { label: 'Easy', value: 'easy' },
  { label: 'Medium', value: 'medium' },
  { label: 'Hard', value: 'hard' },
];

export default function useQuestionDifficultyFilter(): [
  Set<QuestionDifficulty>,
  QuestionFilter<QuestionDifficulty>,
] {
  const [difficultyFilters, setDifficultyFilters] = useState<
    Set<QuestionDifficulty>
  >(new Set());

  const difficultyFilterOptions: QuestionFilter<QuestionDifficulty> = {
    id: 'difficulty',
    name: 'Difficulty',
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
