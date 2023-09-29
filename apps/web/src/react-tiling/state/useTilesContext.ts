import { useContext } from 'react';

import type { TilesContextValue } from './TilesContext';
import { TilesContext } from './TilesContext';

export function useTilesContext<TabType extends string>() {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore TODO(tiling)
  return useContext<TilesContextValue<TabType>>(TilesContext);
}
