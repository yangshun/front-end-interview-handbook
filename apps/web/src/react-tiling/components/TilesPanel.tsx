import type { CSSProperties, ReactNode } from 'react';
import { Fragment } from 'react';
import { Panel, PanelGroup, PanelResizeHandle } from 'react-resizable-panels';

import TilesPanelContents from './TilesPanelContents';
import type { PanelDropTarget } from '../actions/tabDrop';
import type { TilesPanelConfig } from '../types';

export default function TilesPanel({
  level,
  order,
  id,
  disablePointerEventsDuringResize,
  getTabLabel,
  renderTab,
  onAddTab,
  onClose,
  onTabClose,
  onTabDrop,
  onSplit,
  defaultSize = 100,
  onTabSetActive,
  getResizeHandlerProps,
  ...props
}: Readonly<{
  defaultSize?: number;
  disablePointerEventsDuringResize?: boolean;
  getResizeHandlerProps: (direction: 'horizontal' | 'vertical') => Readonly<{
    children?: ReactNode;
    className?: string;
    style?: CSSProperties;
  }>;
  getTabLabel: (tabId: string) => string;
  level: number;
  onAddTab: (panelId: string) => void;
  onClose: (panelId: string) => void;
  onSplit: (direction: 'horizontal' | 'vertical', panelId: string) => void;
  onTabClose: (panelId: string, tabId: string) => void;
  onTabDrop: (
    src: Readonly<{ panelId: string; tabCloseable: boolean, tabId: string; }>,
    dst: PanelDropTarget,
  ) => void;
  onTabSetActive: (panelId: string, tabId: string) => void;
  order?: number;
  renderTab: (tabId: string) => JSX.Element;
}> &
  TilesPanelConfig) {
  if (props.type === 'item') {
    const panel = (
      <TilesPanelContents
        key={id}
        activeTabId={props.activeTabId}
        defaultSize={defaultSize}
        getTabLabel={getTabLabel}
        id={id}
        order={order}
        renderTab={renderTab}
        tabs={props.tabs}
        onAddTab={onAddTab}
        onClose={onClose}
        onSplit={onSplit}
        onTabClose={onTabClose}
        onTabDrop={(src, dst) => {
          onTabDrop(src, dst);
        }}
        onTabSetActive={onTabSetActive}
      />
    );

    return level === 0 ? (
      <PanelGroup
        direction="horizontal"
        disablePointerEventsDuringResize={disablePointerEventsDuringResize}>
        {panel}
      </PanelGroup>
    ) : (
      panel
    );
  }

  const groupDirection = props.direction ?? 'horizontal';

  const group = (
    <PanelGroup
      direction={groupDirection}
      disablePointerEventsDuringResize={disablePointerEventsDuringResize}
      id={String(id)}>
      {props.items.map((item, index) => (
        <Fragment key={'fragment-' + item.id}>
          {index > 0 && (
            <PanelResizeHandle
              key={'handle-' + item.id}
              {...getResizeHandlerProps(
                groupDirection === 'horizontal' ? 'vertical' : 'horizontal',
              )}
            />
          )}
          <TilesPanel
            key={item.id}
            defaultSize={100 / Math.max(props.items.length, 1)}
            disablePointerEventsDuringResize={disablePointerEventsDuringResize}
            level={level + 1}
            order={index + 1}
            {...item}
            getResizeHandlerProps={getResizeHandlerProps}
            getTabLabel={getTabLabel}
            renderTab={renderTab}
            onAddTab={onAddTab}
            onClose={onClose}
            onSplit={onSplit}
            onTabClose={onTabClose}
            onTabDrop={onTabDrop}
            onTabSetActive={onTabSetActive}
          />
        </Fragment>
      ))}
    </PanelGroup>
  );

  return level === 0 ? (
    group
  ) : (
    <Panel key={id} id={String(id)} order={order}>
      {group}
    </Panel>
  );
}
