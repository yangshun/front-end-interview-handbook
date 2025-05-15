import type { ReactNode, Reducer } from 'react';
import { useReducer } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import type { TilesAction } from '../actions/actions';
import layoutChange from '../actions/layoutChange';
import panelClose from '../actions/panelClose';
import panelCollapse from '../actions/panelCollapse';
import panelDrop from '../actions/panelDrop';
import panelFullScreen from '../actions/panelFullScreen';
import panelSplit from '../actions/panelSplit';
import tabChangeId from '../actions/tabChangeId';
import tabClose from '../actions/tabClose';
import tabDrop from '../actions/tabDrop';
import tabOpen from '../actions/tabOpen';
import tabSetActive from '../actions/tabSetActive';
import tabSetActiveOtherwiseOpen from '../actions/tabSetActiveOtherwiseOpen';
import type { TilesPanelConfig } from '../types';
import getTabById from '../utils/getTabById';
import queryTabByPattern from '../utils/queryTabByPattern';
import DragHighlightProvider from './DragHighlightProvider';
import { TilesContext } from './TilesContext';

export type Props<TabType> = Readonly<{
  activeTabScrollIntoView?: boolean;
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
    case 'panel-drop': {
      return panelDrop(tiles, action.payload);
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
    case 'tab-set-active-otherwise-open': {
      return tabSetActiveOtherwiseOpen(tiles, action.payload);
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
  activeTabScrollIntoView = true,
}: Props<TabType>) {
  const [tiles, dispatch] = useReducer<
    Reducer<TilesPanelConfig<TabType>, TilesAction<TabType>>
  >(reducer, defaultValue);

  return (
    <TilesContext.Provider
      value={{
        activeTabScrollIntoView,
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
  ...props
}: Props<TabType>) {
  return (
    <DragHighlightProvider>
      <DndProvider backend={HTML5Backend}>
        <TilesProviderImpl {...props}>{children}</TilesProviderImpl>
      </DndProvider>
    </DragHighlightProvider>
  );
}
