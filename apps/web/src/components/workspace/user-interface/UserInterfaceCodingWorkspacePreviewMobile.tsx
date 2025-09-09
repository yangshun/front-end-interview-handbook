import { useState } from 'react';

import { useIntl } from '~/components/intl';

import CodingWorkspaceErrorBoundary from '../common/CodingWorkspaceErrorBoundary';
import CodingWorkspaceConsole from '../common/console/CodingWorkspaceConsole';
import UserInterfaceCodingWorkspacePreview from './UserInterfaceCodingWorkspacePreview';
import UserInterfaceCodingWorkspaceTabsSection from './UserInterfaceCodingWorkspaceTabsSection';
import type { UserInterfaceCodingWorkspaceTabsType } from './UserInterfaceCodingWorkspaceTypes';

export default function UserInterfaceCodingWorkspacePreviewMobile() {
  const intl = useIntl();
  const tabContents: ReadonlyArray<{
    contents: JSX.Element;
    id: UserInterfaceCodingWorkspaceTabsType;
    label: string;
  }> = [
    {
      contents: <UserInterfaceCodingWorkspacePreview />,
      id: 'preview',
      label: intl.formatMessage({
        defaultMessage: 'Browser',
        description: 'Coding workspace browser tab label',
        id: 'ZNFWBy',
      }),
    },
    {
      contents: <CodingWorkspaceConsole />,
      id: 'console',
      label: intl.formatMessage({
        defaultMessage: 'Console',
        description: 'Coding workspace console tab label',
        id: 'hWpv5f',
      }),
    },
  ];
  const tabContentsMap: Record<
    string,
    { contents: JSX.Element; label: string }
  > = Object.fromEntries(
    tabContents.map((tab) => [
      tab.id,
      { contents: tab.contents, label: tab.label },
    ]),
  );
  const [activeTabId, setActiveTabId] = useState<string>(tabContents[0].id);

  return (
    <div className="h-[376px]">
      <UserInterfaceCodingWorkspaceTabsSection
        activeTabId={activeTabId}
        renderTab={(tabId) => (
          <CodingWorkspaceErrorBoundary>
            {tabContentsMap[tabId] != null ? (
              <div className="flex size-full">
                {tabContentsMap[tabId]!.contents}
              </div>
            ) : null}
          </CodingWorkspaceErrorBoundary>
        )}
        tabs={tabContents}
        onChangeActiveTab={setActiveTabId}
      />
    </div>
  );
}
