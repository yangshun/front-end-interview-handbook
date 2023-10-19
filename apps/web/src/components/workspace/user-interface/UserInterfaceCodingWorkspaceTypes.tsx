import type { CodingWorkspaceTabContents } from '../common/CodingWorkspaceContext';
import type {
  CodingWorkspaceTabFileType,
  CodingWorkspaceTabSubmissionType,
} from '../common/tabs/codingWorkspaceTabId';

export type UserInterfaceCodingWorkspacePredefinedTabsType =
  | 'community_solution_create'
  | 'community_solutions'
  | 'console'
  | 'description'
  | 'file_explorer'
  | 'preview'
  | 'solution_preview'
  | 'solution'
  | 'versions';

export type UserInterfaceCodingWorkspaceTabsType =
  | CodingWorkspaceTabFileType
  | CodingWorkspaceTabSubmissionType
  | UserInterfaceCodingWorkspacePredefinedTabsType;

export type UserInterfaceCodingWorkspacePredefinedTabsContents =
  CodingWorkspaceTabContents<UserInterfaceCodingWorkspacePredefinedTabsType>;
