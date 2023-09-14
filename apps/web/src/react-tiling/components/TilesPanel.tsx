import { CSSProperties, Fragment, ReactNode } from 'react';
import { Panel, PanelGroup, PanelResizeHandle } from 'react-resizable-panels';
import TilesPanelContents from './TilesPanelContents';
import { TilesPanelConfig } from '../types';
import { PanelDropTarget } from '../actions/tabDrop';

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
  level: number;
  order?: number;
  disablePointerEventsDuringResize?: boolean;
  getResizeHandlerProps: (direction: 'horizontal' | 'vertical') => Readonly<{
    children?: ReactNode;
    className?: string;
    style?: CSSProperties;
  }>;
  getTabLabel: (tabId: string) => string;
  renderTab: (tabId: string) => JSX.Element;
  onSplit: (direction: 'horizontal' | 'vertical', panelId: string) => void;
  onAddTab: (panelId: string) => void;
  onTabSetActive: (panelId: string, tabId: string) => void;
  onClose: (panelId: string) => void;
  onTabClose: (panelId: string, tabId: string) => void;
  onTabDrop: (
    src: Readonly<{ panelId: string; tabId: string; tabCloseable: boolean }>,
    dst: PanelDropTarget,
  ) => void;
}> &
  TilesPanelConfig) {
  if (props.type === 'item') {
    const panel = (
      <TilesPanelContents
        key={id}
        order={order}
        defaultSize={defaultSize}
        tabs={props.tabs}
        id={id}
        activeTabId={props.activeTabId}
        getTabLabel={getTabLabel}
        renderTab={renderTab}
        onAddTab={onAddTab}
        onTabSetActive={onTabSetActive}
        onClose={onClose}
        onTabClose={onTabClose}
        onTabDrop={(src, dst) => {
          onTabDrop(src, dst);
        }}
        onSplit={onSplit}
      />
    );
    return level === 0 ? (
      <PanelGroup
        disablePointerEventsDuringResize={disablePointerEventsDuringResize}
        direction="horizontal">
        {panel}
      </PanelGroup>
    ) : (
      panel
    );
  }

  const groupDirection = props.direction ?? 'horizontal';

  const group = (
    <PanelGroup
      disablePointerEventsDuringResize={disablePointerEventsDuringResize}
      id={String(id)}
      direction={groupDirection}>
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
            level={level + 1}
            order={index + 1}
            defaultSize={100 / Math.max(props.items.length, 1)}
            disablePointerEventsDuringResize={disablePointerEventsDuringResize}
            {...item}
            getResizeHandlerProps={getResizeHandlerProps}
            getTabLabel={getTabLabel}
            renderTab={renderTab}
            onAddTab={onAddTab}
            onClose={onClose}
            onTabClose={onTabClose}
            onTabSetActive={onTabSetActive}
            onTabDrop={onTabDrop}
            onSplit={onSplit}
          />
        </Fragment>
      ))}
    </PanelGroup>
  );

  return level === 0 ? (
    group
  ) : (
    <Panel id={String(id)} order={order} key={id}>
      {group}
    </Panel>
  );
}
