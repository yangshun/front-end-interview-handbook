import type { CodingWorkspaceTabContents } from '~/components/workspace/common/CodingWorkspaceContext';
import type { CodingWorkspaceTabFileType } from '~/components/workspace/common/tabs/codingWorkspaceTabId';

export type ProjectsChallengeOfficialSolutionWorkspacePredefinedTabsType =
  | 'console'
  | 'file_explorer'
  | 'preview';

export type ProjectsChallengeOfficialSolutionWorkspaceTabsType =
  | CodingWorkspaceTabFileType
  | ProjectsChallengeOfficialSolutionWorkspacePredefinedTabsType;

export type ProjectsChallengeOfficialSolutionWorkspacePredefinedTabsContents =
  CodingWorkspaceTabContents<ProjectsChallengeOfficialSolutionWorkspacePredefinedTabsType>;
