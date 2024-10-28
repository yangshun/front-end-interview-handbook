import type { InterviewsStudyList } from 'contentlayer/generated';

import { usePreparationPlans } from '~/data/plans/PreparationPlansHooks';

import InterviewsDashboardContinueLearning from '~/components/interviews/dashboard/InterviewsDashboardContinueLearning';

import { mapFocusAreasBySlug } from '../questions/content/study-list/FocusAreas';

type Props = Readonly<{
  focusAreas: ReadonlyArray<InterviewsStudyList>;
  items: ReadonlyArray<{
    completedCount: number;
    listKey: string;
  }>;
}>;

export default function InterviewsDashboardContinueLearningContainer({
  items,
  focusAreas,
}: Props) {
  // TODO(interviews): need to update once preparation plan is migrated to contentlayer
  const plans = usePreparationPlans() as unknown as Record<
    string,
    InterviewsStudyList
  >;

  const mapFocusAreas = mapFocusAreasBySlug(focusAreas);
  const questionLists = { ...plans, ...mapFocusAreas };

  return (
    <InterviewsDashboardContinueLearning
      items={items
        // TODO(interviews): filter out company lists for now because company list rendering is not yet supported on the dashboard.
        .filter(({ listKey }) => questionLists[listKey] != null)
        .map(({ listKey, completedCount }) => {
          const {
            href,
            longName,
            questionsAlgo,
            questionsJavaScript,
            questionsQuiz,
            questionsSystemDesign,
          } = questionLists[listKey];

          return {
            completedCount,
            href,
            questionsCount:
              (questionsAlgo?.length ?? 0) +
              (questionsJavaScript?.length ?? 0) +
              (questionsQuiz?.length ?? 0) +
              (questionsSystemDesign?.length ?? 0),
            title: longName,
          };
        })}
    />
  );
}
