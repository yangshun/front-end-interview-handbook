'use client';

import clsx from 'clsx';
import { RiLayoutGridLine } from 'react-icons/ri';

import Text from '~/components/ui/Text';
import CodingWorkspaceDivider, {
  CodingWorkspaceDividerWrapperClassname,
} from '~/components/workspace/common/CodingWorkspaceDivider';
import CodingWorkspaceErrorBoundary from '~/components/workspace/common/CodingWorkspaceErrorBoundary';

import { TilesPanelRoot } from '~/react-tiling/components/TilesPanelRoot';
import { TilesProvider } from '~/react-tiling/state/TilesProvider';
import type { TilesPanelConfig } from '~/react-tiling/types';

export default function Page() {
  const layout: TilesPanelConfig<string> = {
    direction: 'horizontal',
    id: 'root',
    items: [
      {
        activeTabId: 'A',
        collapsible: true,
        id: 'left',
        tabs: [
          {
            closeable: true,
            id: 'A',
          },
          {
            closeable: true,
            id: 'B',
          },
        ],
        type: 'item',
      },
      {
        direction: 'vertical',
        id: 'right-column',
        items: [
          {
            activeTabId: 'E',
            collapsible: true,
            id: 'right-top',
            tabs: [
              {
                closeable: true,
                id: 'D',
              },
              {
                closeable: true,
                id: 'E',
              },
            ],
            type: 'item',
          },
          {
            activeTabId: 'F',
            collapsible: true,
            id: 'right-bottom',
            tabs: [
              {
                closeable: true,
                id: 'F',
              },
              {
                closeable: true,
                id: 'G',
              },
            ],
            type: 'item',
          },
        ],
        type: 'group',
      },
    ],
    type: 'group',
  } as const;

  return (
    <div
      className={clsx(
        'h-screen w-full p-3',
        'bg-neutral-50 dark:bg-neutral-950',
      )}>
      <TilesProvider defaultValue={layout}>
        <TilesPanelRoot
          disablePointerEventsDuringResize={true}
          getResizeHandlerProps={(direction) => ({
            children: <CodingWorkspaceDivider direction={direction} />,
            className: CodingWorkspaceDividerWrapperClassname(direction),
          })}
          getTabLabel={(tabId) => ({
            icon: RiLayoutGridLine,
            label: `Tab ${tabId}`,
          })}
          renderTab={(tabId) => (
            <CodingWorkspaceErrorBoundary>
              <div className="size-full flex items-center justify-center">
                <Text className="text-6xl" weight="bold">
                  {tabId}
                </Text>
              </div>
            </CodingWorkspaceErrorBoundary>
          )}
        />
      </TilesProvider>
    </div>
  );
}
