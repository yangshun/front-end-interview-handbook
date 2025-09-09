'use client';

import type { ComponentType } from 'react';

import type {
  QuestionJavaScript,
  QuestionMetadata,
} from '~/components/interviews/questions/common/QuestionsTypes';

import type { JavaScriptWorkspaceRenderProps } from './JavaScriptCodingWorkspace';
import JavaScriptCodingWorkspaceSection from './JavaScriptCodingWorkspaceSection';

type Props = Readonly<{
  canViewPremiumContent: boolean;
  isUserAgentTablet?: boolean;
  nextQuestions: ReadonlyArray<QuestionMetadata>;
  question: QuestionJavaScript;
  renderWorkspace: ComponentType<JavaScriptWorkspaceRenderProps>;
  similarQuestions: ReadonlyArray<QuestionMetadata>;
  studyListKey?: string;
}>;

export default function JavaScriptCodingWorkspacePage(props: Props) {
  return (
    <JavaScriptCodingWorkspaceSection
      {...props}
      sandpackO11yInstance="workspace.js"
    />
  );
}
