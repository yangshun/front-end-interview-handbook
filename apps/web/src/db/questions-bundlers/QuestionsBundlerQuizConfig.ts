import path from 'path';

export const QUESTIONS_SRC_DIR_QUIZ = path.join(
  process.cwd(),
  '..',
  '..',
  'front-end-interview-handbook',
  'packages',
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
export function getQuestionsListOutFilenameQuiz(locale: string) {
  return path.join(QUESTIONS_OUT_DIR_QUIZ, `list.${locale}.json`);
}
