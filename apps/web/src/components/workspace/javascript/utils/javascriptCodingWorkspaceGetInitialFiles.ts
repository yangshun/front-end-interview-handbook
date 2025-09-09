import type {
  QuestionCodingWorkingLanguage,
  QuestionJavaScript,
} from '~/components/interviews/questions/common/QuestionsTypes';
import type { SandpackState } from '~/components/workspace/common/store/sandpack-slice';
import { codingWorkspaceConvertFilesToSandpackBundlerFiles } from '~/components/workspace/common/utils/codingWorkspaceConvertFiles';

import { loadLocalJavaScriptQuestionCode } from '../JavaScriptCodingWorkspaceCodeStorage';

export function javaScriptCodingWorkspaceGetInitialFiles({
  language,
  question,
}: {
  language: QuestionCodingWorkingLanguage;
  question: QuestionJavaScript;
}) {
  const { files, metadata, workspace } = question;
  const loadedCode = loadLocalJavaScriptQuestionCode(metadata, language);

  const code = loadedCode ?? question.skeleton[language];

  const skeletonFiles = {
    ...files,
    [workspace.main]: question.skeleton[language],
  };

  const finalFiles = {
    ...files,
    [workspace.main]: code,
  };

  return {
    files: finalFiles,
    skeletonFiles,
  };
}

export function javascriptCodingWorkspaceGetInitialSandpackState({
  language,
  question,
}: {
  language: QuestionCodingWorkingLanguage;
  question: QuestionJavaScript;
}): SandpackState {
  const { workspace } = question;
  const { files, skeletonFiles } = javaScriptCodingWorkspaceGetInitialFiles({
    language,
    question,
  });

  return {
    current: {
      activeFile: workspace.main,
      files: codingWorkspaceConvertFilesToSandpackBundlerFiles(files),
      visibleFiles: [workspace.main, workspace.run],
    },
    default: {
      activeFile: workspace.main,
      files: codingWorkspaceConvertFilesToSandpackBundlerFiles(skeletonFiles),
      visibleFiles: [workspace.main, workspace.run],
    },
  };
}
