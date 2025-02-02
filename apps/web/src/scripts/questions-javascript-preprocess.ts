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
  QUESTIONS_SRC_DIR_JAVASCRIPT,
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

async function preprocessRawFile(
  rawFile: string,
  prettierConfig: prettier.Options,
) {
  const tsPath = rawFile.replace('.raw.ts', '.ts');
  const jsPath = rawFile.replace('.raw.ts', '.js');

  // Read the contents of source file
  const srcContent = fs.readFileSync(rawFile, 'utf-8');

  const tsContent = stripComments(srcContent);

  // Write the contents of source file to destination file
  fs.writeFileSync(tsPath, tsContent, 'utf-8');

  const tsFileName = path.basename(tsPath);

  console.info(chalk.green(`Generated ${tsFileName}`));

  const jsFile = createProgram([rawFile], {
    moduleResolution: ModuleResolutionKind.NodeNext,
    outFile: jsPath,
    removeComments: false,
    target: ScriptTarget.ESNext,
  });

  const jsFileName = path.basename(jsPath);

  const emitResult = jsFile.emit();

  if (emitResult.emitSkipped) {
    const diagnostics = getPreEmitDiagnostics(jsFile);

    throw new Error(
      `Failed to generate ${jsFileName}: ${formatDiagnosticsWithColorAndContext(
        diagnostics,
        createCompilerHost({}),
      )}`,
    );
  }

  // Format the generated JS file
  const jsContent = fs.readFileSync(jsPath, 'utf-8');

  const formattedJsContent = await prettier.format(jsContent, prettierConfig);

  fs.writeFileSync(jsPath, formattedJsContent, 'utf-8');

  console.info(chalk.green(`Generated ${jsFileName}`));
}

export async function preprocessJavaScriptQuestion(
  slug: string,
  prettierConfig: prettier.Options,
) {
  const questionPath = getQuestionSrcPathJavaScript(slug);

  // Read files which have a .raw.ts in {questionPath}/src.
  const rawFiles = fs
    .readdirSync(path.join(questionPath, 'setup', 'src'))
    .filter((fileName) => fileName.endsWith('.raw.ts'));

  if (rawFiles.length === 0) {
    return;
  }

  await Promise.all(
    rawFiles.map(async (rawFile) => {
      preprocessRawFile(
        path.join(questionPath, 'setup', 'src', rawFile),
        prettierConfig,
      );
    }),
  );
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
