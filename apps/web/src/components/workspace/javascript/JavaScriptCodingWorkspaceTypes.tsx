import type { CodingWorkspaceTabContents } from '../common/CodingWorkspaceContext';
import type {
  CodingWorkspaceTabCommunitySolutionType,
  CodingWorkspaceTabFileType,
  CodingWorkspaceTabSubmissionType,
} from '../common/tabs/codingWorkspaceTabId';

export type JavaScriptCodingWorkspacePredefinedTabsType =
  | 'community_solution_create'
  | 'community_solutions'
  | 'console'
  | 'description'
  | 'run_tests'
  | 'solution'
  | 'submission_test_cases'
  | 'submissions'
  | 'submit';
export type JavaScriptCodingWorkspaceTabsType =
  | CodingWorkspaceTabCommunitySolutionType
  | CodingWorkspaceTabFileType
  | CodingWorkspaceTabSubmissionType
  | JavaScriptCodingWorkspacePredefinedTabsType;

export type JavaScriptCodingWorkspacePredefinedTabsContents =
  CodingWorkspaceTabContents<JavaScriptCodingWorkspacePredefinedTabsType>;
