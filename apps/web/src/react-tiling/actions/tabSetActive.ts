import type { TilesPanelConfig } from '../types';

export type TilesActionTabSetActive = Readonly<{
  payload: Readonly<{
    panelId?: string;
    tabId: string;
  }>;
  type: 'tab-set-active';
}>;

export default function tabSetActive(
  tiles: TilesPanelConfig,
  payload: TilesActionTabSetActive['payload'],
): TilesPanelConfig {
  const { panelId = null, tabId } = payload;

  return tabSetActiveImpl(tiles, { panelId, tabId });
}

function tabSetActiveImpl(
  panel: TilesPanelConfig,
  {
    panelId,
    tabId,
  }: Readonly<{
    panelId: string | null;
    tabId: string;
  }>,
): TilesPanelConfig {
  if (panel.type === 'item') {
    // Scope to specific panel.
    if (panelId != null && panelId !== panel.id) {
      return panel;
    }

    // Non-existing tab ID, no-op.
    if (!panel.tabs.find(({ id }) => id === tabId)) {
      return panel;
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
