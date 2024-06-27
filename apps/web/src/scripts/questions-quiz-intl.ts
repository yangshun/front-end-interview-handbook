import fs from 'fs';

import { generateLocalizedFiles } from './intl-mdx';
import {
  getQuestionSrcPathQuizNonJavaScript,
  QUESTIONS_SRC_DIR_QUIZ_NON_JS,
} from '../db/questions-bundlers/QuestionsBundlerQuizConfig';

export async function localizeQuestions() {
  fs.readdirSync(QUESTIONS_SRC_DIR_QUIZ_NON_JS, {
    withFileTypes: true,
  })
    .filter((dirent) => dirent.isDirectory())
    .map((dir) => dir.name)
    .map((dirName) => {
      const slug = dirName;

      generateLocalizedFiles(getQuestionSrcPathQuizNonJavaScript(slug));
    });
}
