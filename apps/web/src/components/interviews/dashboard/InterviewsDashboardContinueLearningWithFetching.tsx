import {
  getQuestionListThemes,
  useQuestionLists,
} from '~/data/question-lists/QuestionListsHooks';

import InterviewsDashboardContinueLearning from '~/components/interviews/dashboard/InterviewsDashboardContinueLearning';

import { countNumberOfQuestionsInList } from '~/db/QuestionsUtils';

type Props = Readonly<{
  items: ReadonlyArray<{
    completedCount: number;
    listKey: string;
  }>;
}>;

export default function InterviewsDashboardContinueLearningContainer({
  items,
}: Props) {
  const questionLists = useQuestionLists();
  const themes = getQuestionListThemes();

  return (
    <InterviewsDashboardContinueLearning
      items={items
        // TODO(interviews): filter out company lists for now because company list rendering is not yet supported on the dashboard.
        .filter(({ listKey }) => questionLists[listKey] != null)
        .map(({ listKey, completedCount }) => ({
          completedCount,
          gradient: themes[listKey].gradient,
          href: questionLists[listKey]?.href,
          questionsCount: countNumberOfQuestionsInList(
            questionLists[listKey].questions,
          ),
          title: questionLists[listKey].longName,
        }))}
    />
  );
}
