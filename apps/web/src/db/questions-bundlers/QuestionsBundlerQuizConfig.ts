import path from 'path';

export const QUESTIONS_SRC_DIR_QUIZ = path.join(
  process.cwd(),
  'questions',
  'quiz',
);
export const QUESTIONS_OUT_DIR_QUIZ = path.join(
  process.cwd(),
  'src',
  '__generated__',
  'questions',
  'quiz',
);

export function getQuestionSrcPathQuiz(slug: string) {
  return path.join(QUESTIONS_SRC_DIR_QUIZ, slug);
}
export function getQuestionOutPathQuiz(slug: string) {
  return path.join(QUESTIONS_OUT_DIR_QUIZ, slug);
}
export const QUESTIONS_LIST_OUT_DIR_QUIZ = path.join(
  QUESTIONS_OUT_DIR_QUIZ,
  'QuizQuestionsList.json',
);
