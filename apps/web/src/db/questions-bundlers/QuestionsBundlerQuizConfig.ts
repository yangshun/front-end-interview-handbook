import path from 'path';

export const QUESTIONS_OUT_DIR_QUIZ = path.join(
  process.cwd(),
  'src',
  '__generated__',
  'questions',
  'quiz',
);

export type QuestionsQuizSourceConfig = Readonly<{
  gitHubEditUrl: (slug: string, locale: string) => string;
  questionsItemFilePath: (slug: string, locale: string) => string;
  questionsItemMetadataPath: (slug: string) => string;
  questionsItemPath: (slug: string) => string;
  questionsListPath: string;
}>;

const QUESTIONS_SRC_DIR_QUIZ_NON_JS = path.join(
  process.cwd(),
  '..',
  '..',
  'submodules',
  'front-end-interview-handbook',
  'packages',
  'quiz',
  'questions',
);

export const QuestionsQuizSourceConfigNonJavaScript: QuestionsQuizSourceConfig =
  {
    gitHubEditUrl: (slug: string, locale = 'en-US') =>
      `https://github.com/yangshun/front-end-interview-handbook/blob/main/packages/quiz/questions/${slug}/${locale}.mdx`,
    questionsItemFilePath: (slug: string, locale: string) =>
      path.join(QUESTIONS_SRC_DIR_QUIZ_NON_JS, slug, `${locale}.mdx`),
    questionsItemMetadataPath: (slug: string) =>
      path.join(QUESTIONS_SRC_DIR_QUIZ_NON_JS, slug, 'metadata.json'),
    questionsItemPath: (slug: string) =>
      path.join(QUESTIONS_SRC_DIR_QUIZ_NON_JS, slug),
    questionsListPath: QUESTIONS_SRC_DIR_QUIZ_NON_JS,
  };

const QUESTIONS_SRC_DIR_QUIZ_JS = path.join(
  process.cwd(),
  '..',
  '..',
  'submodules',
  'top-javascript-interview-questions',
  'questions',
);

export const QuestionsQuizSourceConfigJavaScript: QuestionsQuizSourceConfig = {
  gitHubEditUrl: (slug: string, locale = 'en-US') =>
    `https://github.com/yangshun/top-javascript-interview-questions/blob/main/questions/${slug}/${locale}.mdx`,
  questionsItemFilePath: (slug: string, locale: string) =>
    path.join(QUESTIONS_SRC_DIR_QUIZ_JS, slug, `${locale}.mdx`),
  questionsItemMetadataPath: (slug: string) =>
    path.join(QUESTIONS_SRC_DIR_QUIZ_JS, slug, 'metadata.json'),
  questionsItemPath: (slug: string) =>
    path.join(QUESTIONS_SRC_DIR_QUIZ_JS, slug),
  questionsListPath: QUESTIONS_SRC_DIR_QUIZ_JS,
};

const QUESTIONS_SRC_DIR_QUIZ_REACT = path.join(
  process.cwd(),
  '..',
  '..',
  'submodules',
  'top-reactjs-interview-questions',
  'questions',
);

export const QuestionsQuizSourceConfigReact: QuestionsQuizSourceConfig = {
  gitHubEditUrl: (slug: string, locale = 'en-US') =>
    `https://github.com/yangshun/top-reactjs-interview-questions/blob/main/questions/${slug}/${locale}.mdx`,
  questionsItemFilePath: (slug: string, locale: string) =>
    path.join(QUESTIONS_SRC_DIR_QUIZ_REACT, slug, `${locale}.mdx`),
  questionsItemMetadataPath: (slug: string) =>
    path.join(QUESTIONS_SRC_DIR_QUIZ_REACT, slug, 'metadata.json'),
  questionsItemPath: (slug: string) =>
    path.join(QUESTIONS_SRC_DIR_QUIZ_REACT, slug),
  questionsListPath: QUESTIONS_SRC_DIR_QUIZ_REACT,
};

export function getQuestionOutPathQuiz(slug: string) {
  return path.join(QUESTIONS_OUT_DIR_QUIZ, slug);
}
export function getQuestionsListOutFilenameQuiz(locale: string) {
  return path.join(QUESTIONS_OUT_DIR_QUIZ, `list.${locale}.json`);
}
