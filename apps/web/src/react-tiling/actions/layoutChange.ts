import type { TilesPanelConfig } from '../types';

export type TilesActionLayoutChange<TabType> = Readonly<{
  payload: Readonly<{
    panels: TilesPanelConfig<TabType>;
  }>;
  type: 'layout-change';
}>;

export default function layoutChange<TabType>(
  _tiles: TilesPanelConfig<TabType>,
  payload: TilesActionLayoutChange<TabType>['payload'],
) {
  return payload.panels;
}
