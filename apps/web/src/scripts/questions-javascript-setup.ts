import fs from 'fs';
import glob from 'glob';
import path, { parse } from 'path';

import {
  readQuestionJavaScript,
  readQuestionJavaScriptV2,
} from '../db/questions-bundlers/QuestionsBundlerJavaScript';
import {
  getQuestionOutPathJavaScript,
  getQuestionOutPathJavaScriptV2,
  getQuestionSrcPathJavaScript,
  QUESTIONS_SRC_DIR_JAVASCRIPT,
} from '../db/questions-bundlers/QuestionsBundlerJavaScriptConfig';

async function generateSetupForQuestion(slug: string) {
  const questionPath = getQuestionSrcPathJavaScript(slug);
  const locales = glob
    // This assumes that if the locale file is present for the description
    // it's also present for the solution.
    .sync(path.join(questionPath, 'description', '*.mdx'))
    // Files are named after their locales.
    .map((filePath) => parse(filePath).name);

  const outDir = getQuestionOutPathJavaScript(slug);

  fs.mkdirSync(outDir, { recursive: true });

  const outDirV2 = getQuestionOutPathJavaScriptV2(slug);

  fs.mkdirSync(outDirV2, { recursive: true });

  await Promise.all(
    locales.map(async (locale) => {
      const content = await readQuestionJavaScript(slug);
      const outPath = path.join(outDir, `${locale}.json`);

      fs.writeFileSync(outPath, JSON.stringify(content, null, 2));

      const contentV2 = await readQuestionJavaScriptV2(slug);
      const outPathV2 = path.join(outDirV2, `${locale}.json`);

      fs.writeFileSync(outPathV2, JSON.stringify(contentV2, null, 2));
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
