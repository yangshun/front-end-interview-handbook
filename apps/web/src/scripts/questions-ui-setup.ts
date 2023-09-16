import assert from 'assert';
import fs from 'fs';
import glob from 'glob';
import lodash from 'lodash';
import path from 'path';

import type {
  QuestionUserInterfaceSandpackSetup,
  QuestionUserInterfaceSetupType,
} from '../components/questions/common/QuestionsTypes';
import { type QuestionFramework } from '../components/questions/common/QuestionsTypes';
import { readMDXFile } from '../db/questions-bundlers/QuestionsBundler';
import { readQuestionMetadataUserInterface } from '../db/questions-bundlers/QuestionsBundlerUserInterface';
import {
  getQuestionOutPathUserInterface,
  getQuestionOutPathUserInterfaceV2,
  getQuestionSrcPathUserInterface,
  QUESTIONS_SRC_DIR_USER_INTERFACE,
} from '../db/questions-bundlers/QuestionsBundlerUserInterfaceConfig';

import type {
  SandboxEnvironment,
  SandpackFile,
} from '@codesandbox/sandpack-react';

const SUPPORTED_FRAMEWORKS = new Set<QuestionFramework>(['vanilla', 'react']);
// Const SUPPORTED_SETUP_TYPE = new Set<QuestionUserInterfaceSetupType>([
//   'solution',
//   'skeleton',
// ]);

type Setup = Readonly<{
  activeFile?: string;
  visibleFiles?: Array<string>;
}>;

type GFEConfig = Readonly<{
  activeFile?: string;
  environment: string;
  visibleFiles?: Array<string>;
}>;

const DEFAULT_FRAMEWORK_SETUPS: Record<
  QuestionFramework,
  Readonly<{
    dependencies: Record<string, string>;
    entry: string;
    environment: SandboxEnvironment;
    main: string;
    visibleFiles?: Array<string>;
  }>
> = {
  // TODO: Add angular properly
  angular: {
    dependencies: {},
    entry: '',
    environment: 'angular-cli',
    main: '',
  },
  react: {
    dependencies: {
      react: '^18.2.0',
      'react-dom': '^18.2.0',
      'react-scripts': '^4.0.0',
    },
    entry: '/index.js',
    environment: 'create-react-app',
    main: '/App.js',
  },
  vanilla: {
    dependencies: {},
    entry: '/src/index.js',
    environment: 'parcel',
    main: '/src/index.js',
  },
  // TODO: Add vue properly
  vue: {
    dependencies: {},
    entry: '',
    environment: 'vue-cli',
    main: '',
  },
};

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
      // Assert(
      //   SUPPORTED_SETUP_TYPE.has(setupType),
      //   `Unsupported setup type: ${setupType}`,
      // );

      const [writeupMdx, files, baseSetup] = await Promise.all([
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
        // Read setup.json.
        (() => {
          const baseSetupPath = path.join(
            frameworksPath,
            framework,
            'setup.json',
          );

          try {
            return JSON.parse(
              fs.readFileSync(baseSetupPath).toString(),
            ) as Setup;
          } catch {
            return null;
          }
        })(),
      ]);

      return {
        baseSetup,
        files,
        framework,
        setupType,
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
      async ({ framework, setupType, files, writeup, baseSetup }) => {
        const setup = DEFAULT_FRAMEWORK_SETUPS[framework];
        const mergedSandpackSetup: QuestionUserInterfaceSandpackSetup = {
          ...setup,
          ...baseSetup,
          files,
        };

        validateSandpackSetup(mergedSandpackSetup, framework, setupType);

        const outPath = path.join(
          getQuestionOutPathUserInterface(slug),
          framework,
          `${setupType}.json`,
        );

        fs.mkdirSync(path.dirname(outPath), { recursive: true });

        const bundle = {
          sandpack: mergedSandpackSetup,
          writeup,
        };

        fs.writeFileSync(outPath, JSON.stringify(bundle, null, 2));
      },
    ),
  ]);
}

async function generateSetupForQuestionV2(slug: string) {
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
      // Assert(
      //   SUPPORTED_SETUP_TYPE.has(setupType),
      //   `Unsupported setup type: ${setupType}`,
      // );

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
        getQuestionOutPathUserInterfaceV2(slug),
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
          getQuestionOutPathUserInterfaceV2(slug),
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

function validateSandpackSetup(
  setup: QuestionUserInterfaceSandpackSetup,
  framework: QuestionFramework,
  setupType: QuestionUserInterfaceSetupType,
) {
  setup.visibleFiles?.forEach((file) => {
    if (!(file in setup.files)) {
      throw Error(
        `Visible file "${file}" not found in files for ${setupType} of ${framework}`,
      );
    }
  });
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
      await generateSetupForQuestionV2(dirent.name);
    }),
  );
}
