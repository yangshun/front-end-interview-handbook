import chalk from 'chalk';
import fs from 'fs';
import path from 'path';
import stripComments from 'strip-comments';
import ts from 'typescript';

const {
  createCompilerHost,
  createProgram,
  formatDiagnosticsWithColorAndContext,
  getPreEmitDiagnostics,
  ModuleResolutionKind,
  ScriptTarget,
} = ts;

import prettier from 'prettier';

import {
  getQuestionSrcPathJavaScript,
  QUESTIONS_SRC_DIR_JAVASCRIPT,
} from './../db/questions-bundlers/QuestionsBundlerJavaScriptConfig';

const PRETTIER_CONFIG_PATH = path.join(
  '..',
  '..',
  'packages',
  'questions',
  'javascript',
  '.prettierrc',
);

export async function preprocessJavaScriptQuestions() {
  const prettierConfig = await loadPrettierConfig();

  console.info(chalk.cyanBright('Pre-processing all JavaScript questions...'));

  // If questionName is not provided, fetch the list of possible questionNames
  const directories = fs
    .readdirSync(QUESTIONS_SRC_DIR_JAVASCRIPT, {
      withFileTypes: true,
    })
    .filter((dirent) => dirent.isDirectory());

  await Promise.all(
    directories.map(async (dirent) => {
      await preprocessJavaScriptQuestion(dirent.name, prettierConfig);
    }),
  );
}

export async function preprocessJavaScriptQuestion(
  slug: string,
  prettierConfig: prettier.Options,
) {
  const questionPath = getQuestionSrcPathJavaScript(slug);
  const sourceSkeletonPath = path.join(
    questionPath,
    'src',
    `${slug}.skeleton.src.ts`,
  );

  const tsSkeletonPath = path.join(questionPath, 'src', `${slug}.skeleton.ts`);

  // Check if source file exists
  if (fs.existsSync(sourceSkeletonPath)) {
    // Read the contents of source file
    const srcSkeletonContent = fs.readFileSync(sourceSkeletonPath, 'utf-8');

    const tsSkeletonContent = stripComments(srcSkeletonContent);

    // Write the contents of source file to destination file
    fs.writeFileSync(tsSkeletonPath, tsSkeletonContent, 'utf-8');

    console.info(chalk.green(`Generated TS skeleton for ${slug}`));

    const jsSkeleton = createProgram([sourceSkeletonPath], {
      moduleResolution: ModuleResolutionKind.NodeNext,
      outFile: path.join(questionPath, 'src', `${slug}.skeleton.js`),
      removeComments: false,
      target: ScriptTarget.ESNext,
    });

    const emitResult = jsSkeleton.emit();

    if (emitResult.emitSkipped) {
      const diagnostics = getPreEmitDiagnostics(jsSkeleton);

      throw new Error(
        `Failed to compile JS skeleton for ${slug}: ${formatDiagnosticsWithColorAndContext(
          diagnostics,
          createCompilerHost({}),
        )}`,
      );
    }

    // Format the generated JS file
    const jsSkeletonPath = path.join(
      questionPath,
      'src',
      `${slug}.skeleton.js`,
    );

    const jsSkeletonContent = fs.readFileSync(jsSkeletonPath, 'utf-8');

    const formattedJsSkeletonContent = prettier.format(
      jsSkeletonContent,
      prettierConfig,
    );

    fs.writeFileSync(jsSkeletonPath, formattedJsSkeletonContent, 'utf-8');

    console.info(chalk.green(`Generated JS skeleton for ${slug}`));
  } else {
    console.error(
      chalk.yellow(`Skipping ${slug}, skeleton.src.ts does not exist.`),
    );
  }
}

async function loadPrettierConfig() {
  const prettierConfig = await prettier.resolveConfig(PRETTIER_CONFIG_PATH);

  if (!prettierConfig) {
    throw new Error(
      `Fatal error, could not resolve Prettier config at ${PRETTIER_CONFIG_PATH}`,
    );
  }

  return prettierConfig;
}

// Get the questionName from command line argument
const slug = process.argv[2];

(async () => {
  // If questionName is provided, run the script only for that questionName
  if (slug) {
    const prettierConfig = await loadPrettierConfig();

    console.info(
      chalk.cyanBright(`Pre-processing JavaScript question: ${slug}...`),
    );
    preprocessJavaScriptQuestion(slug, prettierConfig);
  } else {
    preprocessJavaScriptQuestions();
  }
})();
