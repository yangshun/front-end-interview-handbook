import { useIntl } from 'react-intl';

import useSessionStorageForSets from '~/hooks/useSessionStorageForSets';

import type { QuestionDifficulty } from '~/components/interviews/questions/common/QuestionsTypes';

import type { QuestionFilter } from '../QuestionFilterType';

type Props = Readonly<{
  namespace: string;
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
  const [difficultyFilters, setDifficultyFilters] =
    useSessionStorageForSets<QuestionDifficulty>(
      `gfe:${namespace}:difficulty-filter`,
      new Set(),
    );
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
  };

  return [difficultyFilters, difficultyFilterOptions];
}
