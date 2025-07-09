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
  getQuestionSrcPathJavaScript,
  QUESTIONS_SRC_DIR_JAVASCRIPT,
} from './QuestionsBundlerJavaScriptConfig';

async function readQuestionJavaScriptSkeleton(
  slug: string,
  language: QuestionCodingWorkingLanguage,
): Promise<string> {
  const questionPath = getQuestionSrcPathJavaScript(slug);
  const gfeConfig = await readQuestionJavaScriptGFEConfig(slug);
  const skeletonPath = path.join(
    questionPath,
    'setup',
    gfeConfig.skeleton[language],
  );

  return fs.readFileSync(skeletonPath).toString().trim();
}

async function readQuestionMetadataJavaScript(
  slug: string,
  locale = 'en-US',
): Promise<QuestionMetadata> {
  const questionPath = getQuestionSrcPathJavaScript(slug);

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
    'javascript',
  );

  return metadata;
}

async function readQuestionMetadataWithFallbackJavaScript(
  slug: string,
  requestedLocale = 'en-US',
): Promise<{ loadedLocale: string; metadata: QuestionMetadata }> {
  let loadedLocale = requestedLocale;
  const metadata = await (async () => {
    try {
      return await readQuestionMetadataJavaScript(slug, requestedLocale);
    } catch {
      loadedLocale = 'en-US';

      return await readQuestionMetadataJavaScript(slug, loadedLocale);
    }
  })();

  return {
    loadedLocale,
    metadata,
  };
}

async function readQuestionJavaScriptFiles(
  slug: string,
): Promise<Record<string, string>> {
  const questionPath = getQuestionSrcPathJavaScript(slug);
  const [workspace, gfeConfig] = await Promise.all([
    readQuestionJavaScriptWorkspaceConfig(slug),
    readQuestionJavaScriptGFEConfig(slug),
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
      throw `"${filePath}" not found for JavaScript question "${slug}"`;
    }
  });

  const filteredFiles = files.filter(
    (filePath) =>
      !filePath.includes('/src') || compulsoryFiles.includes(filePath),
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

async function readQuestionJavaScriptGFEConfig(slug: string): Promise<
  Readonly<{
    run: string;
    skeleton: Readonly<{
      js: string;
      ts: string;
    }>;
    submit: string;
  }>
> {
  const questionPath = getQuestionSrcPathJavaScript(slug);

  return JSON.parse(
    fs
      .readFileSync(path.join(questionPath, 'setup', 'greatfrontend.json'))
      .toString(),
  );
}

async function readQuestionJavaScriptWorkspaceConfig(slug: string): Promise<
  Readonly<{
    main: string;
    run: string;
    submit: string;
  }>
> {
  const questionPath = getQuestionSrcPathJavaScript(slug);
  const questionGFEConfig = await readQuestionJavaScriptGFEConfig(slug);
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

export async function readQuestionJavaScript(
  slug: string,
  locale = 'en-US',
): Promise<QuestionJavaScript> {
  const questionPath = getQuestionSrcPathJavaScript(slug);
  const [
    metadata,
    { code: description },
    { code: solution },
    skeletonJS,
    skeletonTS,
    files,
    workspace,
  ] = await Promise.all([
    readQuestionMetadataJavaScript(slug, locale),
    readMDXFile(path.join(questionPath, 'description', `${locale}.mdx`), {}),
    readMDXFile(path.join(questionPath, 'solution', `${locale}.mdx`), {}),
    readQuestionJavaScriptSkeleton(slug, 'js'),
    readQuestionJavaScriptSkeleton(slug, 'ts'),
    readQuestionJavaScriptFiles(slug),
    readQuestionJavaScriptWorkspaceConfig(slug),
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

export async function readQuestionListMetadataJavaScript(
  locale = 'en-US',
): Promise<ReadonlyArray<QuestionMetadata>> {
  const directories = fs
    .readdirSync(QUESTIONS_SRC_DIR_JAVASCRIPT, {
      withFileTypes: true,
    })
    .filter((dirent) => dirent.isDirectory());

  const questions = await Promise.all(
    directories.map(async (dirent) => {
      const slug = dirent.name;

      const { metadata } = await readQuestionMetadataWithFallbackJavaScript(
        slug,
        locale,
      );

      return metadata;
    }),
  );

  return questions.filter(({ published }) => published);
}
