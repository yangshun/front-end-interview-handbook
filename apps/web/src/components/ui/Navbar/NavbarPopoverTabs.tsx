import clsx from 'clsx';

import Anchor from '~/components/ui/Anchor';
import {
  themeBackgroundEmphasized,
  themeBackgroundLayerColor,
  themeBackgroundLayerEmphasized,
  themeBackgroundLayerEmphasizedHover,
  themeTextColor,
  themeTextInvertColor,
} from '~/components/ui/theme';

import type { NavPopoverGroupItem, NavPopoverLinkItem } from './NavTypes';
import Text from '../Text';

import { Tab } from '@headlessui/react';

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
      <div className="flex flex-col gap-4">
        <div
          className={clsx(
            'bg-brand flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-md sm:h-10 sm:w-10',
            themeTextInvertColor,
          )}>
          <Icon
            aria-hidden="true"
            className="h-5 w-5 transition-transform group-hover:scale-110"
          />
        </div>
        <div>
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
      <div className="flex items-center">
        <div
          className={clsx(
            'bg-brand flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-md sm:h-10 sm:w-10',
            themeTextInvertColor,
          )}>
          <Icon
            aria-hidden="true"
            className="h-5 w-5 transition-transform group-hover:scale-110"
          />
        </div>
        <div className="ml-4">
          <Text className="items-center gap-2" display="flex" weight="medium">
            <span className="shrink-0">{label}</span> {labelAddon}
          </Text>
        </div>
      </div>
    );

  const className = clsx(
    'group flex grow rounded-lg p-4',
    href != null && themeBackgroundLayerEmphasizedHover,
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
  return (
    <div
      className={clsx(
        'flex overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5',
        themeBackgroundLayerColor,
      )}>
      <Tab.Group vertical={true}>
        <Tab.List
          className={clsx(
            'flex w-1/4 shrink-0 flex-col gap-y-2 p-2',
            themeBackgroundLayerEmphasized,
          )}>
          {items.map(({ itemKey, label }) => (
            <Tab
              key={itemKey}
              className={({ selected }) =>
                clsx(
                  'block w-full rounded-md p-3 text-left text-sm font-medium',
                  selected && themeBackgroundEmphasized,
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
            <Tab.Panel key={item.itemKey} className="grid h-full w-full">
              <div
                className={clsx(
                  'relative grid grow gap-2 p-6',
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
                <div
                  className={clsx(
                    'flex w-full justify-end px-6 py-5',
                    themeBackgroundLayerEmphasized,
                  )}>
                  <Anchor
                    className={clsx(
                      '-m-3 flex items-center gap-x-2 rounded-md p-3 text-sm font-medium',
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
                        className="inline-block h-6 w-6 text-neutral-500 transition-transform"
                      />
                    )}
                    {item.supplementaryItem.label}
                  </Anchor>
                </div>
              )}
            </Tab.Panel>
          ))}
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
}
