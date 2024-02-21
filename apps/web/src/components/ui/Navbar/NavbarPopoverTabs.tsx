import clsx from 'clsx';
import { useState } from 'react';

import Anchor from '~/components/ui/Anchor';
import {
  themeBackgroundColor,
  themeBackgroundElementEmphasizedStateColor,
  themeBackgroundElementEmphasizedStateColor_Hover,
  themeBackgroundLayerEmphasized,
  themeGlassyBorder,
  themeOutlineElement_FocusVisible,
  themeOutlineElementBrandColor_FocusVisible,
  themeTextBrandColor_GroupHover,
  themeTextSubtitleColor,
} from '~/components/ui/theme';

import type { NavPopoverGroupItem, NavPopoverLinkItem } from './NavTypes';
import Button from '../Button';
import Text from '../Text';

import * as Tabs from '@radix-ui/react-tabs';

function NavbarPopoverLink({
  label,
  icon: Icon,
  href,
  onClick,
  sublabel,
  labelAddon,
}: NavPopoverLinkItem) {
  const el =
    sublabel != null ? (
      <div className="group flex flex-col items-start gap-4">
        <div
          className={clsx(
            'rounded-full p-3 dark:bg-neutral-800/70',
            themeGlassyBorder,
            themeTextSubtitleColor,
          )}>
          <Icon
            aria-hidden="true"
            className="group-hover:text-brand-dark dark:group-hover:text-brand size-6 transition-colors"
          />
        </div>
        <div className="flex flex-col gap-y-1">
          <Text className="items-center gap-2" display="flex" weight="medium">
            <span className="shrink-0">{label}</span> {labelAddon}
          </Text>
          {sublabel && (
            <Text color="secondary" display="block" size="body2">
              {sublabel}
            </Text>
          )}
        </div>
      </div>
    ) : (
      <div className="group flex items-center gap-x-4">
        <div
          className={clsx(
            'rounded-full p-3 dark:bg-neutral-800/70',
            themeGlassyBorder,
            themeTextSubtitleColor,
          )}>
          <Icon
            aria-hidden="true"
            className={clsx(
              'size-6',
              themeTextBrandColor_GroupHover,
              'transition-colors',
            )}
          />
        </div>
        <Text
          className="flex-wrap items-center gap-2"
          display="flex"
          size="body2"
          weight="medium">
          <span>{label}</span> {labelAddon}
        </Text>
      </div>
    );

  const className = clsx(
    'group flex grow',
    themeOutlineElement_FocusVisible,
    themeOutlineElementBrandColor_FocusVisible,
    href != null && themeBackgroundElementEmphasizedStateColor_Hover,
  );

  if (href == null) {
    return <div className={className}>{el}</div>;
  }

  return (
    <Anchor
      className={className}
      href={href}
      suppressHydrationWarning={true}
      variant="unstyled"
      onClick={onClick}>
      {el}
    </Anchor>
  );
}

export default function NavbarPopoverTabs({
  items,
  onClose,
}: Readonly<{
  items: ReadonlyArray<NavPopoverGroupItem>;
  onClose: React.MouseEventHandler<HTMLElement>;
}>) {
  const [value, setValue] = useState(items[0].itemKey);

  return (
    <div
      className={clsx(
        'flex overflow-hidden rounded-lg shadow-lg dark:shadow-none',
        themeGlassyBorder,
        themeBackgroundLayerEmphasized,
      )}>
      <Tabs.Root
        className="flex w-full"
        orientation="vertical"
        value={value}
        onValueChange={setValue}>
        <Tabs.List
          className={clsx(
            'flex w-1/4 shrink-0 flex-col gap-y-2 p-4',
            themeBackgroundColor,
          )}>
          {items.map(({ itemKey, label }) => (
            <Tabs.Trigger
              key={itemKey}
              className={clsx(
                'block w-full rounded-md p-3',
                'text-left text-sm font-medium',
                'outline-none',
                themeBackgroundElementEmphasizedStateColor_Hover,
                themeOutlineElement_FocusVisible,
                themeOutlineElementBrandColor_FocusVisible,
                value === itemKey && themeBackgroundElementEmphasizedStateColor,
              )}
              value={itemKey}>
              <Text
                color={value === itemKey ? 'active' : 'default'}
                size="body2"
                weight="medium">
                {label}
              </Text>
            </Tabs.Trigger>
          ))}
        </Tabs.List>
        <div className="flex w-full grow items-center">
          {items.map((item) => (
            <Tabs.Content
              key={item.itemKey}
              className={clsx(
                'outline-none',
                value === item.itemKey &&
                  'size-full flex flex-col justify-between',
              )}
              value={item.itemKey}>
              <div
                className={clsx(
                  'relative grid grow gap-4 px-8 py-10',
                  (item.items.length === 2 || item.items.length === 4) &&
                    'grid-cols-2',
                  (item.items.length === 3 || item.items.length > 4) &&
                    'grid-cols-3',
                )}>
                {item.items.map((childItem) => (
                  <div
                    key={childItem.itemKey}
                    className={clsx(
                      'flex h-full grow',
                      item.alignment === 'center' && 'items-center',
                    )}>
                    <NavbarPopoverLink
                      {...childItem}
                      onClick={(event) => {
                        // To close the popover.
                        onClose(event);
                        item.onClick?.(event);
                      }}
                    />
                  </div>
                ))}
              </div>
              {item.supplementaryItem != null && (
                <div className={clsx('flex w-full justify-end px-8 pb-6')}>
                  <Button
                    className={clsx('-mb-3 -me-6')}
                    href={item.supplementaryItem.href}
                    icon={item.supplementaryItem.icon}
                    label={item.supplementaryItem.label}
                    size="md"
                    variant="tertiary"
                    onClick={(event) => {
                      item.supplementaryItem?.onClick?.(event);
                      // To close the popover.
                      onClose(event);
                    }}
                  />
                </div>
              )}
            </Tabs.Content>
          ))}
        </div>
      </Tabs.Root>
    </div>
  );
}
