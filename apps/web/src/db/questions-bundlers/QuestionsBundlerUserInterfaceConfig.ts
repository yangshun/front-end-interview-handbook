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

export function getQuestionOutPathUserInterfaceLocaleInfo(
  slug: string,
  locale: string,
) {
  return path.join(
    getQuestionOutPathUserInterface(slug),
    'info',
    `${locale}.json`,
  );
}

export function getQuestionOutPathUserInterfaceFramework(
  slug: string,
  framework: string,
) {
  return path.join(
    getQuestionOutPathUserInterface(slug),
    'frameworks',
    framework,
  );
}

export function getQuestionOutPathUserInterfaceFrameworkLocaleWriteup(
  slug: string,
  framework: string,
  locale: string,
) {
  return path.join(
    getQuestionOutPathUserInterfaceFramework(slug, framework),
    'writeup',
    `${locale}.json`,
  );
}

export function getQuestionOutPathUserInterfaceFrameworkSetup(
  slug: string,
  framework: string,
  setupType: string,
) {
  return path.join(
    getQuestionOutPathUserInterfaceFramework(slug, framework),
    'setup',
    `${setupType}.json`,
  );
}

export function getQuestionsListOutFilenameUserInterface(_locale: string) {
  return path.join(
    QUESTIONS_OUT_DIR_USER_INTERFACE,
    'UserInterfaceQuestionsList.json',
  );
}
