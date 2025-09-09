import clsx from 'clsx';
import { RiCloseLine } from 'react-icons/ri';

import ScrollArea from '~/components/ui/ScrollArea';

import {
  tilesPanelItemClass,
  tilesPanelTabClasses,
} from '~/react-tiling/components/TilesPanelStyles';

import type { UserInterfaceCodingWorkspaceTabsType } from './UserInterfaceCodingWorkspaceTypes';

type TabType = Readonly<{
  closeable?: boolean;
  icon?: (iconProps: React.ComponentProps<'svg'>) => JSX.Element;
  id: UserInterfaceCodingWorkspaceTabsType;
  label: string;
}>;

type Props = Readonly<{
  activeTabId: string | null;
  onChangeActiveTab: (tabId: string) => void;
  onCloseTab?: (tabId: UserInterfaceCodingWorkspaceTabsType) => void;
  renderTab: (tabId: string) => JSX.Element;
  tabs: ReadonlyArray<TabType>;
}>;

export default function UserInterfaceCodingWorkspaceTabsSection({
  activeTabId,
  onChangeActiveTab,
  onCloseTab,
  renderTab,
  tabs,
}: Props) {
  return (
    <div className={clsx('h-full', tilesPanelItemClass)}>
      <div className="flex size-full flex-col">
        <div
          className={clsx(
            'flex shrink-0 items-center justify-between',
            'h-10',
            'px-2',
          )}>
          <Tabs
            activeTabId={activeTabId}
            tabs={tabs}
            onChangeActiveTab={onChangeActiveTab}
            onCloseTab={onCloseTab}
          />
        </div>
        <div className={clsx('relative grow')}>
          {tabs.map((tab) => (
            <div
              key={tab.id}
              className={clsx(
                'absolute inset-0 flex',
                tab.id !== activeTabId && 'hidden',
              )}
              role="tabpanel">
              {renderTab(tab.id)}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function Tabs({
  activeTabId,
  onChangeActiveTab,
  onCloseTab,
  tabs,
}: Readonly<{
  activeTabId: string | null;
  onChangeActiveTab: (tabId: string) => void;
  onCloseTab?: (tabId: UserInterfaceCodingWorkspaceTabsType) => void;
  tabs: ReadonlyArray<TabType>;
}>) {
  return (
    <div className="flex h-full grow overflow-x-auto">
      <ScrollArea
        scrollbars="horizontal"
        size="thin"
        viewportClass="flex items-center"
        widthClass="w-fit">
        <div className="flex size-full gap-x-2 overflow-y-hidden py-1.5">
          {tabs.map((tabItem, index) => {
            const isActive = activeTabId === tabItem.id;
            const key = String(tabItem.id) + ' ' + String(index);

            return (
              <div key={key} className={clsx('flex h-8 flex-col')}>
                <Tab
                  {...tabItem}
                  isActive={isActive}
                  onChangeActiveTab={onChangeActiveTab}
                  onCloseTab={onCloseTab}
                />
              </div>
            );
          })}
        </div>
      </ScrollArea>
    </div>
  );
}

function Tab({
  closeable = false,
  icon: Icon,
  id,
  isActive,
  label,
  onChangeActiveTab,
  onCloseTab,
}: Readonly<
  TabType & {
    isActive: boolean;
    onChangeActiveTab: (tabId: string) => void;
    onCloseTab?: (tabId: UserInterfaceCodingWorkspaceTabsType) => void;
  }
>) {
  const contents = (
    <>
      {Icon && <Icon className="size-4 shrink-0" />}
      {label}
    </>
  );

  return (
    <div className={tilesPanelTabClasses.container(isActive, false, closeable)}>
      <button
        className={clsx(tilesPanelTabClasses.button)}
        type="button"
        onClick={() => onChangeActiveTab(id)}>
        <span aria-hidden={true} className="absolute inset-0" />
        {contents}
      </button>
      {closeable && (
        <button
          className={clsx(tilesPanelTabClasses.closeButton(isActive))}
          title="Close tab"
          type="button"
          onClick={() => onCloseTab?.(id)}>
          <RiCloseLine className="size-3 shrink-0" />
        </button>
      )}
    </div>
  );
}
