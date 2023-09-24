import type { TilesPanelConfig } from '../types';

export type TilesActionPanelCollapse = Readonly<{
  payload: Readonly<{
    collapsed: boolean;
    panelId: string;
  }>;
  type: 'panel-collapse';
}>;

export default function panelCollapse(
  tiles: TilesPanelConfig,
  payload: TilesActionPanelCollapse['payload'],
): TilesPanelConfig {
  const { panelId, collapsed } = payload;

  return panelCollapseImpl(tiles, panelId, collapsed);
}

function panelCollapseImpl(
  panel: TilesPanelConfig,
  panelIdToCollapse: string,
  collapsed: boolean,
): TilesPanelConfig {
  if (panel.type === 'item') {
    if (panel.id === panelIdToCollapse) {
      return {
        ...panel,
        collapsed,
        fullScreen: false,
      };
    }

    return panel;
  }

  return {
    ...panel,
    items: panel.items.map((item) =>
      panelCollapseImpl(item, panelIdToCollapse, collapsed),
    ),
  };
}
