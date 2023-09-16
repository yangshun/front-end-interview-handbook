import path from 'path';

export const QUESTIONS_SRC_DIR_USER_INTERFACE = path.join(
  process.cwd(),
  '..',
  '..',
  'packages',
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
export const QUESTIONS_OUT_DIR_USER_INTERFACE_V2 = path.join(
  process.cwd(),
  'src',
  '__generated__',
  'questions',
  'user-interface-v2',
);

export function getQuestionSrcPathUserInterface(slug: string) {
  return path.join(QUESTIONS_SRC_DIR_USER_INTERFACE, slug);
}
export function getQuestionOutPathUserInterface(slug: string) {
  return path.join(QUESTIONS_OUT_DIR_USER_INTERFACE, slug);
}
export function getQuestionOutPathUserInterfaceV2(slug: string) {
  return path.join(QUESTIONS_OUT_DIR_USER_INTERFACE_V2, slug);
}

export function getQuestionsListOutFilenameUserInterface(_locale: string) {
  return path.join(
    QUESTIONS_OUT_DIR_USER_INTERFACE,
    'UserInterfaceQuestionsList.json',
  );
}
