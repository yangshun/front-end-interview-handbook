import clsx from 'clsx';
import * as React from 'react';

import Anchor from '~/components/ui/Anchor';
import {
  themeBackgroundColor,
  themeBackgroundElementEmphasizedStateColor,
  themeBackgroundLayerColor,
  themeGlassyBorder,
  themeTextColor,
  themeTextSubtitleColor,
} from '~/components/ui/theme';

import type { NavPopoverGroupItem, NavPopoverLinkItem } from './NavTypes';
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
            className="group-hover:text-brand-dark dark:group-hover:text-brand size-6 transition-colors"
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

  const className = clsx('group flex grow', href != null);

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
  return (
    <div
      className={clsx(
        'flex overflow-hidden rounded-lg shadow-lg dark:shadow-none',
        themeGlassyBorder,
        themeBackgroundLayerColor,
      )}>
      <Tabs.Root className="flex w-full" orientation="vertical">
        <Tabs.List
          className={clsx(
            'flex w-1/4 shrink-0 flex-col gap-y-2 p-4',
            themeBackgroundColor,
          )}>
          {items.map(({ itemKey, label }) => (
            <Tabs.Trigger
              key={itemKey}
              className={clsx(
                'block w-full rounded-md p-3 text-left text-sm font-medium',
                // `data-[state=active]: ${themeBackgroundElementEmphasizedStateColor}`,
                'data-[state=active]:bg-neutral-100 data-[state=active]:dark:bg-neutral-800/70',
              )}
              value={itemKey}>
              <Text
                // Color={selected ? 'active' : 'default'}
                color="default"
                size="body2"
                weight="medium">
                {label}
              </Text>
            </Tabs.Trigger>
          ))}
        </Tabs.List>
        <div className="flex w-full grow items-center">
          {items.map((item) => (
            <Tabs.Content key={item.itemKey} value={item.itemKey}>
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
                  <Anchor
                    className={clsx(
                      '-m-3 flex items-center gap-x-2 rounded-full p-3 text-sm font-medium',
                      'hover:text-brand-dark dark:hover:text-brand transition-colors',
                      themeTextColor,
                    )}
                    href={item.supplementaryItem.href}
                    variant="unstyled"
                    onClick={(event) => {
                      item.supplementaryItem?.onClick?.(event);
                      // To close the popover.
                      onClose(event);
                    }}>
                    {item.supplementaryItem.icon && (
                      <item.supplementaryItem.icon
                        aria-hidden="true"
                        className={clsx('size-4 inline-block')}
                      />
                    )}
                    {item.supplementaryItem.label}
                  </Anchor>
                </div>
              )}
            </Tabs.Content>
          ))}
        </div>
      </Tabs.Root>
      {/* <Tab.Group vertical={true}>
        <Tab.List
          className={clsx(
            'flex w-1/4 shrink-0 flex-col gap-y-2 p-4',
            themeBackgroundColor,
          )}>
          {items.map(({ itemKey, label }) => (
            <Tab
              key={itemKey}
              className={({ selected }) =>
                clsx(
                  'block w-full rounded-md p-3 text-left text-sm font-medium',
                  selected && themeBackgroundElementEmphasizedStateColor,
                )
              }>
              {({ selected }) => (
                <Text
                  color={selected ? 'active' : 'default'}
                  size="body2"
                  weight="medium">
                  {label}
                </Text>
              )}
            </Tab>
          ))}
        </Tab.List>
        <Tab.Panels className="flex w-full grow items-center">
          {items.map((item) => (
            <Tab.Panel key={item.itemKey} className="size-full grid">
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
                  <Anchor
                    className={clsx(
                      '-m-3 flex items-center gap-x-2 rounded-full p-3 text-sm font-medium',
                      'hover:text-brand-dark dark:hover:text-brand transition-colors',
                      themeTextColor,
                    )}
                    href={item.supplementaryItem.href}
                    variant="unstyled"
                    onClick={(event) => {
                      item.supplementaryItem?.onClick?.(event);
                      // To close the popover.
                      onClose(event);
                    }}>
                    {item.supplementaryItem.icon && (
                      <item.supplementaryItem.icon
                        aria-hidden="true"
                        className={clsx('size-4 inline-block')}
                      />
                    )}
                    {item.supplementaryItem.label}
                  </Anchor>
                </div>
              )}
            </Tab.Panel>
          ))}
        </Tab.Panels>
      </Tab.Group> */}
    </div>
  );
}
