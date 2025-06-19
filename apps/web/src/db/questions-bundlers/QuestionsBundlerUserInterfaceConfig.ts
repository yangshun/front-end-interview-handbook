import path from 'path';

const format = 'user-interface';

export const QUESTIONS_SRC_DIR_USER_INTERFACE = path.join(
  process.cwd(),
  '..',
  '..',
  'contents',
  'questions',
  format,
);
export const QUESTIONS_OUT_DIR_USER_INTERFACE = path.join(
  process.cwd(),
  'src',
  '__generated__',
  'questions',
  format,
);
export function getQuestionSrcPathUserInterface(slug: string) {
  return path.join(QUESTIONS_SRC_DIR_USER_INTERFACE, slug);
}
export function getQuestionOutPathUserInterface(slug: string) {
  return path.join(QUESTIONS_OUT_DIR_USER_INTERFACE, slug);
}
export function getQuestionsListOutFilenameUserInterface(_locale: string) {
  return path.join(
    QUESTIONS_OUT_DIR_USER_INTERFACE,
    'UserInterfaceQuestionsList.json',
  );
}
