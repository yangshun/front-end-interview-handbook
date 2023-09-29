import type { ReactNode, Reducer } from 'react';
import { useReducer } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import { TilesContext } from './TilesContext';
import type { TilesAction } from '../actions/actions';
import layoutChange from '../actions/layoutChange';
import panelClose from '../actions/panelClose';
import panelCollapse from '../actions/panelCollapse';
import panelFullScreen from '../actions/panelFullScreen';
import panelSplit from '../actions/panelSplit';
import tabChangeId from '../actions/tabChangeId';
import tabClose from '../actions/tabClose';
import tabDrop from '../actions/tabDrop';
import tabOpen from '../actions/tabOpen';
import tabSetActive from '../actions/tabSetActive';
import type { TilesPanelConfig } from '../types';
import getTabById from '../utils/getTabById';
import queryTabByPattern from '../utils/queryTabByPattern';

type Props<TabType> = Readonly<{
  children: ReactNode;
  defaultValue: TilesPanelConfig<TabType>;
}>;

function reducer<TabType extends string>(
  tiles: TilesPanelConfig<TabType>,
  action: TilesAction<TabType>,
): TilesPanelConfig<TabType> {
  switch (action.type) {
    case 'panel-split': {
      return panelSplit(tiles, action.payload);
    }
    case 'panel-close': {
      return panelClose(tiles, action.payload);
    }
    case 'panel-collapse': {
      return panelCollapse(tiles, action.payload);
    }
    case 'panel-full-screen': {
      return panelFullScreen(tiles, action.payload);
    }
    case 'tab-open': {
      return tabOpen(tiles, action.payload);
    }
    case 'tab-close': {
      return tabClose(tiles, action.payload);
    }
    case 'tab-set-active': {
      return tabSetActive(tiles, action.payload);
    }
    case 'tab-drop': {
      return tabDrop(tiles, action.payload);
    }
    case 'tab-change-id': {
      return tabChangeId(tiles, action.payload);
    }
    case 'layout-change': {
      return layoutChange(tiles, action.payload);
    }
  }
}

function TilesProviderImpl<TabType extends string>({
  children,
  defaultValue,
}: Props<TabType>) {
  const [tiles, dispatch] = useReducer<
    Reducer<TilesPanelConfig<TabType>, TilesAction<TabType>>
  >(reducer, defaultValue);

  return (
    <TilesContext.Provider
      value={{
        dispatch,
        getTabById: (tabId: TabType) => getTabById(tiles, tabId),
        queryTabByPattern: (regex: RegExp) => queryTabByPattern(tiles, regex),
        tiles,
      }}>
      {children}
    </TilesContext.Provider>
  );
}

export function TilesProvider<TabType extends string>({
  children,
  defaultValue,
}: Props<TabType>) {
  return (
    <DndProvider backend={HTML5Backend}>
      <TilesProviderImpl defaultValue={defaultValue}>
        {children}
      </TilesProviderImpl>
    </DndProvider>
  );
}
