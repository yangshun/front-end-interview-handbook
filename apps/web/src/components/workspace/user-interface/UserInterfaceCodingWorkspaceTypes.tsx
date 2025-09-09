import type { CodingWorkspaceTabContents } from '../common/CodingWorkspaceContext';
import type {
  CodingWorkspaceTabAttemptType,
  CodingWorkspaceTabFileType,
} from '../common/tabs/codingWorkspaceTabId';

export type UserInterfaceCodingWorkspacePredefinedTabsType =
  | 'community_solution_create'
  | 'community_solutions'
  | 'console'
  | 'description'
  | 'editor_shortcuts'
  | 'file_explorer'
  | 'preview'
  | 'solution_preview'
  | 'solution'
  | 'versions';

export type UserInterfaceCodingWorkspaceTabsType =
  | CodingWorkspaceTabAttemptType
  | CodingWorkspaceTabFileType
  | UserInterfaceCodingWorkspacePredefinedTabsType;

export type UserInterfaceCodingWorkspacePredefinedTabsContents =
  CodingWorkspaceTabContents<UserInterfaceCodingWorkspacePredefinedTabsType>;
