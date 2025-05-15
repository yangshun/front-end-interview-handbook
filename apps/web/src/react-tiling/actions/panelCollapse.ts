import type { TilesPanelConfig } from '../types';

export type TilesActionPanelCollapse = Readonly<{
  payload: Readonly<{
    collapsed: boolean;
    panelId: string;
  }>;
  type: 'panel-collapse';
}>;

export default function panelCollapse<TabType>(
  tiles: TilesPanelConfig<TabType>,
  payload: TilesActionPanelCollapse['payload'],
): TilesPanelConfig<TabType> {
  const { collapsed, panelId } = payload;

  return panelCollapseImpl(tiles, panelId, collapsed);
}

function panelCollapseImpl<TabType>(
  panel: TilesPanelConfig<TabType>,
  panelIdToCollapse: string,
  collapsed: boolean,
): TilesPanelConfig<TabType> {
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
