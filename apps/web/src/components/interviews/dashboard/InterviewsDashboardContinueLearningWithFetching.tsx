import type { InterviewsStudyList } from 'contentlayer/generated';

import InterviewsDashboardContinueLearning from '~/components/interviews/dashboard/InterviewsDashboardContinueLearning';

import { mapFocusAreasBySlug } from '../questions/content/study-list/FocusAreas';
import { mapStudyPlansBySlug } from '../questions/content/study-list/StudyPlans';

type Props = Readonly<{
  focusAreas: ReadonlyArray<InterviewsStudyList>;
  items: ReadonlyArray<{
    completedCount: number;
    listKey: string;
  }>;
  studyPlans: ReadonlyArray<InterviewsStudyList>;
}>;

export default function InterviewsDashboardContinueLearningContainer({
  items,
  studyPlans,
  focusAreas,
}: Props) {
  const mapStudyPlans = mapStudyPlansBySlug(studyPlans);
  const mapFocusAreas = mapFocusAreasBySlug(focusAreas);
  const questionLists = { ...mapStudyPlans, ...mapFocusAreas };

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
            questionsUserInterface,
          } = questionLists[listKey];

          return {
            completedCount,
            href,
            questionsCount:
              (questionsAlgo?.length ?? 0) +
              (questionsJavaScript?.length ?? 0) +
              (questionsQuiz?.length ?? 0) +
              (questionsSystemDesign?.length ?? 0) +
              (questionsUserInterface?.length ?? 0) +
              (questionsSystemDesign?.length ?? 0),
            title: longName,
          };
        })}
    />
  );
}
