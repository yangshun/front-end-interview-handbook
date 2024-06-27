import path from 'path';

export const QUESTIONS_SRC_DIR_QUIZ_NON_JS = path.join(
  process.cwd(),
  '..',
  '..',
  'front-end-interview-handbook',
  'packages',
  'quiz',
  'questions',
);
export const QUESTIONS_SRC_DIR_QUIZ_JS = path.join(
  process.cwd(),
  '..',
  '..',
  'top-javascript-interview-questions',
  'questions',
);
export const QUESTIONS_OUT_DIR_QUIZ = path.join(
  process.cwd(),
  'src',
  '__generated__',
  'questions',
  'quiz',
);

export function getQuestionSrcPathQuizNonJavaScript(slug: string) {
  return path.join(QUESTIONS_SRC_DIR_QUIZ_NON_JS, slug);
}
export function getQuestionSrcPathQuizJavaScript(slug: string) {
  return path.join(QUESTIONS_SRC_DIR_QUIZ_JS, slug);
}
export function getQuestionOutPathQuiz(slug: string) {
  return path.join(QUESTIONS_OUT_DIR_QUIZ, slug);
}
export function getQuestionsListOutFilenameQuiz(locale: string) {
  return path.join(QUESTIONS_OUT_DIR_QUIZ, `list.${locale}.json`);
}
