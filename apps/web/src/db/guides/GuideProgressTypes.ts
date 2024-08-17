import type { GuideCategory } from '~/components/guides/types';

export type GuideProgressStatus = 'complete' | 'in_progress';

export type GuideProgress = Readonly<{
  createdAt: Date;
  id: string;
  slug: string;
  status: GuideProgressStatus;
  type: GuideCategory;
}>;

export type GuideProgressList = ReadonlyArray<GuideProgress>;
