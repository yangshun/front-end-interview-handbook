import type { CodingWorkspaceTabContents } from '../CodingWorkspaceContext';
import type { CodingWorkspaceTabFileType } from '../common/tabs/codingWorkspaceTabId';

export type JavaScriptCodingWorkspacePredefinedTabsType =
  | 'console'
  | 'description'
  | 'run_tests'
  | 'solution'
  | 'submit'
  | 'test_cases';
export type JavaScriptCodingWorkspaceTabsType =
  | CodingWorkspaceTabFileType
  | JavaScriptCodingWorkspacePredefinedTabsType;

export type JavaScriptCodingWorkspacePredefinedTabsContents =
  CodingWorkspaceTabContents<JavaScriptCodingWorkspacePredefinedTabsType>;
