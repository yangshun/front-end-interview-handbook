import clsx from 'clsx';
import { useEffect, useRef } from 'react';
import {
  RiAddLine,
  RiArrowUpSLine,
  RiExpandLeftRightFill,
} from 'react-icons/ri';
import type {
  ImperativePanelHandle,
  PanelGroupProps,
  PanelProps,
} from 'react-resizable-panels';
import { Panel } from 'react-resizable-panels';

import Button from '~/components/ui/Button';
import Divider from '~/components/ui/Divider';
import {
  themeBackgroundColor,
  themeBackgroundElementEmphasizedStateColor_Hover,
  themeBackgroundElementPressedStateColor_Active,
  themeBorderColor,
  themeDivideColor,
  themeTextSubtleColor,
} from '~/components/ui/theme';

import TilesPanelActions from './TilesPanelActions';
import TilesPanelBody from './TilesPanelBody';
import TilesPanelTabsSection from './TilesPanelTabsSection';
import { useTilesContext } from '../state/useTilesContext';
import type { TilesPanelItemTab } from '../types';

const MAXIMUM_LEVEL_FOR_SPLITTING = 2;

export type TilesPanelItemMode = 'collapsed' | 'default' | 'maximized';

export default function TilesPanelItem<TabType extends string>({
  activeTabId,
  id: panelId,
  collapsed = false,
  collapsedTitle,
  collapsible,
  defaultSize = 100,
  fullScreen,
  tabs,
  level,
  order,
  getTabLabel,
  parentDirection,
  renderTab,
  sizeAfterExpansion,
}: Readonly<{
  activeTabId: TabType | null;
  collapsed?: boolean;
  collapsedTitle?: string;
  collapsible?: PanelProps['collapsible'];
  defaultSize?: PanelProps['defaultSize'];
  fullScreen?: boolean;
  getTabLabel: (tabId: TabType) => Readonly<{
    icon?: (iconProps: React.ComponentProps<'svg'>) => JSX.Element;
    label: string;
  }>;
  id: string;
  level: number;
  order?: number;
  parentDirection: PanelGroupProps['direction'];
  renderTab: (tabId: TabType) => JSX.Element;
  sizeAfterExpansion?: number;
  tabs: ReadonlyArray<TilesPanelItemTab<TabType>>;
}>) {
  const { dispatch } = useTilesContext();
  const ref = useRef<ImperativePanelHandle>(null);

  useEffect(() => {
    if (!collapsible) {
      return;
    }

    if (collapsed === true) {
      ref.current?.collapse();
    }

    if (collapsed === false) {
      ref.current?.expand();
      if (sizeAfterExpansion) {
        ref.current?.resize(sizeAfterExpansion);
      }
    }
  }, [collapsed, collapsible, sizeAfterExpansion]);

  const commonProps = {
    collapsible,
    defaultSize,
    id: panelId,
    onCollapse: (collapsedValue: boolean) =>
      dispatch({
        payload: {
          collapsed: collapsedValue,
          panelId,
        },
        type: 'panel-collapse',
      }),
    order,
    ref,
  };

  const mode: TilesPanelItemMode = (() => {
    if (fullScreen) {
      return 'maximized';
    }

    if (collapsible && collapsed) {
      return 'collapsed';
    }

    return 'default';
  })();

  const panelRef = useRef<HTMLDivElement>(null);

  if (parentDirection === 'horizontal' && mode === 'collapsed') {
    return (
      <Panel
        {...commonProps}
        className={clsx(
          'flex flex-col items-stretch rounded-lg py-2',
          ['border', themeBorderColor],
          themeBackgroundColor,
        )}
        collapsedSize={5}>
        <div className="flex justify-center">
          <Button
            icon={RiExpandLeftRightFill}
            isLabelHidden={true}
            label="Expand"
            size="lg"
            variant="tertiary"
            onClick={() => {
              dispatch({
                payload: {
                  collapsed: false,
                  panelId,
                },
                type: 'panel-collapse',
              });
            }}
          />
        </div>
        <Divider className="my-2" />
        <div className="flex flex-col items-center gap-y-4">
          {tabs.map((tabItem) => {
            const { icon, label } = getTabLabel(tabItem.id);

            return (
              <Button
                key={tabItem.id}
                className={themeTextSubtleColor}
                href={tabItem.href}
                icon={icon}
                isLabelHidden={true}
                label={label}
                size="lg"
                variant="tertiary"
                onClick={() => {
                  dispatch({
                    payload: {
                      panelId,
                      tabId: tabItem.id,
                    },
                    type: 'tab-set-active',
                  });
                }}
              />
            );
          })}
        </div>
      </Panel>
    );
  }

  const showSplitButton =
    mode === 'default' && level <= MAXIMUM_LEVEL_FOR_SPLITTING;
  const showCollapsedTitle = collapsed && Boolean(collapsedTitle); // TODO(add special prop)

  return (
    <Panel
      {...commonProps}
      className={clsx(
        'rounded-lg',
        ['border', themeBorderColor],
        themeBackgroundColor,
        ['divide-y', themeDivideColor],
        fullScreen && 'absolute inset-0 z-20',
      )}
      collapsedSize={5}>
      <div ref={panelRef} className="size-full flex flex-col">
        <div
          className={clsx(
            'flex shrink-0 items-center justify-between',
            collapsed ? 'h-full' : 'h-10',
            !showCollapsedTitle && 'px-2',
          )}>
          {showCollapsedTitle ? (
            <button
              className={clsx(
                'size-full px-3',
                'flex items-center gap-2',
                'text-left text-xs font-medium',
                'transition-colors',
                'bg-transparent',
                'text-neutral-600 dark:text-neutral-200',
                [
                  themeBackgroundElementEmphasizedStateColor_Hover,
                  'hover:text-brand-darker dark:hover:text-brand',
                ],
                [
                  themeBackgroundElementPressedStateColor_Active,
                  'active:text-brand-dark dark:active:text-brand-light',
                ],
              )}
              type="button"
              onClick={() => {
                dispatch({
                  payload: {
                    collapsed: false,
                    panelId,
                  },
                  type: 'panel-collapse',
                });
              }}>
              {collapsedTitle}
              <RiArrowUpSLine aria-hidden={true} className="size-4 shrink-0" />
            </button>
          ) : (
            <>
              {!collapsed && (
                <span className={clsx('flex h-full items-center pr-0.5')}>
                  <Button
                    icon={RiAddLine}
                    isLabelHidden={true}
                    label="New tab"
                    size="xs"
                    tooltip="New tab"
                    variant="tertiary"
                    onClick={() => {
                      dispatch({
                        payload: {
                          panelId,
                        },
                        type: 'tab-open',
                      });
                    }}
                  />
                </span>
              )}
              <TilesPanelTabsSection
                activeTabId={activeTabId}
                getTabLabel={getTabLabel}
                mode={collapsed ? 'readonly' : 'interactive'}
                panelId={panelId}
                tabs={tabs}
              />
              <div className="flex h-full items-center">
                <TilesPanelActions
                  closeable={tabs.every((tab) => tab.closeable)}
                  mode={mode}
                  panelId={panelId}
                  parentDirection={parentDirection}
                  showSplitButton={showSplitButton}
                />
              </div>
            </>
          )}
        </div>
        <TilesPanelBody
          allowDropping={!fullScreen}
          hidden={collapsed}
          panelId={panelId}
          tabs={tabs}
          onPanelDrop={(dropAreaSection, src) => {
            dispatch({
              payload: {
                dst: {
                  dropAreaSection,
                  panelId,
                },
                srcPanelId: src.panelId,
              },
              type: 'panel-drop',
            });
          }}
          onTabDrop={(dropAreaSection, src) => {
            dispatch({
              payload: {
                dst: {
                  dropAreaSection,
                  panelId,
                },
                src,
              },
              type: 'tab-drop',
            });
          }}>
          {tabs.map((tab) => (
            <div
              key={tab.id}
              className={clsx(
                'absolute inset-0 flex',
                !tab.allowOverflow && 'overflow-y-auto',
                tab.id !== activeTabId && 'hidden',
              )}
              role="tabpanel">
              {renderTab(tab.id)}
            </div>
          ))}
        </TilesPanelBody>
      </div>
    </Panel>
  );
}
