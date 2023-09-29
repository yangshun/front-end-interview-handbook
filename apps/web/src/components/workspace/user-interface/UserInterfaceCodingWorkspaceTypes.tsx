import type { CodingWorkspaceTabContents } from '../CodingWorkspaceContext';
import type { CodingWorkspaceTabFileType } from '../common/tabs/codingWorkspaceTabId';

export type UserInterfaceCodingWorkspacePredefinedTabsType =
  | 'console'
  | 'description'
  | 'file_explorer'
  | 'preview'
  | 'solution';

export type UserInterfaceCodingWorkspaceTabsType =
  | CodingWorkspaceTabFileType
  | UserInterfaceCodingWorkspacePredefinedTabsType;

export type UserInterfaceCodingWorkspacePredefinedTabsContents =
  CodingWorkspaceTabContents<UserInterfaceCodingWorkspacePredefinedTabsType>;
