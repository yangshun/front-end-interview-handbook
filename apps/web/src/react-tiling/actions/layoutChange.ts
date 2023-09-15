import type { TilesPanelConfig } from '../types';

export type TilesActionLayoutChange = Readonly<{
  payload: Readonly<{
    panels: TilesPanelConfig;
  }>;
  type: 'layout-change';
}>;

export default function layoutChange(
  _tiles: TilesPanelConfig,
  payload: TilesActionLayoutChange['payload'],
) {
  return payload.panels;
}
