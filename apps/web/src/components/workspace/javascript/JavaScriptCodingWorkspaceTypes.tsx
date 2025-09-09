import type { CodingWorkspaceTabContents } from '../common/context/CodingWorkspaceContext';
import type {
  CodingWorkspaceTabAttemptType,
  CodingWorkspaceTabCommunitySolutionType,
  CodingWorkspaceTabFileType,
} from '../common/tabs/codingWorkspaceTabId';

export type JavaScriptCodingWorkspacePredefinedTabsType =
  | 'community_solution_create'
  | 'community_solutions'
  | 'console'
  | 'description'
  | 'editor_shortcuts'
  | 'run_tests'
  | 'solution'
  | 'submission_test_cases'
  | 'submissions'
  | 'submit';
export type JavaScriptCodingWorkspaceTabsType =
  | CodingWorkspaceTabAttemptType
  | CodingWorkspaceTabCommunitySolutionType
  | CodingWorkspaceTabFileType
  | JavaScriptCodingWorkspacePredefinedTabsType;

export type JavaScriptCodingWorkspacePredefinedTabsContents =
  CodingWorkspaceTabContents<JavaScriptCodingWorkspacePredefinedTabsType>;
