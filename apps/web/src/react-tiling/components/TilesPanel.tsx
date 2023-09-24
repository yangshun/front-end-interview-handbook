import clsx from 'clsx';
import type { CSSProperties, ReactNode } from 'react';
import { Fragment } from 'react';
import type { PanelGroupProps, PanelProps } from 'react-resizable-panels';
import { Panel, PanelGroup, PanelResizeHandle } from 'react-resizable-panels';

import TilesPanelItem from './TilesPanelItem';
import type { TilesPanelConfig } from '../types';

export default function TilesPanel({
  level,
  order,
  id,
  disablePointerEventsDuringResize,
  getTabLabel,
  renderTab,
  parentDirection,
  defaultSize = 100,
  getResizeHandlerProps,
  ...props
}: Readonly<{
  defaultSize?: PanelProps['defaultSize'];
  disablePointerEventsDuringResize?: boolean;
  getResizeHandlerProps: (direction: PanelGroupProps['direction']) => Readonly<{
    children?: ReactNode;
    className?: string;
    style?: CSSProperties;
  }>;
  getTabLabel: (tabId: string) => Readonly<{
    icon: (iconProps: React.ComponentProps<'svg'>) => JSX.Element;
    label: string;
  }>;
  level: number;
  order?: number;
  parentDirection: PanelGroupProps['direction'];
  renderTab: (tabId: string) => JSX.Element;
}> &
  TilesPanelConfig) {
  if (props.type === 'item') {
    const panel = (
      <TilesPanelItem
        key={id}
        activeTabId={props.activeTabId}
        collapsed={props.collapsed}
        collapsible={props.collapsible}
        defaultSize={defaultSize}
        fullScreen={props.fullScreen}
        getTabLabel={getTabLabel}
        id={id}
        level={level}
        order={order}
        parentDirection={parentDirection}
        renderTab={renderTab}
        tabs={props.tabs}
      />
    );

    return level === 0 ? (
      <PanelGroup
        className="relative"
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
      className={clsx(level === 0 && 'relative')}
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
            defaultSize={
              item.defaultSize ?? 100 / Math.max(props.items.length, 1)
            }
            disablePointerEventsDuringResize={disablePointerEventsDuringResize}
            level={level + 1}
            order={index + 1}
            {...item}
            getResizeHandlerProps={getResizeHandlerProps}
            getTabLabel={getTabLabel}
            parentDirection={groupDirection}
            renderTab={renderTab}
          />
        </Fragment>
      ))}
    </PanelGroup>
  );

  return level === 0 ? (
    group
  ) : (
    <Panel key={id} defaultSize={defaultSize} id={String(id)} order={order}>
      {group}
    </Panel>
  );
}
