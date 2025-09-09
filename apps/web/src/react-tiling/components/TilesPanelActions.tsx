import { Fragment } from 'react';
import {
  RiCloseLine,
  RiContractLeftRightFill,
  RiContractUpDownFill,
  RiExpandLeftRightFill,
  RiExpandUpDownFill,
  RiFullscreenExitLine,
  RiFullscreenLine,
  RiMoreFill,
} from 'react-icons/ri';
import { VscSplitHorizontal, VscSplitVertical } from 'react-icons/vsc';
import type { PanelGroupProps } from 'react-resizable-panels';

import Button from '~/components/ui/Button';
import Divider from '~/components/ui/Divider';
import DropdownMenu from '~/components/ui/DropdownMenu';

import { useTilesContext } from '../state/useTilesContext';
import type { TilesPanelItemMode } from './TilesPanelItem';

type CustomAction = Readonly<{
  icon?: (iconProps: React.ComponentProps<'svg'>) => JSX.Element;
  label: string;
  onClick: () => void;
  value: string;
}>;

type CustomActionComponent = Readonly<{
  component: React.ReactNode;
  value: string;
}>;

type CustomActionDivider = Readonly<{
  type: 'divider';
  value: string;
}>;

type CustomActionsSection = Readonly<{
  actions: ReadonlyArray<
    CustomAction | CustomActionComponent | CustomActionDivider
  >;
  type: 'actions';
}>;

type CustomComponentSection = Readonly<{
  component: React.ReactNode;
  id: string;
  type: 'component';
}>;

export type CustomActionsOrComponent =
  | CustomActionsSection
  | CustomComponentSection;

type Props = Readonly<{
  closeable: boolean;
  customActionsOrComponents?: ReadonlyArray<CustomActionsOrComponent>;
  dropdownIcon?: (iconProps: React.ComponentProps<'svg'>) => JSX.Element;
  mode: TilesPanelItemMode;
  panelId: string;
  parentDirection: PanelGroupProps['direction'];
  showSplitButton: boolean;
}>;

export default function TilesPanelActions({
  closeable,
  customActionsOrComponents = [],
  dropdownIcon = RiMoreFill,
  mode,
  panelId,
  parentDirection,
  showSplitButton,
}: Props) {
  const { tilesDispatch } = useTilesContext();

  if (mode === 'maximized') {
    return (
      <Button
        icon={RiFullscreenExitLine}
        isLabelHidden={true}
        label="Shrink"
        size="xs"
        variant="tertiary"
        onClick={() => {
          tilesDispatch({
            payload: {
              fullScreen: false,
              panelId,
            },
            type: 'panel-full-screen',
          });
        }}
      />
    );
  }

  if (mode === 'collapsed') {
    return (
      <Button
        icon={
          parentDirection === 'vertical'
            ? RiExpandUpDownFill
            : RiExpandLeftRightFill
        }
        isLabelHidden={true}
        label="Expand"
        size="xs"
        variant="tertiary"
        onClick={() => {
          tilesDispatch({
            payload: {
              collapsed: false,
              panelId,
            },
            type: 'panel-collapse',
          });
        }}
      />
    );
  }

  // Check if we have any custom components to render alongside the dropdown
  const customComponents = customActionsOrComponents.filter(
    (item): item is CustomComponentSection => item.type === 'component',
  );

  const hasDropdownActions =
    customActionsOrComponents.some((item) => item.type === 'actions') ||
    showSplitButton ||
    closeable;

  return (
    <div className="flex items-center gap-x-1.5">
      {/* Render custom components */}
      {customComponents.map((section) => (
        <div key={section.id}>{section.component}</div>
      ))}

      {/* Render dropdown menu if there are any dropdown actions */}
      {hasDropdownActions && (
        <DropdownMenu
          align="end"
          icon={dropdownIcon}
          isLabelHidden={true}
          label="Actions"
          showChevron={false}
          size="xs"
          variant="tertiary">
          {[
            // Custom actions from sections
            ...customActionsOrComponents
              .filter(
                (item): item is CustomActionsSection => item.type === 'actions',
              )
              .flatMap((section) =>
                section.actions.map((action) => {
                  // Check the type of action
                  if ('component' in action) {
                    return {
                      component: action.component,
                      value: action.value,
                    };
                  }
                  if ('type' in action && action.type === 'divider') {
                    return {
                      type: 'divider',
                      value: action.value,
                    };
                  }

                  // This must be a regular CustomAction
                  const regularAction = action as CustomAction;

                  return {
                    icon: regularAction.icon,
                    label: regularAction.label,
                    onClick: regularAction.onClick,
                    value: regularAction.value,
                  };
                }),
              ),
            // Built-in actions
            {
              icon: RiFullscreenLine,
              label: 'Maximize',
              onClick: () =>
                tilesDispatch({
                  payload: {
                    fullScreen: true,
                    panelId,
                  },
                  type: 'panel-full-screen',
                }),
              value: 'maximize',
            },
            {
              icon:
                parentDirection === 'vertical'
                  ? RiContractUpDownFill
                  : RiContractLeftRightFill,
              label: 'Collapse',
              onClick: () => {
                tilesDispatch({
                  payload: {
                    collapsed: true,
                    panelId,
                  },
                  type: 'panel-collapse',
                });
              },
              value: 'collapse',
            },
            showSplitButton
              ? {
                  icon: VscSplitHorizontal,
                  label: 'Split right',
                  onClick: () =>
                    tilesDispatch({
                      payload: {
                        direction: 'horizontal',
                        newPanelOrder: 'after',
                        panelId,
                      },
                      type: 'panel-split',
                    }),
                  value: 'split-right',
                }
              : null,
            showSplitButton
              ? {
                  icon: VscSplitVertical,
                  label: 'Split down',
                  onClick: () =>
                    tilesDispatch({
                      payload: {
                        direction: 'vertical',
                        newPanelOrder: 'after',
                        panelId,
                      },
                      type: 'panel-split',
                    }),
                  value: 'split-down',
                }
              : null,
            closeable
              ? {
                  icon: RiCloseLine,
                  label: 'Close all tabs',
                  onClick: () => {
                    tilesDispatch({
                      payload: {
                        panelId,
                      },
                      type: 'panel-close',
                    });
                  },
                  value: 'close-all-tabs',
                }
              : null,
          ]
            .filter((item) => Boolean(item))
            .map((item) => {
              // Handle different types of items
              if ('component' in item!) {
                return <Fragment key={item!.value}>{item!.component}</Fragment>;
              }
              if ('type' in item! && item!.type === 'divider') {
                return (
                  <Fragment key={item!.value}>
                    <Divider className="my-1.5" />
                  </Fragment>
                );
              }

              return (
                <DropdownMenu.Item
                  key={item!.value}
                  icon={item!.icon}
                  isSelected={false}
                  label={item!.label}
                  onClick={item!.onClick}
                />
              );
            })}
        </DropdownMenu>
      )}
    </div>
  );
}
