import fs from 'fs';
import { globby } from 'globby';
import path, { parse } from 'path';

import { readQuestionQuiz } from '../db/questions-bundlers/QuestionsBundlerQuiz';
import {
  getQuestionOutPathQuiz,
  getQuestionSrcPathQuizJavaScript,
  getQuestionSrcPathQuizNonJavaScript,
  QUESTIONS_SRC_DIR_QUIZ_JS,
  QUESTIONS_SRC_DIR_QUIZ_NON_JS,
} from '../db/questions-bundlers/QuestionsBundlerQuizConfig';

async function generateSetupForQuestion(slug: string, questionPath: string) {
  const locales = (await globby(path.join(questionPath, '*.mdx')))
    // Files are named after their locales.
    .map((filePath) => parse(filePath).name);

  const outDir = getQuestionOutPathQuiz(slug);

  fs.mkdirSync(outDir, { recursive: true });
  await Promise.all(
    locales.map(async (locale) => {
      const content = await readQuestionQuiz(questionPath, locale);
      const outPath = path.join(outDir, `${locale}.json`);

      fs.writeFileSync(outPath, JSON.stringify(content, null, 2));
    }),
  );
}

export async function generateQuizQuestionsSetupNonJavaScript(): Promise<void> {
  const directories = fs
    .readdirSync(QUESTIONS_SRC_DIR_QUIZ_NON_JS, {
      withFileTypes: true,
    })
    .filter((dirent) => dirent.isDirectory());

  await Promise.all(
    directories.map(
      async (dirent) =>
        await generateSetupForQuestion(
          dirent.name,
          getQuestionSrcPathQuizNonJavaScript(dirent.name),
        ),
    ),
  );
}

export async function generateQuizQuestionsSetupJavaScript(): Promise<void> {
  const directories = fs
    .readdirSync(QUESTIONS_SRC_DIR_QUIZ_JS, {
      withFileTypes: true,
    })
    .filter((dirent) => dirent.isDirectory());

  await Promise.all(
    directories.map(
      async (dirent) =>
        await generateSetupForQuestion(
          dirent.name,
          getQuestionSrcPathQuizJavaScript(dirent.name),
        ),
    ),
  );
}
