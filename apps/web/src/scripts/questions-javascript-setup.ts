import fs from 'fs';
import { globby } from 'globby';
import path, { parse } from 'path';

import { readQuestionJavaScript } from '../db/questions-bundlers/QuestionsBundlerJavaScript';
import {
  getQuestionOutPathJavaScript,
  getQuestionSrcPathJavaScript,
  QUESTIONS_SRC_DIR_JAVASCRIPT,
} from '../db/questions-bundlers/QuestionsBundlerJavaScriptConfig';

async function generateSetupForQuestion(slug: string) {
  const questionPath = getQuestionSrcPathJavaScript(slug);

  const globPattern = path.posix.join(
    // Globby only supports forward slashes
    questionPath.replaceAll(path.sep, path.posix.sep),
    // Assume that if the locale file is present for the description
    // it's also present for the solution
    'description',
    '*.mdx',
  );

  const locales = (await globby(globPattern))
    // Files are named after their locales.
    .map((filePath) => parse(filePath).name);

  const outDir = getQuestionOutPathJavaScript(slug);

  fs.mkdirSync(outDir, { recursive: true });

  await Promise.all(
    locales.map(async (locale) => {
      const content = await readQuestionJavaScript(slug, locale);
      const outPath = path.join(outDir, `${locale}.json`);

      fs.writeFileSync(outPath, JSON.stringify(content, null, 2));
    }),
  );
}

export async function generateJavaScriptQuestionsSetup(): Promise<void> {
  const directories = fs
    .readdirSync(QUESTIONS_SRC_DIR_JAVASCRIPT, {
      withFileTypes: true,
    })
    .filter((dirent) => dirent.isDirectory());

  await Promise.all(
    directories.map(async (dirent) => {
      await generateSetupForQuestion(dirent.name);
    }),
  );
}
