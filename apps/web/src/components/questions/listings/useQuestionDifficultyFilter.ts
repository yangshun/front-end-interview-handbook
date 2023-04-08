import { useIntl } from 'react-intl';

import { useUserPreferencesState } from '~/components/global/UserPreferencesProvider';

import type { QuestionFilter } from './QuestionFilterType';
import type { QuestionCategory } from './types';
import type {
  QuestionDifficulty,
} from '../common/QuestionsTypes';

type Props = Readonly<{
  category: QuestionCategory;
}>;

export default function useQuestionDifficultyFilter({
  category,
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
  const [difficultyFilters, setDifficultyFilters] = useUserPreferencesState<
    Set<QuestionDifficulty>
  >(`${category}DifficultyFilters`, new Set());

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
