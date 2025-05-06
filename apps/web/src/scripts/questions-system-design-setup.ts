import fs from 'fs';
import { globby } from 'globby';
import path, { parse } from 'path';

import {
  readQuestionMetadataSystemDesign,
  readQuestionSystemDesign,
} from '../db/questions-bundlers/QuestionsBundlerSystemDesign';
import {
  getQuestionOutPathSystemDesign,
  getQuestionOutPathSystemDesignLocaleContents,
  getQuestionSrcPathSystemDesign,
  QUESTIONS_SRC_DIR_SYSTEM_DESIGN,
} from '../db/questions-bundlers/QuestionsBundlerSystemDesignConfig';

async function generateSetupForQuestion(slug: string) {
  const questionPath = getQuestionSrcPathSystemDesign(slug);
  // This assumes that if the locale file is present for the description
  // it's also present for the solution.
  const locales = (
    await globby(path.join(questionPath, 'description', '*.mdx'))
  )
    // Files are named after their locales.
    .map((filePath) => parse(filePath).name);

  const outDir = getQuestionOutPathSystemDesign(slug);

  fs.mkdirSync(outDir, { recursive: true });

  const metadata = await readQuestionMetadataSystemDesign(slug);
  const metadataPath = path.join(outDir, 'metadata.json');

  fs.writeFileSync(metadataPath, JSON.stringify(metadata, null, 2));

  await Promise.all(
    locales.map(async (locale) => {
      const content = await readQuestionSystemDesign(slug, locale);
      const contentOutPath = getQuestionOutPathSystemDesignLocaleContents(
        slug,
        locale,
      );

      fs.mkdirSync(path.dirname(contentOutPath), { recursive: true });
      fs.writeFileSync(contentOutPath, JSON.stringify(content, null, 2));
    }),
  );
}

export async function generateSystemDesignQuestionsSetup(): Promise<void> {
  const directories = fs
    .readdirSync(QUESTIONS_SRC_DIR_SYSTEM_DESIGN, {
      withFileTypes: true,
    })
    .filter((dirent) => dirent.isDirectory());

  await Promise.all(
    directories.map(
      async (dirent) => await generateSetupForQuestion(dirent.name),
    ),
  );
}
