import type { TilesPanelConfig } from '../types';

export type TilesActionTabSetActive<TabType> = Readonly<{
  payload: Readonly<{
    panelId?: string;
    tabId: TabType;
  }>;
  type: 'tab-set-active';
}>;

export default function tabSetActive<TabType>(
  tiles: TilesPanelConfig<TabType>,
  payload: TilesActionTabSetActive<TabType>['payload'],
): TilesPanelConfig<TabType> {
  const { panelId = null, tabId } = payload;

  return tabSetActiveImpl(tiles, { panelId, tabId });
}

function tabSetActiveImpl<TabType>(
  panel: TilesPanelConfig<TabType>,
  {
    panelId,
    tabId,
  }: Readonly<{
    panelId: string | null;
    tabId: TabType;
  }>,
): TilesPanelConfig<TabType> {
  if (panel.type === 'item') {
    // Scope to specific panel.
    if (panelId != null && panelId !== panel.id) {
      return {
        ...panel,
        fullScreen: false,
      };
    }

    // Non-existing tab ID, no-op.
    if (!panel.tabs.find(({ id }) => id === tabId)) {
      return {
        ...panel,
        fullScreen: false,
      };
    }

    return {
      ...panel,
      activeTabId: tabId,
      collapsed: false,
    };
  }

  return {
    ...panel,
    items: panel.items.map((panelItem) =>
      tabSetActiveImpl(panelItem, { panelId, tabId }),
    ),
  };
}
