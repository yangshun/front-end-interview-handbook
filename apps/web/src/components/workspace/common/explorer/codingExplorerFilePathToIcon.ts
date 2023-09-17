import type { CodingWorkspaceTabIcon } from '../../CodingWorkspaceTabIcons';
import { CodingWorkspaceTabIcons } from '../../CodingWorkspaceTabIcons';

export function codingExplorerFilePathToIcon(
  filePath: string,
): CodingWorkspaceTabIcon | null {
  if (
    filePath.endsWith('.ts') ||
    filePath.endsWith('.tsx') ||
    filePath.includes('/tsconfig.')
  ) {
    return CodingWorkspaceTabIcons.ts;
  }

  if (filePath.endsWith('.js') || filePath.endsWith('.jsx')) {
    return CodingWorkspaceTabIcons.js;
  }

  if (filePath.endsWith('.css')) {
    return CodingWorkspaceTabIcons.css;
  }

  if (filePath.endsWith('.html')) {
    return CodingWorkspaceTabIcons.html;
  }

  if (filePath.includes('angular')) {
    return CodingWorkspaceTabIcons.angular;
  }

  if (filePath.endsWith('package.json')) {
    return CodingWorkspaceTabIcons.npm;
  }

  if (filePath.endsWith('.json')) {
    return CodingWorkspaceTabIcons.json;
  }

  return null;
}
