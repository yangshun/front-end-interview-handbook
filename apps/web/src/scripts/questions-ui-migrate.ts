/* eslint-disable sort-keys-fix/sort-keys-fix */
import fs from 'fs';
import glob from 'glob';
import lodash from 'lodash';
import path from 'path';

import type { QuestionFramework } from '~/components/questions/common/QuestionsTypes';

import {
  getQuestionSrcPathUserInterface,
  QUESTIONS_SRC_DIR_USER_INTERFACE,
} from '../db/questions-bundlers/QuestionsBundlerUserInterfaceConfig';

async function restructureQuestionFrameworkSetup(
  frameworksPath: string,
  slug: string,
  framework: QuestionFramework,
  setup: string,
) {
  const setupPath = path.join(frameworksPath, framework, setup, 'setup');

  if (framework === 'react') {
    fs.mkdirSync(path.join(setupPath, 'src'), { recursive: true });

    const setupGlob = path.join(setupPath, '**/*.{css,js}');
    const filesForFrameworkSetup = glob.sync(setupGlob);

    filesForFrameworkSetup.forEach((filePath) => {
      fs.renameSync(filePath, filePath.replace('/setup', '/setup/src'));
    });

    fs.writeFileSync(
      path.join(setupPath, 'package.json'),
      JSON.stringify(
        {
          name: `@gfe-questions/${slug}-${framework}-${setup}`,
          version: '0.0.1',
          private: true,
          dependencies: {
            react: '18.2.0',
            'react-dom': '18.2.0',
            'react-scripts': '5.0.1',
          },
          scripts: {
            start: 'react-scripts start',
            build: 'react-scripts build',
            test: 'react-scripts test',
            eject: 'react-scripts eject',
          },
        },
        null,
        2,
      ),
    );

    fs.writeFileSync(
      path.join(setupPath, 'greatfrontend.json'),
      JSON.stringify(
        {
          visibleFiles: ['/src/App.js', '/src/styles.css'],
          activeFile: '/src/App.js',
          environment: 'create-react-app',
        },
        null,
        2,
      ),
    );

    return;
  }

  if (framework === 'vanilla') {
    fs.writeFileSync(
      path.join(setupPath, 'package.json'),
      JSON.stringify(
        {
          name: `@gfe-questions/${slug}-${framework}-${setup}`,
          version: '0.0.1',
          private: true,
          devDependencies: {
            parcel: '2.9.3',
          },
          source: 'index.html',
          scripts: {
            start: 'parcel',
            build: 'parcel build',
          },
        },
        null,
        2,
      ),
    );

    fs.writeFileSync(
      path.join(setupPath, 'greatfrontend.json'),
      JSON.stringify(
        {
          visibleFiles: ['/index.html', '/src/index.js', '/src/styles.css'],
          activeFile: '/src/index.html',
          environment: 'parcel',
        },
        null,
        2,
      ),
    );

    return;
  }
}

async function restructureQuestion(dirPath: string, slug: string) {
  const frameworksPath = path.join(dirPath, 'frameworks');

  const allFilesForQuestion = glob
    .sync(path.join(frameworksPath, '**/*.*'))
    .filter(
      (path_) => !(path_.endsWith('mdx') || path_.endsWith('setup.json')),
    );

  // Group folders for a question by (framework, setup).
  const groupedFiles = lodash.groupBy(allFilesForQuestion, (filePath) => {
    const parts = path.relative(frameworksPath, filePath).split('/');

    return parts[0] + '/' + parts[1];
  });

  const groups = Object.keys(groupedFiles);

  groups.forEach((group) => {
    const groupParts = group.split('/');

    restructureQuestionFrameworkSetup(
      frameworksPath,
      slug,
      groupParts[0] as QuestionFramework,
      groupParts[1],
    );
  });
}

async function restructureQuestions() {
  await Promise.all(
    fs
      .readdirSync(QUESTIONS_SRC_DIR_USER_INTERFACE, {
        withFileTypes: true,
      })
      .filter((dirent) => dirent.isDirectory())
      .map((dir) => dir.name)
      .map(async (dirName) => {
        const slug = dirName;

        await restructureQuestion(getQuestionSrcPathUserInterface(slug), slug);
      }),
  );
}

restructureQuestions();
