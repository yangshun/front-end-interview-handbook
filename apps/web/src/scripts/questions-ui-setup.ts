import type { SandpackFile } from '@codesandbox/sandpack-react';
import assert from 'assert';
import fs from 'fs';
import { globby } from 'globby';
import { groupBy } from 'lodash-es';
import nullthrows from 'nullthrows';
import path from 'path';

import type {
  QuestionUserInterfaceBundle,
  QuestionUserInterfaceSetupType,
  QuestionUserInterfaceWorkspace,
} from '../components/interviews/questions/common/QuestionsTypes';
import { type QuestionFramework } from '../components/interviews/questions/common/QuestionsTypes';
import { readMDXFile } from '../db/questions-bundlers/QuestionsBundler';
import {
  readQuestionInfoUserInterface,
  readQuestionMetadataUserInterface,
} from '../db/questions-bundlers/QuestionsBundlerUserInterface';
import {
  getQuestionOutPathUserInterface,
  getQuestionOutPathUserInterfaceFrameworkLocaleWriteup,
  getQuestionOutPathUserInterfaceFrameworkSetup,
  getQuestionOutPathUserInterfaceLocaleInfo,
  getQuestionSrcPathUserInterface,
  getQuestionSrcPathUserInterfaceWriteups,
  getQuestionSrcPathUserInterfaceWriteupsForFramework,
  getQuestionSrcPathUserInterfaceWriteupsFrameworkDirectory,
  QUESTIONS_SRC_DIR_USER_INTERFACE,
} from '../db/questions-bundlers/QuestionsBundlerUserInterfaceConfig';

const SUPPORTED_FRAMEWORKS = new Set<QuestionFramework>([
  'vanilla',
  'react',
  'angular',
  'svelte',
  'vue',
]);

async function generateSetupForQuestion(slug: string) {
  // TODO(interviews): Make this work.
  // const { default: remarkGfm } = await import('remark-gfm');

  const localeDirs = await globby('*/', {
    cwd: getQuestionSrcPathUserInterfaceWriteups(slug),
    deep: 0,
    ignore: ['setup'],
    onlyDirectories: true, // Ignore known non-locale folders
  });
  const locales = Array.from(
    new Set(localeDirs.map((dir) => dir.split('/')[0])),
  );

  const setupPath = path.join(getQuestionSrcPathUserInterface(slug), 'setup');

  const allSetupFilesForQuestion = await globby(path.join('**', '*'), {
    cwd: setupPath,
  });

  // Group folders for a question by (framework, setup).
  const groupedFiles = groupBy(allSetupFilesForQuestion, (filePath) => {
    const parts = filePath.split('/');

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

      paths.sort((a, b) => a.localeCompare(b));

      const [files, workspace] = await Promise.all([
        // Read files needed.
        paths.reduce<Record<string, SandpackFile>>((accFiles, filePath) => {
          const relativePath = path.relative(
            path.join(framework, setupType),
            filePath,
          );

          const fullPath = path.join(setupPath, filePath);
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
            setupPath,
            framework,
            setupType,
            'greatfrontend.json',
          );

          try {
            return JSON.parse(
              fs.readFileSync(greatfrontendConfigPath).toString(),
            ) as QuestionUserInterfaceWorkspace;
          } catch {
            return null;
          }
        })(),
      ]);

      return {
        files,
        framework,
        setupType,
        workspace: nullthrows(workspace),
      };
    }),
  );

  async function writeupFile() {
    await Promise.all(
      locales.map(async (locale) => {
        const frameworkDirs = await globby('*/', {
          cwd: getQuestionSrcPathUserInterfaceWriteupsFrameworkDirectory(
            slug,
            locale,
          ),
          deep: 0,
          onlyDirectories: true,
        });
        const frameworks = Array.from(
          new Set(frameworkDirs.map((dir) => dir.split('/')[0])),
        ) as ReadonlyArray<QuestionFramework>;

        await Promise.all(
          frameworks.map(async (framework) => {
            assert(
              SUPPORTED_FRAMEWORKS.has(framework),
              `Unsupported framework: ${framework}`,
            );

            const frameworkPath =
              getQuestionSrcPathUserInterfaceWriteupsForFramework(
                slug,
                framework,
                locale,
              );
            const writeupDirs = await globby('*/', {
              cwd: frameworkPath,
              deep: 0,
              onlyDirectories: true,
            });
            const writeupTypes = Array.from(
              new Set(writeupDirs.map((dir) => dir.split('/')[0])),
            );
            const filesArray = await Promise.all(
              writeupTypes.map(async (writeupType) => {
                const writeupMDX = await readMDXFile(
                  path.join(frameworkPath, writeupType, 'index.mdx'),
                  {},
                );

                return {
                  [writeupType]: writeupMDX,
                };
              }),
            );

            const writeupFilesObj = filesArray.reduce((acc, curr) => {
              return { ...acc, ...curr };
            }, {});

            const outPath =
              getQuestionOutPathUserInterfaceFrameworkLocaleWriteup(
                slug,
                framework,
                locale,
              );

            fs.mkdirSync(path.dirname(outPath), { recursive: true });
            fs.writeFileSync(outPath, JSON.stringify(writeupFilesObj, null, 2));
          }),
        );
      }),
    );
  }

  await Promise.all([
    (async () => {
      const metadata = await readQuestionMetadataUserInterface(slug);

      const outPath = path.join(
        getQuestionOutPathUserInterface(slug),
        'metadata.json',
      );

      fs.mkdirSync(path.dirname(outPath), { recursive: true });
      fs.writeFileSync(outPath, JSON.stringify(metadata, null, 2));
    })(),
    ...locales.map(async (locale) => {
      const info = await readQuestionInfoUserInterface(slug, locale);
      const outPath = getQuestionOutPathUserInterfaceLocaleInfo(slug, locale);

      fs.mkdirSync(path.dirname(outPath), { recursive: true });
      fs.writeFileSync(outPath, JSON.stringify(info, null, 2));
    }),
    ...setups.map(async ({ framework, setupType, files, workspace }) => {
      workspace?.visibleFiles?.forEach((file) => {
        if (!(file in files)) {
          throw Error(
            `Visible file "${file}" not found in files for ${setupType} of ${framework} for ${slug}`,
          );
        }
      });

      const author: string | null = (() => {
        try {
          const pkgJSON = JSON.parse(files['/package.json'].code);

          return pkgJSON.author ?? null;
        } catch {
          return null;
        }
      })();

      const bundle: Omit<QuestionUserInterfaceBundle, 'writeup'> = {
        author,
        files,
        workspace,
      };

      const outPath = getQuestionOutPathUserInterfaceFrameworkSetup(
        slug,
        framework,
        setupType,
      );

      fs.mkdirSync(path.dirname(outPath), { recursive: true });
      fs.writeFileSync(outPath, JSON.stringify(bundle, null, 2));
    }),
    writeupFile(),
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
