import fs from 'fs';
import grayMatter from 'gray-matter';

import type {
  InterviewsQuestionItemMinimal,
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
): Promise<InterviewsQuestionItemMinimal> {
  // Read frontmatter from MDX file.
  const filePath = quizSourceConfig.questionsItemFilePath(slug, locale);

  const source = fs.readFileSync(filePath).toString().trim();
  const { data: frontMatter } = grayMatter(source);

  // Read locale-agnostic metadata file.
  const metadataPath = quizSourceConfig.questionsItemMetadataPath(slug);
  const metadataJSON = JSON.parse(String(fs.readFileSync(metadataPath)));
  // Combine them together.
  const content = normalizeQuestionFrontMatter(
    { ...frontMatter, ...metadataJSON },
    'quiz',
  );

  return {
    ...content,
    metadata: {
      ...content.metadata,
      gitHubEditUrl: quizSourceConfig.gitHubEditUrl(slug, locale),
    },
  };
}

async function readQuestionMetadataWithFallbackQuiz(
  quizSourceConfig: QuestionsQuizSourceConfig,
  slug: string,
  requestedLocale = 'en-US',
): Promise<{ content: InterviewsQuestionItemMinimal; loadedLocale: string }> {
  let loadedLocale = requestedLocale;
  const content = await (async () => {
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
    content,
    loadedLocale,
  };
}

export async function readQuestionQuiz(
  quizSourceConfig: QuestionsQuizSourceConfig,
  slug: string,
  locale = 'en-US',
): Promise<QuestionQuiz> {
  const [content, description] = await Promise.all([
    readQuestionMetadataQuiz(quizSourceConfig, slug, locale),
    readMDXFile(quizSourceConfig.questionsItemFilePath(slug, locale), {}),
  ]);

  return {
    description: null,
    ...content,
    solution: description,
  };
}

export async function readQuestionListMetadataQuiz(
  locale = 'en-US',
): Promise<ReadonlyArray<InterviewsQuestionItemMinimal>> {
  // Non-JavaScript.
  const nonJavaScriptQuestionsDirectories = fs
    .readdirSync(QuestionsQuizSourceConfigNonJavaScript.questionsListPath, {
      withFileTypes: true,
    })
    .filter((dirent) => dirent.isDirectory());

  const nonJavaScriptQuestions = await Promise.all(
    nonJavaScriptQuestionsDirectories.map(async (dirent) => {
      const slug = dirent.name;

      const { content } = await readQuestionMetadataWithFallbackQuiz(
        QuestionsQuizSourceConfigNonJavaScript,
        slug,
        locale,
      );

      return content;
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

      const { content } = await readQuestionMetadataWithFallbackQuiz(
        QuestionsQuizSourceConfigJavaScript,
        slug,
        locale,
      );

      return content;
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

      const { content } = await readQuestionMetadataWithFallbackQuiz(
        QuestionsQuizSourceConfigReact,
        slug,
        locale,
      );

      return content;
    }),
  );

  const questions = [
    ...javaScriptQuestions,
    ...nonJavaScriptQuestions,
    ...reactQuestions,
  ];

  return questions.filter(({ metadata }) => metadata.published);
}
