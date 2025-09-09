'use client';

import { useSandpack } from '@codesandbox/sandpack-react';
import { RiCodeLine } from 'react-icons/ri';

import { useIntl } from '~/components/intl';
import Button from '~/components/ui/Button';
import Text from '~/components/ui/Text';
import { codingWorkspaceExplorerFilePathToIcon } from '~/components/workspace/common/explorer/codingWorkspaceExplorerFilePathToIcon';
import {
  codingWorkspaceTabFileId,
  codingWorkspaceTabFilePattern,
} from '~/components/workspace/common/tabs/codingWorkspaceTabId';
import { codingWorkspaceExtractFileNameFromPath } from '~/components/workspace/common/utils/codingWorkspaceExtractFileNameFromPath';
import useUserInterfaceCodingWorkspaceTilesContext from '~/components/workspace/user-interface/hooks/useUserInterfaceCodingWorkspaceTilesContext';

import type {
  ProjectsChallengeSolutionWorkspacePredefinedTabsContents,
  ProjectsChallengeSolutionWorkspacePredefinedTabsType,
} from './ProjectsChallengeSolutionWorkspaceTypes';

type NewTabTypeData =
  | {
      payload: { code: string; file: string };
      type: 'code';
    }
  | {
      type: ProjectsChallengeSolutionWorkspacePredefinedTabsType;
    };

export default function ProjectsChallengeSolutionWorkspaceNewTab({
  onSelectTabType,
  predefinedTabs,
}: Readonly<{
  onSelectTabType: (data: NewTabTypeData) => void;
  predefinedTabs: ProjectsChallengeSolutionWorkspacePredefinedTabsContents;
}>) {
  const intl = useIntl();
  const {
    sandpack: { files },
  } = useSandpack();
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
        <Text className="block" size="body2" weight="medium">
          {intl.formatMessage({
            defaultMessage: 'Tabs',
            description: 'Workspace tabs',
            id: 'QWBKmB',
          })}
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
                  type: tabType as ProjectsChallengeSolutionWorkspacePredefinedTabsType,
                });
              }}
            />
          ))}
        </div>
      </div>
      {unopenedFiles.length > 0 && (
        <div className="flex flex-col gap-2">
          <Text className="block" size="body2" weight="medium">
            {intl.formatMessage({
              defaultMessage: 'Files',
              description: 'Workspace files',
              id: 'zvC4ng',
            })}
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
