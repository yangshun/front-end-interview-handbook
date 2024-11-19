import fs from 'fs';
import grayMatter from 'gray-matter';

import type {
  QuestionMetadata,
  QuestionQuiz,
} from '~/components/interviews/questions/common/QuestionsTypes';

import { readMDXFile } from './QuestionsBundler';
import type { QuestionsQuizSourceConfig } from './QuestionsBundlerQuizConfig';
import {
  QuestionsQuizSourceConfigJavaScript,
  QuestionsQuizSourceConfigNonJavaScript,
  QuestionsQuizSourceConfigReact,
} from './QuestionsBundlerQuizConfig';
import { normalizeQuestionFrontMatter } from '../QuestionsUtils';

async function readQuestionMetadataQuiz(
  quizSourceConfig: QuestionsQuizSourceConfig,
  slug: string,
  locale = 'en-US',
): Promise<QuestionMetadata> {
  // Read frontmatter from MDX file.
  const filePath = quizSourceConfig.questionsItemFilePath(slug, locale);

  const source = fs.readFileSync(filePath).toString().trim();
  const { data: frontMatter } = grayMatter(source);

  // Read locale-agnostic metadata file.
  const metadataPath = quizSourceConfig.questionsItemMetadataPath(slug);
  const metadataJSON = JSON.parse(String(fs.readFileSync(metadataPath)));
  // Combine them together.
  const metadata = normalizeQuestionFrontMatter(
    { ...frontMatter, ...metadataJSON },
    'quiz',
  );

  return {
    ...metadata,
    gitHubEditUrl: quizSourceConfig.gitHubEditUrl(slug, locale),
  };
}

async function readQuestionMetadataWithFallbackQuiz(
  quizSourceConfig: QuestionsQuizSourceConfig,
  slug: string,
  requestedLocale = 'en-US',
): Promise<{ loadedLocale: string; metadata: QuestionMetadata }> {
  let loadedLocale = requestedLocale;
  const metadata = await (async () => {
    try {
      return await readQuestionMetadataQuiz(
        quizSourceConfig,
        slug,
        requestedLocale,
      );
    } catch {
      loadedLocale = 'en-US';

      return await readQuestionMetadataQuiz(
        quizSourceConfig,
        slug,
        loadedLocale,
      );
    }
  })();

  return {
    loadedLocale,
    metadata,
  };
}

export async function readQuestionQuiz(
  quizSourceConfig: QuestionsQuizSourceConfig,
  slug: string,
  locale = 'en-US',
): Promise<QuestionQuiz> {
  const [metadata, description] = await Promise.all([
    readQuestionMetadataQuiz(quizSourceConfig, slug, locale),
    readMDXFile(quizSourceConfig.questionsItemFilePath(slug, locale), {}),
  ]);

  return {
    description: null,
    format: 'quiz',
    metadata,
    solution: description,
  };
}

export async function readQuestionListMetadataQuiz(
  locale = 'en-US',
): Promise<ReadonlyArray<QuestionMetadata>> {
  // Non-JavaScript.
  const nonJavaScriptQuestionsDirectories = fs
    .readdirSync(QuestionsQuizSourceConfigNonJavaScript.questionsListPath, {
      withFileTypes: true,
    })
    .filter((dirent) => dirent.isDirectory());

  const nonJavaScriptQuestions = await Promise.all(
    nonJavaScriptQuestionsDirectories.map(async (dirent) => {
      const slug = dirent.name;

      const { metadata } = await readQuestionMetadataWithFallbackQuiz(
        QuestionsQuizSourceConfigNonJavaScript,
        slug,
        locale,
      );

      return metadata;
    }),
  );

  // JavaScript.
  const javaScriptQuestionsDirectories = fs
    .readdirSync(QuestionsQuizSourceConfigJavaScript.questionsListPath, {
      withFileTypes: true,
    })
    .filter((dirent) => dirent.isDirectory());

  const javaScriptQuestions = await Promise.all(
    javaScriptQuestionsDirectories.map(async (dirent) => {
      const slug = dirent.name;

      const { metadata } = await readQuestionMetadataWithFallbackQuiz(
        QuestionsQuizSourceConfigJavaScript,
        slug,
        locale,
      );

      return metadata;
    }),
  );

  // React.
  const reactQuestionsDirectories = fs
    .readdirSync(QuestionsQuizSourceConfigReact.questionsListPath, {
      withFileTypes: true,
    })
    .filter((dirent) => dirent.isDirectory());

  const reactQuestions = await Promise.all(
    reactQuestionsDirectories.map(async (dirent) => {
      const slug = dirent.name;

      const { metadata } = await readQuestionMetadataWithFallbackQuiz(
        QuestionsQuizSourceConfigReact,
        slug,
        locale,
      );

      return metadata;
    }),
  );

  const questions = [
    ...javaScriptQuestions,
    ...nonJavaScriptQuestions,
    ...reactQuestions,
  ];

  return questions.filter(({ published }) => published);
}
