import { useContext } from 'react';

import { TilesContext } from './TilesContext';

export function useTilesContext() {
  return useContext(TilesContext);
}
