import CodingWorkspaceErrorBoundary from '~/components/workspace/common/CodingWorkspaceErrorBoundary';

import UserInterfaceCodingWorkspaceTabsSection from '../UserInterfaceCodingWorkspaceTabsSection';
import type { UserInterfaceCodingWorkspaceTabsType } from '../UserInterfaceCodingWorkspaceTypes';

type Props = Readonly<{
  activeTabId: string;
  closeFile: (tabId: UserInterfaceCodingWorkspaceTabsType) => void;
  setActiveTabId: (tabId: string) => void;
  tabContents: Array<{
    closeable?: boolean;
    contents: JSX.Element;
    icon?: (iconProps: React.ComponentProps<'svg'>) => JSX.Element;
    id: UserInterfaceCodingWorkspaceTabsType;
    label: string;
  }>;
}>;

export default function UserInterfaceCodingWorkspaceCodeEditorMobile({
  activeTabId,
  closeFile,
  setActiveTabId,
  tabContents,
}: Props) {
  const tabContentsMap: Record<
    string,
    { closeable?: boolean; contents: JSX.Element; label: string }
  > = Object.fromEntries(
    tabContents.map((tab) => [
      tab.id,
      { closeable: tab.closeable, contents: tab.contents, label: tab.label },
    ]),
  );

  return (
    <div className="h-[400px]">
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
        onCloseTab={closeFile}
      />
    </div>
  );
}
