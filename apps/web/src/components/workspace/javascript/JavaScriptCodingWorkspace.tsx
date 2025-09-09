'use client';

import { useMonaco } from '@monaco-editor/react';
import type { ComponentType } from 'react';

import type {
  QuestionJavaScript,
  QuestionMetadata,
} from '~/components/interviews/questions/common/QuestionsTypes';
import useQuestionsAutoMarkAsComplete from '~/components/interviews/questions/common/useQuestionsAutoMarkAsComplete';
import useCodingWorkspaceSyncSandpackFiles from '~/components/workspace/common/useCodingWorkspaceSyncSandpackFiles';

import { TilesProvider } from '~/react-tiling/state/TilesProvider';

import { codingFilesShouldUseTypeScript } from '../common/codingFilesShouldUseTypeScript';
import { CodingWorkspaceUnsavedSolutionProvider } from '../common/CodingWorkspaceUnsavedSolutionContext';
import useMonacoEditorModels from '../common/editor/useMonacoEditorModels';
import useMonacoLanguagesFetchTypeDeclarations from '../common/editor/useMonacoLanguagesFetchTypeDeclarations';
import useMonacoLanguagesLoadTSConfig from '../common/editor/useMonacoLanguagesLoadTSConfig';
import useMonacoLanguagesTypeScriptRunDiagnostics from '../common/editor/useMonacoLanguagesTypeScriptRunDiagnostics';
import useRestartSandpack from '../common/sandpack/useRestartSandpack';
import {
  getJavaScriptCodingWorkspaceLayoutTablet,
  getJavaScriptCodingWorkspaceLayoutTwoColumns,
} from './JavaScriptCodingWorkspaceLayouts';
import { useJavaScriptCodingWorkspaceSelector } from './store/hooks';
import useJavaScriptCodingWorkspaceSaveCodeLocally from './useJavaScriptCodingWorkspaceSaveLocally';

export type JavaScriptCodingWorkspaceProps = Readonly<{
  canViewPremiumContent: boolean;
  embed: boolean;
  isUserAgentTablet: boolean;
  nextQuestions: ReadonlyArray<QuestionMetadata>;
  question: QuestionJavaScript;
  renderWorkspace: ComponentType<JavaScriptWorkspaceRenderProps>;
  similarQuestions: ReadonlyArray<QuestionMetadata>;
  studyListKey?: string;
}>;

function JavaScriptCodingWorkspaceImpl(props: JavaScriptCodingWorkspaceProps) {
  const { renderWorkspace: Workspace } = props;

  return (
    <CodingWorkspaceUnsavedSolutionProvider>
      <CodingWorkspaceEffects {...props} />
      <Workspace {...props} />
    </CodingWorkspaceUnsavedSolutionProvider>
  );
}

// This component is just to manage side effects in lower level instead of in the parent JavaScriptCodingWorkspaceImpl
// otherwise it causes unnecessary re-render in the workspace due to state changes like files state
function CodingWorkspaceEffects(props: JavaScriptCodingWorkspaceProps) {
  const { question, studyListKey } = props;
  const { metadata } = question;
  const language = useJavaScriptCodingWorkspaceSelector(
    (state) => state.workspace.language,
  );
  const files = useJavaScriptCodingWorkspaceSelector(
    (state) => state.sandpack.current.files,
  );

  useRestartSandpack();

  const shouldUseTypeScript = codingFilesShouldUseTypeScript(
    Object.keys(files),
  );

  const monaco = useMonaco();

  useMonacoLanguagesLoadTSConfig(
    monaco,
    shouldUseTypeScript,
    files['/tsconfig.json']?.code,
  );
  useMonacoLanguagesFetchTypeDeclarations(
    monaco,
    shouldUseTypeScript,
    files['/package.json']?.code,
  );
  useMonacoLanguagesTypeScriptRunDiagnostics(
    monaco,
    shouldUseTypeScript,
    language === 'ts',
    files,
  );
  useMonacoEditorModels(monaco, files);
  useQuestionsAutoMarkAsComplete(metadata, studyListKey);
  useCodingWorkspaceSyncSandpackFiles();
  useJavaScriptCodingWorkspaceSaveCodeLocally();

  return null;
}

export type JavaScriptWorkspaceRenderProps = Omit<
  JavaScriptCodingWorkspaceProps,
  'renderWorkspace'
>;

type Props = Readonly<{
  activeTabScrollIntoView?: boolean;
  canViewPremiumContent: boolean;
  embed: boolean;
  isUserAgentTablet: boolean;
  nextQuestions: ReadonlyArray<QuestionMetadata>;
  question: QuestionJavaScript;
  renderWorkspace: ComponentType<JavaScriptWorkspaceRenderProps>;
  similarQuestions: ReadonlyArray<QuestionMetadata>;
  studyListKey?: string;
}>;

export default function JavaScriptCodingWorkspace({
  activeTabScrollIntoView = true,
  canViewPremiumContent,
  embed,
  isUserAgentTablet,
  nextQuestions,
  question,
  renderWorkspace,
  similarQuestions,
  studyListKey,
}: Props) {
  const visibleFiles = useJavaScriptCodingWorkspaceSelector(
    (state) => state.sandpack.current.visibleFiles,
  );
  const activeFile = useJavaScriptCodingWorkspaceSelector(
    (state) => state.sandpack.current.activeFile,
  );

  const shouldScrollToActiveTab = activeTabScrollIntoView && !isUserAgentTablet;

  return (
    <TilesProvider
      activeTabScrollIntoView={shouldScrollToActiveTab}
      defaultValue={
        isUserAgentTablet
          ? getJavaScriptCodingWorkspaceLayoutTablet(activeFile, visibleFiles)
          : getJavaScriptCodingWorkspaceLayoutTwoColumns(
              activeFile,
              visibleFiles,
            )
      }>
      <JavaScriptCodingWorkspaceImpl
        canViewPremiumContent={canViewPremiumContent}
        embed={embed}
        isUserAgentTablet={isUserAgentTablet}
        nextQuestions={nextQuestions}
        question={question}
        renderWorkspace={renderWorkspace}
        similarQuestions={similarQuestions}
        studyListKey={studyListKey}
      />
    </TilesProvider>
  );
}
