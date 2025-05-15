import fs from 'fs';
import path from 'path';

import {
  getQuestionSrcPathJavaScript,
  QUESTIONS_SRC_DIR_JAVASCRIPT,
} from '../db/questions-bundlers/QuestionsBundlerJavaScriptConfig';

async function restructureQuestion(dirPath: string, slug: string) {
  const newSetupPath = path.join(dirPath, 'setup');

  try {
    fs.mkdirSync(newSetupPath);
  } catch {
    //
  }

  const oldSrcPath = path.join(dirPath, 'src');
  const newSrcPath = path.join(newSetupPath, 'src');

  fs.renameSync(oldSrcPath, newSrcPath);

  const oldTestPath = path.join(newSrcPath, `${slug}.test.js`);

  fs.copyFileSync(oldTestPath, path.join(newSrcPath, `${slug}.run.test.ts`));
  fs.renameSync(oldTestPath, path.join(newSrcPath, `${slug}.submit.test.ts`));

  fs.writeFileSync(
    path.join(newSetupPath, 'package.json'),
    JSON.stringify(
      {
        devDependencies: {
          '@types/jest': '29.5.0',
          typescript: '5.0.2',
        },
        main: `/src/${slug}.ts`,
        name: `@gfe-questions/${slug}`,
        version: '0.0.1',
      },
      null,
      2,
    ),
  );

  fs.writeFileSync(
    path.join(newSetupPath, 'greatfrontend.json'),
    JSON.stringify(
      {
        run: `/src/${slug}.run.test.ts`,
        skeleton: {
          js: `/src/${slug}.skeleton.js`,
          ts: `/src/${slug}.skeleton.ts`,
        },
        submit: `/src/${slug}.submit.test.ts`,
      },
      null,
      2,
    ),
  );

  fs.writeFileSync(
    path.join(newSetupPath, 'tsconfig.json'),
    JSON.stringify(
      {
        compilerOptions: {
          esModuleInterop: true,
          jsx: 'react-jsx',
          lib: ['dom', 'esnext'],
          strict: true,
        },
        include: ['./**/*'],
      },
      null,
      2,
    ),
  );
}

async function restructureQuestions() {
  await Promise.all(
    fs
      .readdirSync(QUESTIONS_SRC_DIR_JAVASCRIPT, {
        withFileTypes: true,
      })
      .filter((dirent) => dirent.isDirectory())
      .map((dir) => dir.name)
      .map(async (dirName) => {
        const slug = dirName;

        await restructureQuestion(getQuestionSrcPathJavaScript(slug), slug);
      }),
  );
}

restructureQuestions();
