import type { ProjectsChallengeItem } from '~/components/projects/challenges/types';
import type {
  ProjectsChallengesDifficulty,
  ProjectsSortField,
} from '~/components/projects/types';

const DIFFICULTY_MAPPING: Record<ProjectsChallengesDifficulty, number> = {
  mid: 2,
  nightmare: 4,
  senior: 3,
  starter: 1,
};

export function filterProjectsChallenges<T extends ProjectsChallengeItem>(
  projects: ReadonlyArray<T>,
  filters: ReadonlyArray<(project: T) => boolean>,
): ReadonlyArray<T> {
  return projects.filter((project) =>
    filters.every((filter) => filter(project)),
  );
}
export function sortProjectsChallenges<T extends ProjectsChallengeItem>(
  projects: ReadonlyArray<T>,
  field: ProjectsSortField,
  isAscendingOrder = true,
): Array<T> {
  return projects.slice().sort((a, b) => {
    switch (field) {
      case 'recommended': {
        const comp = (b.completedCount ?? 0) - (a.completedCount ?? 0);
        const value =
          comp !== 0
            ? comp
            : DIFFICULTY_MAPPING[a.metadata.difficulty] -
              DIFFICULTY_MAPPING[b.metadata.difficulty];

        const aIsCompleted = a.status === 'COMPLETED';
        const bIsCompleted = b.status === 'COMPLETED';

        // Move all the completed project by user at the bottom
        if (aIsCompleted !== bIsCompleted) {
          return aIsCompleted ? -value : value;
        }

        return value;
      }
      case 'completedCount': {
        const comp = (a.completedCount ?? 0) - (b.completedCount ?? 0);
        const value =
          comp !== 0
            ? isAscendingOrder
              ? comp
              : -comp
            : DIFFICULTY_MAPPING[a.metadata.difficulty] -
              DIFFICULTY_MAPPING[b.metadata.difficulty];

        return value;
      }
      case 'difficulty': {
        const value =
          DIFFICULTY_MAPPING[a.metadata.difficulty] -
          DIFFICULTY_MAPPING[b.metadata.difficulty];

        return isAscendingOrder ? value : -value;
      }

      // TODO(projects):  Add createdAt sort logic for projects
      case 'createdAt': {
        const value =
          new Date(a.metadata.createdAt).getTime() -
          new Date(b.metadata.createdAt).getTime();

        return isAscendingOrder ? value : -value;
      }
    }
  });
}
