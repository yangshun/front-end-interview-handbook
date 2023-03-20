import fs from 'fs';

import { generateLocalizedFiles } from './intl-mdx';
import {
  getQuestionSrcPathQuiz,
  QUESTIONS_SRC_DIR_QUIZ,
} from '../db/questions-bundlers/QuestionsBundlerQuizConfig';

export async function localizeQuestions() {
  fs.readdirSync(QUESTIONS_SRC_DIR_QUIZ, {
    withFileTypes: true,
  })
    .filter((dirent) => dirent.isDirectory())
    .map((dir) => dir.name)
    .map((dirName) => {
      const slug = dirName;

      generateLocalizedFiles(getQuestionSrcPathQuiz(slug));
    });
}
