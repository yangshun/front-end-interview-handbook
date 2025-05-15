import fs from 'fs';
import grayMatter from 'gray-matter';
import path, { dirname } from 'path';

import {
  getQuestionSrcPathJavaScript,
  QUESTIONS_SRC_DIR_JAVASCRIPT,
} from '../db/questions-bundlers/QuestionsBundlerJavaScriptConfig';

async function restructureQuestion(dirPath: string, slug: string) {
  // Description.
  const contents = fs.readFileSync(path.join(dirPath, 'index.mdx'));
  const parsed = grayMatter(contents);
  const frontMatter = parsed.data;

  const { excerpt, title } = frontMatter;

  delete frontMatter.title;
  delete frontMatter.excerpt;

  fs.writeFileSync(
    path.join(dirPath, 'metadata.json'),
    JSON.stringify(frontMatter, null, 2),
  );

  const descriptionPath = path.join(dirPath, 'description', 'en-US.mdx');

  fs.mkdirSync(dirname(descriptionPath), { recursive: true });

  fs.writeFileSync(
    descriptionPath,
    ['---', `title: ${title}`, excerpt && `excerpt: ${excerpt}`, '---']
      .filter(Boolean)
      .concat('')
      .join(`\n`) + parsed.content,
  );
  fs.unlinkSync(path.join(dirPath, 'index.mdx'));

  const oldSolutionPath = path.join(dirPath, 'solution', 'index.mdx');
  const newSolutionPath = path.join(dirPath, 'solution', 'en-US.mdx');

  // Solution.
  fs.renameSync(oldSolutionPath, newSolutionPath);

  const solnContents = fs.readFileSync(newSolutionPath).toString();

  fs.writeFileSync(
    newSolutionPath,
    solnContents.replaceAll('./', '../src/').replaceAll('/index', `/${slug}`),
  );

  // Code.
  const codeDir = path.join(dirPath, 'src');

  fs.mkdirSync(codeDir, { recursive: true });

  function moveIntoCodeDir(
    src: string,
    dst: string,
    oldStr?: string,
    newStr?: string,
  ) {
    const srcPath = path.join(dirPath, src);
    const dstPath = path.join(codeDir, dst);

    if (oldStr && newStr) {
      const srcContents = fs.readFileSync(srcPath).toString();

      fs.writeFileSync(dstPath, srcContents.replace(oldStr, newStr));
      fs.unlinkSync(srcPath);
    } else {
      fs.renameSync(srcPath, dstPath);
    }
  }

  moveIntoCodeDir(
    'index.test.js',
    `${slug}.test.js`,
    './solution',
    `./${slug}`,
  );
  moveIntoCodeDir('skeleton.js', `${slug}.skeleton.js`);
  moveIntoCodeDir('solution/index.js', `${slug}.js`);
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
