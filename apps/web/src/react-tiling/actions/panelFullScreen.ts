import type { TilesPanelConfig } from '../types';

export type TilesActionPanelFullScreen = Readonly<{
  payload: Readonly<{
    fullScreen: boolean;
    panelId: string;
  }>;
  type: 'panel-full-screen';
}>;

export default function panelFullScreen<TabType>(
  tiles: TilesPanelConfig<TabType>,
  payload: TilesActionPanelFullScreen['payload'],
): TilesPanelConfig<TabType> {
  const { fullScreen, panelId } = payload;

  return panelFullScreenImpl(tiles, panelId, fullScreen);
}

function panelFullScreenImpl<TabType>(
  panel: TilesPanelConfig<TabType>,
  panelIdToFullScreen: string,
  fullScreen: boolean,
): TilesPanelConfig<TabType> {
  if (panel.type === 'item') {
    if (panel.id === panelIdToFullScreen) {
      return {
        ...panel,
        fullScreen,
      };
    }

    return panel;
  }

  return {
    ...panel,
    items: panel.items.map((item) =>
      panelFullScreenImpl(item, panelIdToFullScreen, fullScreen),
    ),
  };
}
