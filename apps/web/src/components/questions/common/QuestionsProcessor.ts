import type {
  QuestionDifficulty,
  QuestionImportance,
  QuestionMetadata,
  QuestionSortField,
} from './QuestionsTypes';

export const QuestionSortFields: ReadonlyArray<
  Readonly<{
    field: QuestionSortField;
    label: string;
  }>
> = [
  {
    field: 'title',
    label: 'Title',
  },
  {
    field: 'difficulty',
    label: 'Difficulty',
  },
  {
    field: 'duration',
    label: 'Duration',
  },
];

const DIFFICULTY_MAPPING: Record<QuestionDifficulty, number> = {
  easy: 1,
  hard: 3,
  medium: 2,
};

const IMPORTANCE_MAPPING: Record<QuestionImportance, number> = {
  high: 3,
  low: 1,
  mid: 2,
};

export function sortQuestions<T extends QuestionMetadata>(
  questions: ReadonlyArray<T>,
  field: QuestionSortField,
  isAscendingOrder = true,
): Array<T> {
  return questions.slice().sort((a, b) => {
    switch (field) {
      case 'title': {
        const comp = a.title.localeCompare(b.title);
        const value = comp !== 0 ? comp : a.duration - b.duration;

        return isAscendingOrder ? value : -value;
      }
      case 'difficulty': {
        const comp =
          DIFFICULTY_MAPPING[a.difficulty] - DIFFICULTY_MAPPING[b.difficulty];
        const value = comp !== 0 ? comp : a.duration - b.duration;

        return isAscendingOrder ? value : -value;
      }
      case 'duration': {
        const value = a.duration - b.duration;

        return isAscendingOrder ? value : -value;
      }
      case 'ranking': {
        const value = a.ranking - b.ranking;

        return isAscendingOrder ? value : -value;
      }
      case 'importance': {
        const value =
          IMPORTANCE_MAPPING[a.importance] - IMPORTANCE_MAPPING[b.importance];

        return isAscendingOrder ? value : -value;
      }
      case 'premium': {
        const value = Number(a.premium) - Number(b.premium);

        return isAscendingOrder ? value : -value;
      }
      case 'created': {
        const value = a.created - b.created;

        return isAscendingOrder ? -value : value;
      }
    }
  });
}

export function sortQuestionsMultiple<T extends QuestionMetadata>(
  questions: ReadonlyArray<T>,
  sortFields: ReadonlyArray<{
    field: QuestionSortField;
    isAscendingOrder: boolean;
  }>,
): ReadonlyArray<T> {
  let newQuestions = questions.slice();

  for (const { field, isAscendingOrder } of sortFields) {
    newQuestions = sortQuestions(newQuestions, field, isAscendingOrder);
  }

  return newQuestions;
}

export function filterQuestions<T extends QuestionMetadata>(
  questions: ReadonlyArray<T>,
  filters: ReadonlyArray<(question: T) => boolean>,
): ReadonlyArray<T> {
  return questions.filter((question) =>
    filters.every((filter) => filter(question)),
  );
}
