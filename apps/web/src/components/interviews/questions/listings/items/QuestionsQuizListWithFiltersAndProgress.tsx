import type { Props as BaseProps } from './QuestionsQuizListWithFilters';
import QuestionsQuizListWithFilters from './QuestionsQuizListWithFilters';
import useQuestionsWithCompletionStatus from '../filters/hooks/useQuestionsWithCompletionStatus';
import type { QuestionMetadata } from '../../common/QuestionsTypes';

type Props = Omit<BaseProps, 'questions'> &
  Readonly<{
    questions: ReadonlyArray<QuestionMetadata>;
  }>;

export default function QuestionsQuizListWithFiltersAndProgress({
  questions,
  ...props
}: Props) {
  const questionsWithCompletionStatus =
    useQuestionsWithCompletionStatus(questions);

  return (
    <QuestionsQuizListWithFilters
      questions={questionsWithCompletionStatus}
      {...props}
    />
  );
}
