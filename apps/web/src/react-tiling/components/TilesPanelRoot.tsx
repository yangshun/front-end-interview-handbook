import { ReactNode, CSSProperties } from 'react';
import { useTilesContext } from '../state/useTilesContext';
import { TilesPanelGroupDirection } from '../types';
import TilesPanel from './TilesPanel';

export type Props = Readonly<{
  disablePointerEventsDuringResize?: boolean;
  getResizeHandlerProps: (direction: TilesPanelGroupDirection) => Readonly<{
    children?: ReactNode;
    className?: string;
    style?: CSSProperties;
  }>;
  renderTab: (tabId: string) => JSX.Element;
  getTabLabel: (tabId: string) => string;
  onTabsOpen?: (tabIds: ReadonlyArray<string>) => void;
  onTabsClose?: (tabIds: ReadonlyArray<string>) => void;
}>;

export function TilesPanelRoot({
  disablePointerEventsDuringResize,
  getResizeHandlerProps,
  renderTab,
  getTabLabel,
  onTabsOpen,
  onTabsClose,
}: Props) {
  const { tiles, dispatch } = useTilesContext();

  return (
    <TilesPanel
      level={0}
      {...tiles}
      disablePointerEventsDuringResize={disablePointerEventsDuringResize}
      getResizeHandlerProps={getResizeHandlerProps}
      getTabLabel={getTabLabel}
      renderTab={renderTab}
      onSplit={(direction, panelId: string) => {
        dispatch({
          type: 'panel-split',
          payload: {
            direction,
            panelId,
            newPanelOrder: 'after',
            onTabsOpen,
          },
        });
      }}
      onTabDrop={(src, dst) => {
        dispatch({
          type: 'tab-drop',
          payload: {
            src,
            dst,
          },
        });
      }}
      onTabSetActive={(panelId: string, tabId: string) => {
        dispatch({
          type: 'tab-set-active',
          payload: {
            panelId,
            tabId,
          },
        });
      }}
      onClose={(panelId: string) => {
        dispatch({
          type: 'panel-close',
          payload: {
            panelId,
            onTabsClose,
          },
        });
      }}
      onTabClose={(panelId: string, tabId: string) => {
        dispatch({
          type: 'tab-close',
          payload: {
            panelId,
            tabId,
            onTabsClose,
          },
        });
      }}
      onAddTab={(panelId: string) => {
        dispatch({
          type: 'tab-open',
          payload: {
            panelId,
            onTabsOpen,
          },
        });
      }}
    />
  );
}
