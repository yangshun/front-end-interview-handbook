import type { CodingWorkspaceTabContents } from '~/components/workspace/common/CodingWorkspaceContext';
import type { CodingWorkspaceTabFileType } from '~/components/workspace/common/tabs/codingWorkspaceTabId';

export type ProjectsChallengeSolutionWorkspacePredefinedTabsType =
  | 'console'
  | 'file_explorer'
  | 'preview';

export type ProjectsChallengeSolutionWorkspaceTabsType =
  | CodingWorkspaceTabFileType
  | ProjectsChallengeSolutionWorkspacePredefinedTabsType;

export type ProjectsChallengeSolutionWorkspacePredefinedTabsContents =
  CodingWorkspaceTabContents<ProjectsChallengeSolutionWorkspacePredefinedTabsType>;
