'use client';

import { useMonaco } from '@monaco-editor/react';
import type { ComponentType } from 'react';
import { useCallback } from 'react';

import { questionHrefWithListType } from '~/components/interviews/questions/common/QuestionHrefUtils';
import type {
  QuestionFramework,
  QuestionMetadata,
  QuestionUserInterface,
} from '~/components/interviews/questions/common/QuestionsTypes';
import useQuestionsAutoMarkAsComplete from '~/components/interviews/questions/common/useQuestionsAutoMarkAsComplete';
import { questionUserInterfacePath } from '~/components/interviews/questions/content/user-interface/QuestionUserInterfaceRoutes';
import { useQuestionsListTypeCurrent } from '~/components/interviews/questions/listings/utils/useQuestionsListDataForType';
import { CodingWorkspaceUnsavedSolutionProvider } from '~/components/workspace/common/CodingWorkspaceUnsavedSolutionContext';
import useCodingWorkspaceSyncSandpackFiles from '~/components/workspace/common/useCodingWorkspaceSyncSandpackFiles';

import { useI18nRouter } from '~/next-i18nostic/src';
import { TilesProvider } from '~/react-tiling/state/TilesProvider';

import { codingFilesShouldUseTypeScript } from '../common/codingFilesShouldUseTypeScript';
import useMonacoEditorModels from '../common/editor/useMonacoEditorModels';
import useMonacoLanguagesFetchTypeDeclarations from '../common/editor/useMonacoLanguagesFetchTypeDeclarations';
import useMonacoLanguagesJSONDefaults from '../common/editor/useMonacoLanguagesJSONDefaults';
import useMonacoLanguagesLoadTSConfig from '../common/editor/useMonacoLanguagesLoadTSConfig';
import useMonacoLanguagesTypeScriptRunDiagnostics from '../common/editor/useMonacoLanguagesTypeScriptRunDiagnostics';
import useRestartSandpack from '../common/sandpack/useRestartSandpack';
import useSandpackModuleErrorRefreshBrowser from '../common/sandpack/useSandpackModuleErrorRefreshBrowser';
import { useUserInterfaceCodingWorkspaceSelector } from './store/hooks';
import {
  getUserInterfaceCodingWorkspaceLayout,
  getUserInterfaceCodingWorkspaceLayoutMobile,
} from './UserInterfaceCodingWorkspaceLayouts';
import useUserInterfaceCodingWorkspaceSaveCodeLocally from './useUserInterfaceCodingWorkspaceSaveCodeLocally';

export type UserInterfaceWorkspaceProps = Readonly<{
  canViewPremiumContent: boolean;
  embed: boolean;
  isUserAgentTablet: boolean;
  nextQuestions: ReadonlyArray<QuestionMetadata>;
  onFrameworkChange?: (framework: QuestionFramework) => void;
  question: QuestionUserInterface;
  renderWorkspace: ComponentType<UserInterfaceWorkspaceRenderProps>;
  similarQuestions: ReadonlyArray<QuestionMetadata>;
  studyListKey?: string;
}>;

function UserInterfaceCodingWorkspaceImpl(props: UserInterfaceWorkspaceProps) {
  const {
    onFrameworkChange: onFrameworkChangeProp,
    question,
    renderWorkspace: Workspace,
    studyListKey,
  } = props;
  const router = useI18nRouter();
  const { metadata } = question;

  const listType = useQuestionsListTypeCurrent(studyListKey);

  const onFrameworkChange = useCallback(
    (value: QuestionFramework) => {
      const frameworkValue = value as QuestionFramework;
      const frameworkItem = metadata.frameworks.find(
        ({ framework: frameworkItemValue }) =>
          frameworkItemValue === frameworkValue,
      );

      if (frameworkItem == null) {
        return;
      }

      const href = questionUserInterfacePath(metadata, frameworkValue);

      router.push(questionHrefWithListType(href, listType));
    },
    [listType, metadata, router],
  );

  const workspaceProps = {
    ...props,
    onFrameworkChange: onFrameworkChangeProp ?? onFrameworkChange,
  };

  return (
    <CodingWorkspaceUnsavedSolutionProvider>
      <CodingWorkspaceEffects {...props} />
      <Workspace {...workspaceProps} />
    </CodingWorkspaceUnsavedSolutionProvider>
  );
}

// This component is just to manage side effects in lower level instead of in the parent JavaScriptCodingWorkspaceImpl
// otherwise it causes unnecessary re-render in the workspace due to state changes like files state
function CodingWorkspaceEffects(props: UserInterfaceWorkspaceProps) {
  const { question, studyListKey } = props;
  const files = useUserInterfaceCodingWorkspaceSelector(
    (state) => state.sandpack.current.files,
  );
  const { metadata } = question;

  useRestartSandpack();
  useSandpackModuleErrorRefreshBrowser();

  const shouldUseTypeScript = codingFilesShouldUseTypeScript(
    Object.keys(files),
  );

  const monaco = useMonaco();

  useMonacoLanguagesJSONDefaults(monaco);
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
    true,
    files,
  );
  useMonacoEditorModels(monaco, files);
  useQuestionsAutoMarkAsComplete(metadata, studyListKey);
  useCodingWorkspaceSyncSandpackFiles();
  useUserInterfaceCodingWorkspaceSaveCodeLocally(question);

  return null;
}

export type UserInterfaceWorkspaceRenderProps = Omit<
  Readonly<{
    onFrameworkChange: (framework: QuestionFramework) => void;
  }> &
    UserInterfaceWorkspaceProps,
  'renderWorkspace'
>;

type Props = Readonly<
  UserInterfaceWorkspaceProps & {
    activeTabScrollIntoView?: boolean;
  }
>;

export default function UserInterfaceCodingWorkspace({
  activeTabScrollIntoView = true,
  isUserAgentTablet = false,
  ...props
}: Props) {
  const visibleFiles = useUserInterfaceCodingWorkspaceSelector(
    (state) => state.sandpack.current.visibleFiles,
  );
  const activeFile = useUserInterfaceCodingWorkspaceSelector(
    (state) => state.sandpack.current.activeFile,
  );
  const shouldScrollToActiveTab = activeTabScrollIntoView && !isUserAgentTablet;

  return (
    <TilesProvider
      activeTabScrollIntoView={shouldScrollToActiveTab}
      defaultValue={
        isUserAgentTablet
          ? getUserInterfaceCodingWorkspaceLayoutMobile(
              activeFile,
              visibleFiles,
            )
          : getUserInterfaceCodingWorkspaceLayout(activeFile, visibleFiles)
      }>
      <UserInterfaceCodingWorkspaceImpl
        isUserAgentTablet={isUserAgentTablet}
        {...props}
      />
    </TilesProvider>
  );
}
