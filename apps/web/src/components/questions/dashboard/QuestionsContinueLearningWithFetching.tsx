import {
  getQuestionListThemes,
  useQuestionLists,
} from '~/data/question-lists/QuestionListsHooks';

import QuestionsContinueLearning from '~/components/questions/dashboard/QuestionsContinueLearning';
import { themeGradient1 } from '~/components/ui/theme';

type Props = Readonly<{
  items: ReadonlyArray<{
    completedCount: number;
    listKey: string;
  }>;
}>;

export default function QuestionsContinueLearningContainer({ items }: Props) {
  const questionLists = useQuestionLists();
  const themes = getQuestionListThemes();

  return (
    <QuestionsContinueLearning
      items={items.map(({ listKey, completedCount }) => ({
        completedCount,
        gradient: themeGradient1,
        href: questionLists[listKey]?.href,
        questionsCount: 50, // TODO(redesign)
        title: questionLists[listKey].longName,
      }))}
    />
  );
}
