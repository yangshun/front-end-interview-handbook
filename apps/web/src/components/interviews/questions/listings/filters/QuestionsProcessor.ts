import { find, groupBy, sumBy } from 'lodash-es';

import type {
  InterviewsQuestionItemMinimal,
  QuestionAccess,
  QuestionDifficulty,
  QuestionFormat,
  QuestionFramework,
  QuestionImportance,
  QuestionLanguage,
  QuestionSlug,
  QuestionSortField,
  QuestionTopic,
} from '../../common/QuestionsTypes';

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
  medium: 2,
};

export function sortQuestions<T extends InterviewsQuestionItemMinimal>(
  questions: ReadonlyArray<T>,
  field: QuestionSortField,
  isAscendingOrder = true,
): Array<T> {
  if (field === 'default') {
    return questions.slice();
  }

  return questions.slice().sort((a, b) => {
    switch (field) {
      case 'title': {
        const comp = a.info.title.localeCompare(b.info.title);
        const value =
          comp !== 0 ? comp : a.metadata.duration - b.metadata.duration;

        return isAscendingOrder ? value : -value;
      }
      case 'difficulty': {
        const comp =
          DIFFICULTY_MAPPING[a.metadata.difficulty] -
          DIFFICULTY_MAPPING[b.metadata.difficulty];
        const value =
          comp !== 0 ? comp : a.metadata.duration - b.metadata.duration;

        return isAscendingOrder ? value : -value;
      }
      case 'duration': {
        const value = a.metadata.duration - b.metadata.duration;

        return isAscendingOrder ? value : -value;
      }
      case 'ranking': {
        const value = a.metadata.ranking - b.metadata.ranking;

        return isAscendingOrder ? value : -value;
      }
      case 'importance': {
        const value: number =
          IMPORTANCE_MAPPING[a.metadata.importance] -
          IMPORTANCE_MAPPING[b.metadata.importance];

        return isAscendingOrder ? value : -value;
      }
      case 'premium': {
        const value =
          Number(a.metadata.access === 'premium') -
          Number(b.metadata.access === 'premium');

        return isAscendingOrder ? value : -value;
      }
      case 'created': {
        const value = a.metadata.created - b.metadata.created;

        return isAscendingOrder ? -value : value;
      }
    }
  });
}

export function sortQuestionsMultiple<T extends InterviewsQuestionItemMinimal>(
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

export function filterQuestions<T extends InterviewsQuestionItemMinimal>(
  questions: ReadonlyArray<T>,
  filters: ReadonlyArray<(question: T) => boolean>,
): ReadonlyArray<T> {
  return questions.filter((question) =>
    filters.every((filter) => filter(question)),
  );
}

export function countQuestionsByAccess<T extends InterviewsQuestionItemMinimal>(
  questions: ReadonlyArray<T>,
): Record<QuestionAccess, number> {
  const grouped = groupBy(questions, ({ metadata }) => metadata.access);

  return {
    free: grouped.free?.length ?? 0,
    premium: grouped.premium?.length ?? 0,
    standard: grouped.standard?.length ?? 0,
  };
}

export function countQuestionsTotalDurationMins<
  T extends InterviewsQuestionItemMinimal,
>(questions: ReadonlyArray<T>): number {
  return sumBy(questions, ({ metadata }) => metadata.duration);
}

export function countQuestionsCompletionByDifficulty<
  T extends InterviewsQuestionItemMinimal,
>(
  questions: ReadonlyArray<T>,
  questionsProgress: ReadonlyArray<
    Readonly<{ format: string; id: string; slug: QuestionSlug }>
  > | null,
): Record<QuestionDifficulty, { completed: number; total: number }> {
  const result: Record<
    QuestionDifficulty,
    { completed: number; total: number }
  > = {
    easy: { completed: 0, total: 0 },
    hard: { completed: 0, total: 0 },
    medium: { completed: 0, total: 0 },
  };

  // Categorize questions by difficulty
  questions.forEach((question) => {
    const { difficulty } = question.metadata;

    result[difficulty].total += 1;
  });

  // Categorize progress by difficulty
  questionsProgress?.forEach((progress) => {
    const question = find(
      questions,
      ({ metadata }) => metadata.slug === progress.slug,
    );

    if (question) {
      const { difficulty } = question.metadata;

      result[difficulty].completed += 1;
    }
  });

  return result;
}

// Union of metadata attributes for a list of questions,
// useful for showing only the relevant options
// for the current list of questions.
export type QuestionsListAttributesUnion = Readonly<{
  difficulty: Set<QuestionDifficulty>;
  formats: Set<QuestionFormat>;
  frameworks: Set<QuestionFramework>;
  importance: Set<QuestionImportance>;
  languages: Set<QuestionLanguage>;
  topics: Set<QuestionTopic>;
}>;

export function tabulateQuestionsAttributesUnion<
  T extends InterviewsQuestionItemMinimal,
>(questions: ReadonlyArray<T>): QuestionsListAttributesUnion {
  const values = {
    difficulty: new Set<QuestionDifficulty>(),
    formats: new Set<QuestionFormat>(),
    frameworks: new Set<QuestionFramework>(),
    importance: new Set<QuestionImportance>(),
    languages: new Set<QuestionLanguage>(),
    topics: new Set<QuestionTopic>(),
  };

  questions.forEach(({ metadata }) => {
    values.difficulty.add(metadata.difficulty);
    values.formats.add(metadata.format);
    metadata.frameworks.forEach(({ framework }) => {
      values.frameworks.add(framework);
    });
    values.importance.add(metadata.importance);
    metadata.languages.forEach((language) => {
      values.languages.add(language);
    });
    metadata.topics.forEach((topic) => {
      values.topics.add(topic);
    });
  });

  return values;
}
