import type { InterviewsQuestionItemMinimal } from '../../common/QuestionsTypes';

export default function questionMatchesTextQuery(
  question: InterviewsQuestionItemMinimal,
  query: string,
): boolean {
  return (
    question.info.title.toLowerCase().includes(query.toLowerCase()) ||
    Boolean(question.info.excerpt?.toLowerCase().includes(query.toLowerCase()))
  );
}
