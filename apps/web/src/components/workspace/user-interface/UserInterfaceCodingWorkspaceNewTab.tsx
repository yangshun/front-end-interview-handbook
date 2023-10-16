import { RiCodeLine } from 'react-icons/ri';

import Button from '~/components/ui/Button';
import Text from '~/components/ui/Text';

import type {
  UserInterfaceCodingWorkspacePredefinedTabsContents,
  UserInterfaceCodingWorkspacePredefinedTabsType,
} from './UserInterfaceCodingWorkspaceTypes';
import useUserInterfaceCodingWorkspaceTilesContext from './useUserInterfaceCodingWorkspaceTilesContext';
import { codingWorkspaceExtractFileNameFromPath } from '../common/codingWorkspaceExtractFileNameFromPath';
import { codingWorkspaceExplorerFilePathToIcon } from '../common/explorer/codingWorkspaceExplorerFilePathToIcon';
import {
  codingWorkspaceTabFileId,
  codingWorkspaceTabFilePattern,
} from '../common/tabs/codingWorkspaceTabId';

import { useSandpack } from '@codesandbox/sandpack-react';

type UserInterfaceCodingNewTabTypeData =
  | {
      payload: { code: string; file: string };
      type: 'code';
    }
  | {
      type: UserInterfaceCodingWorkspacePredefinedTabsType;
    };

export default function UserInterfaceCodingWorkspaceNewTab({
  predefinedTabs,
  onSelectTabType,
}: Readonly<{
  onSelectTabType: (data: UserInterfaceCodingNewTabTypeData) => void;
  predefinedTabs: UserInterfaceCodingWorkspacePredefinedTabsContents;
}>) {
  const { sandpack } = useSandpack();
  const { files } = sandpack;
  const { queryTabByPattern } = useUserInterfaceCodingWorkspaceTilesContext();
  const openedFiles = new Set(
    queryTabByPattern(codingWorkspaceTabFilePattern).map(({ tabId }) => tabId),
  );
  const unopenedFiles = Object.entries(files).filter(
    ([file]) => !openedFiles.has(codingWorkspaceTabFileId(file)),
  );

  return (
    <div className="flex flex-col gap-4 p-4">
      <div className="flex flex-col gap-2">
        <Text display="block" size="body2" weight="medium">
          Tabs
        </Text>
        <div className="flex flex-wrap gap-2">
          {Object.entries(predefinedTabs).map(([tabType, tabDetails]) => (
            <Button
              key={tabType}
              addonPosition="start"
              icon={tabDetails.icon}
              label={tabDetails.label}
              variant="secondary"
              onClick={() => {
                onSelectTabType({
                  type: tabType as UserInterfaceCodingWorkspacePredefinedTabsType,
                });
              }}
            />
          ))}
        </div>
      </div>
      {unopenedFiles.length > 0 && (
        <div className="flex flex-col gap-2">
          <Text display="block" size="body2" weight="medium">
            Files
          </Text>
          <div className="flex flex-wrap gap-2">
            {unopenedFiles
              .filter((filePath) => filePath != null)
              .map(([filePath, { code }]) => {
                const Icon =
                  codingWorkspaceExplorerFilePathToIcon(filePath)?.icon ??
                  RiCodeLine;

                return (
                  <Button
                    key={filePath}
                    addonPosition="start"
                    className="font-mono"
                    icon={Icon}
                    label={codingWorkspaceExtractFileNameFromPath(filePath)}
                    variant="secondary"
                    onClick={() => {
                      onSelectTabType({
                        payload: { code, file: filePath },
                        type: 'code',
                      });
                    }}
                  />
                );
              })}
          </div>
        </div>
      )}
    </div>
  );
}