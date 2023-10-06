import type { CodingWorkspaceTabContents } from '../common/CodingWorkspaceContext';
import type {
  CodingWorkspaceTabFileType,
  CodingWorkspaceTabSubmissionType,
} from '../common/tabs/codingWorkspaceTabId';

export type UserInterfaceCodingWorkspacePredefinedTabsType =
  | 'console'
  | 'description'
  | 'file_explorer'
  | 'preview'
  | 'solution'
  | 'versions';

export type UserInterfaceCodingWorkspaceTabsType =
  | CodingWorkspaceTabFileType
  | CodingWorkspaceTabSubmissionType
  | UserInterfaceCodingWorkspacePredefinedTabsType;

export type UserInterfaceCodingWorkspacePredefinedTabsContents =
  CodingWorkspaceTabContents<UserInterfaceCodingWorkspacePredefinedTabsType>;
