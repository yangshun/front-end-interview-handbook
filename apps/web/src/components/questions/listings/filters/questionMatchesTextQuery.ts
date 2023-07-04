import type { QuestionMetadata } from '../../common/QuestionsTypes';

export default function questionMatchesTextQuery(
  question: QuestionMetadata,
  query: string,
): boolean {
  return (
    question.title.toLowerCase().includes(query.toLowerCase()) ||
    Boolean(question.excerpt?.toLowerCase().includes(query.toLowerCase()))
  );
}
