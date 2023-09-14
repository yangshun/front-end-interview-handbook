import { TilesPanelConfig, TilesPanelGroupDirection } from '../types';
import getUniqueId from '../utils/getUniqueId';


export type TilesActionLayoutChange = Readonly<{
  type: 'layout-change';
  payload: Readonly<{
    panels: TilesPanelConfig
  }>;
}>;

export default function layoutChange(
  tiles: TilesPanelConfig,
  payload: TilesActionLayoutChange['payload'],
) {
  return payload.panels;
}
