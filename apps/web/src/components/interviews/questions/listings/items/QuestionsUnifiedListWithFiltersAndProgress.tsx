import type { Props as BaseProps } from './QuestionsUnifiedListWithFilters';
import QuestionsUnifiedListWithFilters from './QuestionsUnifiedListWithFilters';
import useQuestionsWithCompletionStatus from '../filters/hooks/useQuestionsWithCompletionStatus';
import type { QuestionMetadata } from '../../common/QuestionsTypes';

type Props = Omit<BaseProps, 'questions'> &
  Readonly<{
    questions: ReadonlyArray<QuestionMetadata>;
  }>;

export default function QuestionsUnifiedListWithFiltersAndProgress({
  questions,
  ...props
}: Props) {
  const questionsWithCompletionStatus =
    useQuestionsWithCompletionStatus(questions);

  return (
    <QuestionsUnifiedListWithFilters
      questions={questionsWithCompletionStatus}
      {...props}
    />
  );
}
