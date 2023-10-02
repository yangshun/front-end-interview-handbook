import assert from 'assert';
import fs from 'fs';
import glob from 'glob';
import lodash from 'lodash';
import path from 'path';

import type { QuestionUserInterfaceSetupType } from '../components/questions/common/QuestionsTypes';
import { type QuestionFramework } from '../components/questions/common/QuestionsTypes';
import { readMDXFile } from '../db/questions-bundlers/QuestionsBundler';
import { readQuestionMetadataUserInterface } from '../db/questions-bundlers/QuestionsBundlerUserInterface';
import {
  getQuestionOutPathUserInterface,
  getQuestionSrcPathUserInterface,
  QUESTIONS_SRC_DIR_USER_INTERFACE,
} from '../db/questions-bundlers/QuestionsBundlerUserInterfaceConfig';

import type { SandpackFile } from '@codesandbox/sandpack-react';

const SUPPORTED_FRAMEWORKS = new Set<QuestionFramework>([
  'vanilla',
  'react',
  'angular',
  'svelte',
]);

type GFEConfig = Readonly<{
  activeFile?: string;
  environment: string;
  visibleFiles?: Array<string>;
}>;

async function generateSetupForQuestion(slug: string) {
  // TODO: Make this work.
  // const { default: remarkGfm } = await import('remark-gfm');

  const frameworksPath = path.join(
    getQuestionSrcPathUserInterface(slug),
    'frameworks',
  );

  const allFilesForQuestion = glob
    .sync(path.join(frameworksPath, '**/*.*'))
    .filter(
      (path_) =>
        !(
          path_.endsWith('mdx') ||
          path_.endsWith('setup.json') ||
          path_.endsWith('greatfrontend.json')
        ),
    );

  // Group folders for a question by (framework, setup).
  const groupedFiles = lodash.groupBy(allFilesForQuestion, (filePath) => {
    const parts = path.relative(frameworksPath, filePath).split('/');

    return parts[0] + '/' + parts[1];
  });

  const setups = await Promise.all(
    Object.entries(groupedFiles).map(async ([key, paths]) => {
      const parts = key.split('/');
      const framework = parts[0] as QuestionFramework;
      const setupType = parts[1] as QuestionUserInterfaceSetupType;

      assert(
        SUPPORTED_FRAMEWORKS.has(framework),
        `Unsupported framework: ${framework}`,
      );

      const [writeupMdx, files, workspace] = await Promise.all([
        // Read either description or solution Markdown file.
        readMDXFile(
          path.join(frameworksPath, framework, setupType, 'index.mdx'),
          {},
        ),
        // Read files needed.
        paths.reduce<Record<string, SandpackFile>>((accFiles, fullPath) => {
          const relativePath = path.relative(
            path.join(frameworksPath, framework, setupType, 'setup'),
            fullPath,
          );
          const contents = fs.readFileSync(fullPath).toString();

          // Sandpack requires all file paths to be from the root,
          // hence we add a leading slash.
          accFiles['/' + relativePath] = {
            code: contents,
          };

          return accFiles;
        }, {}),
        // Read greatfrontend.json.
        (() => {
          const greatfrontendConfigPath = path.join(
            frameworksPath,
            framework,
            setupType,
            'setup',
            'greatfrontend.json',
          );

          try {
            return JSON.parse(
              fs.readFileSync(greatfrontendConfigPath).toString(),
            ) as GFEConfig;
          } catch {
            return null;
          }
        })(),
      ]);

      return {
        files,
        framework,
        setupType,
        workspace,
        writeup: writeupMdx,
      };
    }),
  );

  await Promise.all([
    (async () => {
      const metadata = await readQuestionMetadataUserInterface(slug);

      const outPath = path.join(
        getQuestionOutPathUserInterface(slug),
        `metadata.json`,
      );

      fs.mkdirSync(path.dirname(outPath), { recursive: true });
      fs.writeFileSync(outPath, JSON.stringify(metadata, null, 2));
    })(),
    ...setups.map(
      async ({ framework, setupType, files, writeup, workspace }) => {
        workspace?.visibleFiles?.forEach((file) => {
          if (!(file in files)) {
            throw Error(
              `Visible file "${file}" not found in files for ${setupType} of ${framework}`,
            );
          }
        });

        const outPath = path.join(
          getQuestionOutPathUserInterface(slug),
          framework,
          `${setupType}.json`,
        );

        fs.mkdirSync(path.dirname(outPath), { recursive: true });

        const bundle = {
          files,
          workspace,
          writeup,
        };

        fs.writeFileSync(outPath, JSON.stringify(bundle, null, 2));
      },
    ),
  ]);
}

export async function generateUserInterfaceQuestionsSetup(): Promise<void> {
  const directories = fs
    .readdirSync(QUESTIONS_SRC_DIR_USER_INTERFACE, {
      withFileTypes: true,
    })
    .filter((dirent) => dirent.isDirectory());

  await Promise.all(
    directories.map(async (dirent) => {
      await generateSetupForQuestion(dirent.name);
    }),
  );
}
