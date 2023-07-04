import {
  getQuestionListThemes,
  useQuestionLists,
} from '~/data/question-lists/QuestionListsHooks';

import DashboardContinueLearning from '~/components/dashboard/DashboardContinueLearning';

import { countNumberOfQuestionsInList } from '~/db/QuestionsUtils';

type Props = Readonly<{
  items: ReadonlyArray<{
    completedCount: number;
    listKey: string;
  }>;
}>;

export default function DashboardContinueLearningContainer({ items }: Props) {
  const questionLists = useQuestionLists();
  const themes = getQuestionListThemes();

  return (
    <DashboardContinueLearning
      items={items.map(({ listKey, completedCount }) => ({
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
