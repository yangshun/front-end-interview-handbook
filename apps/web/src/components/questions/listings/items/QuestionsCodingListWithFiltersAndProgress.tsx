import type { Props as BaseProps } from './QuestionsCodingListWithFilters';
import QuestionsCodingListWithFilters from './QuestionsCodingListWithFilters';
import useQuestionsWithCompletionStatus from '../filters/hooks/useQuestionsWithCompletionStatus';
import type { QuestionMetadata } from '../../common/QuestionsTypes';

type Props = Omit<BaseProps, 'questions'> &
  Readonly<{
    questions: ReadonlyArray<QuestionMetadata>;
  }>;

export default function QuestionsCodingListWithFiltersAndProgress({
  questions,
  ...props
}: Props) {
  const questionsWithCompletionStatus =
    useQuestionsWithCompletionStatus(questions);

  return (
    <QuestionsCodingListWithFilters
      questions={questionsWithCompletionStatus}
      {...props}
    />
  );
}
