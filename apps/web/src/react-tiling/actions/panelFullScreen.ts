import type { TilesPanelConfig } from '../types';

export type TilesActionPanelFullScreen = Readonly<{
  payload: Readonly<{
    fullScreen: boolean;
    panelId: string;
  }>;
  type: 'panel-full-screen';
}>;

export default function panelFullScreen(
  tiles: TilesPanelConfig,
  payload: TilesActionPanelFullScreen['payload'],
): TilesPanelConfig {
  const { panelId, fullScreen } = payload;

  return panelFullScreenImpl(tiles, panelId, fullScreen);
}

function panelFullScreenImpl(
  panel: TilesPanelConfig,
  panelIdToFullScreen: string,
  fullScreen: boolean,
): TilesPanelConfig {
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
