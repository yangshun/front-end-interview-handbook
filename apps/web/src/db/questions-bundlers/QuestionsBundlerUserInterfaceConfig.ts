import path from 'path';

export const QUESTIONS_SRC_DIR_USER_INTERFACE = path.join(
  process.cwd(),
  'questions',
  'user-interface',
);
export const QUESTIONS_OUT_DIR_USER_INTERFACE = path.join(
  process.cwd(),
  'src',
  '__generated__',
  'questions',
  'user-interface',
);

export function getQuestionSrcPathUserInterface(slug: string) {
  return path.join(QUESTIONS_SRC_DIR_USER_INTERFACE, slug);
}
export function getQuestionOutPathUserInterface(slug: string) {
  return path.join(QUESTIONS_OUT_DIR_USER_INTERFACE, slug);
}
export const QUESTIONS_LIST_OUT_DIR_USER_INTERFACE = path.join(
  QUESTIONS_OUT_DIR_USER_INTERFACE,
  'UserInterfaceQuestionsList.json',
);
