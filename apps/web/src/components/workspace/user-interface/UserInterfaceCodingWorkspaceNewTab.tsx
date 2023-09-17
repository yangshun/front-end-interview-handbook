import { RiCodeLine } from 'react-icons/ri';

import { useTilesContext } from '~/react-tiling/state/useTilesContext';

import type {
  PredefinedTabsContents,
  StaticTabsType,
} from './UserInterfaceCodingWorkspace';
import { codingWorkspaceExtractFileNameFromPath } from '../common/codingWorkspaceExtractFileNameFromPath';
import { codingWorkspaceExplorerFilePathToIcon } from '../common/explorer/codingWorkspaceExplorerFilePathToIcon';

import { useSandpack } from '@codesandbox/sandpack-react';

type UserInterfaceCodingNewTabTypeData =
  | {
      payload: { code: string; file: string };
      type: 'code';
    }
  | {
      type: StaticTabsType;
    };

export default function UserInterfaceCodingWorkspaceNewTab({
  predefinedTabs,
  onSelectTabType,
}: Readonly<{
  onSelectTabType: (data: UserInterfaceCodingNewTabTypeData) => void;
  predefinedTabs: PredefinedTabsContents;
}>) {
  const { sandpack } = useSandpack();
  const { files } = sandpack;
  const { queryTabByPattern } = useTilesContext();
  const openedFiles = new Set(
    queryTabByPattern(/^\//).map(({ tabId }) => tabId),
  );
  const unopenedFiles = Object.entries(files).filter(
    ([file]) => !openedFiles.has(file),
  );

  return (
    <div className="flex flex-col gap-4 p-4">
      <div className="flex flex-col gap-2">
        <p className="text-sm font-medium">Tabs</p>
        <div className="flex flex-wrap gap-2">
          {Object.entries(predefinedTabs).map(([tabType, tabDetails]) => (
            <button
              key={tabType}
              className="flex gap-x-1.5 rounded-full border border-neutral-700 px-3 py-1.5 text-xs transition-colors hover:bg-neutral-700"
              type="button"
              onClick={() => {
                onSelectTabType({ type: tabType });
              }}>
              <tabDetails.icon className="h-4 w-4 shrink-0" />
              {tabDetails.label}
            </button>
          ))}
        </div>
      </div>
      {unopenedFiles.length > 0 && (
        <div className="flex flex-col gap-2">
          <p className="text-sm font-medium">Files</p>
          <div className="flex flex-wrap gap-2">
            {unopenedFiles.map(([filePath, { code }]) => {
              const Icon =
                codingWorkspaceExplorerFilePathToIcon(filePath)?.icon ??
                RiCodeLine;

              return (
                <button
                  key={filePath}
                  className="flex gap-x-1.5 rounded-full border border-neutral-700 px-3 py-1.5 text-xs transition-colors hover:bg-neutral-700"
                  type="button"
                  onClick={() => {
                    onSelectTabType({
                      payload: { code, file: filePath },
                      type: 'code',
                    });
                  }}>
                  <Icon className="h-4 w-4 shrink-0" />
                  <code>
                    {codingWorkspaceExtractFileNameFromPath(filePath)}
                  </code>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
