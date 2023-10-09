import type { CodingWorkspaceTabContents } from '../common/CodingWorkspaceContext';
import type {
  CodingWorkspaceTabFileType,
  CodingWorkspaceTabSubmissionType,
} from '../common/tabs/codingWorkspaceTabId';

export type JavaScriptCodingWorkspacePredefinedTabsType =
  | 'community_solutions'
  | 'console'
  | 'description'
  | 'run_tests'
  | 'solution'
  | 'submissions'
  | 'submit'
  | 'test_cases';
export type JavaScriptCodingWorkspaceTabsType =
  | CodingWorkspaceTabFileType
  | CodingWorkspaceTabSubmissionType
  | JavaScriptCodingWorkspacePredefinedTabsType;

export type JavaScriptCodingWorkspacePredefinedTabsContents =
  CodingWorkspaceTabContents<JavaScriptCodingWorkspacePredefinedTabsType>;
