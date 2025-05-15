import fs from 'fs';
import path from 'path';

import {
  getQuestionSrcPathSystemDesign,
  QUESTIONS_SRC_DIR_SYSTEM_DESIGN,
} from '../db/questions-bundlers/QuestionsBundlerSystemDesignConfig';
import { generateLocalizedFiles } from './intl-mdx';

export async function localizeQuestions() {
  fs.readdirSync(QUESTIONS_SRC_DIR_SYSTEM_DESIGN, {
    withFileTypes: true,
  })
    .filter((dirent) => dirent.isDirectory())
    .map((dir) => dir.name)
    .map((dirName) => {
      const slug = dirName;

      generateLocalizedFiles(
        path.join(getQuestionSrcPathSystemDesign(slug), 'description'),
      );
      generateLocalizedFiles(
        path.join(getQuestionSrcPathSystemDesign(slug), 'solution'),
      );
    });
}
