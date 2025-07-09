import fs from 'fs';
import { globby } from 'globby';
import grayMatter from 'gray-matter';
import path from 'path';

import type {
  QuestionCodingWorkingLanguage,
  QuestionJavaScript,
  QuestionMetadata,
} from '../../components/interviews/questions/common/QuestionsTypes';
import { normalizeQuestionFrontMatter } from '../QuestionsUtils';
import { readMDXFile } from './QuestionsBundler';
import {
  getQuestionSrcPathAlgo,
  QUESTIONS_SRC_DIR_ALGO,
} from './QuestionsBundlerAlgoConfig';

async function readQuestionAlgoSkeleton(
  slug: string,
  language: QuestionCodingWorkingLanguage,
): Promise<string> {
  const questionPath = getQuestionSrcPathAlgo(slug);
  const gfeConfig = await readQuestionAlgoGFEConfig(slug);
  const skeletonPath = path.join(
    questionPath,
    'setup',
    gfeConfig.skeleton[language],
  );

  return fs.readFileSync(skeletonPath).toString().trim();
}

async function readQuestionMetadataAlgo(
  slug: string,
  locale = 'en-US',
): Promise<QuestionMetadata> {
  const questionPath = getQuestionSrcPathAlgo(slug);

  // Read frontmatter from MDX file.
  const filePath = path.join(questionPath, 'description', `${locale}.mdx`);
  const source = fs.readFileSync(filePath).toString().trim();
  const { data: frontMatter } = grayMatter(source);

  // Read locale-agnostic metadata file.
  const metadataPath = path.join(questionPath, 'metadata.json');
  const metadataJSON = JSON.parse(String(fs.readFileSync(metadataPath)));

  // Combine them together.
  const metadata = normalizeQuestionFrontMatter(
    { ...frontMatter, ...metadataJSON },
    'algo',
  );

  return metadata;
}

async function readQuestionMetadataWithFallbackAlgo(
  slug: string,
  requestedLocale = 'en-US',
): Promise<{ loadedLocale: string; metadata: QuestionMetadata }> {
  let loadedLocale = requestedLocale;
  const metadata = await (async () => {
    try {
      return await readQuestionMetadataAlgo(slug, requestedLocale);
    } catch {
      loadedLocale = 'en-US';

      return await readQuestionMetadataAlgo(slug, loadedLocale);
    }
  })();

  return {
    loadedLocale,
    metadata,
  };
}

async function readQuestionAlgoFiles(
  slug: string,
): Promise<Record<string, string>> {
  const questionPath = getQuestionSrcPathAlgo(slug);
  const [workspace, gfeConfig] = await Promise.all([
    readQuestionAlgoWorkspaceConfig(slug),
    readQuestionAlgoGFEConfig(slug),
  ]);
  const setupPath = path.join(questionPath, 'setup');

  const files = // Globby only supports forward slashes.
    (
      await globby(path.posix.join('**', '*'), {
        cwd: setupPath,
        ignore: [
          'README.md',
          'node_modules',
          'greatfrontend.json',
          gfeConfig.skeleton.js.replace(/^\//, ''),
          gfeConfig.skeleton.ts.replace(/^\//, ''),
        ],
      })
    ).map((filePath) => path.posix.sep + filePath);

  const compulsoryFiles = [workspace.main, workspace.run, workspace.submit];

  compulsoryFiles.forEach((filePath) => {
    if (!files.includes(filePath)) {
      throw `"${filePath}" not found for algo question "${slug}"`;
    }
  });

  const filteredFiles = files.filter(
    (filePath) =>
      !filePath.includes('/src') ||
      compulsoryFiles.includes(filePath) ||
      filePath.endsWith('.tests.json'),
  );

  return filteredFiles
    .map((filePath) => ({
      contents: fs.readFileSync(path.join(setupPath, filePath)).toString(),
      filePath,
    }))
    .reduce(
      (prev, { contents, filePath }) => ({
        ...prev,
        [filePath]: contents,
      }),
      {},
    );
}

async function readQuestionAlgoGFEConfig(slug: string): Promise<
  Readonly<{
    run: string;
    skeleton: Readonly<{
      js: string;
      ts: string;
    }>;
    submit: string;
  }>
> {
  const questionPath = getQuestionSrcPathAlgo(slug);

  return JSON.parse(
    fs
      .readFileSync(path.join(questionPath, 'setup', 'greatfrontend.json'))
      .toString(),
  );
}

async function readQuestionAlgoWorkspaceConfig(slug: string): Promise<
  Readonly<{
    main: string;
    run: string;
    submit: string;
  }>
> {
  const questionPath = getQuestionSrcPathAlgo(slug);
  const questionGFEConfig = await readQuestionAlgoGFEConfig(slug);
  const pkgJSON = JSON.parse(
    fs
      .readFileSync(path.join(questionPath, 'setup', 'package.json'))
      .toString(),
  );

  return {
    main: pkgJSON.main,
    run: questionGFEConfig.run,
    submit: questionGFEConfig.submit,
  };
}

export async function readQuestionAlgo(
  slug: string,
  locale = 'en-US',
): Promise<QuestionJavaScript> {
  const questionPath = getQuestionSrcPathAlgo(slug);
  const [
    metadata,
    { code: description },
    { code: solution },
    skeletonJS,
    skeletonTS,
    files,
    workspace,
  ] = await Promise.all([
    readQuestionMetadataAlgo(slug, locale),
    readMDXFile(path.join(questionPath, 'description', `${locale}.mdx`), {}),
    readMDXFile(path.join(questionPath, 'solution', `${locale}.mdx`), {}),
    readQuestionAlgoSkeleton(slug, 'js'),
    readQuestionAlgoSkeleton(slug, 'ts'),
    readQuestionAlgoFiles(slug),
    readQuestionAlgoWorkspaceConfig(slug),
  ]);

  return {
    description,
    files,
    metadata,
    skeleton: {
      js: skeletonJS,
      ts: skeletonTS,
    },
    solution,
    workspace,
  };
}

export async function readQuestionListMetadataAlgo(
  locale = 'en-US',
): Promise<ReadonlyArray<QuestionMetadata>> {
  const directories = fs
    .readdirSync(QUESTIONS_SRC_DIR_ALGO, {
      withFileTypes: true,
    })
    .filter((dirent) => dirent.isDirectory());

  const questions = await Promise.all(
    directories.map(async (dirent) => {
      const slug = dirent.name;

      const { metadata } = await readQuestionMetadataWithFallbackAlgo(
        slug,
        locale,
      );

      return metadata;
    }),
  );

  return questions.filter(({ published }) => published);
}
